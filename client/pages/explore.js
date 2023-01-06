import styles from '../styles/explore.module.css';

// components
import Card from '../components/card/card';
import Error from '../components/error/error';
import Loading from '../components/loading/loading';

// utils
import useApi from '../hooks/useApi';
import urls from '../utils/urls';

export default function Explore(){
    const { data: posts, loading, error } = useApi(urls.explore_endpoint);
    return (
        <div className={styles.container}>
            { loading && <Loading /> }
            { error && <Error message={error} /> }
            <div className={styles.grid}>
                { posts && posts.map(post=> (
                    <div className={styles.gridItem} key={post._id}>
                        <Card post={post} />
                    </div>
                ))}
            </div>
        </div>
    )
}