'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

// Getting the profile image from here. Delete later
import profileData from '../public/profileData.json';

export default function AboutComponent({ userInfo, setUserInfo, token, getData }) {
    const [editing, setEditing] = useState(false);
    const handleSaveAbout = () => {
        axios.put(`https://localhost:7101/api/users/${userInfo.userId}`, { firstName: userInfo.firstName, lastName: userInfo.lastName, username: userInfo.username, bio: userInfo.bio, theme: userInfo.theme }, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
            getData();
            setEditing(false);
        });
    };

    const handleCancelAbout = () => {
        setEditing(false);
        getData();
    };
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
                                <button onClick={() => handleSaveAbout()} className='px-3 py-1.5 text-sm text-white transition rounded-md bg-secondary hover:bg-secondary-hover'>
                                    Save
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setEditing(!editing)} className='px-3 py-1.5 text-sm text-white transition rounded-md bg-secondary hover:bg-secondary-hover'>
                                Edit
                            </button>
                        )}
                    </div>
                    {/* Add this functionality later */}
                    <div className='flex items-center gap-2'>
                        <Image src={profileData.profilePic} width='0' height='0' sizes='100%' className='w-16 h-16 rounded-full bg-slate-950 bg-opacity-30' />
                        {editing ? (
                            <div className='flex flex-row gap-2'>
                                <button className='px-4 py-2 text-sm font-medium text-white transition rounded-md bg-primary hover:bg-primary-hover h-min'>Choose photo</button>
                                <input type='file' id='actual-btn' hidden />
                                <button className='px-4 py-2 text-sm font-medium transition bg-gray-200 rounded-md h-min hover:bg-gray-300'>Delete</button>
                            </div>
                        ) : (
                            <p className='ml-2 text-2xl font-semibold'>
                                {userInfo?.firstName} {userInfo?.lastName}
                            </p>
                        )}
                    </div>
                    {/* End */}
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

                    <div className='w-full'>
                        <label className='block pr-4 text-sm' for='username'>
                            Username:
                        </label>
                        {editing ? (
                            <div className='relative flex items-center mt-1'>
                                <div className='absolute mb-0.5 select-none left-2'>@</div>
                                <input id='username' name='username' onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} className='w-full p-2 pl-6 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='username' type='text' value={userInfo.username} />
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

                    <div className='w-full'>
                        <label className='block pr-4 text-sm' for='theme'>
                            Theme:
                        </label>
                        {editing ? (
                            <div className='relative flex items-center gap-4 mt-1'>
                                <div className='absolute select-none left-2'>#</div>
                                <input id='theme' name='theme' onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} className='w-full p-2 pl-5 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='theme' type='text' value={userInfo.theme} />
                                <div className='w-12 h-10 rounded-md' style={{ backgroundColor: `#${userInfo.theme}` }}></div>
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
                <section className='flex flex-col gap-4 p-4 px-6 border-b border-gray-200 md:border md:rounded-xl animate-pulse dark:border-gray-300'>
                    <div className='flex items-center justify-between'>
                        <div class='h-6 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32' />
                        <div className='h-8 bg-gray-200 rounded-md w-14 dark:bg-gray-300' />
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='w-16 h-16 bg-gray-200 rounded-full dark:bg-gray-300' />
                        <div className='h-8 ml-2 bg-gray-200 rounded-full w-44 dark:bg-gray-300' />
                    </div>

                    <div className='w-full'>
                        <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                        <div className='h-5 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
                    </div>

                    <div className='w-full'>
                        <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                        <div className='h-5 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
                    </div>

                    <div className='w-full'>
                        <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                        <div className='flex items-center justify-between gap-4'>
                            <div className='h-5 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
                            <div className='w-10 h-8 bg-gray-200 rounded-md dark:bg-gray-300' />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
