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
    let colorClass = 'bg-red-500/10 text-red-500 border-red-500/20';
    let dotClass = 'bg-red-500';

    if (isHealthLoading || (isLive && isFetching > 0)) {
        statusText = 'Syncing...';
        colorClass = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
        dotClass = 'bg-amber-500 animate-pulse';
    } else if (isLive) {
        statusText = 'Live Data';
        colorClass = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        dotClass = 'bg-emerald-500';
    }

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-xl text-[10px] uppercase tracking-widest font-bold transition-all duration-700 shadow-lg hover:scale-105 active:scale-95 cursor-default group ${colorClass}`}>
            <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform ${dotClass}`} />
            {statusText}
        </div>
    );
}
