'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
    { href: '/portfolio', path: '/', label: 'home' },
    { href: '/portfolio/projects', path: '/projects', label: 'projects' },
    { href: '/portfolio/blog', path: '/blog', label: 'blog' },
];

export default function NavLinks({ className = '' }: { className?: string }) {
    // On the portfolio.* subdomain the middleware rewrites paths, so compare without the /portfolio prefix.
    const path = usePathname().replace(/^\/portfolio/, '') || '/';

    return (
        <ul className={`flex items-center gap-5 md:gap-7 text-sm ${className}`}>
            {LINKS.map((link) => {
                const active = link.path === '/' ? path === '/' : path.startsWith(link.path);
                return (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            aria-current={active ? 'page' : undefined}
                            className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-primary ${active ? 'text-theme-primary' : 'text-theme-secondary hover:text-theme-primary'}`}
                        >
                            {link.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
