'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Switch, Dialog } from '@headlessui/react';

import profileImage from '../../public/profileData.json';

// Components
const LinksSkeletonComponent = dynamic(() => import('../skeletons/links'));

export default function LinksComponent({ userInfo, token, getData }) {
    const [fieldsError, setFieldsError] = useState(false);
    const [linkModal, setLinkModal] = useState({
        open: false,
        edit: false,
        linkId: null,
        title: '',
        url: '',
    });

    const toggleLinkModal = (edit, id, title = '', url = '') => {
        setLinkModal({ open: !linkModal.open, edit, linkId: id, title, url });
        setFieldsError(false);
    };

    const handleAddLink = () => {
        if (linkModal.title.length > 1 && linkModal.url.length > 1) {
            axios.post(`https://profilelinkapp.azurewebsites.net/api/links?userId=${userInfo.userId}`, { title: linkModal.title, url: linkModal.url }, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
                getData();
                toggleLinkModal();
            });
        } else {
            setFieldsError(true);
        }
    };

    const handleEditLink = () => {
        if (linkModal.title.length > 1 && linkModal.url.length > 1) {
            axios.put(`https://profilelinkapp.azurewebsites.net/api/links/${linkModal.linkId}`, { title: linkModal.title, url: linkModal.url }, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
                getData();
                toggleLinkModal();
            });
        } else {
            setFieldsError(true);
        }
    };

    const handleRemoveLink = () => {
        axios.delete(`https://profilelinkapp.azurewebsites.net/api/links/${linkModal.linkId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
            getData();
            toggleLinkModal();
        });
    };

    const handleLinkActive = (id) => {
        axios
            .put(`https://profilelinkapp.azurewebsites.net/api/links/active/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(() => {
                getData();
            })
            .catch((err) => console.log(err));
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
                                                <Image src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64` || { profileImage }} width='0' height='0' sizes='100%' className='w-10 h-10 bg-gray-200 border-0 rounded-md' />
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
                                {linkModal.edit == true ? `Edit Link` : 'Add New Link'}
                                <div onClick={() => toggleLinkModal()} className='p-2 transition bg-gray-200 rounded-md cursor-pointer select-none hover:bg-gray-300'>
                                    <Image src='/closebtn.svg' width='0' height='0' sizes='100%' className='w-4 h-4' />
                                </div>
                            </Dialog.Title>

                            <div className='relative w-full mt-6 '>
                                <label className='block pr-4 mb-1.5 font-medium text-sm' for='title'>
                                    Title:
                                </label>
                                <input
                                    id='title'
                                    type='text'
                                    name='title'
                                    value={linkModal.title}
                                    onChange={(e) => {
                                        setLinkModal({ ...linkModal, [e.target.name]: e.target.value });
                                        setFieldsError(false);
                                    }}
                                    className={fieldsError ? 'text-red-400 w-full p-2 leading-tight transition bg-white border border-red-400 rounded-md appearance-none focus:outline-none' : 'w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400'}
                                />
                                <div className='absolute top-0 right-0 text-sm font-semibold text-red-400 transition'>{fieldsError ? 'Required' : ''}</div>
                            </div>
                            <div className='relative w-full mt-6'>
                                <label className='block pr-4 mb-1.5 font-medium text-sm' for='url'>
                                    URL:
                                </label>
                                <input
                                    id='url'
                                    type='url'
                                    name='url'
                                    value={linkModal.url}
                                    onChange={(e) => {
                                        setLinkModal({ ...linkModal, [e.target.name]: e.target.value });
                                        setFieldsError(false);
                                    }}
                                    className={fieldsError ? 'text-red-400 w-full p-2 leading-tight transition bg-white border border-red-400 rounded-md appearance-none focus:outline-none' : 'w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400'}
                                />
                                <div className='absolute top-0 right-0 text-sm font-semibold text-red-400 transition'>{fieldsError ? 'Required' : ''}</div>
                            </div>

                            <div className='flex gap-4 mt-8'>
                                {linkModal.edit == true ? (
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
                <LinksSkeletonComponent />
            )}
        </>
    );
}
