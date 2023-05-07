import Image from 'next/image';
import Link from 'next/link';

export default function SignUp() {
    return (
        <div className='min-h-screen overflow-hidden bg-white sm:bg-gray-100'>
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

            <div className='flex items-center justify-center mx-auto max-w-7xl'>
                <div className='mx-2 right-0 flex flex-col gap-2 sm:p-10 px-4 mt-16 bg-white sm:shadow-xl sm:shadow-outline max-w-[550px] w-full sm:drop-shadow-xl rounded-xl transition'>
                    <h1 className='mb-3 text-2xl font-semibold'>Sign in to your account</h1>
                    <h3>
                        Already have an account?{' '}
                        <Link href='/sign-in' className='transition text-secondary hover:text-secondary-hover hover:underline'>
                            Sign in now!
                        </Link>
                    </h3>
                    <div className='w-full mt-6'>
                        <label className='block pr-4 mb-1.5 font-medium text-sm' for='name'>
                            Name
                        </label>
                        <input className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='name' type='text' />
                    </div>

                    <div className='w-full mt-3'>
                        <label className='block pr-4 mb-1.5 font-medium text-sm' for='username'>
                            Username
                        </label>
                        <input className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='username' type='text' />
                    </div>

                    <div className='w-full mt-3'>
                        <label className='block pr-4 mb-1.5 font-medium text-sm' for='password'>
                            Password
                        </label>
                        <input className='w-full p-2 leading-tight text-gray-700 transition bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500 hover:border-gray-400' id='password' type='password' />
                    </div>
                    <Link href='/profile/edit'>
                        <button className='w-full px-4 py-2 mt-6 text-sm font-medium text-white transition rounded-md bg-primary hover:bg-primary-hover h-min'>Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
