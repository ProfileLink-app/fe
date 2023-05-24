import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata = {
    title: 'ProfileLink',
    description: 'Unleash the power of your bio with ProfileLink',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={`${inter.className} text-gray-600`}>
                <section>{children}</section>
            </body>
        </html>
    );
}
