import React from "react";
import Image from "next/image";
import styles from './splash.module.css';

import logo from '../../assets/instagram-logo.png';
import meta from '../../assets/meta-logo.png';

export default function(){
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image src={logo} alt="Instagram logo" width={64} height={64} layout="fixed" />
            </div>

            <div className={styles.bottom}>

            </div>
        </div>
    )
}