import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import Link from 'next/link';
import styles from './post.module.css';

// components
import Modal from './modal';

// icons
import { BsThreeDots } from 'react-icons/bs';

export default function PostHeader({ id, user, modalRef }){
    const [ open, setOpen ] = useState(false);

    return (
        <div className={styles.header}>
            <div className={styles.posterInfo}>
                <div className={styles.avatar}>
                    <Image 
                        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                        publicId={user?.avatar}
                        width={36}
                        height={36}
                        crop="scale" 
                    />
                </div>
                <Link href={`/user/${user?.username}`}>
                    <a className={styles.name}> { user?.username } </a>
                </Link>
            </div>
            <div className={styles.addOn}>
                { modalRef && <BsThreeDots className={styles.menu} onClick={()=> setOpen(true)} /> }
                {  open && <Modal 
                    closeModal={()=> setOpen(false)}
                    id={id} 
                    modalRef={modalRef}
                /> } 
            </div>
        </div>
    )
}