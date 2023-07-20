'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Components
const HeaderComponent = dynamic(() => import('../../components/header'));

export default function SignUp() {
    const { push } = useRouter();
    const [registration, setRegistration] = useState({ firstName: '', lastName: '', username: '', password: '' });
    const [error, setError] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);

    const handleChanges = (e) => {
        setError('');
        setRegistration({ ...registration, [e.target.name]: e.target.value });
        console.log(registration);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if ((registration.firstName.length == 0, registration.lastName.length == 0, registration.username.length == 0, registration.password.length == 0)) {
            setError('All fields required.');
        } else {
            axios
                .post(`https://profilelinkapp.azurewebsites.net/api/users/register`, {
                    firstName: registration.firstName,
                    lastName: registration.lastName,
                    username: registration.username,
                    password: registration.password,
                })
                .then(() => push('/sign-in'))
                .catch(() => setError('Username is taken.'));
        }
    };

    const checkUsernameValid = () => {
        if (registration.username.length > 0) {
            axios
                .post(`https://profilelinkapp.azurewebsites.net/api/authentication/username`, { username: registration.username })
                .then(() => setUsernameTaken(false))
                .catch(() => setUsernameTaken(true));
        }
    };

    useEffect(() => {
        checkUsernameValid();
    }, [registration.username]);

    return (
        <div className='min-h-screen overflow-hidden bg-white sm:bg-gray-100'>
            <HeaderComponent transparent={false} fontColor='#FFFFFF' />

            <div className='flex items-center justify-center mx-auto border-t border-gray-200 max-w-7xl'>
                <div className='mx-2 right-0 flex flex-col gap-2 sm:p-10 px-4 mt-16 bg-white sm:shadow-xl sm:shadow-outline max-w-[550px] w-full sm:drop-shadow-xl rounded-xl transition'>
                    <h1 className='mb-3 text-2xl font-semibold'>Sign in to your account</h1>
                    <h3>
                        Already have an account?{' '}
                        <Link href='/sign-in' className='transition text-secondary hover:text-secondary-hover hover:underline'>
                            Sign in now!
                        </Link>
                    </h3>
                    <form onSubmit={handleSignUp}>
                        <div className='flex w-full gap-2 mt-6'>
                            <div className='w-1/2'>
                                <label className='block pr-4 mb-1.5 font-medium text-sm' for='name'>
                                    First Name
                                </label>
                                <input id='firstName' type='text' name='firstName' onChange={handleChanges} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' />
                            </div>
                            <div className='w-1/2'>
                                <label className='block pr-4 mb-1.5 font-medium text-sm' for='name'>
                                    Last Name
                                </label>
                                <input id='lastName' type='text' name='lastName' onChange={handleChanges} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' />
                            </div>
                        </div>

                        <div className='relative w-full mt-3'>
                            <label className='block pr-4 mb-1.5 font-medium text-sm' for='username'>
                                Username
                            </label>
                            <input id='username' type='text' name='username' onChange={handleChanges} className={usernameTaken ? 'text-red-400 w-full p-2 leading-tight transition bg-white border border-red-400 rounded-md appearance-none focus:outline-none' : 'w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400'} />
                            <div className='absolute top-0 right-0 text-sm font-semibold text-red-400 transition'>{usernameTaken ? 'Username unavailable' : ''}</div>
                        </div>

                        <div className='w-full mt-3'>
                            <label className='block pr-4 mb-1.5 font-medium text-sm' for='password'>
                                Password
                            </label>
                            <input id='password' type='password' name='password' onChange={handleChanges} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' />
                        </div>
                        {error.length > 0 && <p>{error}</p>}
                        <button type='submit' className='w-full px-4 py-2 mt-6 text-sm font-medium text-white transition rounded-md bg-primary hover:bg-primary-hover h-min'>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
