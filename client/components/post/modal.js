import React from "react";
import Link from "next/link";
import styles from './modal.module.css';

const Modal = ({ id, closeModal, modalRef })=> {
    return (
        <div id="modal" className={styles.modal}>
            <div className={styles.overlay} onClick={closeModal}>
                <div className={styles.modalContent} ref={modalRef}>
                    <ul>
                        <li className={styles.item}> Copy Link </li>
                        {id && <li className={styles.item}>
                            <Link href={`/post/${id}`}>
                                <a className={styles.link}> Go to Post </a>
                            </Link>
                        </li>}
                        <li className={`${styles.item} ${styles.cancelBtn}`} onClick={closeModal}> Cancel </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Modal;