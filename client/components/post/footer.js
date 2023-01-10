import React, { useContext } from "react";
import Link from "next/link";
import styles from './post.module.css';

// icons
import { BsChat } from 'react-icons/bs';
import { FiSend } from "react-icons/fi";
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { UserContext } from "../../context/user";

export default function PostFooter({ item, like_post, unlike_post }){
    const { user_data: user }  = useContext(UserContext);
    const is_liked = item.likes.find(item=> item.like_by == user?._id);

    return (
        <>
            <div className={styles.top}>

                <div className={styles.left}>
                    <div className={styles.iconContainer}>
                        { is_liked && <IoMdHeart color="#ed4956" className={styles.icon} onClick={unlike_post} /> }
                        { !is_liked && <IoMdHeartEmpty className={styles.icon} onClick={like_post} /> }
                    </div>
                    <div className={styles.iconContainer}>
                        <BsChat className={`${styles.icon} ${styles.transform}`} />
                    </div>
                    <div className={styles.lastIconContainer}>
                        <FiSend className={`${styles.icon}`} />
                    </div>
                </div>
            </div>

            <div className={styles.postContent}>
                { item.likes.length > 0 && <span className={styles.posterName}> { item.likes.length } likes </span> }
                { item.caption && <div className={styles.title}> 
                    <Link href={`/user/${item.posted_by.username}`}>
                        <a className={styles.posterName}> { item.posted_by.username } </a>
                    </Link>
                    <span className={ styles.text }> { item.caption } </span>
                </div> }
                {item.comments.length > 0 && <div className={styles.commentSection}>
                    {item.comments.length > 1 && (
                        <Link href={`/post/${item._id}`}>
                            <a className={styles.label}> View all { item.comments.length } comments </a>
                        </Link>  
                    )} 
                    <div className={styles.comment}>
                        <Link href={`/user/${item.comments[item.comments.length - 1].commentBy.username}`}>
                            <a className={styles.posterName}>{ item.comments[item.comments.length - 1].commentBy.username } </a>
                        </Link>
                        <span className={styles.text}> { item.comments[item.comments.length - 1].comment} </span>
                    </div>   
                </div>}
            </div>
        </>
    )
}