import { useState, useRef, useContext } from "react";
import toast from 'react-hot-toast';
import styles from './post.module.css';

// components
import CommentInputField from './commentInput';
import PostHeader from "./header";
import PostBody from "./body";
import PostFooter from "./footer";

// context
import { UserContext } from "../../context/user";

// utils
import posts from "../../api/posts";

export default function Post({ 
    decrease_likes,
    item, 
    increase_likes,
    update_comment, 
}){
    const { user_data: user } = useContext(UserContext);
    const [ comment, set_comment ] = useState('');
    const modalRef = useRef();

    const [ loading, set_loading ] = useState(false);
    const handle_submit = async (e)=> {
        e.preventDefault();
        set_loading(true);
        try { 
            await posts.add_comment({ comment, postId: item._id, });
            set_comment('');
            update_comment(item._id, { comment, comment_by: { 
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

    const like_post = async ()=> {
        try {
            await posts.like_post(item._id);
            increase_likes(item._id, { like_by: user?._id })
        } catch (error) {
            
        }
    }

    const unlike_post = async () => {
        try {
            await posts.unlike_post(item._id);
            decrease_likes(item._id, user?._id);
        } catch (error) {
            
        }
    }

    return (
        <div className={styles.postContainer}>
            <div className={styles.postHeader}>
                <PostHeader 
                    post={item}
                    modalRef={modalRef}
                    id={item._id}
                    user={item.postedBy}
                />
            </div>

            <div className={styles.body}>
                <PostBody 
                    urls={item.media}
                />
            </div>

            <div className={styles.footer}>
                <PostFooter 
                    item={item} 
                    like_post={like_post}
                    unlike_post={unlike_post}
                />

                <div className={styles.date}>
                    <span> { new Date(item.createdAt).toDateString()} </span>
                </div>

                <CommentInputField
                    handle_submit={handle_submit}
                    set_comment={set_comment}
                    comment={comment} 
                    loading={loading}
                />
            </div>
        </div>
    )
}