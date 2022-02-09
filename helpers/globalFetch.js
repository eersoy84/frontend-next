import { API_BASE } from "../config";
import axios from "axios";

const globalFetch = async (url, data = null, params = null) => {
    try {
        const options = {
            baseURL: API_BASE,
            url,
            data,
            params
        };
        const { data: result } = await axios(options)
        return result
    }
    catch (err) {
    }
}
export default globalFetch