import axios from "axios";
import { API_BASE } from "../config";
import useSwr, { useSWRConfig } from 'swr';

export const useSwrForReviews = (...args) => {
    const { cache } = useSWRConfig();
    const [url] = args
    const options = {
        baseURL: API_BASE,
        url
    };
    const fetcher = async () => {
        const { data } = await axios(options)
        return data
    }
    const { data: result, error } = useSwr(url, fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount: !cache.has(url),
        revalidateOnReconnect: false,
        revalidate:600000 // 10 minutes

    })
    return {
        result,
        isLoading: !error && !result,
        isError: error
    }
}

export const useSwrForQuestions = (...args) => {
    const { cache } = useSWRConfig();
    const [url] = args
    const options = {
        baseURL: API_BASE,
        url,
    };
    const fetcher = async () => {
        const { data } = await axios(options)
        return data
    }
    const { data: result, error } = useSwr(url, fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount: !cache.has(url),
        revalidateOnReconnect: false,
        revalidate:600000 // 10 minutes
    })
    return {
        result,
        isLoading: !error && !result,
        isError: error
    }
}


