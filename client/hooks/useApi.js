import { useState, useEffect } from 'react'; 
import { client } from '../api/posts';


const useApi = (url)=> {
    const [ data, set_data ] = useState();
    const [ error, set_error ] = useState();
    const [ loading, set_loading ] = useState(false);

    const request = async (signal) => {
        try {
            set_loading(true);
            const response = await client.get(url, { signal });
            set_data(response.data.data);
        } catch (error) {
            error.response ? set_error(error.response.data.error) : error.code === "ERR_CANCELED" ? set_error(null) : set_error("something failed")
        } finally {
            set_loading(false);
        }
    }

    useEffect(()=> {
        const abortController = new AbortController();
        if(url){
            request(abortController.signal);
        }
        return ()=> abortController.abort();
    },[url])

    return {
        data,
        error,
        loading,
        set_data
    }
}

export default useApi;