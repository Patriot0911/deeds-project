
const getFetchData = async (fetchURL: string) => {
    try {
        return await fetch(
            fetchURL,
            {
                cache: 'no-store'
            }
        );
    } catch(error) {
        return undefined;
    };
};

// I am sleepy so it's the best solution I came to

export default getFetchData;