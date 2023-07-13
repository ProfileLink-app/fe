export default function ProfileSkeletonComponent() {
    return (
        <section className='flex flex-col items-center'>
            <div width='0' height='0' sizes='100%' className='w-24 h-24 mb-6 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
            <h1 className='mb-2 w-32 animate-pulse bg-gray-200 dark:bg-gray-300 h-[1.75rem] rounded-full' />
            <h2 className='w-32 h-5 mb-5 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
            <h2 className='w-64 h-6 mb-5 text-transparent bg-gray-200 rounded-full text-md animate-pulse dark:bg-gray-300' />

            <div className='flex flex-wrap justify-center gap-3 select-none'>
                <div className='p-3 rounded-md h-[3.125rem] w-[3.125rem] animate-pulse border border-gray-200 dark:border-gray-300'>
                    <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
                </div>
                <div className='p-3 rounded-md h-[3.125rem] w-[3.125rem] animate-pulse border border-gray-200 dark:border-gray-300'>
                    <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
                </div>
                <div className='p-3 rounded-md h-[3.125rem] w-[3.125rem] animate-pulse border border-gray-200 dark:border-gray-300'>
                    <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
                </div>
                <div className='p-3 rounded-md h-[3.125rem] w-[3.125rem] animate-pulse border border-gray-200 dark:border-gray-300'>
                    <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse dark:bg-gray-300' />
                </div>
            </div>

            <div className='flex flex-col w-full gap-4 pt-5 mt-5 sm:max-w-3xl'>
                <div className='flex items-center justify-between w-full gap-4 px-5 py-5 border border-gray-200 rounded-md animate-pulse dark:border-gray-300'>
                    <div className='flex justify-between'>
                        <div className='w-10 h-10 p-0.5 rounded-md bg-gray-200 dark:bg-gray-300' />
                        <div className='flex flex-col px-2 whitespace-nowrap text-ellipsis'>
                            <div class='h-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48' />
                            <div class='h-3 bg-gray-100 rounded-full dark:bg-gray-300 w-56' />
                        </div>
                    </div>
                    <div className='w-5 h-5 bg-gray-200 rounded-md dark:bg-gray-300' />
                </div>
                <div className='flex items-center justify-between w-full gap-4 px-5 py-5 border border-gray-200 rounded-md animate-pulse dark:border-gray-300'>
                    <div className='flex justify-between'>
                        <div className='w-10 h-10 p-0.5 rounded-md bg-gray-200 dark:bg-gray-300' />
                        <div className='flex flex-col px-2 whitespace-nowrap text-ellipsis'>
                            <div class='h-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48'></div>
                            <div class='h-3 bg-gray-100 rounded-full dark:bg-gray-300 w-56'></div>
                        </div>
                    </div>
                    <div className='w-5 h-5 bg-gray-200 rounded-md dark:bg-gray-300' />
                </div>
                <div className='flex items-center justify-between w-full gap-4 px-5 py-5 border border-gray-200 rounded-md animate-pulse dark:border-gray-300'>
                    <div className='flex justify-between'>
                        <div className='w-10 h-10 p-0.5 rounded-md bg-gray-200 dark:bg-gray-300' />
                        <div className='flex flex-col px-2 whitespace-nowrap text-ellipsis'>
                            <div class='h-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48'></div>
                            <div class='h-3 bg-gray-100 rounded-full dark:bg-gray-300 w-56'></div>
                        </div>
                    </div>
                    <div className='w-5 h-5 bg-gray-200 rounded-md dark:bg-gray-300' />
                </div>
                <div className='flex items-center justify-between w-full gap-4 px-5 py-5 border border-gray-200 rounded-md animate-pulse dark:border-gray-300'>
                    <div className='flex justify-between'>
                        <div className='w-10 h-10 p-0.5 rounded-md bg-gray-200 dark:bg-gray-300' />
                        <div className='flex flex-col px-2 whitespace-nowrap text-ellipsis'>
                            <div class='h-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48'></div>
                            <div class='h-3 bg-gray-100 rounded-full dark:bg-gray-300 w-56'></div>
                        </div>
                    </div>
                    <div className='w-5 h-5 bg-gray-200 rounded-md dark:bg-gray-300' />
                </div>
            </div>
        </section>
    );
}
