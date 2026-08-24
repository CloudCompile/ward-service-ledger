import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title:'Common Thread · Ward Service', description:'A living record of service across our ward.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
