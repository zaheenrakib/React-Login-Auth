import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase/firebase.config';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);

        //reset error and success
        setRegisterError('');
        setSuccess('');



        if (password.length < 6) {
            setRegisterError('Password Should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should contain at least one uppercase letter');
            return;
        }
        else if (!accepted) {
            setRegisterError('You must accept the terms and conditions');
            return;
        }



        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess("User Create Successfully.");

                //update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: 'https://i.pravatar.cc/150?img=1'
                })
                    .then(() => console.log('profile updated'))
                    .catch(err => console.log(err));

                // send varification email:
                sendEmailVerification(result.user)
                    .then(() => {
                        alert("Please Check Your email And varifications Your Account")
                    })
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message)
            })

    }

    return (
        <div className=''>
            <div className='mx-auto md:w-1/2'>
                <h2 className='text-3xl mb-8'> Please Register </h2>
                <form onSubmit={handleRegister}>
                    <input className='mb-4 w-full py-2 px-4' type="text" name='name' placeholder='Your Name' required />
                    <br />
                    <input className='mb-4 w-full py-2 px-4' type="email" name='email' placeholder='Email Address' required />
                    <br />
                    <div className='relative mb-4'>
                        <input className='w-full py-2 px-4'
                            type={showPassword ? "text" : "password"}
                            name='password'
                            placeholder='Password'
                            required />
                        <span className='absolute top-3 right-2' onClick={() => setShowPassword(!showPassword)}>

                            {
                                showPassword ? <FaEyeSlash /> : <FaEye />
                            }

                        </span>
                    </div>
                    <br />
                    <div className='mb-2'>
                        <input type="checkbox" name="terms" id="terms" />
                        <label className='ml-2' htmlFor="terms"> Accept Our <a href="">Terms and Conditions</a> </label>
                    </div>
                    <br />

                    <input className='mb-4 w-full btn btn-secondary' type="submit" value='Register' />
                </form>
                {
                    registerError && <p className='text-red-500'>{registerError}</p>
                }
                {
                    success && <p className='text-green-500'>{success}</p>
                }
                <p>Already  have an account <Link to="/login">Login</Link> </p>
            </div>
        </div>
    );
};

export default Register;