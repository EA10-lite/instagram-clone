import React from "react";
import Image from 'next/image';
import styles from './post.module.css';

export default function Caption({ caption, user }){
    return (
        <div className={styles.caption}>
            <div className={styles.imageContainer}>
                <Image 
                    src={user?.avatar}
                    alt=''
                    layout="fill"
                />
            </div>
            <p className={styles.text}> { caption } </p>
        </div>
    )
}