'use client';
import dynamic from 'next/dynamic';

// Components
const HeaderComponent = dynamic(() => import('../components/header'));
const HeroComponent = dynamic(() => import('../components/home/hero'));
const FooterComponent = dynamic(() => import('../components/home/footer'));

export default function Home() {
    return (
        <main className='min-h-screen bg-primary'>
            <HeaderComponent transparent={true} fontColor={85} />
            <HeroComponent />
            <FooterComponent />
        </main>
    );
}
