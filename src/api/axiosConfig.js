import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080'
})

export const useAPIClient = () => {
    const get = async (path, opts = {}) => {
        return api.get(path, opts);
    }

    const post = async (path, opts = {}) => {
        return api.post(path, opts);
    }

    return { get, post };
}
