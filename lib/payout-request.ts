import axios from 'axios';

// Define the SOAP endpoint URL
const soapEndpoint = 'http://ws.marblegold.co.za/SmartloadGateway.asmx';

// Define SOAP headers
const soapHeaders = {
    'Content-Type': 'text/xml; charset=utf-8',
    'SOAPAction': 'http://tempuri.org/ProductRequest', // Replace with the appropriate SOAPAction
};

export async function makeProductRequest(
    authtoken: string,
    type: string,
    reference: string,
    recipientnumber: string,
    denomination: number
): Promise<any> {
    // Construct the SOAP request for product request using the provided parameters
    const soapRequest = `
    <!-- Construct your SOAP request for product request here using the parameters -->
  `;

    try {
        const response = await axios.post<string>(soapEndpoint, soapRequest, {
            headers: {
                ...soapHeaders,
                'Authorization': `Bearer ${authtoken}`, // Add the token to the SOAP headers
            },
        });

        // Parse and process the product request response as needed
        return response.data;
    } catch (error) {
        console.error('Error making product request SOAP request:', error);
        return null;
    }
}
