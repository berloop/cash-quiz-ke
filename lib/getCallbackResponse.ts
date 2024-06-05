

export const getCallbackResponse = async () => {
    try {
        const response = await fetch('/api/callback'); // Fetch data from the API route
        if (response.ok) {
            const callbackresponse = await response.json();
            console.log(callbackresponse);
            return callbackresponse;

        } else {
            console.error('Error fetching Callback:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching Callback:', error);
        return [];
    }
};




