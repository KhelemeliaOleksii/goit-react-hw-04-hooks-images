export const mapper = (array) => {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
        "id": id.toString(), "webformatURL": webformatURL, "largeImageURL": largeImageURL, "tags": tags
    }));
}
// export const mapper = (arrayAdd, arrayExisted = []) => {
//     return [
//         ...arrayExisted,
//         ...arrayAdd.map(({ id, webformatURL, largeImageURL, tags }) => ({
//             "id": id.toString(), "webformatURL": webformatURL, "largeImageURL": largeImageURL, "tags": tags
//         }))
//     ]
// }