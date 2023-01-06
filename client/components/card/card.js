import React from 'react';
import Link from 'next/link';
import styles from './card.module.css';
import { Image } from 'cloudinary-react';

// icons
import { FiHeart } from 'react-icons/fi';
import { BsChatFill } from 'react-icons/bs';


export default function Card({ post }){

    return (
        <Link href={`/post/${post._id}`}>
            <a>
                <div className={styles.postImgContainer}>
                    <div className={styles.overlay}>
                        <div className={styles.item}>
                            <div className={styles.likes}>
                                <FiHeart className={styles.like} />
                                <span> { post.likes.length } </span>
                            </div>
                            <div className={styles.comments}>
                                <BsChatFill className={styles.comment} />
                                <span> { post.comments.length } </span>
                            </div>
                        </div>
                    </div>
                    { post.media_urls[0].media_type === "image" ? <Image 
                        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                        publicId={post.media_urls[0].url}
                        width={"100%"}
                        height={"100%"}
                        crop="scale"
                    /> : 
                    <Video 
                        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                        publicId={post.media_urls[0].url}
                        width={"100%"}
                        height={"100%"}
                        crop="scale"
                        controls
                    />}
                </div>
            </a>
        </Link>
    )
}
