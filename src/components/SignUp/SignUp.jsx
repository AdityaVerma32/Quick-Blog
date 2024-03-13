import React, { useState } from 'react'
import authService from '../../appwrite/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../store/authSlice.js'
import { Button, Input, Logo } from '../index.js'
import { useDispatch } from 'react-redux'   // a seperate and better way of handling forms
import { useForm } from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    // this line is always added when using useForm 
    // Register - The register function is used to register input fields within the form. This registration process enables the library to track changes in form inputs and manage their values.
    // The handleSubmit function is used to handle form submissions. You typically pass it a callback function that contains the logic to execute when the form is submitted.
    // bout hi bekar sa syntax ha 😢 par jo hai so hai kya karein!
    const { register, handleSubmit, formState: { errors } } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                // We have called authService.getCurrentUser just after creating the user bcz in getCurrentUser we have already called login which will return the user credentials
                const userData = await authService.getCurrentUser()
                // then we called login function which will set the state
                if (userData) dispatch(login(userData));  // this login is the reducer
                navigate("/")
            }
        } catch (error) {
            setError("Sign up Error : ", error)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>

                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an Account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        {/* input full name */}
                        <Input
                            label="Full-name: "
                            placeholder="Enter your Full name"
                            // register hume additional features bhi deta hai jisse ki hum input fields par validators bhi laga sakte hai 
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {/* // input email */}
                        <Input
                            label="Email: "
                            placeholder="Enter your Email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email && <p>Enter a Valid Email</p>}
                        {/* Input password */}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value) || "Password must be at least 8 characters long"
                                }
                            })}
                        />
                        {errors.password && <p>Please Enter a valid Password (Minimum length 8, An UpperCase, A LowerCase, A Digit)</p>}
                        {/* Submit button */}
                        <Button
                            type="Submit"
                            className="w-full"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
