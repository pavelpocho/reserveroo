import sgMail from '@sendgrid/mail';
import { Place } from "~/models/place.server";
import { ReservableWithCountForEmail } from '~/types/types';
import { getStringDateValue, getStringTimeValue } from './forms';
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
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap" rel="stylesheet"></link>
    <!--<![endif]-->
  </head>
  <body>
    <table style="background-color: #2E294E;width: 100%; padding: 24px; border-radius: 8px;">
      <tr>
        <td>
          <p style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;color: white;">Please Verify Your Email</p>
        </td>
        <td style="width: 80px">
          <p style="font-weight: 700; font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;background-color: white;color: black;border-radius: 4px;padding: 8px;">Reserveroo</p>
        </td>
      </tr>
    </table>
    <table style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;background-color: #F2F2F8; width: 100%; margin: 30px auto; max-width: 572px; padding: 24px; border-radius: 8px">
      <tr>
        <td style="padding-bottom: 32px;">
        <p>You received this email because you or someone else tried to create a Reserveroo account with your email address. If this wasn't you, you can disregard this email and we will delete your address from our database. If you did this, we need to make sure you used your actual email address to sign up. Please click to button bellow to get back to Reserveroo and confirm your email.</p>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 32px; text-align: center;">
          <a style="color: black; padding: 16px 24px; text-decoration: none; background-color: #ACC196; width: 160px; height: 32px; text-align: center; line-height: 24px; margin: 0 auto; border-radius: 4px;" href="${baseUrl}/verifyEmail?verifyToken=${sendToAddress}:${signature}">
            Verify Email
          </a>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            You can also click or copy this loong link:
            <a style="font-size: 13px;white-space: pre-wrap;white-space: -moz-pre-wrap !important;white-space: -pre-wrap;white-space: -o-pre-wrap;white-space: pre-wrap;word-wrap: break-word;word-break: break-all;white-space: normal;" href="${baseUrl}/verifyEmail?verifyToken=${sendToAddress}:${signature}">
            ${baseUrl}/verifyEmail?verifyToken=${sendToAddress}:${signature}
            </a>
          </p>
        </td>
      </tr>
    </div>
  </body>
    `
  }
  if (baseUrl.includes('localhost')) {
    console.log('Email link');
    console.log(`${baseUrl}/verifyEmail?verifyToken=${sendToAddress}:${signature}`);
  }
  else {
    await sgMail.send(msg);
  }
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
    html: `
    <head>
      <!--[if (gte mso 9)|(IE)]><!-->
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap" rel="stylesheet"></link>
      <!--<![endif]-->
    </head>
    <body>
      <table style="background-color: #2E294E;width: 100%; padding: 24px; border-radius: 8px;">
        <tr>
          <td>
            <p style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;color: white;">Password Reset Link</p>
          </td>
          <td style="width: 80px">
            <p style="font-weight: 700; font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;background-color: white;color: black;border-radius: 4px;padding: 8px;">Reserveroo</p>
          </td>
        </tr>
      </table>
      <table style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;background-color: #F2F2F8; width: 100%; margin: 30px auto; max-width: 572px; padding: 24px; border-radius: 8px">
        <tr>
          <td style="padding-bottom: 32px;">
            <p>You received this email because somebody tried to reset your Reserveroo account password. If this wasn't you, you can safely disregard this email. Otherwise, click the link below to reset your password.</p>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 32px; text-align: center;">
            <a style="color: black; padding: 16px 24px; text-decoration: none; background-color: #ACC196; width: 160px; height: 32px; text-align: center; line-height: 24px; margin: 0 auto; border-radius: 4px;" href="${baseUrl}/pwd/reset?token=${username}:${signature}">
              Reset password
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              You can also click or copy this loong link:
              <a style="font-size: 13px;white-space: pre-wrap;white-space: -moz-pre-wrap !important;white-space: -pre-wrap;white-space: -o-pre-wrap;white-space: pre-wrap;word-wrap: break-word;word-break: break-all;white-space: normal;" href="${baseUrl}/pwd/reset?token=${username}:${signature}">
              ${baseUrl}/pwd/reset?token=${username}:${signature}
              </a>
            </p>
          </td>
        </tr>
      </div>
    </body>  
    `
  }
  if (baseUrl.includes('localhost')) {
    console.log('Email link');
    console.log(`${baseUrl}/pwd/reset?token=${username}:${signature}`);
  }
  else {
    await sgMail.send(msg);
  }
}

export const sendCreationEmail = async (baseUrl: string, sendToAddress: string, placeName: string, slots: ReservableWithCountForEmail[]) => {
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
    html: `
    <head>
      <!--[if (gte mso 9)|(IE)]><!-->
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap" rel="stylesheet"></link>
      <!--<![endif]-->
    </head>
    <body>
      <table style="background-color: #2E294E;width: 100%; padding: 24px; border-radius: 8px;">
        <tr>
          <td>
            <p style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;color: white;">We've got your reservation.</p>
          </td>
          <td style="width: 80px">
            <p style="font-weight: bold, font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;background-color: white;color: black;border-radius: 4px;padding: 8px;">Reserveroo</p>
          </td>
        </tr>
      </table>
      <table style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif; margin: 30px auto 0px; background-color: #F2F2F8; width: 100%; max-width: 572px; padding: 24px; border-top-left-radius: 8px; border-top-right-radius: 8px">
        <tr>
          <td style="padding-bottom: 32px; text-align: center; font-weight: 700; color: red">We will try to confirm your reservation as soon as possible.</td>
        </tr>
        <tr>
          <td style="padding-bottom: 16px; text-align: center; font-weight: 700">Thank you for using Reserveroo! We received your request. To see more information about your reservation, please visit your profile page.</td>
        </tr>
        <tr>
          <td style="font-size: 20px; font-weight: 700">Reservation details</td>
        </tr>
      </table>
      <table style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif; margin: 0px auto 30px; background-color: #F2F2F8; width: 100%; max-width: 572px; padding: 0px 24px 0px 24px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px">
        <tr>
          <td style="vertical-align: middle; font-size: 13px; padding-bottom: 24px">Place name</td>
          <td style="vertical-align: middle; font-weight: 700; padding-bottom: 24px;text-align: end">${placeName}</td>
        </tr>
        <tr>
          <td style="vertical-align: middle; font-size: 13px; padding-bottom: 24px">What is booked?</td>
          <td style="vertical-align: middle; font-weight: 700; padding-bottom: 24px; text-align: end">${slots.map(s => s.amount + 'x ' + s.type).join(', ')}</td>
        </tr>
      </table>
    </body>
  
    `
  }

  const usMsg = {
    to: ['pavlik.pocho@gmail.com', 'loskotaklp@gmail.com', 'tomasekerbenu@gmail.com'],
    from: {
      name: 'Reserveroo Info',
      email: 'info@reserveroo.com'
    },
    subject: `Reservation created`,
    text: `Someone just created a reservation. Go complete it!`,
    html: `<p>Someone just created a reservation. Go complete it!</p>`
  }
  
  if (baseUrl.includes('localhost')) {
    console.log('Creation email would be sent');
  }
  else {
    await sgMail.send(msg);
    await sgMail.send(usMsg);
  }
}

export const sendCancellationEmail = async (baseUrl: string, sendToAddress: string, placeName: string, slots: ReservableWithCountForEmail[]) => {
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
    html: `
      <head>
        <!--[if (gte mso 9)|(IE)]><!-->
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap" rel="stylesheet"></link>
        <!--<![endif]-->
      </head>
      <body>
        <table style="background-color: #2E294E;width: 100%; padding: 24px; border-radius: 8px;">
          <tr>
            <td>
              <p style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;color: white;">Reservation cancelled.</p>
            </td>
            <td style="width: 80px">
              <p style="font-weight: 700; font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;background-color: white;color: black;border-radius: 4px;padding: 8px;">Reserveroo</p>
            </td>
          </tr>
        </table>
        <table style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif; margin: 30px auto 0px; background-color: #F2F2F8; width: 100%; max-width: 572px; padding: 24px; border-top-left-radius: 8px; border-top-right-radius: 8px">
          <tr>
            <td style="padding-bottom: 16px; text-align: center; font-weight: 700">You successfuly cancelled your reservation. Thanks for giving us a shot!</td>
          </tr>
        </table>
        <table style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif; margin: 0px auto 30px; background-color: #F2F2F8; width: 100%; max-width: 572px; padding: 0px 24px 0px 24px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px">
          <tr>
            <td style="vertical-align: middle; font-size: 13px; padding-bottom: 24px">Place name</td>
            <td style="vertical-align: middle; font-weight: 700; padding-bottom: 24px;text-align: end">${placeName}</td>
          </tr>
          <tr>
            <td style="vertical-align: middle; font-size: 13px; padding-bottom: 24px">What was booked?</td>
            <td style="vertical-align: middle; font-weight: 700; padding-bottom: 24px; text-align: end">${slots.map(s => s.amount + 'x ' + s.type).join(', ')}</td>
          </tr>
        </table>
      </body>  
    `
  }

  const usMsg = {
    to: ['pavlik.pocho@gmail.com', 'loskotaklp@gmail.com', 'tomasekerbenu@gmail.com'],
    from: {
      name: 'Reserveroo Info',
      email: 'info@reserveroo.com'
    },
    subject: `Reservation cancelled`,
    text: `Somebody cancelled a reservation. So like maybe go sort it out or smth.`,
    html: `<p>Somebody cancelled a reservation. So like maybe go sort it out or smth.</p>`
  }
  if (baseUrl.includes('localhost')) {
    console.log('Cancellation email would be sent');
  }
  else {
    await sgMail.send(msg);
    await sgMail.send(usMsg);
  }
}

export const sendStatusUpdateEmail = async (baseUrl: string, sendToAddress: string, status: 'confirm_preferred' | 'unavailable' | 'confirm_backup' | string, placeName: string, slots: ReservableWithCountForEmail[]) => {
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
    subject: status == 'confirm_preferred' ? `Reservation Confirmed` : status == 'confirm_backup' ? `Backup Reservation Confirmed` : 'Reservation Time Unavailable',
    text: status == 'confirm_preferred' ? (
      `Your time is available and confirmed. The fun is looking forward to you!`
    ) : status == 'confirm_backup' ? (
      `Your preffered slot was not available, but your backup was free! The fun is looking forward to you!`
    ) : status == 'unavailable' ? (
      `Unfortunately, your timeslot was not available. Feel free to go for another time though!`
    ) : '',
    html: `
      <head>
        <!--[if (gte mso 9)|(IE)]><!-->
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap" rel="stylesheet"></link>
        <!--<![endif]-->
      </head>
      <body>
        <table style="background-color: #2E294E;width: 100%; padding: 24px; border-radius: 8px;">
          <tr>
            <td>
              <p style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;color: white;">Reservation Status Update.</p>
            </td>
            <td style="width: 80px">
              <p style="font-weight: 700; font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;margin: 0;font-size: 22px;background-color: white;color: black;border-radius: 4px;padding: 8px;">Reserveroo</p>
            </td>
          </tr>
        </table>
        <table style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif; margin: 30px auto 0px; background-color: #F2F2F8; width: 100%; max-width: 572px; padding: 24px; border-top-left-radius: 8px; border-top-right-radius: 8px">
          <tr>
            <td style="padding-bottom: 16px; text-align: center; font-weight: 700">${
              status == 'confirm_preferred' ? `Thank you for using Reserveroo! Your time is available and confirmed. Have fun!` :
              status == 'confirm_backup' ? `Your preffered slot was not available, but your backup was free! Have fun!` :
              status == 'unavailable' ? `Unfortunately, your timeslot was not available. Feel free to go for another time though!` : ''
            }</td>
          </tr>
          <tr>
            <td style="padding-bottom: 16px; text-align: center; font-weight: 700">Please check your profile for more information about your reservation.</td>
          </tr>
          <tr>
            <td style="font-size: 20px; font-weight: 700">Reservation details</td>
          </tr>
        </table>
        <table style="font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif; margin: 0px auto 30px; background-color: #F2F2F8; width: 100%; max-width: 572px; padding: 0px 24px 0px 24px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px">
        <tr>
          <td style="vertical-align: middle; font-size: 13px; padding-bottom: 24px">Place name</td>
          <td style="vertical-align: middle; font-weight: 700; padding-bottom: 24px;text-align: end">${placeName}</td>
        </tr>
        <tr>
          <td style="vertical-align: middle; font-size: 13px; padding-bottom: 24px">What is booked?</td>
          <td style="vertical-align: middle; font-weight: 700; padding-bottom: 24px; text-align: end">${slots.map(s => s.amount + 'x ' + s.type).join(', ')}</td>
        </tr>
        </table>
      </body>
    `
  }
  if (baseUrl.includes('localhost')) {
    console.log('Status email would be sent');
  }
  else {
    await sgMail.send(msg);
  }
}