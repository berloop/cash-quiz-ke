import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { parseString } from 'xml2js';
import { NextResponse } from 'next/server';



export const soapUsername = '27827719918';
export const soapPin = '0746';

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const soapEndpoint = 'http://ws.marblegold.co.za/SmartloadGateway.asmx?op=GetToken';
  const soapHeaders = {
    'SoapAction': '"http://tempuri.org/GetToken"',
    'Content-Type': 'text/xml; charset=utf-8',
  };
  

  const soapXml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetToken xmlns="http://tempuri.org/">
          <username>${soapUsername}</username>
          <pin>${soapPin}</pin>
        </GetToken>
     </soap:Body>
    </soap:Envelope>
  `;
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://ws.marblegold.co.za/SmartloadGateway.asmx?op=GetToken',
    headers: {
      'SoapAction': '"http://tempuri.org/GetToken"',
      'Content-Type': 'text/xml; charset=utf-8',
    },
    data: soapXml,
  };

  if (!soapUsername || !soapPin) {
    return new NextResponse("SOAP username or pin is missing in environment variables.", { status: 500 });
  }

  try {

    const response = await axios.post<string>(soapEndpoint, soapXml, { headers: soapHeaders });
    // const response = await axios.request(config);

    parseString(response.data, (err: any, result: { [x: string]: { [x: string]: { [x: string]: { [x: string]: { [x: string]: any[]; }[]; }[]; }[]; }; }) => {
      if (err) {
        console.error('Error parsing SOAP response:', err);
        return new NextResponse("Error parsing SOAP response.", { status: 500 });

      } else {
        const token = result['soap:Envelope']['soap:Body'][0]['GetTokenResponse'][0]['GetTokenResult'][0]['token'][0];

        return NextResponse.json({ token });
      }

    });

  }
  catch (error) {
    console.error('Error sending SOAP request:');
    return new NextResponse("Error sending SOAP request.", { status: 500 });
  }

}
