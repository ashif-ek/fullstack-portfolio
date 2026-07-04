'use client';
import { useHealth } from '../../hooks/useHealth';
import { useIsFetching } from '@tanstack/react-query';

export default function StatusBadge() {
    const { data: isLive, isLoading: isHealthLoading } = useHealth();
    const isFetching = useIsFetching();

    // If we are live and fetching -> Syncing
    // If we are live and idle -> Live Data
    // If we are dead -> Mock Data
    // If we are still checking -> Syncing

    let statusText = 'Mock Data';
    let colorClass = 'text-red-500';
    let dotClass = 'bg-red-500';

    if (isHealthLoading || (isLive && isFetching > 0)) {
        statusText = 'Syncing...';
        colorClass = 'text-amber-500';
        dotClass = 'bg-amber-500 animate-pulse';
    } else if (isLive) {
        statusText = 'Live Data';
        colorClass = 'text-emerald-500';
        dotClass = 'bg-emerald-500';
    }

    return (
        <div className={`fixed bottom-4 right-6 z-50 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-opacity duration-300 opacity-70 hover:opacity-100 cursor-default ${colorClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
            {statusText}
        </div>
    );
}
