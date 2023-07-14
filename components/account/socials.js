'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Dialog } from '@headlessui/react';

// Components
const SocialsSkeletonComponent = dynamic(() => import('../skeletons/socials'));

export default function SocialsComponent({ userInfo, token, getData }) {
    const socialPlatforms = ['Facebook', 'GitHub', 'Instagram', 'LinkedIn', 'Snapchat', 'Threads', 'TikTok', 'Twitch', 'Twitter', 'Website', 'YouTube'];
    const [fieldsError, setFieldsError] = useState(false);
    const [socialModal, setSocialModal] = useState({
        open: false,
        edit: false,
        socialId: null,
        platform: '',
        username: '',
        url: '',
    });

    const toggleSocialModal = (edit, id, platform = socialPlatforms[0], username = '', url = '') => {
        setSocialModal({ open: !socialModal.open, edit, socialId: id, platform, username, url });
        setFieldsError(false);
    };

    const handleAddSocial = () => {
        if ((socialModal.platform == 'Website' && socialModal.url.length > 0) || (socialModal.username.length > 0 && socialModal.url.length > 0)) {
            axios.post(`https://profilelinkapp.azurewebsites.net/api/socials?userId=${userInfo.userId}`, { platform: socialModal.platform, username: socialModal.username, url: socialModal.url }, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
                getData();
                toggleSocialModal();
            });
        } else {
            setFieldsError(true);
        }
    };

    const handleEditSocial = () => {
        console.log(socialModal.platform);
        console.log(socialModal.username);
        console.log(socialModal.url);
        if (socialModal.username.length > 0) {
            axios.put(`https://profilelinkapp.azurewebsites.net/api/socials/${socialModal.socialId}`, { platform: socialModal.platform, username: socialModal.username, url: socialModal.url }, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
                console.log('axios');
                getData();
                toggleSocialModal();
            });
        } else {
            setFieldsError(true);
        }
    };

    const handleRemoveSocial = () => {
        axios.delete(`https://profilelinkapp.azurewebsites.net/api/socials/${socialModal.socialId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
            getData();
            toggleSocialModal();
        });
    };
    return (
        <>
            {userInfo.userId ? (
                <>
                    <section className='flex flex-col gap-4 p-4 px-6 border-b md:border-gray-300 md:border md:rounded-xl'>
                        <div className='flex items-center justify-between'>
                            <p className='font-semibold text-md'>Social Accounts</p>
                            <button onClick={() => toggleSocialModal(false)} className='px-3 py-1.5 text-sm text-white transition rounded-md bg-secondary hover:bg-secondary-hover'>
                                Add
                            </button>
                        </div>
                        <div>
                            {userInfo.socials?.length > 0 ? (
                                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
                                    {userInfo.socials
                                        ?.sort((a, b) => a.platform.localeCompare(b.platform))
                                        .map((social, key) => {
                                            return (
                                                <div key={key} className='flex flex-col w-full px-3 py-2 bg-gray-100 rounded-xl'>
                                                    <div className='flex items-center'>
                                                        <Image src={`/${social.platform}-black.svg`} width='0' height='0' sizes='100%' className='w-6 h-6 select-none' />
                                                        <div className='flex flex-col flex-grow px-4 overflow-hidden lg:px-2 basis-1'>
                                                            <p className='flex-grow mb-0.5 text-sm font-semibold basis-0'>{social.platform}</p>
                                                            <p className='flex gap-1 overflow-hidden text-xs text-ellipsis whitespace-nowrap'>
                                                                <p>{social.platform == 'Website' ? social.url : `@${social.username}`}</p>
                                                            </p>
                                                        </div>
                                                        <button onClick={() => toggleSocialModal(true, social.socialId, social.platform, social.username, social.url)} className='px-3 py-1.5 text-sm font-medium transition bg-gray-200 rounded-md h-min hover:bg-gray-300'>
                                                            Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            ) : (
                                <p className='flex items-center justify-center w-full my-10'>Add a Social Account</p>
                            )}
                        </div>
                    </section>

                    {/* Add/Update Social Account Modal */}
                    <Dialog open={socialModal.open} onClose={() => toggleSocialModal()} className='fixed top-0 left-0 z-50 flex items-start justify-center w-screen h-screen pt-20 bg-black md:pt-0 md:items-center bg-opacity-20'>
                        <Dialog.Panel className='box-border w-5/6 max-w-2xl p-6 mx-6 transition-all duration-150 bg-white sm:w-4/6 rounded-2xl sm:min-w-1/6'>
                            <Dialog.Title className='flex items-center justify-between mb-4 font-semibold text-md'>
                                {socialModal.edit == true ? `Edit ${socialModal.platform}` : 'Add New Social'}
                                <div onClick={() => toggleSocialModal()} className='p-2 transition bg-gray-200 rounded-md cursor-pointer select-none hover:bg-gray-300'>
                                    <Image src='/closebtn.svg' width='0' height='0' sizes='100%' className='w-4 h-4' />
                                </div>
                            </Dialog.Title>

                            {socialModal.edit == false ? (
                                <div className='w-full mt-6'>
                                    <label className='block pr-4 mb-1.5 font-medium text-sm' for='platform'>
                                        Platform:
                                    </label>
                                    <select id='platform' name='platform' onChange={(e) => setSocialModal({ ...socialModal, [e.target.name]: e.target.value })} className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400'>
                                        {socialPlatforms.map((platform) => (
                                            <option>{platform}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                ''
                            )}

                            {socialModal.platform != 'Website' && (
                                <div className='relative w-full mt-6'>
                                    <label className='block pr-4 mb-1.5 font-medium text-sm' for='username'>
                                        Username:
                                    </label>
                                    <input
                                        id='username'
                                        type='text'
                                        name='username'
                                        value={socialModal.username}
                                        onChange={(e) => {
                                            setSocialModal({ ...socialModal, [e.target.name]: e.target.value });
                                            setFieldsError(false);
                                        }}
                                        className={fieldsError ? 'text-red-400 w-full p-2 leading-tight transition bg-white border border-red-400 rounded-md appearance-none focus:outline-none' : 'w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400'}
                                    />
                                    <div className='absolute top-0 right-0 text-sm font-semibold text-red-400 transition'>{fieldsError ? 'Required' : ''}</div>
                                </div>
                            )}

                            <div className='relative w-full mt-6'>
                                <label className='block pr-4 mb-1.5 font-medium text-sm' for='username'>
                                    URL:
                                </label>
                                <input
                                    id='url'
                                    type='text'
                                    name='url'
                                    value={socialModal.url}
                                    placeholder='https://www.website.com/username'
                                    onChange={(e) => {
                                        setSocialModal({ ...socialModal, [e.target.name]: e.target.value });
                                        setFieldsError(false);
                                    }}
                                    className={fieldsError ? 'text-red-400 w-full p-2 leading-tight transition bg-white border border-red-400 rounded-md appearance-none focus:outline-none' : 'w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400'}
                                />
                                <div className='absolute top-0 right-0 text-sm font-semibold text-red-400 transition'>{fieldsError ? 'Required' : ''}</div>
                            </div>

                            <div className='flex gap-4 mt-8'>
                                {socialModal.edit == true ? (
                                    <button onClick={() => handleRemoveSocial()} className='w-1/3 px-3 py-2 font-medium transition bg-gray-200 rounded-md select-none hover:bg-gray-300'>
                                        Remove
                                    </button>
                                ) : (
                                    ''
                                )}
                                <button onClick={socialModal.socialId ? () => handleEditSocial() : () => handleAddSocial()} className='w-full px-3 py-2 font-medium text-white transition rounded-md select-none bg-primary hover:bg-primary-hover'>
                                    {socialModal.socialId ? 'Save' : 'Add'}
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </>
            ) : (
                <SocialsSkeletonComponent />
            )}
        </>
    );
}
