import NavLinks from '@/components/NavLinks';
import ThemeToggle from '@/components/ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';

// The floating glass nav used on the inner pages (projects, blog).
export default function FloatingNav() {
    return (
        <nav aria-label="Main" className="page-enter fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div
                className="flex items-center gap-5 md:gap-7 px-5 md:px-6 py-3 rounded-xl"
                style={{
                    background: 'var(--theme-nav-bg)',
                    backdropFilter: 'blur(32px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(32px) saturate(150%)',
                    border: '1px solid var(--theme-nav-border)',
                    boxShadow: 'var(--theme-nav-shadow)',
                }}
            >
                <Link href="/portfolio" className="hover:scale-105 transition-transform shrink-0" aria-label="Home">
                    <Image src="/images/avatar.jpg" alt="" width={32} height={32} className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-sm object-cover cursor-pointer" />
                </Link>
                <NavLinks />
                <ThemeToggle />
            </div>
        </nav>
    );
}
