import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 relative">
            <div className="w-full max-w-sm md:max-w-4xl">
                {children}
            </div>
        </div>
    );
}
