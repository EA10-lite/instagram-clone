import Image from "next/image";
import Link from 'next/link';

import styles from './suggestion.module.css';

import avatar from '../../assets/profile-picture.jpg';


import { suggestions } from "../../data/suggestions";

export default function Suggestion(){
    return (
        <div className={styles.container}>
            {/* user profile */}
            <div className={styles.details}>
                <div className={styles.avatarContainer}>
                    <Image src={avatar} alt='' className={styles.avatar} width={60} height={60}  />
                </div>
                <div className={styles.info}>
                    <p className={styles.username}> ea10-lite </p>
                    <p className={styles.name}> Chris Manuel </p>
                </div>
            </div>

            {/* suggestions */}
            <div className={styles.topic}>
                <h3> Suggestions For You </h3>
            </div>
            <div className={styles.suggestions}>
                { suggestions.slice(0,5).map(suggestion=> (
                    <div className={styles.flex} key={suggestion.id}>
                        <div className={styles.details}>
                            <div className={styles.imageContainer}>
                                <Image src={suggestion.avatar} alt='' className={styles.img} layout="fill" objectFit="cover" />
                            </div>
                            <Link href={`/${suggestion.id}`}>
                                <a className={styles.username}>
                                    { suggestion.id}
                                </a>
                            </Link>
                        </div>
                        <button type="button"> Follow </button>
                    </div>
                ))}
            </div>
        </div>
    )
}