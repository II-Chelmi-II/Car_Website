import * as emailjs from '@emailjs/browser'

const accountId = process.env.NEXT_PUBLIC_EMAILJS_ACCOUNT_ID || 'defaultAccountId';
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'defaultServiceId';
const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'defaultTemplateId';
  
export default function sendEmail(params :any): Promise<any>{
   emailjs.init(accountId);   
   return emailjs.send(serviceId,template,params);
}