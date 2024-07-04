
export const newTokenRequest = async () => {
    try {
        const tokenRequest = await fetch("https://opentdb.com/api_token.php?command=request");
        if (!tokenRequest.response_code === 0) {
            throw new Error(`HTTP error!`);
        }
        const response = await tokenRequest.json();
        return response.token;

    } catch (error) {
        console.error("Error fetching request:", error);
        throw error;
    }
}

export const fetchRequest = async (url) => {
    try {
        const request = await fetch(url);
        const response = await request.json();
        return response;

    } catch(error){
        console.error("Error fetching request:", error);
        throw error;
      }
}
