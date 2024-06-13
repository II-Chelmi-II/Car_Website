"use client"
import React from "react";
import apiUser from '@/api/users/user';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaRegEnvelope,
} from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
interface SignupFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }


export default function Signup () {
    const router = useRouter();
    const handleLoginClick = () => {
      router.push("/login");
    };
  
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
  const handleSuccess = () => {
    toast.success('Signup successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleError = () => {
    toast.error('Signup failed!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const passError = () => {
    toast.error('Signup failed: passwords do not match!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const onSubmit = async (data:SignupFormInputs) => {
    apiUser.signup(data).then((res) => {
      if (data.password != data.confirmPassword) {
        passError();
      }else if (res == "User created with success") {
        setTimeout(() => {
          handleSuccess();
        }, 900);
        setTimeout(() => {
         
        }, 1400);
      }else{
        setTimeout(() => {
          handleError
        }, 1000);
      }
    });
  };

  return (
    <div className="signup_main_container">
    <main className='signup_card_container'>
      <div className='signup_card_left'>
        <div className="signup_card">
          <div className="signup_card_title">
            <h2 className="signup_h2">Sign up for an Account</h2>
            <div className="signup_div"></div>
            <div className="signup_social-buttons">
              <a href="#" className="signup_social_button">
                <FaFacebookF className="signup_social_icon" />
              </a>
              <a href="#" className="signup_social_button">
                <FaLinkedinIn className="signup_social_icon" />
              </a>
              <a href="#" className="signup_social_button">
                <FaGoogle className="signup_social_icon" />
              </a>
            </div>
            <p className="signup_text">Or use your email account</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="signup_input_container">
                <div className="signup_input_group">
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    className="signup_input_field"
                    {...register("firstName", { required: true })}
                  />
                </div>
                <div className="signup_input_group">
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    className="signup_input_field"
                    {...register("lastName", { required: true })}
                  />
                </div>
                <div className="signup_input_group">
                  <FaRegEnvelope className="signup_input_icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="signup_input_field"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="signup_input_group">
                  <MdLockOutline className="signup_input_icon" />
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="signup_input_field"
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Please enter a password longer than 8 characters"
                      }
                    })}
                  />
                </div>
                <div className="signup_input_group">
                  <MdLockOutline className="signup_input_icon" />
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="signup_input_field"
                    {...register("confirmPassword", {
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Please enter a password longer than 8 characters"
                      }
                    })}
                  />
                </div>
                <button type="submit" className="signup_submit_button">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
        <div className="signup_card_right">
          <h2 className="card_title">Hello, Friend</h2>
          <div className="signup_card_divider"></div>
          <p className="card_text">Welcome to carHub</p>
          <button type="button" className="login_button" onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    </main>
  </div>
  )
};
