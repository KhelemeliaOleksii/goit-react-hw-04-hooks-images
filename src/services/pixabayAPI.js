import { http } from './api'


const requestImages = (searchValue, page, per_page = 12) => {
    const BASE_URL = "https://pixabay.com/api/";

    const PIXABAY_KEY = "25644315-7f91ee10a75849531df6442ba";
    // const PER_PAGE = 12;

    const { get } = http;
    const adress = `${BASE_URL}?key=${PIXABAY_KEY}&q=${searchValue}&image_type=photo&per_page=${per_page}&page=${page}`;
    const errorMessage = "Something wrong";

    return get(adress, errorMessage);
}

export const pixabayAPI = {
    requestImages
}