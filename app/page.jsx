import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <main className='min-h-screen bg-primary'>
            <header className='z-40 w-full'>
                <nav className='flex items-center justify-between px-6 py-4 mx-auto max-w-7xl'>
                    <div className='flex items-center flex-grow basis-0'>
                        <Link href='/' className='text-lg font-semibold tracking-wider text-white'>
                            ProfileLink
                        </Link>
                    </div>
                    <div className='flex items-center justify-end gap-4'>
                        <Link href='/sign-in'>
                            <button className='text-white hover:underline'>Sign In</button>
                        </Link>
                        <Link href='/sign-up'>
                            <button className='px-3 py-1.5 text-sm text-white transition rounded-full bg-purple-800 hover:bg-purple-900'>Sign Up</button>
                        </Link>
                    </div>
                </nav>
            </header>
            {/* Hero Section */}
            <div className='flex flex-col items-start justify-start h-full gap-20 px-6 py-4 mx-auto max-w-7xl'>
                <div className='flex flex-col items-center w-full mt-10 text-white sm:mt-20'>
                    <div className='mb-5 text-4xl font-bold'>
                        Unleash the power of your bio with <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500'>ProfileLink</span>
                    </div>
                    <div className='text-xl font-medium'>Effortlessly driving engagement and turning your audience into devoted fans.</div>
                </div>
                <div className='relative w-full sm:min-w-[40rem] group h-full'>
                    <Image src='/hero-1.png' width='0' height='0' sizes='100%' className='transition-all duration-150 absolute left-[10%] sm:left-[20%] w-3/6 sm:w-3/12 shadow-2xl min-h-full rounded-2xl sm:hover:scale-110 sm:hover:z-20 sm:group-hover:left-[15%] rotate-[-6deg] sm:group-hover:mt-2' />
                    <Image src='/hero-2.png' width='0' height='0' sizes='100%' className='relative left-0 right-0 z-10 w-3/6 mx-auto transition-all duration-150 shadow-2xl sm:w-3/12 l h-fit rounded-2xl sm:hover:scale-110' />
                    <Image src='/hero-3.png' width='0' height='0' sizes='100%' className='transition-all duration-150 absolute right-[10%] sm:right-[20%] w-3/6 sm:w-3/12 shadow-2xl min-h-full rounded-2xl sm:hover:scale-110 sm:hover:z-20 rotate-6 sm:group-hover:mt-2 top-0 sm:group-hover:right-[15%]' />
                </div>
                <div className='flex justify-center w-full gap-4 mb-20'>
                    <Link href='/sign-in'>
                        <button className='px-6 py-4 text-xs font-semibold text-white transition-all duration-300 border rounded-md hover:border-gray-300 hover:text-gray-300 sm:text-sm md:text-base'>Sign In</button>
                    </Link>
                    <Link href='/sign-up'>
                        <button className='px-6 py-4 text-xs font-semibold transition-all duration-300 bg-white rounded-md sm:text-sm md:text-base hover:bg-gray-300'>Create a Free Account</button>
                    </Link>
                </div>
            </div>
            <footer className='w-full bg-primary-hover'>
                <div className='flex items-center justify-between p-6 mx-auto text-white max-w-7xl'>
                    <p className='font-semibold tracking-wider text-md'>
                        ProfileLink
                    </p>
                    <div className='text-xs'>© 2023 ProfileLink. All rights reserved</div>
                </div>
            </footer>
        </main>
    );
}
