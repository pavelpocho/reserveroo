import sgMail from '@sendgrid/mail';
import { Place } from "~/models/place.server";
import { signMessage } from './signing.server';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendEmailConfirmationEmail = async (sendToAddress: string, baseUrl: string) => {
  let address = 'pavlik.pocho@gmail.com';
  const signature = signMessage(sendToAddress);
  if (process.env.NODE_ENV === 'production') {
    address = sendToAddress;
  }
  const msg = {
    to: address,
    from: {
      name: 'Reserveroo Security',
      email: 'security@reserveroo.com'
    },
    subject: 'Reserveroo Email Verification',
    text: `
      We need to make sure you used a real email address to sign up. Please click the following link to get back to Reserveroo and confirm your email.
      ${baseUrl}/verifyEmail?verifyToken=${sendToAddress}:${signature}
    `,
    html: `
      <head>
        <!--[if (gte mso 9)|(IE)]><!-->
        <link rel="preconnect" href="https://fonts.googleapis.com"></link> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap" rel="stylesheet"></link>
        <!--<![endif]-->
      </head>
      <body>
        <div style="height: 6rem;width: 100%;box-sizing:border-box;background-color: #2E294E;border-radius: 0.5rem;display: flex; justify-content: space-between; align-items: center;padding: 0rem 1rem">
          <p style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;color: white;">Please Verify Your Email</p>
          <p style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;background-color: white;color: black;border-radius: 0.25rem;padding: 0.5rem;">Reserveroo</p>
        </div>
        <div style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 2rem auto;border-radius: 0.5rem;width: 100%;max-width: 570px;background-color: #F2F2F8;padding: 2rem;">
          <p>We need to make sure you used a real email address to sign up. Please click to button bellow to get back to Reserveroo and confirm your email.</p>
          <a style="background-color: #ACC196;display: flex;justify-content: center;align-items: center;gap: 1rem;width: 10rem;height: 2rem;padding: 0.5rem 0.5rem;text-align: center;line-height: 1.5rem;margin: 0 auto;border-radius: 0.25rem;" href="${baseUrl}/verifyEmail?verifyToken=${sendToAddress}:${signature}">
            <p style="color: black;text-decoration: unset;">Verify Email</p>
          </a>
          <p>
            You can also click or copy this loong link:
            <a style="font-size: 0.8rem;white-space: pre-wrap;white-space: -moz-pre-wrap !important;white-space: -pre-wrap;white-space: -o-pre-wrap;white-space: pre-wrap;word-wrap: break-word;word-break: break-all;white-space: normal;" href="${baseUrl}/verifyEmail?verifyToken=${sendToAddress}:${signature}">
            ${baseUrl}/verifyEmail?verifyToken=${sendToAddress}:${signature}
            </a>
          </p>
        </div>
      </body>
    `
  }
  await sgMail.send(msg);
}

export const sendPwdResetEmail = async (sendToAddress: string, baseUrl: string, username: string) => {
  let address = 'pavlik.pocho@gmail.com';
  const signature = signMessage(username);
  if (process.env.NODE_ENV === 'production') {
    address = sendToAddress;
  }
  const msg = {
    to: address,
    from: {
      name: 'Reserveroo Security',
      email: 'security@reserveroo.com'
    },
    subject: 'Reserveroo Password Reset',
    text: `Please click the following link: ${baseUrl}/pwd/reset?token=${username}:${signature}`,
    html: `<p>Please click the following link: ${baseUrl}/pwd/reset?token=${username}:${signature}</p>`
  }
  await sgMail.send(msg);
}

export const sendCreationEmail = async (sendToAddress: string) => {
  if (sendToAddress == '') return;
  let address = 'pavlik.pocho@gmail.com';
  if (process.env.NODE_ENV === 'production') {
    address = sendToAddress;
  }
  const msg = {
    to: address,
    from: {
      name: 'Reserveroo Info',
      email: 'info@reserveroo.com'
    },
    subject: `Reservation created`,
    text: `Thanks for making a reservation. We will let you know if your chosen time is free ASAP.`,
    html: `<p>Thanks for making a reservation. We will let you know if your chosen time is free ASAP.</p>`
  }
  await sgMail.send(msg);
}

export const sendCancellationEmail = async (sendToAddress: string) => {
  if (sendToAddress == '') return;
  let address = 'pavlik.pocho@gmail.com';
  if (process.env.NODE_ENV === 'production') {
    address = sendToAddress;
  }
  const msg = {
    to: address,
    from: {
      name: 'Reserveroo Info',
      email: 'info@reserveroo.com'
    },
    subject: `Reservation cancelled`,
    text: `You cancelled your reservaiton successfuly. Thank you for giving us a shot! We appreciate it. :)`,
    html: `<p>You cancelled your reservaiton successfuly. Thank you for giving us a shot! We appreciate it. :)</p>`
  }
  await sgMail.send(msg);
}

export const sendStatusUpdateEmail = async (sendToAddress: string, status: 'confirm_preferred' | 'unavailable' | 'confirm_backup', place: Place, start: Date) => {
  if (sendToAddress == '') return;
  let address = 'pavlik.pocho@gmail.com';
  if (process.env.NODE_ENV === 'production') {
    address = sendToAddress;
  }
  const msg = {
    to: address,
    from: {
      name: 'Reserveroo Info',
      email: 'info@reserveroo.com'
    },
    subject: status == 'confirm_preferred' ? `Reservation Confirmed` : status == 'confirm_backup' ? `Backup Confirmed` : 'Reservation Time Unavailable',
    text: status == 'confirm_preferred' ? (
      `Your time is available and confirmed. The fun is looking forward to you!`
    ) : status == 'confirm_backup' ? (
      `Your preffered slot was not available, but your backup was free! The fun is looking forward to you!`
    ) : status == 'unavailable' ? (
      `Unfortunately, your selected time(s) wasn't/weren't available. Feel free to go for another time though!`
    ) : '',
    html: status == 'confirm_preferred' ? (
      `<p>Your time is available and confirmed. The fun is looking forward to you!</p>`
    ) : status == 'confirm_backup' ? (
      `<p>Your preffered slot was not available, but your backup was free! The fun is looking forward to you!</p>`
    ) : status == 'unavailable' ? (
      `<p>Unfortunately, your selected time(s) wasn't/weren't available. Feel free to go for another time though!</p>`
    ) : '',
  }
  await sgMail.send(msg);
}