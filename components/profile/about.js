import Image from 'next/image';

import user from '../../public/user.png';

export default function AboutComponent({ profileData, fontColor }) {
    return (
        <>
            <Image src={user} width='0' height='0' sizes='100%' className='w-24 h-24 p-2 mb-6 bg-white rounded-full bg-opacity-40' />
            <h1 className='mb-2 text-3xl font-semibold'>{profileData.firstName} {profileData.lastName}</h1>
            <h2 className='mb-5 text-sm'>@{profileData.username}</h2>
            <h2 className='mb-5 text-md'>{profileData.bio}</h2>
            <div className='flex flex-wrap justify-center gap-3 select-none'>
                {profileData.socials?.map((item, key) => {
                    return (
                        <a href={item.url} target='_blank' key={key}>
                            <div className='p-3 transition rounded-md cursor-pointer bg-opacity-40 hover:bg-opacity-60' style={fontColor < 186 ? { border: '1px solid #FFFFFF' } : { border: '1px solid #4B5563' }}>
                                <Image src={fontColor < 186 ? `/${item.platform}.svg` : `/${item.platform}-black.svg`} width='0' height='0' sizes='100%' className='w-6 h-6 mx-auto text-white fill-white sm:w-full' />
                            </div>
                        </a>
                    );
                })}
            </div>
        </>
    );
}
