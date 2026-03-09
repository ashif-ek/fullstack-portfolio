'use client';
import { useHealth } from '../../hooks/useHealth';
import { useIsFetching } from '@tanstack/react-query';

export default function StatusBadge() {
    const { data: isLive } = useHealth();
    const isFetching = useIsFetching();

    // If we are live and fetching -> Syncing
    // If we are live and idle -> Live Data
    // If we are dead -> Mock Data

    let statusText = 'Mock Data';
    let colorClass = 'bg-red-500/20 text-red-500 border-red-500/30';
    let dotClass = 'bg-red-500';

    if (isLive) {
        if (isFetching > 0) {
            statusText = 'Syncing...';
            colorClass = 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
            dotClass = 'bg-yellow-500 animate-pulse';
        } else {
            statusText = 'Live Data';
            colorClass = 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30';
            dotClass = 'bg-emerald-500';
        }
    }

    return (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono font-medium transition-colors duration-500 ${colorClass}`}>
            <span className={`w-2 h-2 rounded-full ${dotClass}`} />
            {statusText}
        </div>
    );
}
