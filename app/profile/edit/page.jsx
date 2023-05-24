'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Switch, Dialog } from '@headlessui/react';
import profileData from '../../../public/profileData.json';

export default function Edit() {
    const [socialModal, setSocialModal] = useState({
        open: false,
        platform: '',
        username: '',
    });

    const [linkModal, setLinkModal] = useState({
        open: false,
        title: '',
        url: '',
        active: '',
    });

    const toggleSocialModal = (platform = '', username = '') => {
        setSocialModal({ open: !socialModal.open, platform, username });
    };

    const toggleLinkModal = (title = '', url = '', active = '') => {
        setLinkModal({ open: !linkModal.open, title, url, active });
    };

    return (
        <div className='transition bg-white'>
            <header className='fixed z-40 w-full bg-white border-b border-gray-200'>
                <nav className='flex items-center justify-between px-6 py-2 mx-auto max-w-7xl'>
                    <div className='flex items-center flex-grow basis-0'>
                        <Link href='/' className='text-lg font-semibold tracking-wider text-primary'>
                            ProfileLink
                        </Link>
                    </div>
                    <div className='flex items-center justify-center flex-grow basis-0 '>
                        <Link href='/profile' className='px-4 py-2 text-sm font-medium transition bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300'>
                            View Page
                        </Link>
                    </div>
                    <div className='flex items-center justify-end flex-grow gap-4 basis-0'>
                        {/* Add back later if it makes sense */}
                        {/* <div className='flex items-center gap-2 px-2 py-1 bg-gray-200 rounded-full'>
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <p className='text-sm'>Live</p>
                        </div> */}
                        <Menu as='div' className='relative z-50 flex justify-end'>
                            <Menu.Button className='flex items-center justify-end flex-grow gap-2 py-1 font-bold tracking-wider basis-0'>
                                <Image src={profileData.profilePic} alt='profile photo' width='0' height='0' sizes='100%' className='w-10 h-10 rounded-full bg-slate-950 bg-opacity-30' />
                            </Menu.Button>
                            <Menu.Items className='absolute right-0 flex flex-col gap-2 p-4 bg-white shadow-2xl shadow-outline drop-shadow-xl top-12 min-w-max rounded-2xl'>
                                <Menu.Item as='div' disabled className='flex gap-4 px-2 mb-2 pr-14'>
                                    <Image src={profileData.profilePic} alt='profile photo' width='0' height='0' sizes='100%' className='w-12 h-12 rounded-full bg-slate-950 bg-opacity-30' />
                                    <div className='flex flex-col'>
                                        <p className='text-lg font-bold'>{profileData.name}</p>
                                        <span className='text-xs opacity-75'>{profileData.username}</span>
                                    </div>
                                </Menu.Item>
                                <Link href='/profile/edit'>
                                    <Menu.Item as='div' className='flex p-2 transition bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300'>
                                        Account
                                    </Menu.Item>
                                </Link>
                                <Link href='/profile'>
                                    <Menu.Item as='div' className='flex p-2 transition rounded-md cursor-pointer hover:bg-gray-300'>
                                        View Page
                                    </Menu.Item>
                                </Link>
                                <Link href='/sign-in'>
                                    <Menu.Item as='div' className='flex p-2 transition rounded-md cursor-pointer hover:bg-gray-300'>
                                        Sign out
                                    </Menu.Item>
                                </Link>
                            </Menu.Items>
                        </Menu>
                    </div>
                </nav>
            </header>
            <div className='relative top-0 flex justify-center h-full min-h-screen pb-5 mx-auto md:px-6 max-w-7xl '>
                <section className='flex flex-col w-full mt-20 md:flex-row'>
                    <div className='box-border flex flex-col w-full md:gap-4 md:pr-5 '>
                        <section className='flex flex-col gap-4 p-4 px-6 border-b border-gray-300 md:border md:rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <p className='font-semibold text-md'>About</p>
                            </div>
                            {/* Add this functionality later */}
                            <div className='flex items-center gap-2'>
                                <Image src={profileData.profilePic} width='0' height='0' sizes='100%' className='w-16 h-16 rounded-full bg-slate-950 bg-opacity-30' />
                                <div className='flex flex-row gap-2'>
                                    <button className='px-4 py-2 text-sm font-medium text-white transition rounded-md bg-primary hover:bg-primary-hover h-min'>Choose photo</button>
                                    <input type='file' id='actual-btn' hidden />
                                    <button className='px-4 py-2 text-sm font-medium transition bg-gray-200 rounded-md h-min hover:bg-gray-300'>Delete</button>
                                </div>
                            </div>
                            {/* End */}
                            <div className='w-full'>
                                <label className='block pr-4 mb-1' for='name'>
                                    Name
                                </label>
                                <input className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='name' type='text' value={profileData.name} />
                            </div>

                            <div className='w-full'>
                                <label className='block pr-4 mb-1' for='username'>
                                    Username
                                </label>
                                <div className='relative flex items-center'>
                                    <div className='absolute mb-1 select-none left-2'>@</div>
                                    <input className='w-full p-2 pl-6 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='username' type='text' value={profileData.username} />
                                </div>
                            </div>

                            <div className='w-full'>
                                <label className='block pr-4 mb-1' for='bio'>
                                    Bio
                                </label>
                                <textarea className='min-h-[100px] w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='bio' value={profileData.bio}></textarea>
                            </div>
                        </section>

                        <section className='flex flex-col gap-4 p-4 px-6 border-b md:border-gray-300 md:border md:rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <p className='font-semibold text-md'>Theme</p>
                            </div>
                            <div className='w-full'>
                                <label className='block pr-4 mb-1' for='rba'>
                                    HEX Code
                                </label>
                                <div className='flex gap-4'>
                                    <input className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='rba' type='text' value={profileData.theme} />
                                    <div className='w-12 h-10 rounded-md' style={{ backgroundColor: `#${profileData.theme}` }}></div>
                                </div>
                            </div>
                        </section>

                        <section className='flex flex-col gap-4 p-4 px-6 border-b md:border-gray-300 md:border md:rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <p className='font-semibold text-md'>Socials</p>
                                <button onClick={() => toggleSocialModal()} className='px-3 py-1.5 text-sm text-white transition rounded-md bg-secondary hover:bg-secondary-hover'>
                                    Add social
                                </button>
                            </div>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
                                {profileData.socials.map((social, key) => {
                                    return (
                                        <div key={key} className='box-border flex flex-col w-full px-3 py-2 bg-gray-100 rounded-xl'>
                                            <div className='flex items-center'>
                                                <Image src={`/${social.platform}-black.svg`} width='0' height='0' sizes='100%' className='w-6 h-6' />
                                                <div className='flex flex-col flex-grow px-4 overflow-hidden lg:px-2 basis-1'>
                                                    <p className='flex-grow mb-0.5 text-sm font-semibold basis-0'>{social.platform}</p>
                                                    <p className='overflow-hidden text-xs text-ellipsis whitespace-nowrap'>
                                                        {social.platform !== 'website' && <>@</>}
                                                        {social.username}
                                                    </p>
                                                </div>
                                                <button onClick={() => toggleSocialModal(social.platform, social.username)} className='px-3 py-1.5 text-sm font-medium transition bg-gray-200 rounded-md h-min hover:bg-gray-300'>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    <div className='box-border flex flex-col md:pl-5 md:w-6/12 md:mt-0'>
                        <section className='flex flex-col gap-4 p-4 px-6 md:border-gray-300 md:border md:rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <p className='font-semibold text-md'>Links</p>
                                <button onClick={() => toggleLinkModal()} className='px-3 py-1.5 text-sm text-white transition rounded-md bg-secondary hover:bg-secondary-hover'>
                                    Add link
                                </button>
                            </div>
                            {profileData.links.map((link, key) => {
                                return (
                                    <div key={key} className='flex flex-col px-2 py-4 bg-white border-b md:px-0 last:border-b-0'>
                                        <div className='flex items-center'>
                                            <Image src={`https://www.google.com/s2/favicons?domain=${link.favicon}&sz=64`} width='0' height='0' sizes='100%' className='w-10 h-10' />
                                            <div className='flex flex-col flex-grow px-4 overflow-hidden lg:px-2 basis-1'>
                                                <p className='overflow-hidden text-sm font-semibold text-ellipsis whitespace-nowrap'>{link.title}</p>
                                                <p className='overflow-hidden text-xs text-ellipsis whitespace-nowrap'>{link.url}</p>
                                            </div>
                                            <div className='flex items-center gap-3 pl-2'>
                                                <Switch checked={link.active} className={`${link.active ? 'bg-green-600' : 'bg-gray-400'} relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                                                    <span className='sr-only'>visible</span>
                                                    <span aria-hidden='true' className={`${link.active ? 'translate-x-[1.125rem]' : 'translate-x-0'} pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                                                </Switch>
                                                <button onClick={() => toggleLinkModal(link.title, link.url, link.active)} className='px-3 py-1.5 text-sm font-medium transition bg-gray-200 rounded-md h-min hover:bg-gray-300'>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    </div>
                </section>
            </div>

            {/* Add/Update Social Account Modal */}
            <Dialog open={socialModal.open} onClose={() => toggleSocialModal()} className='fixed top-0 left-0 z-50 flex items-start justify-center w-screen h-screen pt-20 bg-black md:pt-0 md:items-center bg-opacity-20'>
                <Dialog.Panel className='box-border w-5/6 max-w-2xl p-6 mx-6 transition-all duration-150 bg-white sm:w-4/6 rounded-2xl sm:min-w-1/6'>
                    <Dialog.Title className='flex items-center justify-between mb-4 font-semibold text-md'>
                        {socialModal.platform.length > 0 ? `Edit ${socialModal.platform}` : 'Add New Social'}
                        <div onClick={() => toggleSocialModal()} className='p-2 transition bg-gray-200 rounded-md cursor-pointer select-none hover:bg-gray-300'>
                            <Image src='/closebtn.svg' width='0' height='0' sizes='100%' className='w-4 h-4' />
                        </div>
                    </Dialog.Title>

                    <div className='w-full mt-6'>
                        <label className='block pr-4 mb-1.5 font-medium text-sm' for='url'>
                            {socialModal.platform === 'website' ? 'Website*' : 'Username*'}
                        </label>
                        <input value={linkModal.title} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='title' type='text' />
                    </div>

                    <div className='flex gap-4 mt-8'>
                        {socialModal.platform.length > 0 ? (
                            <button className='w-1/3 px-3 py-2 font-medium transition bg-gray-200 rounded-md select-none hover:bg-gray-300' onClick={() => toggleSocialModal()}>
                                Remove
                            </button>
                        ) : (
                            ''
                        )}
                        <button className='w-full px-3 py-2 font-medium text-white transition rounded-md select-none bg-primary hover:bg-primary-hover' onClick={() => toggleSocialModal()}>
                            Save
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>

            {/* Add/Update Links Modal */}
            <Dialog open={linkModal.open} onClose={() => toggleLinkModal()} className='fixed top-0 left-0 z-50 flex items-start justify-center w-screen h-screen pt-20 bg-black md:pt-0 md:items-center bg-opacity-20'>
                <Dialog.Panel className='box-border w-5/6 max-w-2xl p-6 mx-6 transition-all duration-150 bg-white sm:w-4/6 rounded-2xl sm:min-w-1/6'>
                    <Dialog.Title className='flex items-center justify-between mb-4 font-semibold text-md'>
                        {linkModal.url.length > 0 ? `Edit Link` : 'Add New Link'}
                        <div onClick={() => toggleLinkModal()} className='p-2 transition bg-gray-200 rounded-md cursor-pointer select-none hover:bg-gray-300'>
                            <Image src='/closebtn.svg' width='0' height='0' sizes='100%' className='w-4 h-4' />
                        </div>
                    </Dialog.Title>

                    <div className='w-full mt-6'>
                        <label className='block pr-4 mb-1.5 font-medium text-sm' for='url'>
                            Title*
                        </label>
                        <input value={linkModal.title} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='title' type='text' />
                    </div>
                    <div className='w-full mt-6'>
                        <label className='block pr-4 mb-1.5 font-medium text-sm' for='url'>
                            URL*
                        </label>
                        <input value={linkModal.url} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='url' type='text' />
                    </div>

                    <div className='flex gap-4 mt-8'>
                        {linkModal.url.length > 0 ? (
                            <button className='w-1/3 px-3 py-2 font-medium transition bg-gray-200 rounded-md select-none hover:bg-gray-300' onClick={() => toggleLinkModal()}>
                                Remove
                            </button>
                        ) : (
                            ''
                        )}
                        <button className='w-full px-3 py-2 font-medium text-white transition rounded-md select-none bg-primary hover:bg-primary-hover' onClick={() => toggleLinkModal()}>
                            Save
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
