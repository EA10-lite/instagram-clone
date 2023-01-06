import React from "react";
import styles from './error.module.css';

export default function Error({ message }){
    console.log(message);
    return (
        <p className={styles.errorText}> { message || "Something went wrong, couldn't find what you are looking for"} </p> 
    )
} 