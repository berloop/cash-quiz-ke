import axios from "axios";

export async function getToken() {
  try {
    const response = await axios.post('/api/payout');
  
    // Assuming the response contains a JSON object with the token
    const token = response.data.token;
  
    // Now you can use the 'token' in your application as needed
    console.log('Token:', token);
  
    // Return the token or use it for further processing
    return token;
  } catch (error) {
    console.error('Error getting token from STS:', error);
    // Handle errors as needed
    return null;
  }
}
