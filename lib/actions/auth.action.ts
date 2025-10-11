'use server'

import { headers } from "next/headers"
import { auth } from "../betterAuth/auth"
import { inngest } from "../inngest/client"

export const signupWithEmail = async({email, password, fullName, preferredIndustry, riskTolerance, investmentGoals}:SignUpFormData) => {
  try{
     const response = await auth.api.signUpEmail({
      body: { email, name: fullName, password}
     })

     if(response) {
      await inngest.send({
        name: 'app/user.created',
        data: {
          email,
          name:fullName,
          investmentGoals,
          riskTolerance,
          preferredIndustry
        }
      })
     }
     return { success: true, data: response}
  }
  catch(e) {
    console.error("sign up failed", e)
    return {
      success: false,
      error: "Sign up failed"
    }
  }
}
export const signinWithEmail = async({email, password}:SignInFormData) => {
  try{
     const response = await auth.api.signInEmail({
      body: { email, password}
     })

     if(response) {
      await inngest.send({
        name: 'app/user.created',
        data: {
          email,
           password
        }
      })
     }
     return { success: true, data: response}
  }
  catch(e) {
    console.error("sign in failed", e)
    return {
      success: false,
      error: "Sign in failed"
    }
  }
}

export const signOut = async() => {
  try {
    await auth.api.signOut({headers: await headers()})
  } catch (error) {
    console.error("Sign out failed", error)
    return {
      success: false,
      error: 'Sign out failed'
    }
  }
}