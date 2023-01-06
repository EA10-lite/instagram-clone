import React from 'react';
import Image from 'next/image';
import styles from './profile.module.css';

export default function ProfileHeader({ data, openModal }){
    return (
        <div className={styles.profileHeader}>
            <div className={styles.left}>
                <div className={styles.profileImgContainer}>
                    <Image src={data?.user?.avatar} alt='profile Picture' layout='fill' objectFit='cover' />
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.flex1}>
                    <h5 className={styles.username}> { data?.user?.username } </h5>
                </div>
                <div className={styles.numbers}>
                    <div>
                        <p><span> { data?.posts?.length } </span> posts </p>
                    </div>
                    <div>
                        <p onClick={()=> openModal("followers")}><span> { data?.user?.followers.length } </span> followers </p>
                    </div>
                    <div>
                        <p onClick={()=> openModal("following")}><span> { data?.user?.following.length } </span> following </p>
                    </div>
                </div>
                <div className={styles.info}>
                    <h5 className={styles.name}> { data?.user.name } </h5>
                </div>
            </div>
        </div>
    )
}