export const fetchApi = <T>(path: string, options) => {
    const url = `${import.meta.env.VITE_API_URL}${path}`

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }

            return response.json<{ data: T }>()
        })
        .catch((error) => {
            console.error(error);
            throw new Error(error)
        })
}
