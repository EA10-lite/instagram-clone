import React from "react";
import styles from './loading.module.css';

import { FiLoader } from 'react-icons/fi';

export default function Loading(){
    return (
        <div className={styles.container}>
            <FiLoader 
                className={styles.loaderIcon} 
                color="#818188" 
                size={28} 
            />
        </div>
    )
}