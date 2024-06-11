"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import apiUser from '@/api/users/user';
import token from '@/utils/Token'
import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaRegEnvelope,
} from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [bg] = useState("flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100");
  const [errorMessage, setErrorMessage] = useState("");


  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await apiUser.login(data);
      if (token.isJWT(res)) {
        setTimeout(() => {
          router.push('/'); //lien vers dashboard peut etre
        }, 1000);
      } else {
        setErrorMessage("Username or password not valid");
        setTimeout(() => {
          setErrorMessage("");
        }, 500);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={bg}>
      <main className='flex flex-col items-center justify-center w-full flex-1 px-4 md:px-8 lg:px-16 xl:px-32 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl'>
          <div className="md:w-3/5 p-5">
            <div className="py-10">
              <h2 className="text-3xl font-bold text-blue-500 mb-2">Sign in to Account</h2>
              <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a href="#" className="border-2 border-blue-500 rounded-full text-blue-500 p-3 mx-1 transition duration-300 ease-in-out transform hover:scale-110">
                  <FaFacebookF className="text-sm" />
                </a>
                <a href="#" className="border-2 border-blue-500 rounded-full text-blue-500 p-3 mx-1 transition duration-300 ease-in-out transform hover:scale-110">
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a href="#" className="border-2 border-blue-500 rounded-full text-blue-500 p-3 mx-1 transition duration-300 ease-in-out transform hover:scale-110">
                  <FaGoogle className="text-sm" />
                </a>
              </div>
              <p className='text-gray-400 my-3'>Or use your email account</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                {errorMessage && <p className="text-red-500 my-3">{errorMessage}</p>}
                <div className='flex flex-col items-center'>
                  <div className={`bg-gray-100 w-64 p-2 flex items-center mb-3 ${errors.username ? 'border-red-500' : ''}`}>
                    <FaRegEnvelope className="text-gray-400 m-2 text-black" />
                    <input
                      type='text'
                      id='email'
                      name='email'
                      placeholder='Username'
                      className='bg-gray-100 outline-none text-sm flex-1 text-black'
                      {...register("username")}
                    />
                  </div>
                  <div className={`bg-gray-100 w-64 p-2 flex items-center mb-3 ${errors.password ? 'border-red-500' : ''}`}>
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type='password'
                      id='password'
                      name='password'
                      placeholder='Password'
                      className='bg-gray-100 outline-none text-sm flex-1 text-black'
                      {...register("password")}
                    />
                  </div>
                  <div className='flex justify-between w-64 mb-5'>
                    <label className='flex- items-center text-xl'></label>
                    <a href='/forgot-password' className='text-x5'>Don&apos;t have an account?</a>
                  </div>
                  <button
                    type="submit"
                    className="border-blue-500 text-blue-500 border-2 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="md:w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-bl-2xl py-12 px-6 md:py-24 md:px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Welcome to Car</p>
          </div>
        </div>
      </main>
    </div>
  );
}
