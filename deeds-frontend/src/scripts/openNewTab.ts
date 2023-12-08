const openNewTab = (url: string): Window | undefined => {
    const newPage = window.open(url, '_blank');
    if(!newPage) return;
    newPage.focus();
    return newPage;
};

export default openNewTab;