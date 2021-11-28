import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/keys';
const sgMail = require('@sendgrid/mail')

//require('dotenv').config();

@injectable({scope: BindingScope.TRANSIENT})
export class NotificationsService {
  constructor(/* Add @inject to inject parameters */) { }
  /*
   * Add service methods here
   */
  sendEmail(destino: string, asunto: string, contenido: string) {


    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino,
      from: Keys.emailOrigin,
      subject: asunto,
      html: contenido
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }
}
