"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  carId: z.number().min(1, 'Car ID is required'),
  name: z.string().min(1, 'Name is required'),
  firstName: z.string().min(1, 'First Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
  contact: z.string().min(1, 'Contact is required'),
  appointmentDate: z.string().min(1, 'Appointment Date is required'),
  status: z.enum(['pending', 'validated', 'rejected', 'archived']),
});

type FormData = z.infer<typeof schema>;

const AppointmentForm: React.FC = () => {
  let carId = "Select car";
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("carId");
    carId = id ? id : "Select car";
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form Data:', data);
    alert('Appointment created successfully');
    window.location.href = 'http://localhost:3000/client';
  };

  return (
    <div className="min-h-screen flex-center bg-white-100">
      <div className="appointment-form-container">
        <h2 className="appointment-form-title">Create Appointment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
          <div className="appointment-form-grid">
            <div className="form-group">
              <label htmlFor="carId" className="form-label">Car</label>
              <select 
                id="carId" 
                {...register('carId', { valueAsNumber: true })} 
                className="form-input"
              >
                <option value={carId}>{carId}</option>
                <option value={1}>Brand1 Model1</option>
                <option value={2}>Brand2 Model2</option>
                <option value={3}>Brand3 Model3</option>
              </select>
              {errors.carId && <p className="form-error">{errors.carId.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                id="name" 
                {...register('name')} 
                className="form-input" 
              />
              {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                {...register('firstName')} 
                className="form-input" 
              />
              {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                {...register('email')} 
                className="form-input" 
              />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="contact" className="form-label">Contact</label>
              <input 
                type="text" 
                id="contact" 
                {...register('contact')} 
                className="form-input" 
              />
              {errors.contact && <p className="form-error">{errors.contact.message}</p>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea 
              id="message" 
              {...register('message')} 
              className="form-textarea" 
            ></textarea>
            {errors.message && <p className="form-error">{errors.message.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
            <input 
              type="datetime-local" 
              id="appointmentDate" 
              {...register('appointmentDate')} 
              className="form-input" 
            />
            {errors.appointmentDate && <p className="form-error">{errors.appointmentDate.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="status" className="form-label">Status</label>
            <select 
              id="status" 
              {...register('status')} 
              className="form-input"
            >
              <option value="pending">Pending</option>
              <option value="validated">Validated</option>
              <option value="rejected">Rejected</option>
              <option value="archived">Archived</option>
            </select>
            {errors.status && <p className="form-error">{errors.status.message}</p>}
          </div>
          <button type="submit" className="btn-primary">Create Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
