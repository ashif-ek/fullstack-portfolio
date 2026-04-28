'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Activity, 
  Database, 
  Clock, 
  Info, 
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SystemStatus {
  live: boolean;
  source: string;
}

const REFRESH_INTERVAL = 5000;

export default function MonitoringDashboard() {
  const { data, error, isLoading, isFetching } = useQuery<SystemStatus>({
    queryKey: ['system-status'],
    queryFn: async () => {
      const response = await fetch('/api/data/health');
      if (!response.ok) throw new Error('Health check failed');
      return response.json();
    },
    refetchInterval: REFRESH_INTERVAL,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-neutral-400 font-mono text-sm">Initializing Telemetry...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">System Unreachable</h1>
          <p className="text-neutral-400 mb-6">
            The monitoring system cannot establish a connection to the database.
          </p>
          <div className="text-xs font-mono bg-black/40 p-3 rounded-lg text-red-400 overflow-hidden text-ellipsis">
            {error instanceof Error ? error.message : 'Unknown communication error'}
          </div>
        </div>
      </div>
    );
  }

  const isHealthy = data?.live === true;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-6 md:p-12 font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-emerald-500" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">System Monitor</h1>
            </div>
            <p className="text-neutral-400">Real-time database health status — Django disconnected.</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800">
              <span className={`w-2 h-2 rounded-full ${isFetching ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
              <span className="text-neutral-500">{isFetching ? 'Syncing' : 'Poll Idle'}</span>
            </div>
            <div className="text-neutral-500">
              Prisma Direct
            </div>
          </div>
        </header>

        {/* Status Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-300 ${isFetching ? 'opacity-80' : 'opacity-100'}`}>
          <StatusCard 
            title="Database" 
            value={isHealthy ? 'Connected' : 'Disconnected'}
            icon={<Database className={`w-5 h-5 ${isHealthy ? 'text-emerald-500' : 'text-red-500'}`} />}
            status={isHealthy ? 'success' : 'error'}
            detail="PostgreSQL via Prisma"
          />
          <StatusCard 
            title="Data Source" 
            value={data?.source || 'prisma'}
            icon={<Terminal className="w-5 h-5 text-blue-500" />}
            status="info"
            detail="Django backend disconnected"
          />
          <StatusCard 
            title="Architecture" 
            value="Next.js Direct"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            status="success"
            detail="No Django dependency"
          />
        </div>

        <footer className="pt-12 border-t border-neutral-900 text-center">
          <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
            Portfolio System Monitor • Prisma Direct Mode
          </p>
        </footer>
      </div>
    </div>
  );
}

function StatusCard({ title, value, icon, status, detail }: { 
  title: string, value: string, icon: React.ReactNode, status: 'success' | 'warning' | 'error' | 'info', detail: string 
}) {
  const statusColors = {
    success: 'border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10',
    warning: 'border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10',
    error: 'border-red-500/20 bg-red-500/5 hover:bg-red-500/10',
    info: 'border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10'
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-neutral-400 font-medium">{title}</span>
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-neutral-500 font-mono italic">{detail}</div>
      </div>
    </div>
  );
}
