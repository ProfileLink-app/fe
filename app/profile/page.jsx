'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Switch, Dialog } from '@headlessui/react';

export default function Profile() {
    const user = {
        name: 'Dylan Baker',
        bio: "I'm Dylan, a full-stack web developer from Kansas City.",
        profilePic: '/profile.jpg',
        theme: '0067E3',
        socials: [
            {
                platform: 'instagram',
                url: 'url.com',
            },
            {
                platform: 'twitter',
                url: 'url.com',
            },
            {
                platform: 'tiktok',
                url: 'url.com',
            },
            {
                platform: 'snapchat',
                url: 'url.com',
            },
            {
                platform: 'twitch',
                url: 'url.com',
            },
            {
                platform: 'youtube',
                url: 'url.com',
            },
            {
                platform: 'facebook',
                url: 'url.com',
            },
            {
                platform: 'linkedin',
                url: 'url.com',
            },
        ],
        links: [
            {
                title: 'Why you should have a cat',
                url: 'https://twitter.com/ShouldHaveCat/status/1654641077456871424',
                favicon: 'twitter.com',
            },
            {
                title: 'Why you should have a cat',
                url: 'https://twitter.com/ShouldHaveCat/status/1654641077456871424',
                favicon: 'google.com',
            },
            {
                title: 'Why you should have a cat Why you should have a cat Why you should have a cat Why you should have a cat Why you should have a cat Why you should have a cat Why you should have a cat Why you should have a cat Why you should have a cat Why you should have a cat',
                url: 'https://twitter.com/ShouldHaveCat/status/1654641077456871424',
                favicon: 'youtube.com',
            },
            {
                title: 'Why you should have a cat',
                url: 'https://twitter.com/ShouldHaveCat/status/1654641077456871424',
                favicon: 'yahoo.com',
            },
            {
                title: 'Why you should have a cat',
                url: 'https://twitter.com/ShouldHaveCat/status/1654641077456871424',
                favicon: 'meratas.com',
            },
            {
                title: 'Why you should have a cat',
                url: 'https://twitter.com/ShouldHaveCat/status/1654641077456871424',
                favicon: 'facebook.com',
            },
        ],
    };
    const COLOR_CALC = +user.theme[0] * 0.299 + +user.theme[1] * 0.587 + +user.theme[2] * 0.114;
    console.log(COLOR_CALC);

    return (
        <div style={{ backgroundColor: `#${user.theme}` }}>
            <header className='z-40 w-full'>
                <nav className='flex items-center justify-between px-6 py-2 mx-auto max-w-7xl'>
                    <div className='flex items-center flex-grow basis-0'>
                        <Link href='/' className='text-lg font-semibold tracking-wider' style={COLOR_CALC < 186 ? { color: '#FFFFFF' } : {}}>
                            ProfileLink
                        </Link>
                    </div>
                    <div className='flex items-center justify-end flex-grow gap-4 basis-0'>
                        {/* Add back later if it makes sense */}
                        {/* <div className='flex items-center gap-2 px-2 py-1 bg-gray-200 rounded-full bg-opacity-80'>
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <p className='text-sm'>Live</p>
                        </div> */}
                        <Menu as='div' className='relative z-50 flex justify-end'>
                            <Menu.Button className='flex items-center justify-end flex-grow gap-2 py-1 font-bold tracking-wider basis-0'>
                                <Image src={user.profilePic} alt='profile photo' width='0' height='0' sizes='100%' className='w-10 h-10 rounded-full bg-slate-950 bg-opacity-30' />
                            </Menu.Button>
                            <Menu.Items className='absolute right-0 flex flex-col gap-2 p-4 bg-white shadow-2xl shadow-outline drop-shadow-xl top-12 min-w-max rounded-3xl'>
                                <Menu.Item as='div' disabled className='flex gap-4 px-2 mb-2 pr-14'>
                                    <Image src={user.profilePic} alt='profile photo' width='0' height='0' sizes='100%' className='w-12 h-12 rounded-full bg-slate-950 bg-opacity-30' />
                                    <div className='flex flex-col'>
                                        <p className='text-lg font-bold'>{user.name}</p>
                                        <span className='text-xs opacity-75'>linktr.ee/dbvker</span>
                                    </div>
                                </Menu.Item>
                                <Link href='/profile/edit'>
                                    <Menu.Item as='div' className='flex p-2 transition cursor-pointer rounded-xl hover:bg-gray-300'>
                                        Account
                                    </Menu.Item>
                                </Link>
                                <Link href='/profile'>
                                    <Menu.Item as='div' className='flex p-2 transition bg-gray-200 cursor-pointer rounded-xl hover:bg-gray-300'>
                                        View Page
                                    </Menu.Item>
                                </Link>
                                <Link href='/sign-in'>
                                    <Menu.Item as='div' className='flex p-2 transition cursor-pointer rounded-xl hover:bg-gray-300'>
                                        Sign out
                                    </Menu.Item>
                                </Link>
                            </Menu.Items>
                        </Menu>
                    </div>
                </nav>
            </header>
            <div className='relative top-0 flex flex-col h-full min-h-screen pb-10 mx-auto max-w-7xl'>
                <section className='flex flex-col items-center' style={COLOR_CALC > 186 ? { color: '#4B5563' } : { color: '#FFFFFF' }}>
                    <Image src={user.profilePic} width='0' height='0' sizes='100%' className='w-24 h-24 mb-6 rounded-full bg-slate-950 bg-opacity-30' />
                    <h1 className='mb-2 text-xl font-bold'>{user.name}</h1>
                    <h2 className='mb-10 text-center text-md'>{user.bio}</h2>
                    <div className='flex gap-3 select-none'>
                        {user.socials.map((item) => {
                            return (
                                <div className='p-3 transition rounded-md cursor-pointer bg-gray-950 bg-opacity-40 hover:bg-opacity-60'>
                                    <a href='#'>
                                        <Image src={`/${item.platform}.svg`} width='0' height='0' sizes='100%' className='w-6 h-6 mx-auto text-white fill-white sm:w-full' />
                                    </a>
                                </div>
                            );
                        })}
                    </div>

                    <div className='flex flex-col w-full gap-4 px-4 mt-10 sm:max-w-3xl'>
                        {user.links.map((link, index) => {
                            return (
                                <a href={link.url} target='_blank' key={index}>
                                    <div className='flex items-center justify-between w-full gap-4 px-5 py-5 transition rounded-md cursor-pointer bg-gray-950 bg-opacity-40 hover:bg-opacity-60' style={COLOR_CALC <= 30 ? { color: '#4B5563', backgroundColor: '#FFFFFF' } : { color: '#FFFFFF' }}>
                                        <div className='flex justify-between overflow-hidden'>
                                            <Image src={`https://www.google.com/s2/favicons?domain=${link.favicon}&sz=64`} width='0' height='0' sizes='100%' className='w-10 h-10 p-0.5 bg-white radius-10' />
                                            <div className='flex flex-col px-2 overflow-hidden whitespace-nowrap text-ellipsis'>
                                                <p className='pb-1 overflow-hidden text-sm font-semibold whitespace-nowrap text-ellipsis'>{link.title}</p>
                                                <p className='overflow-hidden text-xs text-ellipsis whitespace-nowrap'>{link.url}</p>
                                            </div>
                                        </div>
                                        <Image src='/openlink.svg' width='0' height='0' sizes='100%' className='w-5 h-5' />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}
