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