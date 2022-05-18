// import axios from "axios"
export const http = {
    get(url, errorMessage) {
        return fetch(url).then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(errorMessage));
            }
            return response.json();
        })
    },
    /*  get(url) {
         return axios.get(url);
     }, */
}