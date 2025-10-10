'use client'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import { Button } from '@/components/ui/button'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignIn = () => {
    const { register, handleSubmit, formState:{errors, isSubmitting}} = useForm<SignInFormData>({
      defaultValues: {
        email: '',
        password: '',
      },
      mode:'onBlur'
    })
  
    const onSubmit:SubmitHandler<SignInFormData> = async(data) => {
      try{
        console.log("data", data)
      }
      catch(error) {
        console.error(error)
      }
    } 
  return (
    <>
       <h3 className='form-title'>Log In Your Account</h3>
       <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
       <InputField 
         name="email"
         label="Email"
         placeholder="JohnDoe@gmail.com"
         register= {register}
         error={errors.email}
         validation={{ required: 'Email is required', pattern:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/, minLength: 3}}
        />
        <InputField 
         name="password"
         label="Password"
         placeholder="Password"
         register= {register}
         type='password'
         error={errors.password}
         validation={{ required: 'Password is required', minLength: 8}}
        />
           <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? "Logging In" : "Log In"}
        </Button>

        <FooterLink 
         text="You don't have an account"
         linkText='Sign Up'
         href='/sign-up'
        />
       </form>
    </>
  )
}

export default SignIn