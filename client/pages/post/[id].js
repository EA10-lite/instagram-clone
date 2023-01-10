import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/post-details.module.css';

// components
import Caption from '../../components/post/caption';
import Card from '../../components/card/card';
import CommentInputField from '../../components/post/commentInput';
import Error from '../../components/error/error';
import Loading from '../../components/loading/loading';
import PostComment from "../../components/post/comment";
import PostHeader from '../../components/post/header';
import PostBody from '../../components/post/body';

// context
import { UserContext } from '../../context/user';

// icons
import { BsChat } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

// utils
import posts from '../../api/posts';
import useApi from '../../hooks/useApi';
import urls from '../../utils/urls';
import toast from 'react-hot-toast';

export default function PostDetails(){
    const { query } = useRouter();
    const { user_data: user } = useContext(UserContext);

    const url = query.id ? urls.post_url+query.id : undefined;
    const { data, loading: data_loading, error, set_data } = useApi(url);

    // comment
    const [ comment, set_comment ] = useState('');
    const [ loading, set_loading ] = useState(false);

    const update_comment = (item) => {
        let current_post = { ...data };
        current_post.comments.push(item);
        set_data(current_post);
    }

    const post_comment = async (e)=> {
        e.preventDefault();
        set_loading(true);
        try { 
            await posts.add_comment({ comment, postId: data?._id });
            set_comment('');
            update_comment({ comment, commentBy: { 
                avatar: user?.avatar, 
                username: user?.username, 
                _id: user?._id 
            }});
        } catch (error) {
            toast.error("Failed to add Comment");   
        } finally {
            set_loading(false);
        }
    }
    

    // likes 
    let is_liked = data?.likes?.find(like=> like?.likedBy._id === user?._id);

    const update_likes_add = (item) => {
        let current_post = { ...data };
        current_post.likes.push({...item});
        set_data(current_post);
    }

    const update_likes_remove = (userId) => {
        let current_post = { ...data };
        let like_index = current_post.likes.indexOf(current_post.likes.find(likes=> likes.likedBy === userId));
        current_post.likes.splice(like_index,1);
        set_data(current_post);
    }

    const like_post = async ()=> {
        try {
            await posts.like_post(data?._id);
            update_likes_add({ likedBy: { ...user }})
        } catch (error) {
            toast.error("something failed please try again.")
        }
    }

    const unlike_post = async () => {
        try {
            await posts.unlike_post(data?._id);
            update_likes_remove(user?._id);
        } catch (error) {
            toast.error("Something failed, please try again.")
        }
    }

    return (
        <div className={styles.container}>
            { data_loading && <Loading /> }
            { error && <Error message={error} /> }
            
            { data && <div className={styles.detailsContainer}>
                <div className={styles.imageSection}>
                    <PostBody urls={data?.media} />
                </div>
                <div className={styles.header}>
                    <PostHeader 
                        user={data?.postedBy}
                    />
                </div>
                <div className={styles.body}>
                    { data?.post?.caption && <Caption caption={data?.post?.caption} user={data?.post.posted_by} /> }
                    
                    { data?.comments?.map((comment)=> (
                        <PostComment key={comment._id} comment={comment} />
                    ))}
                </div>
                <div className={styles.btnSection}>
                    <div className={styles.icons}>
                        <div className={styles.iconContainer}>
                            { is_liked && <IoMdHeart color="#ed4956" className={styles.icon} onClick={unlike_post} /> }
                            { !is_liked && <IoMdHeartEmpty className={styles.icon} onClick={like_post} /> }
                        </div>
                        <div className={styles.iconContainer}>
                            <BsChat className={`${styles.icon} ${styles.transform}`} />
                        </div>
                        <div className={styles.lastIconContainer}>
                            <FiSend className={`${styles.icon}`} />
                        </div>
                    </div>
                    { data?.likes?.length > 0 && <span className={styles.likes}> { data?.likes.length } likes </span>}
                </div>
                <div className={styles.footer}>
                    <CommentInputField 
                        comment={comment}
                        handle_submit={post_comment}
                        loading={loading}
                        set_comment={set_comment}
                    />
                </div>
            </div> }

            { data && data?.post?.other_posts && <div className={styles.otherPosts}>
                <p className={styles.heading}> Similar Posts from  <Link href={`/user/${data?.post?.posted_by?.username}`}>
                        <a> { data?.post?.posted_by?.username} </a>
                    </Link>  
                </p>
                <div className={styles.cardContainer}>
                    {  data?.post?.other_posts?.map(post=> (
                        <div className={styles.cardItem} key={post.id}>
                            <Card post={post} />
                        </div>
                    ))}
                </div>
            </div> }
        </div>
    )
}
