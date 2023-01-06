import React, { useEffect, useRef } from 'react';
import styles from './modal.module.css';

// components
import User from '../user.js/user';

// icons
import { MdClose } from 'react-icons/md';

// data

export default function FollowersModal({ closeModal, followers }){
    const modalRef = useRef();

    useEffect(()=>{
        const container = document.querySelector("#container");
        container.addEventListener("click",e=>{
            if(modalRef.current && !modalRef.current.contains(e.target)){
                closeModal();
            }
        })
    },[]);

    return (
        <div className={styles.modalContainer} id="container">
            <div className={styles.overlay}>
                <div className={styles.content} ref={modalRef}>
                    <div className={styles.header}>
                        <div className={styles.closeIconContainer}>
                            <MdClose color="#000" size={30} onClick={closeModal} />
                        </div>
                        <div className={styles.headerItem}> Followers </div>
                    </div>

                    <div className={styles.body}>
                        { followers.map((user)=> (
                            <User 
                                closeModal={closeModal} 
                                key={user.user_id._id} 
                                user={user.user_id} 
                                type="followers"
                            /> 
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}