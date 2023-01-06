import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import styles from './user.module.css';

// components
import Loading from '../loading/loading';

// context
import { UserContext } from "../../context/user";

// utils
import userApi from '../../api/user';

export default function User({ user, closeModal, type }){
    const {  query } = useRouter();
    const { user_data } = useContext(UserContext);

    const [ following_current_user, set_following_current_user ] = useState();

    const [ loading, set_loading ] = useState(false);
    const follow = async () => {
        try {
            set_loading(true);
            await userApi.follow(user?._id);
            set_following_current_user(true);
        } catch (error) {
            toast.error("Failed to follow"+user?.username);
        } finally {
            set_loading(false);
        }
        set_following_current_user(true);
    }

    useEffect(()=>{
        if(type === "followers") {
            const is_followed_back = user_data.following.find(data=> data.user_id._id === user._id)
            is_followed_back ? set_following_current_user(true) : null;
        }
    },[user_data])

    return (
        <div className={styles.user}>
            <div className={styles.details}>
                <div className={styles.avatar}>
                    <Image src={user?.avatar} alt={user?.username} width={36} height={36} objectFit="cover" />
                </div>
                <Link href={`/user/${user.username}`}> 
                    <a className={styles.names} onClick={closeModal}>
                        <span className={styles.username}> { user?.username } </span>
                        <span className={styles.name}> { user?.name } </span>
                    </a>
                </Link>
            </div>
            { query.username === user._id && type === "following" && <button type="button" className={styles.btn}> Unfollow </button> }
            { query.username === user._id && following_current_user && <button type="button" className={styles.btn}></button> }
            { query.username !== user._id && <button type="button" className={styles.btn}> Following </button>}
        </div>
    )
}