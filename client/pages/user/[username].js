import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../components/profile/profile.module.css';

// components
import Card from '../../components/card/card';
import Error from '../../components/error/error';
import FollowersModal from '../../components/profile/followersModal';
import FollowingModal from '../../components/profile/followingModal';
import Loading from '../../components/loading/loading';
import ProfileHeader from '../../components/profile/header';

// utils
import urls from '../../utils/urls';
import useApi from '../../hooks/useApi';

export default function Profile(){
    const { query } = useRouter();
    const url = query.username ? urls.user_url+query.username : undefined;
    const { data, loading, error } = useApi(url);


    const [ isOpen, setIsOpen ] = useState(false);
    const [ type, setType ] = useState();

    const openModal = (type)=> {
        setIsOpen(true);
        setType(type);
    };
    const closeModal = ()=> {
        setIsOpen(false);
        setType(null);
    }

    return (
        <>
            { data?.user?.followers.length > 0 && isOpen && type==="followers" && <FollowersModal closeModal={closeModal} followers={data?.user.followers} following={data?.user?.following} /> }
            { data?.user?.following.length > 0 && isOpen && type==="following" && <FollowingModal closeModal={closeModal} following={data?.user.following} followers={data?.user?.followers} /> }

            { data && <div className={styles.container}>
                { loading && <Loading /> }
                { error && <Error message={error} /> }

                <div className={styles.header}>
                    <ProfileHeader 
                        data={data} 
                        setType={setType} 
                        openModal={openModal} 
                    />
                </div>
                <p className={styles.label}> Posts from { data?.user?.username } </p>

                <div className={styles.cardContainer}>
                    {data?.posts.map(post=> (
                        <div className={styles.cardItem} key={post._id}>
                            <Card post={post} />
                        </div>
                    ))}
                </div> 
            </div> }
        </>
    )
}
