import './globals.css';

export const metadata = {
    metadataBase: new URL('https://iamarpitrajput.dev'),
    title: 'Arpit Rajput - Software Engineer @1Fi',
    description: 'Full stack software engineer building scalable web, fintech, healthcare, and community products with Next.js, Node.js, NestJS, FastAPI, PostgreSQL, and AWS.',
    keywords: ['Arpit Rajput', 'software engineer', 'full stack developer', 'Next.js', 'React', 'Node.js', 'NestJS', 'FastAPI', 'portfolio'],
    authors: [{ name: 'Arpit Rajput' }],
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
    openGraph: {
        title: 'Arpit Rajput - Software Engineer @1Fi',
        description: 'Portfolio, projects, experience, and proof of work from Arpit Rajput.',
        url: '/',
        siteName: 'Arpit Rajput',
        images: [
            {
                url: '/me.jpg',
                width: 1200,
                height: 1200,
                alt: 'Arpit Rajput',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Arpit Rajput - Software Engineer @1Fi',
        description: 'Full stack software engineer building scalable products across fintech, healthcare, and communities.',
        images: ['/me.jpg'],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
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
                {/* Dashed decorative lines */}
                <div className="dashed-lines">
                    <div className="dashed-line-vertical left-10" />
                    <div className="dashed-line-vertical left-30" />
                    <div className="dashed-line-vertical right-10" />
                    <div className="dashed-line-vertical right-30" />
                </div>
                {children}
            </body>
        </html>
    );
}
