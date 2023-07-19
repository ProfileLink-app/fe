'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getToken } from '../utils/getToken';

// Components
const HeaderComponent = dynamic(() => import('../../components/header'));

export default function SignIn() {
    const { push } = useRouter();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const token = getToken();

    const handleChanges = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const signInUser = (e) => {
        e.preventDefault();
        axios
            .post(`https://profilelinkapp.azurewebsites.net/api/authentication`, {
                username: credentials.username,
                password: credentials.password,
            })
            .then((resp) => {
                localStorage.setItem('token', resp.data);
                push('/account');
            })
            .catch((error) => {
                console.log(error)
                setLoginError('Username or password is incorrect.');
            });
    };

    const getUserData = () => {
        if (token != null) {
            const decoded = jwt_decode(token);
            const userId = decoded.sub;
            axios
                .get(`https://profilelinkapp.azurewebsites.net/api/users/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((resp) => push('/account'))
                .catch((error) => console.log(error));
        }
    };

    useEffect(() => {
        getUserData();
    }, [token]);

    return (
        <div className='min-h-screen overflow-hidden bg-white sm:bg-gray-100'>
            <HeaderComponent transparent={false} fontColor='#FFFFFF' />

            <div className='flex items-center justify-center mx-auto border-t border-gray-200 max-w-7xl'>
                <div className='mx-2 right-0 flex flex-col gap-2 sm:p-10 px-4 mt-16 bg-white sm:shadow-xl sm:shadow-outline max-w-[550px] w-full sm:drop-shadow-xl rounded-xl transition'>
                    <h1 className='mb-3 text-2xl font-semibold'>Sign in to your account</h1>
                    <h3>
                        Not a member yet?{' '}
                        <Link href='/sign-up' className='transition text-secondary hover:text-secondary-hover hover:underline'>
                            Create an account now!
                        </Link>
                    </h3>
                    <form onSubmit={signInUser}>
                        <div className='w-full mt-6'>
                            <label className='block pr-4 mb-1.5 font-medium text-sm' htmlFor='username'>
                                Username
                            </label>
                            <input id='username' type='text' name='username' onChange={handleChanges} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' />
                        </div>

                        <div className='w-full mt-3'>
                            <label className='block pr-4 mb-1.5 font-medium text-sm' htmlFor='password'>
                                Password
                            </label>
                            <input id='password' type='password' name='password' onChange={handleChanges} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' />
                        </div>
                        <div className='flex justify-between mt-1 items-top'>
                            <div className='text-sm font-semibold text-red-400'>{loginError}</div>
                            {/* <div className='text-sm transition min-w-fit text-secondary hover:text-secondary-hover hover:underline'>Forgot password?</div> */}
                        </div>
                        <button type='submit' className='w-full px-4 py-2 mt-6 text-sm font-medium text-white transition rounded-md bg-primary hover:bg-primary-hover h-min'>
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
