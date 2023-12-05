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

export default getFetchData;