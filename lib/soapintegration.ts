import axios from 'axios';
import { parseString } from 'xml2js';

// Define the SOAP endpoint URL
const soapEndpoint = 'http://ws.marblegold.co.za/SmartloadGateway.asmx';

// Define SOAP headers
const soapHeaders = {
  'Content-Type': 'text/xml; charset=utf-8',
  'SOAPAction': 'http://tempuri.org/GetToken', // Replace with the appropriate SOAPAction
};



export const soapUsername = '27827719918';
export const soapPin = '0746';

// const soapUsername = process.env.SOAP_USERNAME;
// const soapPin = process.env.SOAP_PIN;

if (!soapUsername || !soapPin) {
  console.error('SOAP username or pin is missing in environment variables.');
  // Handle this error accordingly, e.g., by throwing an error or exiting the application.
}



// Function to send a SOAP request to get a token
export async function getToken(username: string, pin: string): Promise<string | null> {
  const soapRequest = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetToken xmlns="http://tempuri.org/">
          <username>${soapUsername}</username>
          <pin>${soapPin}</pin>
        </GetToken>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const response = await axios.post<string>(soapEndpoint, soapRequest, { headers: soapHeaders });

    // Parse the SOAP response XML to JSON
    return new Promise<string | null>((resolve, reject) => {
      parseString(response.data, (err: any, result: { [x: string]: { [x: string]: { [x: string]: { [x: string]: { [x: string]: any[]; }[]; }[]; }[]; }; }) => {
        if (err) {
          console.error('Error parsing SOAP response:', err);
          reject(err);
        } else {
          // Access the token from the SOAP response JSON
          const token = result['soap:Envelope']['soap:Body'][0]['GetTokenResponse'][0]['GetTokenResult'][0]['token'][0];
          resolve(token);
        }
      });
    });
  } catch (error) {
    console.error('Error sending SOAP request:', error);
    return null;
  }
}
