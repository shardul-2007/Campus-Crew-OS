import React from 'react';
import { EventStatus } from '@/types/database';
import {
  FileEdit,
  Clock,
  Search,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Radio,
  CheckCheck,
  ShieldAlert,
  XCircle,
  FileCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Props {
  status: EventStatus;
  size?: 'sm' | 'md';
}

export function EventStatusBadge({ status, size = 'md' }: Props) {
  switch (status) {
    case 'draft':
      return (
        <Badge variant="outline" size={size} className="border-slate-600 text-slate-300">
          <FileEdit className="w-3.5 h-3.5 text-slate-400" />
          <span>Draft</span>
        </Badge>
      );
    case 'submitted':
      return (
        <Badge variant="info" size={size} className="bg-sky-950/70 border-sky-800 text-sky-300">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>Submitted</span>
        </Badge>
      );
    case 'under_review':
      return (
        <Badge variant="warning" size={size} className="bg-amber-950/70 border-amber-800 text-amber-300">
          <Search className="w-3.5 h-3.5 text-amber-400" />
          <span>Under Review</span>
        </Badge>
      );
    case 'changes_requested':
      return (
        <Badge variant="warning" size={size} className="bg-orange-950/80 border-orange-700 text-orange-300">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
          <span>Changes Requested</span>
        </Badge>
      );
    case 'approved':
      return (
        <Badge variant="success" size={size} className="bg-emerald-950/70 border-emerald-700 text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Approved</span>
        </Badge>
      );
    case 'scheduled':
      return (
        <Badge variant="info" size={size} className="bg-indigo-950/70 border-indigo-700 text-indigo-300">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>Scheduled</span>
        </Badge>
      );
    case 'live':
      return (
        <Badge variant="danger" size={size} className="bg-red-950/90 border-red-600 text-red-200 animate-pulse">
          <Radio className="w-3.5 h-3.5 text-red-400 animate-ping" />
          <span className="font-bold">LIVE NOW</span>
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="purple" size={size} className="bg-purple-950/70 border-purple-800 text-purple-300">
          <CheckCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>Completed</span>
        </Badge>
      );
    case 'proof_pending':
      return (
        <Badge variant="warning" size={size} className="bg-amber-950/70 border-amber-700 text-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Proof Pending</span>
        </Badge>
      );
    case 'verification_pending':
      return (
        <Badge variant="info" size={size} className="bg-cyan-950/70 border-cyan-700 text-cyan-300">
          <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Verification Pending</span>
        </Badge>
      );
    case 'verified':
      return (
        <Badge variant="success" size={size} className="bg-emerald-900 border-emerald-500 text-emerald-100 font-bold shadow-sm shadow-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          <span>VERIFIED</span>
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="danger" size={size}>
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>Rejected</span>
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="outline" size={size}>
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
          <span>Cancelled</span>
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
