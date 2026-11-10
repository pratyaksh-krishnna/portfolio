import BlogCard from '@/components/BlogCard';
import FloatingNav from '@/components/FloatingNav';
import { blogs } from '@/data/blogs';

export default function BlogPage() {
    const headingFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace", fontWeight: 600 };
    const geistMonoFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" };

    return (
        <div className="min-h-screen text-page-text overflow-x-clip relative z-[2]" style={geistMonoFont}>
            <FloatingNav />
            <main className="page-enter relative">
                <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                    <h1 className="section-heading text-theme-primary mb-10" style={headingFont}>
                        Blog
                    </h1>

                    {blogs.length > 0 ? (
                        <div className="space-y-4">
                            {blogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-theme-divider bg-theme-card px-5 py-12 text-center">
                            <p className="text-theme-primary">No posts yet.</p>
                            <p className="mt-2 text-sm text-theme-muted">Writing is on the way. Check back soon.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
