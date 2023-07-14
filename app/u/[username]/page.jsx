'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/utils/getToken';

// Components
const HeaderComponent = dynamic(() => import('../../../components/header'));
const AboutComponent = dynamic(() => import('../../../components/profile/about'));
const LinkComponent = dynamic(() => import('../../../components/profile/link'));
const ProfileSkeletonComponent = dynamic(() => import('../../../components/skeletons/profile'));

export default function Profile({ params }) {
    const { push } = useRouter();
    const username = params.username;
    const [profileData, setProfileData] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const token = getToken();

    function getProfileData() {
        axios
            .get(`https://profilelinkapp.azurewebsites.net/api/users/profile/${username}`)
            .then((resp) => {
                if (resp.status == 200) {
                    setProfileData(resp.data);
                }
            })
            .catch((error) => console.log(error));
    }

    const getUserData = () => {
        if (token == null) {
            localStorage.removeItem('token');
            push('/sign-in')
        } else {
            const decoded = jwt_decode(token);
            const userId = decoded.sub;
            axios
                .get(`https://profilelinkapp.azurewebsites.net/api/users/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((resp) => {
                    setUserInfo(resp.data);
                })
                .catch((error) => console.log(error));
        }
    };

    useEffect(() => {
        getProfileData();
        getUserData();
    }, [username, token]);

    function hexToRGB(h) {
        let r = '0x' + h[0] + h[1];
        let g = '0x' + h[2] + h[3];
        let b = '0x' + h[4] + h[5];
        return [+r, +g, +b];
    }

    const RGB_THEME = profileData.theme && hexToRGB(profileData.theme);
    const FONT_COLOR = RGB_THEME && RGB_THEME[0] * 0.299 + +RGB_THEME[1] * 0.587 + +RGB_THEME[2] * 0.114;

    return (
        <div style={{ backgroundColor: `#${profileData.theme}` }} className='min-h-screen'>
            <HeaderComponent userInfo={userInfo} transparent={true} fontColor={FONT_COLOR} />
            <div className='relative top-0 flex flex-col h-full px-6 pb-10 mx-auto mt-5 max-w-7xl'>
                {profileData.userId ? (
                    <section className='flex flex-col items-center' style={FONT_COLOR < 186 ? { color: '#FFFFFF' } : { color: '#4B5563' }}>
                        <AboutComponent profileData={profileData} fontColor={FONT_COLOR} />

                        <div className='flex flex-col w-full gap-4 pt-5 mt-5 sm:max-w-3xl'>
                            {profileData.links
                                ?.filter((link) => link.active)
                                .map((link, key) => {
                                    return (
                                        <LinkComponent link={link} fontColor={FONT_COLOR} key={key} />
                                    );
                                })}
                        </div>
                    </section>
                ) : (
                    <ProfileSkeletonComponent />
                )}
            </div>
        </div>
    );
}
