import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './post.module.css';

// icon
import { MdAccountCircle } from 'react-icons/md';

export default function PostComment({ comment }){
    return (
        <div className={styles.comment}>
            <div className={styles.imageContainer}>
                { comment.comment_by.avatar && <Image 
                    src={comment?.comment_by?.avatar}
                    alt={comment?.comment_by?.username}
                    objectFit="cover"
                    layout='fill'
                /> }
                { !comment.comment_by.avatar && <MdAccountCircle size="36" /> }
            </div>
            <div className={styles.text}>
                <Link href={`/user/${comment.comment_by.username}`}>
                    <a className={styles.username}> { comment.comment_by.username } </a>
                </Link>
                <span> { comment.comment } </span>
            </div>
        </div>
    )
}