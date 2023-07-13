import Image from 'next/image';

export default function LinkComponent({ link, fontColor }) {
    return (
        <a href={link.url} target='_blank'>
            <div className='flex items-center justify-between w-full gap-4 px-5 py-5 transition rounded-md cursor-pointer bg-gray-950 bg-opacity-40 hover:bg-opacity-60' style={fontColor <= 30 ? { color: '#FFFFFF', backgroundColor: '#4B5563' } : { color: '#4B5563', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB' }}>
                <div className='flex justify-between overflow-hidden'>
                    <Image src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`} width='0' height='0' sizes='100%' className='w-10 h-10 p-0.5 bg-white rounded-md' />
                    <div className='flex flex-col px-2 overflow-hidden whitespace-nowrap text-ellipsis'>
                        <p className='pb-1 overflow-hidden text-sm font-semibold whitespace-nowrap text-ellipsis'>{link.title}</p>
                        <p className='overflow-hidden text-xs text-ellipsis whitespace-nowrap'>{link.url}</p>
                    </div>
                </div>
                <Image src={fontColor <= 30 ? '/openlink.svg' : '/openlink-black.svg'} width='0' height='0' sizes='100%' className='w-5 h-5' />
            </div>
        </a>
    );
}
