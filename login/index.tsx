"use client";
import React, { useState } from 'react';;
import { useForm } from 'react-hook-form';
import apiUser from '@/api/users/user';
import token from '@/utils/Token';
import { useRouter } from "next/router";

import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaRegEnvelope,
} from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

interface LoginFormInputs {
  username: string;
  password: string;
}
export default function Login() {
 const router = useRouter();
  const handleSignupClick = () => {
    router.push('/signup');
  };

 
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [bg] = useState("bg-main");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data : LoginFormInputs) => {
    try {
      const res = await apiUser.login(data);
      if (token.isJWT(res)) {
        setTimeout(() => {
          router.push('/') //Lien vers quelque chose
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
      <main className="main-container">
        <div className="card-container">
          <div className="card-left">
            <div className="card-left-inner">
              <h2 className="title">Sign in to Account</h2>
              <div className="border-title"></div>
              <div className="icon-container">
                <a href="#" className="icon">
                  <FaFacebookF className="text-sm" />
                </a>
                <a href="#" className="icon">
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a href="#" className="icon">
                  <FaGoogle className="text-sm" />
                </a>
              </div>
              <p className="subtitle">Or use your email account</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="form-container">
                  <div className={`input-container ${errors.username ? 'input-error' : ''}`}>
                    <FaRegEnvelope className="text-gray-400 m-2 text-black" />
                    <input
                      type='text'
                      id='email'
                      name='email'
                      placeholder='Username'
                      className="input"
                      {...register("username")}
                    />
                  </div>
                  <div className={`input-container ${errors.password ? 'input-error' : ''}`}>
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type='password'
                      id='password'
                      name='password'
                      placeholder='Password'
                      className="input"
                      {...register("password")}
                    />
                  </div>
                  <div className="link-container">
                    <label className='flex- items-center text-xl'></label>
                    <a href='/forgot-password' className='text-x5'>Don&apos;t have an account?</a>
                  </div>
                  <button type="submit" className="button">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="card-right">
            <h2 className="card-right-title">Hello, Friend</h2>
            <div className="card-right-border"></div>
            <p className="card-right-subtitle">Welcome to CarHub</p>
            <button
              type='button'
            
              className="button_signup"
            onClick={handleSignupClick}>
              Sign Up
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
