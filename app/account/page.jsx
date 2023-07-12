'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Components
const HeaderComponent = dynamic(() => import('../../components/header'));
const AboutComponent = dynamic(() => import('../../components/about'));
const SocialsComponent = dynamic(() => import('../../components/socials'));
const LinksComponent = dynamic(() => import('../../components/links'));

export default function Edit() {
    const [userInfo, setUserInfo] = useState({});
    const { push } = useRouter();

    let token, userId;
    token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    userId = decoded.sub;
    const getData = () => {
        if (localStorage.getItem('token') == null) {
            // push('/');
        } else {
            axios.get(`https://localhost:7101/api/users/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((resp) => {
                setUserInfo(resp.data);
            });
        }
    };

    useEffect(() => {
        getData();
    }, [token]);

    return (
        <div className='transition bg-white'>
            <HeaderComponent userInfo={userInfo} transparent={false} />
            <div className='relative top-0 flex justify-center h-full min-h-screen pb-5 mx-auto border-t border-gray-200 md:px-6 max-w-7xl'>
                <section className='flex flex-col w-full mt-5 md:flex-row'>
                    <div className='box-border flex flex-col w-full md:gap-4 md:pr-5 md:w-6/12'>
                        <AboutComponent userInfo={userInfo} setUserInfo={setUserInfo} token={token} getData={getData} />
                        <SocialsComponent userInfo={userInfo} token={token} getData={getData} />
                    </div>
                    <div className='box-border flex flex-col w-full md:gap-4 md:w-6/12'>
                        <LinksComponent userInfo={userInfo} token={token} getData={getData} />
                    </div>
                </section>
            </div>
        </div>
    );
}
