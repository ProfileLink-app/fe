'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Components
const AboutSkeletonComponent = dynamic(() => import('../skeletons/about'));

// Getting the profile image from here. Delete later
import user from '../../public/user.png';

export default function AboutComponent({ userInfo, setUserInfo, token, getData }) {
    const [editing, setEditing] = useState(false);
    const currentUsername = userInfo.username;
    const [username, setUsername] = useState();
    const [usernameTaken, setUsernameTaken] = useState(false);
    
    const handleSaveAbout = () => {
        if (usernameTaken == false && username.length > 0 && userInfo.theme.length == 6) {
            axios.put(`https://profilelinkapp.azurewebsites.net/api/users/${userInfo.userId}`, { firstName: userInfo.firstName, lastName: userInfo.lastName, username: username, bio: userInfo.bio, theme: userInfo.theme }, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
                getData();
                setEditing(false);
            });
        }
    };

    const handleCancelAbout = () => {
        setEditing(false);
        getData();
    };

    const checkUsernameValid = () => {
        if (editing && username.length > 0) {
            axios
                .post(`https://profilelinkapp.azurewebsites.net/api/authentication/username`, { current: currentUsername, updated: username })
                .then((resp) => setUsernameTaken(false))
                .catch(() => setUsernameTaken(true));
        }
    };

    useEffect(() => {
        checkUsernameValid();
    }, [username]);

    useEffect(() => {
        setUsername(userInfo.username);
    }, [userInfo])
    

    return (
        <>
            {userInfo.userId ? (
                <section className='flex flex-col gap-4 p-4 px-6 border-b border-gray-300 md:border md:rounded-xl'>
                    <div className='flex items-center justify-between'>
                        <p className='font-semibold text-md'>About</p>
                        {editing ? (
                            <div className='flex gap-2'>
                                <button onClick={() => handleCancelAbout()} className='px-3 py-1.5 text-sm text-black transition rounded-md bg-gray-200 hover:bg-gray-300'>
                                    Cancel
                                </button>
                                <button onClick={() => handleSaveAbout()} className={usernameTaken || userInfo.theme.length != 6 || username.length < 1 ? 'px-3 py-1.5 text-sm text-white transition rounded-md bg-[#074588] cursor-default' : 'px-3 py-1.5 text-sm text-white transition rounded-md bg-secondary hover:bg-secondary-hover'}>
                                    Save
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setEditing(!editing)} className='px-3 py-1.5 text-sm text-white transition rounded-md bg-secondary hover:bg-secondary-hover'>
                                Edit
                            </button>
                        )}
                    </div>
                    <div className='flex items-center gap-2'>
                        <Image priority={true} src={user} width='0' height='0' sizes='100%' className={`w-16 h-16 p-1 bg-[#${userInfo.theme}] rounded-full bg-opacity-40`} />
                        {editing ? (
                            <></>
                        ) : (
                            <p className='ml-2 text-2xl font-semibold'>
                                {userInfo?.firstName} {userInfo?.lastName}
                            </p>
                        )}
                    </div>
                    <div className='w-full'>
                        {editing ? (
                            <div>
                                <div className='flex gap-2'>
                                    <p className='w-1/2 text-sm' id='name'>
                                        First Name:
                                    </p>
                                    <p className='w-1/2 text-sm' id='name'>
                                        Last Name:
                                    </p>
                                </div>
                                <div className='flex gap-2 mt-1'>
                                    <input id='firstName' name='firstName' onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} className='w-1/2 p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='name' type='text' value={userInfo.firstName} />
                                    <input id='lastName' name='lastName' onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} className='w-1/2 p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='name' type='text' value={userInfo.lastName} />
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                    <div className='relative w-full'>
                        <label className='block pr-4 text-sm' for='username'>
                            Username:
                        </label>
                        {editing ? (
                            <div>
                                <div className='relative flex items-center mt-1'>
                                    <div className='absolute mb-0.5 select-none left-2'>
                                        <span className={usernameTaken && 'text-red-400 transition'}>@</span>
                                    </div>
                                    <input id='username' name='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} className={usernameTaken ? 'text-red-400 w-full p-2 pl-6 leading-tight transition bg-white border border-red-400 rounded-md appearance-none focus:outline-none' : 'w-full p-2 pl-6 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400'} />
                                </div>
                                <div className='absolute top-0 right-0 text-sm font-semibold text-red-400 transition'>{usernameTaken ? 'Username unavailable' : ''}</div>
                            </div>
                        ) : (
                            <p>@{userInfo.username}</p>
                        )}
                    </div>

                    <div className='w-full'>
                        <label className='block pr-4 text-sm' for='bio'>
                            Bio:
                        </label>
                        {editing ? <textarea id='bio' name='bio' onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} className='min-h-[100px] w-full mt-1 p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='bio' value={userInfo.bio}></textarea> : <p>{userInfo.bio}</p>}
                    </div>

                    <div className='relative w-full'>
                        <label className='block pr-4 text-sm' for='theme'>
                            Theme:
                        </label>
                        {editing ? (
                            <div>
                                <div className='relative flex items-center gap-4 mt-1 transition'>
                                    <div className='absolute select-none left-2'>
                                        <span className={userInfo.theme.length != 6 && 'text-red-400 transition'}>#</span>
                                    </div>
                                    <input id='theme' name='theme' type='text' maxLength={6} value={userInfo.theme} onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} className={userInfo.theme.length != 6 ? 'text-red-400 w-full p-2 pl-5 leading-tight transition bg-white border border-red-400 rounded-md appearance-none focus:outline-none' : 'w-full p-2 pl-5 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400'} />
                                    {userInfo.theme.length == 6 && <div className='w-12 transition rounded-md h-9' style={{ backgroundColor: `#${userInfo.theme}` }}></div>}
                                </div>
                                <div className='absolute top-0 right-0 text-sm font-semibold text-red-400 transition'>{userInfo.theme.length != 6 ? 'Invalid HEX' : ''}</div>
                            </div>
                        ) : (
                            <div className='flex items-center gap-4'>
                                <p id='theme' className='w-full'>
                                    #{userInfo.theme}
                                </p>
                                <div className='w-10 h-8 rounded-md' style={{ backgroundColor: `#${userInfo.theme}` }}></div>
                            </div>
                        )}
                    </div>
                </section>
            ) : (
                <AboutSkeletonComponent />
            )}
        </>
    );
}
