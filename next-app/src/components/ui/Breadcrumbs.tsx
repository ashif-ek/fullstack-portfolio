'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import React from 'react';

const Breadcrumbs = () => {
    const pathname = usePathname();
    if (pathname === '/') return null;

    const pathSegments = pathname.split('/').filter(segment => segment);
    
    return (
        <nav aria-label="Breadcrumb" className="mb-8 flex">
            <ol className="flex items-center space-y-0 text-xs font-mono uppercase tracking-widest text-academic-muted">
                <li className="flex items-center">
                    <Link href="/" className="hover:text-academic-primary transition-colors flex items-center gap-1">
                        <Home className="w-3 h-3" />
                        <span>Home</span>
                    </Link>
                </li>
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathSegments.length - 1;
                    const title = segment.replace(/-/g, ' ');

                    return (
                        <React.Fragment key={href}>
                            <li className="px-2">
                                <ChevronRight className="w-3 h-3 opacity-30" />
                            </li>
                            <li className="flex items-center">
                                {isLast ? (
                                    <span className="text-academic-primary font-bold line-clamp-1 max-w-[200px]" aria-current="page">
                                        {title}
                                    </span>
                                ) : (
                                    <Link href={href} className="hover:text-academic-primary transition-colors">
                                        {title}
                                    </Link>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
