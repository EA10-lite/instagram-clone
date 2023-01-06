import React, { useEffect, useRef } from 'react';
import styles from './modal.module.css';

// components
import User from '../user.js/user';

// icons
import { MdClose } from 'react-icons/md';


export default function FollowingModal({ closeModal, following }){
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
                            <MdClose color="#000" size={24} onClick={closeModal} />
                        </div>
                        <div className={styles.headerItem}> Following </div>
                    </div>

                    <div className={styles.body}>
                        { following.map((user)=> (
                            <User   
                                closeModal={closeModal} 
                                key={user.user_id._id} 
                                user={user.user_id}
                                type="following" 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}