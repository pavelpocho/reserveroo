import { SendEmailRequest } from "@aws-sdk/client-ses";
import { ses } from "~/db.server";


export const sendEmail = async (sendToAddress: string) => {
  const emailParams: SendEmailRequest = {
    Source: 'reserveroo@reserveroo.com',
    Destination: {
      ToAddresses: [
        // sendToAddress
        'success@simulator.amazonses.com'
      ]
    },
    Message: {
      Subject: {
        Data: 'Reserveroo - Verify Email Address',
        Charset: 'UTF-8'
      },
      Body: {
        Text: {
          Data: 'Click the link to verify: ',
          Charset: 'UTF-8'
        }
      }
    }
  }

  console.log("Email");
  console.log(sendToAddress);
  const response = await ses.sendEmail(emailParams);
  console.log(response);
}