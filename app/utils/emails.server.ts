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
    text: `Please click the following link: ${baseUrl}/verifyEmail?verifyToken=${sendToAddress}:${signature}`,
    html: `<p>Please click the following link: ${baseUrl}/verifyEmail?verifyToken=${sendToAddress}:${signature}</p>`
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

export const sendCancellationEmail = async () => {
  
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