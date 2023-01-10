import React from 'react';
import Image from 'next/image';
import styles from './upload.module.css';

// icons
import { MdClose } from "react-icons/md";

const ImagePreview = ({ 
    index=0,
    media_url, 
    removeSelectedImage,
    type, 
})=> {
    return (
        <div className={styles.imagePreview}>
            { removeSelectedImage && <div className={styles.removeImageBtn}>
                <MdClose 
                    size={20} color="#000" 
                    onClick={()=> removeSelectedImage(index)}
                />
            </div> }
            { media_url && <>
             { type.includes("video") ? <>
                <video 
                    src={media_url}
                    controls
                    width={"100%"}
                    height={"100%"}
                    className={styles.video}
                />
            </> : <Image 
                src={media_url} 
                alt='' 
                layout='fill' 
                objectFit='cover' 
            /> } </>}
        </div>
)};

export default ImagePreview;