import React from 'react';
import axios from 'axios';
import styles from '../styles/home.module.css';

// components
import Error from '../components/error/error';
import Loading from '../components/loading/loading';
import Post from '../components/post/post';
import Suggestion from '../components/suggestion/suggestion';

// utils
import posts from '../api/posts';
import urls from '../utils/urls';
import useApi from '../hooks/useApi';

export default function Home(){
    const { data: posts, loading, error, set_data } = useApi(urls.post_url);

    const update_comment = (id, item) => {
        let data = [...posts];
        let current_post = posts.find(post=> post._id === id)
        let current_post_index = posts.indexOf(current_post);
        current_post.comments.push({...item});
        data[current_post_index] = current_post;
        set_data(data);
    };

    const increase_likes = (postId,item) => {
        let data = [...posts];
        let current_post = posts.find(post=> post._id === postId);
        let post_index = posts.indexOf(current_post)
        current_post.likes.push({...item});
        data[post_index] = current_post;
        set_data(data);
    };

    const decrease_likes = (postId, userId) => {
        let data = [...posts];
        let current_post = posts.find(post=> post._id === postId);
        let post_index = posts.indexOf(current_post)
        let like_index = current_post.likes.indexOf(current_post.likes.find(likes=> likes.like_by === userId));
        current_post.likes.splice(like_index,1);
        data[post_index] = current_post;
        set_data(data);
    }
 
    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <div className={styles.content}>

                    <div className={styles.left}>

                        { error && <Error message={error} /> }
                        { loading && <Loading /> }

                        {/* post */}
                        { posts && <div className={styles.postContainer}>
                            { posts.map(item=> (
                                <Post 
                                    key={item._id} item={item} set_data={set_data} 
                                    decrease_likes={decrease_likes}
                                    increase_likes={increase_likes}
                                    update_comment={update_comment}
                                />
                            ))}
                        </div>}
                    </div>

                    <div className={styles.right}>

                        {/* suggestions */}
                        <div className={styles.suggestionContainer}>
                            <Suggestion />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}