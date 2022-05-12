import { SendEmailRequest, SES } from "@aws-sdk/client-ses";


export const sendEmail = async (sendToAddress: string) => {

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw Error("No email credentials");
  }

  const ses = new SES({
    region: 'eu-west-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

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