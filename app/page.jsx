import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <main className='min-h-screen bg-primary'>
            <header className='z-40 w-screen bg-white border-b border-gray-200 '>
                <nav className='flex items-center justify-between py-4 pl-2 pr-6 mx-auto max-w-7xl'>
                    <div className='flex items-center flex-grow basis-0'>
                        <Link href='/' className='text-lg font-semibold tracking-wider text-primary'>
                            ProfileLink
                        </Link>
                    </div>
                    <div className='flex items-center justify-end gap-4'>
                        <Link href='/sign-in'>
                            <button className=' hover:underline'>Sign In</button>
                        </Link>
                        <Link href='/sign-up'>
                            <button className='px-3 py-1.5 text-sm text-white transition rounded-full bg-primary hover:bg-primary-hover'>Sign Up</button>
                        </Link>
                    </div>
                </nav>
            </header>
            <div>
                {/* <Image src='/iphone.svg' width='0' height='0' sizes='100%' className='w-auto h-96' /> */}
            </div>
        </main>
    );
}
