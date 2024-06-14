import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import sendEmail from './sendEmail';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof schema>;

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data, event) => {
    const confirmSend = window.confirm("Are you sure you want to send this message?");
    
    if (!confirmSend) {
      return;
    }
  
    sendEmail({
      name: data.name,
      email: data.email,
      message: data.message,
    })
    .then((response:any) => {
      alert("Email sent successfully!");
      console.log('SUCCESS!', response.status, response.text);
    })
    .catch((err:any) => {
      console.log('FAILED...', err);
    });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full m-4 p-6 rounded-lg bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center bg-blue-100">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-semibold">Name</label>
            <input 
             placeholder='Enter Your Name'
              type="text" 
              id="name" 
              {...register('name')} 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold">Email</label>
            <input 
                   placeholder='Enter Your Email'
              type="email" 
              id="email" 
              {...register('email')} 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="mb-1 font-semibold">Message</label>
            <textarea 
                   placeholder='Write Your Message'
              id="message" 
              {...register('message')} 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]" 
            ></textarea>
            {errors.message && <p className="text-red-500">{errors.message.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
