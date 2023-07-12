'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Switch, Dialog } from '@headlessui/react';

export default function LinksComponent({ userInfo, token, getData }) {
    const [linkModal, setLinkModal] = useState({
        open: false,
        edit: false,
        linkId: null,
        title: '',
        url: '',
    });

    const toggleLinkModal = (edit, id, title = '', url = '') => {
        setLinkModal({ open: !linkModal.open, edit, linkId: id, title, url });
    };

    const handleAddLink = () => {
        if (linkModal.title.length > 1 && linkModal.url.length > 1) {
            axios.post(`https://localhost:7101/api/links?userId=${userInfo.userId}`, { title: linkModal.title, url: linkModal.url }, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
                getData();
                toggleLinkModal();
            });
        } else {
            console.log('Fields wrong');
        }
    };

    const handleEditLink = () => {
        axios.put(`https://localhost:7101/api/links/${linkModal.linkId}`, { title: linkModal.title, url: linkModal.url }, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
            getData();
            toggleLinkModal();
        });
    };

    const handleRemoveLink = () => {
        axios.delete(`https://localhost:7101/api/links/${linkModal.linkId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
            getData();
            toggleLinkModal();
        });
    };

    const handleLinkActive = (id) => {
        axios.put(`https://localhost:7101/api/links/active/${id}`).then(() => {
            getData();
        });
    };

    return (
        <>
            {userInfo.userId ? (
                <>
                    <div className='flex flex-col md:mt-0'>
                        <section className='flex flex-col gap-4 p-4 px-6 md:border-gray-300 md:border md:rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <p className='font-semibold text-md'>Links</p>
                                <button onClick={() => toggleLinkModal(false)} className='px-3 py-1.5 text-sm text-white transition rounded-md bg-secondary hover:bg-secondary-hover'>
                                    Add
                                </button>
                            </div>
                            {userInfo.links?.length > 0 ? (
                                userInfo.links?.map((link, key) => {
                                    return (
                                        <div key={key} className='flex flex-col px-2 py-4 bg-white border-b md:px-0 last:border-b-0'>
                                            <div className='flex items-center'>
                                                <Image src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`} width='0' height='0' sizes='100%' className='w-10 h-10' />
                                                <div className='flex flex-col flex-grow px-4 overflow-hidden lg:px-2 basis-1'>
                                                    <p className='overflow-hidden text-sm font-semibold text-ellipsis whitespace-nowrap'>{link.title}</p>
                                                    <p className='overflow-hidden text-xs text-ellipsis whitespace-nowrap'>{link.url}</p>
                                                </div>
                                                <div className='flex items-center gap-3 pl-2'>
                                                    <Switch onClick={() => handleLinkActive(link.linkId)} checked={link.active} className={`${link.active ? 'bg-green-600' : 'bg-gray-400'} relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                                                        <span className='sr-only'>visible</span>
                                                        <span aria-hidden='true' className={`${link.active ? 'translate-x-[1.125rem]' : 'translate-x-0'} pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                                                    </Switch>
                                                    <button onClick={() => toggleLinkModal(true, link.linkId, link.title, link.url)} className='px-3 py-1.5 text-sm font-medium transition bg-gray-200 rounded-md h-min hover:bg-gray-300'>
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className='flex items-center justify-center w-full my-10'>Add a Link</p>
                            )}
                        </section>
                    </div>

                    {/* Add/Update Links Modal */}
                    <Dialog open={linkModal.open} onClose={() => toggleLinkModal()} className='fixed top-0 left-0 z-50 flex items-start justify-center w-screen h-screen pt-20 bg-black md:pt-0 md:items-center bg-opacity-20'>
                        <Dialog.Panel className='box-border w-5/6 max-w-2xl p-6 mx-6 transition-all duration-150 bg-white sm:w-4/6 rounded-2xl sm:min-w-1/6'>
                            <Dialog.Title className='flex items-center justify-between mb-4 font-semibold text-md'>
                                {linkModal.url.length > 0 && linkModal.edit == true ? `Edit Link` : 'Add New Link'}
                                <div onClick={() => toggleLinkModal()} className='p-2 transition bg-gray-200 rounded-md cursor-pointer select-none hover:bg-gray-300'>
                                    <Image src='/closebtn.svg' width='0' height='0' sizes='100%' className='w-4 h-4' />
                                </div>
                            </Dialog.Title>

                            <div className='w-full mt-6'>
                                <label className='block pr-4 mb-1.5 font-medium text-sm' for='title'>
                                    Title:
                                </label>
                                <input id='title' type='text' name='title' value={linkModal.title} onChange={(e) => setLinkModal({ ...linkModal, [e.target.name]: e.target.value })} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='title' type='text' />
                            </div>
                            <div className='w-full mt-6'>
                                <label className='block pr-4 mb-1.5 font-medium text-sm' for='url'>
                                    URL:
                                </label>
                                <input id='url' type='url' name='url' value={linkModal.url} onChange={(e) => setLinkModal({ ...linkModal, [e.target.name]: e.target.value })} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='url' type='text' />
                            </div>

                            <div className='flex gap-4 mt-8'>
                                {linkModal.url.length > 0 && linkModal.edit == true ? (
                                    <button onClick={() => handleRemoveLink()} className='w-1/3 px-3 py-2 font-medium transition bg-gray-200 rounded-md select-none hover:bg-gray-300'>
                                        Remove
                                    </button>
                                ) : (
                                    ''
                                )}
                                <button onClick={linkModal.linkId ? () => handleEditLink() : () => handleAddLink()} className='w-full px-3 py-2 font-medium text-white transition rounded-md select-none bg-primary hover:bg-primary-hover'>
                                    {linkModal.linkId ? 'Save' : 'Add'}
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </>
            ) : (
                <section className='flex flex-col gap-4 p-4 px-6 border-b border-gray-200 md:border md:rounded-xl animate-pulse dark:border-gray-300'>
                    <div className='flex items-center justify-between'>
                        <div class='h-6 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32' />
                        <div className='h-8 bg-gray-200 rounded-md w-14 dark:bg-gray-300' />
                    </div>

                    <div className='flex flex-col h-[4.5rem] justify-center border-b border-gray-200 md:px-0 last:border-b-0 dark:border-gray-300'>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 bg-gray-200 rounded-md dark:bg-gray-300' />
                            <div className='flex flex-col flex-grow px-4 lg:px-2'>
                                <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                                <div className='h-3 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
                            </div>
                            <div className='flex items-center gap-3 pl-2'>
                                <div className='h-5 w-[2.25rem] bg-gray-200 dark:bg-gray-300 rounded-full' />
                                <div className='h-8 w-[3.125rem] rounded-md bg-gray-200 dark:bg-gray-300' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col h-[4.5rem] justify-center border-b border-gray-200 md:px-0 last:border-b-0 dark:border-gray-300'>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 bg-gray-200 rounded-md dark:bg-gray-300' />
                            <div className='flex flex-col flex-grow px-4 lg:px-2'>
                                <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                                <div className='h-3 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
                            </div>
                            <div className='flex items-center gap-3 pl-2'>
                                <div className='h-5 w-[2.25rem] bg-gray-200 dark:bg-gray-300 rounded-full' />
                                <div className='h-8 w-[3.125rem] rounded-md bg-gray-200 dark:bg-gray-300' />
                            </div>
                        </div>
                    </div>
					<div className='flex flex-col h-[4.5rem] justify-center border-b border-gray-200 md:px-0 last:border-b-0 dark:border-gray-300'>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 bg-gray-200 rounded-md dark:bg-gray-300' />
                            <div className='flex flex-col flex-grow px-4 lg:px-2'>
                                <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                                <div className='h-3 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
                            </div>
                            <div className='flex items-center gap-3 pl-2'>
                                <div className='h-5 w-[2.25rem] bg-gray-200 dark:bg-gray-300 rounded-full' />
                                <div className='h-8 w-[3.125rem] rounded-md bg-gray-200 dark:bg-gray-300' />
                            </div>
                        </div>
                    </div>
					<div className='flex flex-col h-[4.5rem] justify-center border-b border-gray-200 md:px-0 last:border-b-0 dark:border-gray-300'>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 bg-gray-200 rounded-md dark:bg-gray-300' />
                            <div className='flex flex-col flex-grow px-4 lg:px-2'>
                                <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                                <div className='h-3 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
                            </div>
                            <div className='flex items-center gap-3 pl-2'>
                                <div className='h-5 w-[2.25rem] bg-gray-200 dark:bg-gray-300 rounded-full' />
                                <div className='h-8 w-[3.125rem] rounded-md bg-gray-200 dark:bg-gray-300' />
                            </div>
                        </div>
                    </div>
					<div className='flex flex-col h-[4.5rem] justify-center border-b border-gray-200 md:px-0 last:border-b-0 dark:border-gray-300'>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 bg-gray-200 rounded-md dark:bg-gray-300' />
                            <div className='flex flex-col flex-grow px-4 lg:px-2'>
                                <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                                <div className='h-3 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
                            </div>
                            <div className='flex items-center gap-3 pl-2'>
                                <div className='h-5 w-[2.25rem] bg-gray-200 dark:bg-gray-300 rounded-full' />
                                <div className='h-8 w-[3.125rem] rounded-md bg-gray-200 dark:bg-gray-300' />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
