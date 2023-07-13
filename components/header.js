'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import user from '../public/user.png';

export default function HeaderComponent({ userInfo, transparent, fontColor }) {
    const { push } = useRouter();
    const signOutUser = () => {
        localStorage.removeItem('token');
        push('/sign-in');
    };

    return (
        <header className='z-40 w-full text-gray-950' style={transparent ? { backgroundColor: 'transparent' } : { background: '#FFFFFF', color: '#4B5563' }}>
            <nav className='flex items-center justify-between px-6 py-2 mx-auto max-w-7xl min-h-[64px]'>
                <div className='flex items-center flex-grow basis-0'>
                    <Link href='/' className='text-lg font-semibold tracking-wider ' style={transparent ? { color: fontColor < 186 ? '#FFFFFF' : '#4B5563' } : { color: '#4B5563' }}>
                        ProfileLink
                    </Link>
                </div>
                <div className='flex items-center justify-end flex-grow gap-4 basis-0'>
                    {userInfo?.userId ? (
                        <Menu as='div' className='relative z-50 flex justify-end select-none text-["#4B5563"]'>
                            <Menu.Button className='flex items-center justify-end flex-grow gap-2 font-bold tracking-wider bg-white rounded-full basis-0'>
                                <Image src={user} alt='profile photo' width='0' height='0' sizes='100%' className={`w-10 h-10 p-1 bg-[#${userInfo.theme}] rounded-full bg-opacity-40`} />
                            </Menu.Button>
                            <Menu.Items className='absolute right-0 flex flex-col gap-2 p-4 bg-white shadow-2xl shadow-outline drop-shadow-xl top-12 min-w-max rounded-2xl'>
                                <Menu.Item as='div' disabled className='flex gap-4 px-2 mb-2 pr-14'>
                                    <Image src={user} alt='profile photo' width='0' height='0' sizes='100%' className={`w-12 h-12 p-1 bg-[#${userInfo.theme}] rounded-full bg-opacity-40`} />
                                    <div className='flex flex-col'>
                                        <p className='text-lg font-bold'>
                                            {userInfo.firstName} {userInfo.lastName}
                                        </p>
                                        <span className='text-xs opacity-75'>@{userInfo.username}</span>
                                    </div>
                                </Menu.Item>
                                <Link href='/account'>
                                    <Menu.Item as='div' className='flex p-2 transition rounded-md cursor-pointer hover:bg-gray-200'>
                                        Account
                                    </Menu.Item>
                                </Link>
                                <Link href={`/u/${userInfo.username}`}>
                                    <Menu.Item as='div' className='flex p-2 transition rounded-md cursor-pointer hover:bg-gray-200'>
                                        View Page
                                    </Menu.Item>
                                </Link>
                                <Menu.Item as='div' onClick={signOutUser} className='flex p-2 transition rounded-md cursor-pointer hover:bg-gray-200'>
                                    Sign Out
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    ) : (
                        <div className='flex items-center justify-end gap-4' style={transparent ? { color: fontColor < 186 ? '#FFFFFF' : '#4B5563' } : { color: '#4B5563' }}>
                            <Link href='/sign-in'>
                                <button className='transition hover:underline'>Sign In</button>
                            </Link>
                            <Link href='/sign-up'>
                                <button className='px-3 py-1.5 text-sm text-white transition rounded-full bg-purple-800 hover:bg-purple-900'>Sign Up</button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
