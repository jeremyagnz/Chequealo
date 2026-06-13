import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});
export const metadata = {
    title: 'Chequealo AI',
    description: 'Verify news, claims, and rumors with AI-powered fact-checking.',
};
export default function RootLayout({ children }) {
    return (<html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>);
}
