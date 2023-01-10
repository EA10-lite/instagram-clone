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
                { comment.commentBy.avatar && <Image 
                    src={comment?.commentBy?.avatar}
                    alt={comment?.commentBy?.username}
                    objectFit="cover"
                    layout='fixed'
                    width={36}
                    height={36}
                /> }
                { !comment.commentBy.avatar && <MdAccountCircle size="36" /> }
            </div>
            <div className={styles.text}>
                <Link href={`/user/${comment.commentBy.username}`}>
                    <a className={styles.username}> { comment.commentBy.username } </a>
                </Link>
                <span> { comment.comment } </span>
            </div>
        </div>
    )
}