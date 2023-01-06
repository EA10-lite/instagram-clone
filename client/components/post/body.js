import React from 'react';
import styles from './post.module.css';
import { Image, Video } from "cloudinary-react";

// swiper
import { Swiper, SwiperSlide} from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper';

export default function PostBody({ urls }){
    return (
        <div className={`${styles.content} content`}>
            <Swiper
                slidesPerView={1}
                spaceBetween={37}
                loop={false}
                pagination={{
                    clickable:true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                { urls?.map((url,index)=> (
                    <SwiperSlide key={index}>
                        <div className={styles.post}>
                            <div className={styles.postImgContainer}>
                                { url.media_type === "image" ? <Image 
                                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                                    publicId={url.url}
                                    width={"100%"}
                                    height={"100%"}
                                    crop="scale"
                                /> : 
                                <Video 
                                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                                    publicId={url.url}
                                    width={"100%"}
                                    height={"100%"}
                                    crop="scale"
                                    controls
                                /> }
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}