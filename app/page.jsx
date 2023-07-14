'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from './utils/getToken';
import jwt_decode from 'jwt-decode';
import dynamic from 'next/dynamic';

// Components
const HeaderComponent = dynamic(() => import('../components/header'));
const HeroComponent = dynamic(() => import('../components/home/hero'));
const FooterComponent = dynamic(() => import('../components/home/footer'));

export default function Home() {
    const [userInfo, setUserInfo] = useState({});
    const token = getToken();
    
    const getUserData = () => {
        if (token != null) {
            const decoded = jwt_decode(token);
            const userId = decoded.sub;
            axios
                .get(`https://profilelinkapp.azurewebsites.net/api/users/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((resp) => setUserInfo(resp.data))
                .catch((error) => console.log(error));
        }
    };

    useEffect(() => {
        getUserData();
    }, [token]);
    
    return (
        <main className='min-h-screen bg-primary'>
            <HeaderComponent userInfo={userInfo} transparent={true} fontColor={85} />
            <HeroComponent />
            <FooterComponent />
        </main>
    );
}
