import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'قطب‌نمای مسیر تو',description:'تمرین و بازتاب برای ساخت مسیر حرفه‌ای'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fa" dir="rtl"><body>{children}</body></html>;}
