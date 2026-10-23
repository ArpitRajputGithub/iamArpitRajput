import './globals.css';
import { ViewTransition } from 'react';
import { JetBrains_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import MotionProvider from '@/components/MotionProvider';
import CommandPalette from '@/components/CommandPalette';
import SpotlightTracker from '@/components/fx/SpotlightTracker';

// Mono font for system labels, downloaded at build time and served from this site (no request to Google from visitors).
// Headings and body stay in Cabinet Grotesk, the site's original font (see globals.css).
const mono = JetBrains_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
    metadataBase: new URL('https://iamarpitrajput.dev'),
    title: {
        default: 'Arpit Rajput - Software Engineer @Vaatun',
        template: '%s · Arpit Rajput', // sub-pages set their own title, e.g. "For Recruiters · Arpit Rajput"
    },
    description: 'Full stack software engineer building scalable web, fintech, healthcare, and community products with Next.js, Node.js, NestJS, FastAPI, PostgreSQL, and AWS.',
    keywords: ['Arpit Rajput', 'software engineer', 'full stack developer', 'Next.js', 'React', 'Node.js', 'NestJS', 'FastAPI', 'portfolio'],
    authors: [{ name: 'Arpit Rajput' }],
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
    openGraph: {
        title: 'Arpit Rajput - Software Engineer @Vaatun',
        description: 'Portfolio, projects, experience, and proof of work from Arpit Rajput.',
        url: '/',
        siteName: 'Arpit Rajput',
        images: [
            {
                url: '/me.jpg',
                width: 719,
                height: 719,
                alt: 'Arpit Rajput',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary', // the share image is square, so the small card fits it
        title: 'Arpit Rajput - Software Engineer @Vaatun',
        description: 'Full stack software engineer building scalable products across fintech, healthcare, and communities.',
        images: ['/me.jpg'],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={mono.variable} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
                    }}
                />
            </head>
            <body>
                <MotionProvider>
                    <Nav />
                    {/* One reading column with dashed edges, carried over from the original site */}
                    <div className="mx-auto max-w-3xl px-6 sm:border-x sm:border-dashed sm:border-line-strong">
                        {/* Page changes cross-fade instead of blinking (View Transitions API) */}
                        <ViewTransition>
                            <main>{children}</main>
                        </ViewTransition>
                        <Footer />
                    </div>
                    <CommandPalette />
                    <SpotlightTracker />
                </MotionProvider>
            </body>
        </html>
    );
}
