'use client';

import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const success = await login(username, password);
            if (success) {
                router.push('/admin');
            } else {
                setError('Invalid administrative credentials.');
            }
        } catch (err) {
            setError('An error occurred during authentication.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 flex items-center justify-center bg-academic-paper px-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif font-bold text-academic-primary mb-2 italic">
                        Administrative Access<span className="text-academic-accent">.</span>
                    </h1>
                    <p className="text-academic-muted text-sm uppercase tracking-widest font-bold">
                        Secure System Gatekeeper
                    </p>
                </div>

                <div className="bg-academic-bg border border-academic-border p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 text-center italic">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-academic-muted flex items-center gap-2">
                                <User size={12} /> Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full bg-academic-paper border border-academic-border p-3 text-academic-primary focus:outline-none focus:border-academic-accent transition-colors"
                                placeholder="Admin ID"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-academic-muted flex items-center gap-2">
                                <Lock size={12} /> Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-academic-paper border border-academic-border p-3 text-academic-primary focus:outline-none focus:border-academic-accent transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full academic-button bg-academic-primary text-white py-4 uppercase tracking-widest font-bold hover:bg-academic-primary/90 transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Authenticating...' : 'Authorize Access'}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-academic-border pt-6">
                        <a 
                            href="/" 
                            className="text-xs text-academic-muted hover:text-academic-primary transition-colors font-bold uppercase tracking-widest"
                        >
                            ← Return to Public Records
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
