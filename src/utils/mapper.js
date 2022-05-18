export const mapper = (arrayAdd, arrayExisted = []) => {
    return [
        ...arrayExisted,
        ...arrayAdd.map(({ id, webformatURL, largeImageURL, tags }) => ({
            "id": id.toString(), "webformatURL": webformatURL, "largeImageURL": largeImageURL, "tags": tags
        }))
    ]
}