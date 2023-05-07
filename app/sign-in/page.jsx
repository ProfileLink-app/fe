import Image from 'next/image';
import Link from 'next/link';

export default function SignIn() {
    return (
        <div className='flex flex-col h-screen mx-auto overflow-hidden max-w-7xl sm:flex-row'>
            <section className='px-4 my-10 w-fill sm:w-6/12'>
                <div className='mb-10 text-lg font-bold'>
                    <Link href='/'>ProfileLink</Link>
                </div>
                <h1 className='text-2xl font-bold text-center'>Sign in to your Account</h1>

                <form className='flex flex-col gap-4 mt-5'>
                    <div className='w-full'>
                        <label className='block pr-4 mb-1' for='username'>
                            Username
                        </label>
                        <div className='relative flex items-center'>
                            <input className='w-full p-2 leading-tight text-gray-700 transition bg-gray-100 border-2 border-gray-200 rounded-md appearance-none focus:outline-none focus:border-gray-400 hover:border-gray-300' id='username' type='text' />
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className='flex items-center justify-between'>
                            <label className='block pr-4 mb-1' for='password'>
                                Password
                            </label>
                            <span className='text-sm cursor-pointer hover:underline'>Forgot password?</span>
                        </div>
                        <input className='w-full p-2 leading-tight text-gray-700 transition bg-gray-100 border-2 border-gray-200 rounded-md appearance-none focus:outline-none focus:border-gray-400 hover:border-gray-300' id='password' type='password' />
                    </div>

                    <div className='flex justify-between mt-5'>
                        <div className='flex items-center justify-between w-full'>
                            <Link href='/profile/edit'>
                                <button className='px-8 py-2 text-sm font-medium text-white transition rounded-md bg-primary hover:bg-primary-hover h-min'>Sign In</button>
                            </Link>

                            <p>
                                Need an account?{' '}
                                <span className='font-bold cursor-pointer hover:underline text-secondary'>
                                    <Link href='/sign-up'>Sign Up</Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </form>
            </section>
            <section className='flex justify-center mx-4 align-middle w-fill sm:w-6/12'>
                <div className='min-w-full m-4 align-middle sm:my-20'>
                    <Image src='/login.svg' width='0' height='0' sizes='100%' className='w-6/12 h-auto mx-auto sm:w-full' />
                </div>
            </section>
        </div>
    );
}
