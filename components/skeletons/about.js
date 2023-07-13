export default function AboutSkeletonComponent() {
    return (
        <section className='flex flex-col gap-4 p-4 px-6 border-b border-gray-200 md:border md:rounded-xl animate-pulse dark:border-gray-300'>
            <div className='flex items-center justify-between'>
                <div class='h-6 mb-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32' />
                <div className='h-8 bg-gray-200 rounded-md w-14 dark:bg-gray-300' />
            </div>

            <div className='flex items-center gap-2'>
                <div className='w-16 h-16 bg-gray-200 rounded-full dark:bg-gray-300' />
                <div className='h-8 ml-2 bg-gray-200 rounded-full w-44 dark:bg-gray-300' />
            </div>

            <div className='w-full'>
                <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                <div className='h-5 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
            </div>

            <div className='w-full'>
                <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                <div className='h-5 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
            </div>

            <div className='w-full'>
                <div className='w-20 h-4 mb-1 bg-gray-200 rounded-full dark:bg-gray-300' />
                <div className='flex items-center justify-between gap-4'>
                    <div className='h-5 bg-gray-200 rounded-full w-28 dark:bg-gray-300' />
                    <div className='w-10 h-8 bg-gray-200 rounded-md dark:bg-gray-300' />
                </div>
            </div>
        </section>
    );
}
