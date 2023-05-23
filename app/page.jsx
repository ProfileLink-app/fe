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
                            <button className='px-3 py-1.5 text-sm text-white transition rounded-full bg-gray-700 hover:bg-gray-900'>Sign Up</button>
                        </Link>
                    </div>
                </nav>
            </header>
            {/* Hero Section */}
            <div className='flex flex-col items-start justify-start h-full min-h-screen gap-20 px-6 py-4 mx-auto max-w-7xl'>
                <div className='flex flex-col items-center w-full mt-20 text-white'>
                    <div className='mb-5 text-4xl font-bold'>
                        Unleash the power of your bio with <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500'>ProfileLink</span>
                    </div>
                    <div className='text-xl font-medium'>Effortlessly driving engagement and turning your audience into devoted fans.</div>
                </div>
                <div className='relative w-full sm:min-w-[40rem] group h-full'>
                    <Image src='/hero-photo.jpg' width='0' height='0' sizes='100%' className='transition-all duration-150 absolute left-[10%] sm:left-[20%] w-3/12 shadow-2xl min-h-full rounded-2xl hover:scale-110 hover:z-20 group-hover:left-[10%] rotate-[-6deg] mt-2' />
                    <Image src='/hero-photo.jpg' width='0' height='0' sizes='100%' className='relative left-0 right-0 z-10 w-3/12 mx-auto transition-all duration-150 shadow-2xl l h-fit rounded-2xl hover:scale-110' />
                    <Image src='/hero-photo.jpg' width='0' height='0' sizes='100%' className='transition-all duration-150 absolute right-[10%] sm:right-[20%] w-3/12 shadow-2xl min-h-full rounded-2xl hover:scale-110 hover:z-20 rotate-6 mt-2 top-0 group-hover:right-[10%]' />
                </div>
                <div className='flex justify-center w-full gap-4'>
                    <Link href='/sign-in'>
                        <button className='px-6 py-2 text-xs font-semibold text-white transition-all duration-300 border rounded-md hover:border-gray-300 hover:text-gray-300 sm:text-sm md:text-base'>Sign In</button>
                    </Link>
                    <Link href='/sign-up'>
                        <button className='px-6 py-2 text-xs font-semibold transition-all duration-300 bg-white rounded-md sm:text-sm md:text-base hover:bg-gray-300'>Create a Free Account</button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
