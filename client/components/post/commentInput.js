import React from 'react';
import styles from './post.module.css';

export default function CommentInputField({ 
    comment, 
    handle_submit, 
    loading,
    set_comment 
}){
    return (
        <div className={styles.inputField}>
            <form className={styles.commentForm} onSubmit={(e)=> handle_submit(e)}>
                <textarea className={styles.textarea} 
                    placeholder="Add a comment.."
                    onChange={(e)=> set_comment(e.target.value)}
                    value={comment}
                />
                <button 
                    type="submit" 
                    className={`${styles.postBtn} ${comment.length && styles.activePostBtn}`}
                    disabled={comment.length > 0 || loading ? false : true }
                > { loading ? "Posting..." : "Post" } </button>
            </form>
        </div>
    )
}