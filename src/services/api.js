// import axios from "axios"
export const http = {
    async get(url, errorMessage) {
        const response = await fetch(url);
        if (!response.ok) {
            return Promise.reject(new Error(errorMessage));
        }
        return response.json();
    },
    /*  get(url) {
         return axios.get(url);
     }, */
}
