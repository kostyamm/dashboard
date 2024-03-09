export const fetchApi = (path: string, options?: Omit<RequestInit, 'body'> & { body: any }) => {
    const url = `${import.meta.env.VITE_API_URL}${path}`;

    const fetchOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        ...getNormalizedOptions(options),
    };

    return fetch(url, fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json();
        })
        .catch((error) => {
            console.error(error);
            throw new Error(error);
        });
};

const getNormalizedOptions = (options) => {
    if (!options) {
        return {}
    }

    const body = options.body ? JSON.stringify(options.body) : undefined

    return { ...options, body }
}