import React from 'react';
import Image from 'next/image';

import styles from './story.module.css';

// swiper
import { Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper';
import Link from 'next/link';


export default function Story({ stories }){
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                loop={false}
                navigation={true}
                modules={[Navigation]}
                className="storySwiper"
            >
                { stories.map(story=> (
                    <SwiperSlide key={story.id}>
                        <div className={styles.story}>
                            <div className={styles.instaBg}>
                                <div className={styles.bgWhite}>
                                    <div className={styles.storyImageContainer}>
                                        <Image 
                                            src={story.story[0]} alt='' className={styles.img}
                                            layout="fill" objectFit='cover'
                                        />
                                    </div>
                                </div>
                            </div>
                            <Link href={`/${story.id}`}>
                                <a className={styles.username}> {story.id.slice(0,9)}... </a>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}