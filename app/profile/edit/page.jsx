'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Switch, Dialog } from '@headlessui/react';

export default function Edit() {
    const [enabled, setEnabled] = useState(false);
    const [socialOpen, setSocialOpen] = useState(false);

    const user = {
        name: 'Dylan Baker',
        bio: "I'm Dylan, a full-stack web developer from Kansas City.",
        profilePic: '/profile.jpg',
        theme: ['2', '103', '227'],
        socials: [
            {
                platform: 'Instagram',
                username: 'dylanmbaker',
                url: 'url.com',
            },
            {
                platform: 'Twitter',
                username: 'dylanmbaker',
                url: 'url.com',
            },
            {
                platform: 'TikTok',
                username: 'dylanmbaker',
                url: 'url.com',
            },
            {
                platform: 'SnapChat',
                username: 'dylanmbaker',
                url: 'url.com',
            },
            {
                platform: 'Twitch',
                username: 'dylanmbaker',
                url: 'url.com',
            },
            {
                platform: 'YouTube',
                username: 'dylanmbaker',
                url: 'url.com',
            },
            {
                platform: 'Facebook',
                username: 'dylanmbaker',
                url: 'url.com',
            },
            {
                platform: 'LinkedIn',
                username: 'dylanmbaker',
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
                url: 'https://twitter.com/ShouldHaveCat/status/1654641077456871424dfghffgdfhgfhgttfdtgf',
                favicon: 'facebook.com',
            },
        ],
    };
    return (
        <div className='transition bg-white md:bg-gray-100'>
            <header className='fixed z-40 w-screen bg-white border-b border-gray-200'>
                <nav className='flex items-center justify-between p-2 mx-auto max-w-7xl'>
                    <div className='flex items-center flex-grow basis-0'>
                        <Link href='/' className='text-lg font-semibold tracking-wider text-primary'>
                            ProfileLink
                        </Link>
                    </div>
                    <div className='flex items-center justify-center flex-grow basis-0 '>
                        <Link href='/profile' className='px-4 py-2 text-sm font-medium transition bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                            View Page
                        </Link>
                    </div>
                    <div className='flex items-center justify-end flex-grow gap-4 pr-4 basis-0'>
                        {/* Add back later if it makes sense */}
                        {/* <div className='flex items-center gap-2 px-2 py-1 bg-gray-200 rounded-full'>
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
                                    <Menu.Item as='div' className='flex p-2 transition bg-gray-200 cursor-pointer rounded-xl hover:bg-gray-300'>
                                        Account
                                    </Menu.Item>
                                </Link>
                                <Link href='/profile'>
                                    <Menu.Item as='div' className='flex p-2 transition cursor-pointer rounded-xl hover:bg-gray-300'>
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
            <div className='relative top-0 flex justify-center h-full min-h-screen px-2 pb-10 mx-auto max-w-7xl '>
                <section className='flex flex-col w-full mt-20 md:flex-row'>
                    <div className='box-border flex flex-col w-full gap-4 md:pr-5 '>
                        <section className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between h-[36px]'>
                                <p className='font-semibold text-md'>About</p>
                            </div>
                            <div className='flex flex-col gap-4 p-6 bg-white rounded-xl'>
                                {/* Add this functionality later */}
                                <div className='flex items-center gap-4'>
                                    <Image src={user.profilePic} width='0' height='0' sizes='100%' className='w-16 h-16 rounded-full bg-slate-950 bg-opacity-30' />
                                    <button className='px-4 py-2 text-sm font-medium text-white transition rounded-md bg-primary hover:bg-primary-hover h-min'>Choose photo</button>
                                    <button className='px-4 py-2 text-sm font-medium transition bg-gray-200 rounded-md h-min hover:bg-gray-300'>Delete</button>
                                </div>
                                {/* End */}
                                <div className='w-full'>
                                    <label className='block pr-4 mb-1' for='name'>
                                        Name
                                    </label>
                                    <input className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='name' type='text' />
                                </div>

                                <div className='w-full'>
                                    <label className='block pr-4 mb-1' for='username'>
                                        Username
                                    </label>
                                    <div className='relative flex items-center'>
                                        <div className='absolute mb-1 select-none left-2'>@</div>
                                        <input className='w-full p-2 pl-6 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='username' type='text' />
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <label className='block pr-4 mb-1' for='bio'>
                                        Bio
                                    </label>
                                    <textarea className='min-h-[100px] w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='bio'></textarea>
                                </div>
                            </div>
                        </section>
                        <section className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between h-[36px]'>
                                <p className='font-semibold text-md'>Theme</p>
                            </div>
                            <div className='p-6 bg-white rounded-xl'>
                                <div className='w-full'>
                                    <label className='block pr-4 mb-1' for='rba'>
                                        RGB
                                    </label>
                                    <div className='flex gap-4'>
                                        <input className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='rba' type='text' value={user.theme.join(', ')} />
                                        <div className='w-12 h-10 rounded-md' style={{ backgroundColor: `rgb(${user.theme})` }}></div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between h-[36px]'>
                                <p className='font-semibold text-md'>Socials</p>
                                <button onClick={() => setSocialOpen(true)} className='px-3 py-1.5 mb-1 text-sm text-white transition rounded-full bg-secondary hover:bg-secondary-hover'>
                                    Add social
                                </button>
                            </div>
                            <div className='bg-white sm:p-6 rounded-xl'>
                                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
                                    {user.socials.map((social) => {
                                        return (
                                            <div className='box-border flex flex-col w-full px-3 py-2 bg-gray-300 rounded-xl'>
                                                <div className='flex items-center'>
                                                    <Image src={`/${social.platform}-black.svg`} width='0' height='0' sizes='100%' className='w-6 h-6' />
                                                    <div className='flex flex-col flex-grow px-4 basis-1'>
                                                        <p className='flex-grow mb-1 text-sm font-semibold basis-0'>{social.platform}</p>
                                                        <p className='text-sm'>@{social.username}</p>
                                                    </div>
                                                    <button onClick={() => setSocialOpen(true)} className='px-3 py-1.5 text-sm font-medium transition bg-gray-200 rounded-md h-min hover:bg-gray-300'>
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className='box-border flex flex-col gap-4 mt-10 sm:mt-4 md:pl-5 md:w-6/12 md:mt-0'>
                        <section className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between h-[36px]'>
                                <p className='ml-2 font-semibold text-md'>Links</p>
                                <button className='px-3 py-1.5 mb-1 text-sm text-white transition rounded-full bg-secondary hover:bg-secondary-hover'>Add link</button>
                            </div>
                            <div className='flex flex-col gap-4'>
                                {user.links.map((link) => {
                                    return (
                                        <div className='flex flex-col px-6 py-4 bg-white border-b md:shadow-md md:shadow-outline md:rounded-xl last:border-b-0'>
                                            <div className='flex items-center'>
                                                <Image src={`https://www.google.com/s2/favicons?domain=${link.favicon}&sz=64`} width='0' height='0' sizes='100%' className='w-10 h-10' />
                                                <div className='px-4 overflow-hidden'>
                                                    <p className='flex-grow mb-1 overflow-hidden text-sm font-semibold basis-0 whitespace-nowrap text-ellipsis'>{link.title}</p>
                                                    <p className='flex-grow overflow-hidden text-sm basis-0 text-ellipsis whitespace-nowrap'>{link.url}</p>
                                                </div>
                                                <div className='flex items-center gap-3 pl-2'>
                                                    <Switch checked={enabled} onChange={setEnabled} className={`${enabled ? 'bg-green-600' : 'bg-gray-400'} relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                                                        <span className='sr-only'>visible</span>
                                                        <span aria-hidden='true' className={`${enabled ? 'translate-x-[1.125rem]' : 'translate-x-0'} pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                                                    </Switch>
                                                    <button className='px-3 py-1.5 text-sm font-medium transition bg-gray-200 rounded-md h-min hover:bg-gray-300'>Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </section>
            </div>

            {/* Add/Update Social Account Modal */}
            <Dialog open={socialOpen} onClose={() => setSocialOpen(false)} className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-20'>
                <Dialog.Panel className='box-border w-2/6 max-w-2xl p-6 bg-white rounded-2xl'>
                    <Dialog.Title className='flex items-center justify-between mb-4 font-semibold text-md'>
                        Edit Instagram
                        <div onClick={() => setSocialOpen(false)} className='p-2 transition bg-gray-200 rounded-md cursor-pointer select-none hover:bg-gray-300'>
                            <Image src='/closebtn.svg' width='0' height='0' sizes='100%' className='w-4 h-4' />
                        </div>
                    </Dialog.Title>

                    <div className='w-full'>
                        <label className='block pr-4 mb-1' for='username'>
                            Username*
                        </label>
                        <input className='w-full p-2 leading-tight text-gray-700 transition bg-gray-100 border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='username' type='text' />
                    </div>

                    <div className='flex gap-4 mt-8'>
                        <button className='w-1/3 py-2 font-medium transition bg-gray-200 rounded-md select-none hover:bg-gray-300' onClick={() => setSocialOpen(false)}>
                            Remove
                        </button>
                        <button className='w-2/3 py-2 font-medium text-white transition rounded-md select-none bg-primary hover:bg-primary-hover' onClick={() => setSocialOpen(false)}>
                            Save
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
