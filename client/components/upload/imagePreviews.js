import React, { useState, useEffect } from "react";
import styles from './upload.module.css';

// components
import ImagePreview from "./ImagePreview";

const ImagePreviews = ({ file_previews, media_urls, removeSelectedImage }) => {
    const [ current_file, set_current_file ] = useState(file_previews[0]);

    // const handlePreviewChange = (item)=> set_current_file(item);

    useEffect(()=> {
        set_current_file(file_previews[file_previews.length - 1]);
    },[removeSelectedImage]);

    return (
    <div className={styles.imagePreviews}>
        <div className={styles.imagePreviewContainer}>
            <ImagePreview media_url={current_file} type={media_urls[media_urls.length - 1].type} />
        </div>
        <div className={styles.images}>
            { file_previews.map((file, index)=> (
                <div className={styles.image} key={index} >
                    <ImagePreview 
                        media_url={file} 
                        index={index}
                        removeSelectedImage={removeSelectedImage} 
                        type={media_urls[index].type}
                    />
                </div>
            ))}
        </div>
    </div>
)};

export default ImagePreviews;