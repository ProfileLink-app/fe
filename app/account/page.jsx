'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getToken } from '../utils/getToken';

// Components
const HeaderComponent = dynamic(() => import('../../components/header'));
const AboutComponent = dynamic(() => import('../../components/account/about'));
const SocialsComponent = dynamic(() => import('../../components/account/socials'));
const LinksComponent = dynamic(() => import('../../components/account/links'));

export default function Account() {
    const { push } = useRouter();
    const [userInfo, setUserInfo] = useState({});
    console.log(userInfo)
    const token = getToken();
    
    const getUserData = () => {
        if (token == null) {
            localStorage.removeItem('token');
            push('/');
        } else {
            const decoded = jwt_decode(token);
            const userId = decoded.sub;
            axios
                .get(`https://localhost:7101/api/users/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((resp) => setUserInfo(resp.data))
                .catch((error) => console.log(error));
        }
    };

    useEffect(() => {
        getUserData();
    }, [token]);

    return (
        <div className='transition bg-white'>
            <HeaderComponent userInfo={userInfo} transparent={false} />
            <div className='relative top-0 flex justify-center h-full min-h-screen pb-5 mx-auto border-t border-gray-200 md:px-6 max-w-7xl'>
                <section className='flex flex-col w-full mt-5 md:flex-row'>
                    <div className='box-border flex flex-col w-full md:gap-4 md:pr-5 md:w-6/12'>
                        <AboutComponent userInfo={userInfo} setUserInfo={setUserInfo} token={token} getData={getUserData} />
                        <SocialsComponent userInfo={userInfo} token={token} getData={getUserData} />
                    </div>
                    <div className='box-border flex flex-col w-full md:gap-4 md:w-6/12'>
                        <LinksComponent userInfo={userInfo} token={token} getData={getUserData} />
                    </div>
                </section>
            </div>
        </div>
    );
}
