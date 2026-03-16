'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Api from '@/lib/api';
import { 
  Activity, 
  Database, 
  Cpu, 
  HardDrive, 
  MemoryStick as Memory, 
  Clock, 
  Info, 
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SystemStatus {
  service_name: string;
  service_version: string;
  uptime_seconds: number;
  uptime_formatted: string;
  database: string;
  disk: {
    total_gb: number;
    used_gb: number;
    free_gb: number;
    percent_used: number;
  };
  memory: {
    usage_mb: number;
    system_percent: number;
  };
  cpu_percent: number;
  response_time_ms: number;
  python_version: string;
  platform: string;
  timestamp: string;
  git_commit: string;
}

const REFRESH_INTERVAL = 5000;

export default function MonitoringDashboard() {
  const { data, error, isLoading, isFetching } = useQuery<SystemStatus>({
    queryKey: ['system-status'],
    queryFn: async () => {
      const response = await Api.get('api/system/status/');
      return response.data;
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
          <h1 className="text-2xl font-bold text-white mb-2">Backend Unreachable</h1>
          <p className="text-neutral-400 mb-6">
            The monitoring system cannot establish a connection to the backend telemetry service.
          </p>
          <div className="text-xs font-mono bg-black/40 p-3 rounded-lg text-red-400 overflow-hidden text-ellipsis">
            {error instanceof Error ? error.message : 'Unknown communication error'}
          </div>
        </div>
      </div>
    );
  }

  const isHealthy = data?.database === 'connected';

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
            <p className="text-neutral-400">Real-time backend runtime telemetry and health status.</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800">
              <span className={`w-2 h-2 rounded-full ${isFetching ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
              <span className="text-neutral-500">{isFetching ? 'Syncing' : 'Poll Idle'}</span>
            </div>
            <div className="text-neutral-500">
              v{data?.service_version}
            </div>
          </div>
        </header>

        {/* Global Status Card */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-300 ${isFetching ? 'opacity-80' : 'opacity-100'}`}>
          <StatusCard 
            title="Backend Status" 
            value={isHealthy ? 'Healthy' : 'Degraded'}
            icon={<Activity className={`w-5 h-5 ${isHealthy ? 'text-emerald-500' : 'text-amber-500'}`} />}
            status={isHealthy ? 'success' : 'warning'}
            detail={`${data?.response_time_ms}ms latency`}
          />
          <StatusCard 
            title="Database" 
            value={data?.database === 'connected' ? 'Connected' : 'Disconnected'}
            icon={<Database className={`w-5 h-5 ${data?.database === 'connected' ? 'text-emerald-500' : 'text-red-500'}`} />}
            status={data?.database === 'connected' ? 'success' : 'error'}
            detail="PostgreSQL Main"
          />
          <StatusCard 
            title="Uptime" 
            value={data?.uptime_formatted || '0s'}
            icon={<Clock className="w-5 h-5 text-blue-500" />}
            status="info"
            detail={`Started: ${new Date(Date.now() - (data?.uptime_seconds || 0) * 1000).toLocaleTimeString()}`}
          />
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hardware Metrics */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-neutral-500" />
              Resource Utilization
            </h2>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-8 backdrop-blur-sm">
              <MetricProgress 
                label="CPU Usage" 
                value={data?.cpu_percent || 0} 
                max={100} 
                unit="%" 
                icon={<Cpu className="w-4 h-4" />}
              />
              <MetricProgress 
                label="Memory usage" 
                value={data?.memory.usage_mb || 0} 
                max={512} // Example limit for Render free tier
                unit="MB" 
                icon={<Memory className="w-4 h-4" />}
                detail={`System: ${data?.memory.system_percent}%`}
              />
              <MetricProgress 
                label="Disk usage" 
                value={data?.disk.percent_used || 0} 
                max={100} 
                unit="%" 
                icon={<HardDrive className="w-4 h-4" />}
                detail={`${data?.disk.free_gb} GB free of ${data?.disk.total_gb} GB`}
              />
            </div>
          </div>

          {/* Runtime Metadata */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-neutral-500" />
              Runtime Environment
            </h2>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 divide-y divide-neutral-800/50 backdrop-blur-sm">
              <MetaRow label="Service Name" value={data?.service_name} />
              <MetaRow label="Python Version" value={data?.python_version.split(' ')[0]} />
              <MetaRow label="Platform" value={data?.platform} />
              <MetaRow label="Git Hash" value={data?.git_commit?.substring(0, 7)} isCode />
              <MetaRow label="Last Check" value={new Date(data?.timestamp || '').toLocaleTimeString()} />
            </div>
          </div>
        </div>

        <footer className="pt-12 border-t border-neutral-900 text-center">
          <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
            Experimental Monitoring Dashboard • {data?.service_name} Internal
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

function MetricProgress({ label, value, max, unit, icon, detail }: { label: string, value: number, max: number, unit: string, icon: React.ReactNode, detail?: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2 text-sm text-neutral-300 font-medium">
          {icon}
          {label}
        </div>
        <div className="text-right">
          <span className="text-white font-bold">{value}{unit}</span>
          {detail && <div className="text-[10px] text-neutral-500 uppercase tracking-tight">{detail}</div>}
        </div>
      </div>
      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
        />
      </div>
    </div>
  );
}

function MetaRow({ label, value, isCode }: { label: string, value?: string, isCode?: boolean }) {
  return (
    <div className="flex justify-between py-4 items-center group">
      <span className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">{label}</span>
      <span className={`text-sm ${isCode ? 'font-mono bg-neutral-800 px-2 py-0.5 rounded text-emerald-400' : 'text-neutral-200'}`}>
        {value || 'unknown'}
      </span>
    </div>
  );
}
