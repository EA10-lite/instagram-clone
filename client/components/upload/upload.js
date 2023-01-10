import React, { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import styles from './upload.module.css';

// components
import ImagePreview from './ImagePreview';
import ImagePreviews from './ImagePreviews';
import Loading from '../loading/loading';

// context
import { UserContext } from '../../context/user';

// icons
import { MdClose, MdLocationOn } from 'react-icons/md';
import { FiUploadCloud} from 'react-icons/fi';


// utils
import upload from '../../api/upload';
import posts from '../../api/posts';

export default function Upload({ closeUploadModal }){
    const { user_data: user } = useContext(UserContext);

    const [ dropdown, setDropdown ] = useState(false);

    // POST DETAILS
    const [ selected_file, set_selected_file ] = useState();
    const [ file_previews, set_file_previews ] = useState([]);
    const [ media_urls, set_media_urls ] = useState([]);
    const [ caption, set_caption ] = useState('');
    const [ location, set_location ] = useState('');
    const [ loading, set_loading ] = useState(false);

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            set_loading(true);
            const assets = [];
            for(const media_url of media_urls){
                const data = await upload.upload_post_media_files(media_url);
                assets.push({ type: data.resource_type, url: data.secure_url });
            }
            if(caption.length > 0 && location.length > 1){
                await posts.create_post({ caption, location, media_urls: [...assets] });
            }
            else if (caption.length > 0){
                await posts.create_post({  media: [...assets] });
            }
            await posts.create_post({  media: [...assets] });

            toast.success("Post successfully created")
            closeUploadModal();
        } catch (error) {
            toast.error("Failed to create post.")
        } finally {
            set_loading(false);
        }
    }

    const selectImage = (event)=> {
        event.preventDefault();
        const file = event.target.files[0];
        if(file){
            set_selected_file(file);
            set_media_urls([...media_urls, file])
        } else {
            set_selected_file(null);
        }
    };

    const removeSelectedImage = (index)=> {
        let temp_image_store = [...media_urls];
        temp_image_store.splice(index,1);

        let temp_preview_store = [...file_previews];
        temp_preview_store.splice(index,1);

        set_media_urls(temp_image_store);
        set_file_previews(temp_preview_store);
    };

    useEffect(()=>{
        if(selected_file){
            const reader = new FileReader();
            reader.onloadend = ()=> {
                set_file_previews([...file_previews, reader.result]);
                set_selected_file(null);
            }
            reader.readAsDataURL(selected_file);
        } else {
            set_file_previews(file_previews);
        }
    },[selected_file]);
    
    
    const modalRef = useRef();
    useEffect(()=>{
        const container = document.querySelector("#container");
        container.addEventListener("click",e=>{
            if(modalRef.current && !modalRef.current.contains(e.target)){
                closeUploadModal();
            }
        })
    },[]);


    return (
        <div id="container" className={styles.uploadContainer}>
            <div className={styles.uploadOverlay}>
                <div className={styles.uploadIconContainer}>
                    <MdClose color="white" size={30} onClick={closeUploadModal} />
                </div>
                { loading && <div></div> }
                <form className={styles.uploadContent} ref={modalRef} onSubmit={e=> handleSubmit(e)} >
                    <div className={styles.uploadHeader}>
                        { media_urls.length <= 0 ? <p className={styles.uploadTitle}> Create new post </p> : <div className={styles.uploadHeaderBtns}>
                            <label className={`${styles.uploadHeaderBtn} ${styles.selectBtn}`}>     
                                <span> Select More </span>
                                <input className={styles.uploadInput} type="file" accept={["image/*", "video/*"]} onChange={(e)=> selectImage(e)} />
                            </label>
                            <div className={`${styles.uploadHeaderBtn} ${styles.addTopicBtn}`}>
                                { !dropdown && <span onClick={()=> setDropdown(true)}> Add Caption </span>}
                                { dropdown && <span onClick={()=> setDropdown(false)}> Close  </span>}
                                { dropdown && <div id="topicDropdown" className={styles.uploadTopicDropdown}>
                                    <div className={styles.posterDetails}>
                                        { user.avatar && <Image src={user?.avatar} className={styles.avatar} width={36} height={36} /> }
                                        <h4 className={styles.username}> { user?.username } </h4>
                                    </div>
                                    <textarea 
                                        className={styles.uploadTopicTextArea}
                                        name="topic"
                                        placeholder='Write a Caption ...' 
                                        onChange={e=> set_caption(e.target.value)}
                                        value={caption}
                                    />

                                    <div className={styles.clearBtn} onClick={()=> set_caption('')}> Clear </div>
                                    <div className={styles.locationInputContainer}>
                                        <input 
                                            className={styles.locationInput}
                                            name="location"
                                            onChange={(e)=> set_location(e.target.value)}
                                            placeholder="Add location"
                                            type="text" 
                                            value={location}
                                        />
                                        <MdLocationOn size={24} color="#818188" />
                                    </div>
                                </div> }
                            </div>
                            <button 
                                type="submit" 
                                className={`${styles.uploadHeaderBtn} ${styles.postBtn}`}
                                disabled={loading ? true : false}
                            > { !loading ? "Upload Post" : "Uploading..." } </button>
                        </div>}
                    </div>
                    { media_urls.length <= 0 ? <div className={styles.uploadForm}>
                        <div className={styles.uploadImgContainer}>
                            <FiUploadCloud size={100} color="lightgray" className={styles.uploadIcon} fontWeight={300} />
                        </div>
                        <p className={styles.uploadText}> Upload Photos here </p>
                        <label className={styles.uploadLabel}>
                            <span> Select from computer </span>
                            <input className={styles.uploadInput} type="file" accept={["image/*", "video/*"]} onChange={(e)=> selectImage(e)} />
                        </label>
                    </div> : (
                        <>
                            { file_previews.length > 1 ? (
                                <ImagePreviews 
                                    file_previews={file_previews} 
                                    media_urls={media_urls} 
                                    removeSelectedImage={removeSelectedImage} 
                                />
                            ) : (
                                <ImagePreview 
                                    media_url={file_previews[0]} 
                                    type={media_urls[0].type} 
                                    removeSelectedImage={removeSelectedImage} 
                                />
                            )}
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}