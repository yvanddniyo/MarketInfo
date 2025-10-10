'use client'

import { CountrySelectField } from '@/components/forms/CountrySelectField'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import SelectField from '@/components/forms/SelectField'
import { Button } from '@/components/ui/button'
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constant'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignUp = () => {
  const { register, handleSubmit, control, formState:{errors, isSubmitting}} = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: 'US',
      investmentGoals: '',
      riskTolerance: '',
      preferredIndustry: ''
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
      <h3 className='form-title'>Sign Up& Personalize</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <InputField 
         name="fullName"
         label="Full Name"
         placeholder="John Doe"
         register= {register}
         error={errors.fullName}
         validation={{ required: 'Full name is required', minLength: 3}}
        />
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

        <CountrySelectField 
         name="country"
         label="Country"
         control={control}
         error = {errors.country}
         required
        />
        
        <SelectField 
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder='Select your risk level'
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        <SelectField 
          name="investmentGoals"
          label="Investment Goals"
          placeholder='Select Investment Goals'
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />
        <SelectField 
          name="preferredIndustry"
          label="Preferred Industries"
          placeholder='Select your preferred Industry'
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? "Creating account" : "Start Your Investing Journey"}
        </Button>

        <FooterLink 
         text="Already have an account"
         linkText='Sign in'
         href='/sign-in'
        />
      </form>
    </>
  )
}

export default SignUp