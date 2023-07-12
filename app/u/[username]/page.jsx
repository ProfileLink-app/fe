'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Image from 'next/image';
import profileImage from '../../../public/profileData.json';
import dynamic from 'next/dynamic';

// Components
const HeaderComponent = dynamic(() => import('../../../components/header'));

export default function Profile({ params }) {
    const username = params.username;

    const [profileData, setProfileData] = useState({});
    const [userInfo, setUserInfo] = useState({});

    // Clean this up
    let token;
    let userId;
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
        token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        userId = decoded.sub;
    }

    function getProfileData() {
        axios.get(`https://localhost:7101/api/users/profile/${username}`).then((resp) => {
            setProfileData(resp.data);
        });
    }

    const getUserData = () => {
        if (token != null && userId != null) {
            axios.get(`https://localhost:7101/api/users/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((resp) => {
                setUserInfo(resp.data);
            });
        }
    };

    useEffect(() => {
        getProfileData();
        getUserData();
    }, [username, token]);

    function hexToRGB(h) {
        let r = 0,
            g = 0,
            b = 0;

        if (h.length == 3) {
            r = '0x' + h[0] + h[0];
            g = '0x' + h[1] + h[1];
            b = '0x' + h[2] + h[2];
        } else if (h.length == 6) {
            r = '0x' + h[0] + h[1];
            g = '0x' + h[2] + h[3];
            b = '0x' + h[4] + h[5];
        }

        return [+r, +g, +b];
    }

    const RGB_THEME = profileData.theme && hexToRGB(profileData.theme);
    const FONT_COLOR = RGB_THEME && RGB_THEME[0] * 0.299 + +RGB_THEME[1] * 0.587 + +RGB_THEME[2] * 0.114;

    return (
        <div style={{ backgroundColor: `#${profileData.theme}` }} className='min-h-screen'>
            <HeaderComponent userInfo={userInfo} transparent={false} />
            <div className='relative top-0 flex flex-col h-full px-6 pb-10 mx-auto mt-5 max-w-7xl'>
                <section className='flex flex-col items-center' style={FONT_COLOR < 186 ? { color: '#FFFFFF' } : { color: '#4B5563' }}>
                    {profileData.userId ? (
                        <>
                            <Image src={profileImage.profilePic} width='0' height='0' sizes='100%' className='w-24 h-24 mb-6 rounded-full' />
                            <h1 className='mb-2 text-xl font-bold'>{profileData.firstName}</h1>
                            <h2 className='mb-5 text-sm'>{profileData.username}</h2>
                            <h2 className='mb-5 text-md'>{profileData.bio}</h2>
                        </>
                    ) : (
                        <>
                            <div width='0' height='0' sizes='100%' className='w-24 h-24 mb-6 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
                            <h1 className='mb-2 w-32 animate-pulse bg-gray-200 dark:bg-gray-300 h-[1.75rem] rounded-full' />
                            <h2 className='w-32 h-5 mb-5 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
                            <h2 className='w-64 h-6 mb-5 text-transparent bg-gray-200 rounded-full text-md animate-pulse dark:bg-gray-300' />
                        </>
                    )}
                    <div className='flex flex-wrap justify-center gap-3 select-none'>
                        {profileData.socials ? (
                            profileData.socials?.map((item, key) => {
                                return (
                                    <a href={item.url} target='_blank' key={key}>
                                        <div className='p-3 transition rounded-md cursor-pointer bg-opacity-40 hover:bg-opacity-60' style={FONT_COLOR < 186 ? { border: '1px solid #FFFFFF' } : { border: '1px solid #4B5563' }}>
                                            <Image src={FONT_COLOR < 186 ? `/${item.platform}.svg` : `/${item.platform}-black.svg`} width='0' height='0' sizes='100%' className='w-6 h-6 mx-auto text-white fill-white sm:w-full' />
                                        </div>
                                    </a>
                                );
                            })
                        ) : (
                            <>
                                <div className='p-3 rounded-md h-[3.125rem] w-[3.125rem] animate-pulse border border-gray-200 dark:border-gray-300'>
                                    <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
                                </div>
                                <div className='p-3 rounded-md h-[3.125rem] w-[3.125rem] animate-pulse border border-gray-200 dark:border-gray-300'>
                                    <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
                                </div>
                                <div className='p-3 rounded-md h-[3.125rem] w-[3.125rem] animate-pulse border border-gray-200 dark:border-gray-300'>
                                    <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
                                </div>
                                <div className='p-3 rounded-md h-[3.125rem] w-[3.125rem] animate-pulse border border-gray-200 dark:border-gray-300'>
                                    <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
                                </div>
                            </>
                        )}
                    </div>

                    <div className='flex flex-col w-full gap-4 pt-5 mt-5 sm:max-w-3xl'>
                        {profileData.links ? (
                            profileData.links
                                ?.filter((link) => link.active)
                                .map((link, key) => {
                                    return (
                                        <a href={link.url} target='_blank' key={key}>
                                            <div className='flex items-center justify-between w-full gap-4 px-5 py-5 transition rounded-md cursor-pointer bg-gray-950 bg-opacity-40 hover:bg-opacity-60' style={FONT_COLOR <= 30 ? { color: '#FFFFFF', backgroundColor: '#4B5563' } : { color: '#4B5563', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB' }}>
                                                <div className='flex justify-between overflow-hidden'>
                                                    <Image src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`} width='0' height='0' sizes='100%' className='w-10 h-10 p-0.5 bg-white rounded-md' />
                                                    <div className='flex flex-col px-2 overflow-hidden whitespace-nowrap text-ellipsis'>
                                                        <p className='pb-1 overflow-hidden text-sm font-semibold whitespace-nowrap text-ellipsis'>{link.title}</p>
                                                        <p className='overflow-hidden text-xs text-ellipsis whitespace-nowrap'>{link.url}</p>
                                                    </div>
                                                </div>
                                                <Image src={FONT_COLOR <= 30 ? '/openlink.svg' : '/openlink-black.svg'} width='0' height='0' sizes='100%' className='w-5 h-5' />
                                            </div>
                                        </a>
                                    );
                                })
                        ) : (
                            <>
                                <div className='flex items-center justify-between w-full gap-4 px-5 py-5 border border-gray-200 rounded-md animate-pulse dark:border-gray-300'>
                                    <div className='flex justify-between'>
                                        <div className='w-10 h-10 p-0.5 rounded-md bg-gray-200 dark:bg-gray-300' />
                                        <div className='flex flex-col px-2 whitespace-nowrap text-ellipsis'>
                                            <div class='h-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48' />
                                            <div class='h-3 bg-gray-100 rounded-full dark:bg-gray-300 w-56' />
                                        </div>
                                    </div>
                                    <div className='w-5 h-5 bg-gray-200 rounded-md dark:bg-gray-300' />
                                </div>
                                <div className='flex items-center justify-between w-full gap-4 px-5 py-5 border border-gray-200 rounded-md animate-pulse dark:border-gray-300'>
                                    <div className='flex justify-between'>
                                        <div className='w-10 h-10 p-0.5 rounded-md bg-gray-200 dark:bg-gray-300' />
                                        <div className='flex flex-col px-2 whitespace-nowrap text-ellipsis'>
                                            <div class='h-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48'></div>
                                            <div class='h-3 bg-gray-100 rounded-full dark:bg-gray-300 w-56'></div>
                                        </div>
                                    </div>
                                    <div className='w-5 h-5 bg-gray-200 rounded-md dark:bg-gray-300' />
                                </div>
                                <div className='flex items-center justify-between w-full gap-4 px-5 py-5 border border-gray-200 rounded-md animate-pulse dark:border-gray-300'>
                                    <div className='flex justify-between'>
                                        <div className='w-10 h-10 p-0.5 rounded-md bg-gray-200 dark:bg-gray-300' />
                                        <div className='flex flex-col px-2 whitespace-nowrap text-ellipsis'>
                                            <div class='h-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48'></div>
                                            <div class='h-3 bg-gray-100 rounded-full dark:bg-gray-300 w-56'></div>
                                        </div>
                                    </div>
                                    <div className='w-5 h-5 bg-gray-200 rounded-md dark:bg-gray-300' />
                                </div>
                                <div className='flex items-center justify-between w-full gap-4 px-5 py-5 border border-gray-200 rounded-md animate-pulse dark:border-gray-300'>
                                    <div className='flex justify-between'>
                                        <div className='w-10 h-10 p-0.5 rounded-md bg-gray-200 dark:bg-gray-300' />
                                        <div className='flex flex-col px-2 whitespace-nowrap text-ellipsis'>
                                            <div class='h-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48'></div>
                                            <div class='h-3 bg-gray-100 rounded-full dark:bg-gray-300 w-56'></div>
                                        </div>
                                    </div>
                                    <div className='w-5 h-5 bg-gray-200 rounded-md dark:bg-gray-300' />
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
