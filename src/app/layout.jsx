import './globals.css';

export const metadata = {
    title: 'Hi, I am Arpit',
    description: 'Software engineer passionate about building amazing digital experiences.',
    keywords: ['developer', 'portfolio', 'full stack', 'react', 'nextjs'],
    authors: [{ name: 'Arpit' }],
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
    openGraph: {
        title: 'Hi, I am Arpit',
        description: 'Software engineer passionate about building amazing digital experiences.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hi, I am Arpit',
        description: 'Software engineer passionate about building amazing digital experiences.',
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
