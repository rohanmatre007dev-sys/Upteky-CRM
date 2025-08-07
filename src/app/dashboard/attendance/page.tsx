
'use client'
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Check, X, Clock, Edit, MoreVertical, ThumbsUp, Send, AlertTriangle, Trash2 } from 'lucide-react';
import {
  ChartContainer, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis } from "recharts";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const chartConfig = {
  Present: { label: "Present", color: "hsl(var(--chart-1))" },
  Absent: { label: "Absent", color: "hsl(var(--chart-2))" },
  Late: { label: "Late", color: "hsl(var(--chart-3))" },
};

const currentUser = { id: "user-tl-john", name: "John Doe", role: "Team Lead" }; // Replace with real auth

const initialForm = {
  userId: currentUser.id,
  user: currentUser.name,
  role: currentUser.role,
  date: '',
  clockInTime: '',
  clockInLocation: '',
  clockInPhotoUrl: '',
  clockInDeviceId: '',
  clockOutTime: '',
  clockOutLocation: '',
  clockOutPhotoUrl: '',
  clockOutDeviceId: '',
  totalHours: 0,
  regularHours: 0,
  potentialOvertimeHours: 0,
=======
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button';
import { Check, X, Clock, Edit, MoreVertical, ThumbsUp, Send, AlertTriangle } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const attendanceData = [
    {
        id: '1',
        userId: 'user-tl-john',
        user: 'John Doe', // For display purposes
        role: 'Team Lead', // For display purposes
        date: '2024-07-29',
        clockInTime: '2024-07-29T09:05:00Z',
        clockInLocation: { latitude: 19.0760, longitude: 72.8777, ipAddress: '203.0.113.1', accuracy: 10 },
        clockInPhotoUrl: 'https://placehold.co/100x100.png',
        clockInDeviceId: 'device-abc-123',
        clockOutTime: '2024-07-29T17:30:00Z',
        clockOutLocation: { latitude: 19.0760, longitude: 72.8777, ipAddress: '203.0.113.1', accuracy: 12 },
        clockOutPhotoUrl: 'https://placehold.co/100x100.png',
        clockOutDeviceId: 'device-abc-123',
        totalHours: 8.42,
        regularHours: 8,
        potentialOvertimeHours: 0.42,
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        approvedOvertimeHours: 0,
        status: 'Present',
        approvedByUserId: null,
        approvedAt: null,
        verificationStatus: 'Verified',
        verificationDetails: null,
        overtimeApprovalStatus: 'Pending',
        overtimeApprovedByUserId: null,
        overtimeApprovedAt: null,
<<<<<<< HEAD
  overtimeReason: '',
  adminComment: '',
};
=======
        overtimeReason: 'Finishing up the Q3 report.',
        adminComment: null,
    },
    {
        id: '2',
        userId: 'user-emp-jane',
        user: 'Jane Smith',
        role: 'Employee',
        teamId: 1,
        date: '2024-07-29',
        clockInTime: null,
        clockInLocation: null,
        clockInPhotoUrl: null,
        clockInDeviceId: null,
        clockOutTime: null,
        clockOutLocation: null,
        clockOutPhotoUrl: null,
        clockOutDeviceId: null,
        totalHours: 0,
        regularHours: 0,
        potentialOvertimeHours: 0,
        approvedOvertimeHours: 0,
        status: 'Absent',
        approvedByUserId: null,
        approvedAt: null,
        verificationStatus: 'N/A',
        verificationDetails: null,
        overtimeApprovalStatus: 'N/A',
        overtimeApprovedByUserId: null,
        overtimeApprovedAt: null,
        overtimeReason: null,
        adminComment: null,
    },
    {
        id: '3',
        userId: 'user-hr-peter',
        user: 'Peter Jones',
        role: 'HR',
        date: '2024-07-29',
        clockInTime: '2024-07-29T09:45:00Z',
        clockInLocation: { latitude: 19.0760, longitude: 72.8777, ipAddress: '203.0.113.5', accuracy: 500 },
        clockInPhotoUrl: 'https://placehold.co/100x100.png',
        clockInDeviceId: 'device-def-456',
        clockOutTime: '2024-07-29T18:00:00Z',
        clockOutLocation: { latitude: 19.0760, longitude: 72.8777, ipAddress: '203.0.113.5', accuracy: 520 },
        clockOutPhotoUrl: 'https://placehold.co/100x100.png',
        clockOutDeviceId: 'device-def-456',
        totalHours: 8.25,
        regularHours: 8.0,
        potentialOvertimeHours: 0.25,
        approvedOvertimeHours: 0.25,
        status: 'Present',
        approvedByUserId: 'user-admin',
        approvedAt: '2024-07-30T10:00:00Z',
        verificationStatus: 'Location Mismatch',
        verificationDetails: 'Clock-in location accuracy (500m) is outside the allowed radius (100m).',
        overtimeApprovalStatus: 'Approved',
        overtimeApprovedByUserId: 'user-admin',
        overtimeApprovedAt: '2024-07-30T11:00:00Z',
        overtimeReason: 'Client call ran late.',
        adminComment: 'Approved due to client commitment.',
    },
];

const teamMembers = [
    { teamId: 1, userId: 'user-tl-john', role: 'lead' },
    { teamId: 1, userId: 'user-emp-jane', role: 'member' },
    { teamId: 1, userId: 'user-bd-sam', role: 'member' },
];

>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

const trendData = [
  { name: 'Mon', Present: 90, Absent: 5, Late: 5 },
  { name: 'Tue', Present: 95, Absent: 2, Late: 3 },
  { name: 'Wed', Present: 88, Absent: 8, Late: 4 },
  { name: 'Thu', Present: 92, Absent: 4, Late: 4 },
  { name: 'Fri', Present: 98, Absent: 1, Late: 1 },
];

<<<<<<< HEAD
=======
const chartConfig = {
  Present: { label: "Present", color: "hsl(var(--chart-1))" },
  Absent: { label: "Absent", color: "hsl(var(--chart-2))" },
  Late: { label: "Late", color: "hsl(var(--chart-3))" },
}

// Mock user for demonstration. In a real app, this would come from an auth context.
const currentUser = { id: "user-tl-john", name: "John Doe", role: "Team Lead" }; // Can be 'Employee', 'Team Lead', 'HR', 'Admin'


const getVisibleData = () => {
    switch (currentUser.role) {
        case 'Admin':
        case 'Sub-Admin':
            return attendanceData;
        case 'HR':
            return attendanceData.filter(d => d.role !== 'Admin' && d.role !== 'Sub-Admin');
        case 'Team Lead':
            const leadTeam = teamMembers.find(m => m.userId === currentUser.id && m.role === 'lead');
            if (!leadTeam) return attendanceData.filter(d => d.userId === currentUser.id);

            const teamMemberIds = teamMembers.filter(m => m.teamId === leadTeam.teamId).map(m => m.userId);
            return attendanceData.filter(d => teamMemberIds.includes(d.userId));
        case 'Employee':
             return attendanceData.filter(d => d.userId === currentUser.id);
        default:
            return [];
    }
}

const canEdit = (record: typeof attendanceData[0]) => {
    if (currentUser.role === 'Admin') return true;
    if (currentUser.role === 'HR') return record.role !== 'Admin' && record.role !== 'Sub-Admin';
    if (currentUser.role === 'Team Lead') {
        const leadTeam = teamMembers.find(m => m.userId === currentUser.id && m.role === 'lead');
        if (!leadTeam) return record.userId === currentUser.id;
        const teamMemberIds = teamMembers.filter(m => m.teamId === leadTeam.teamId).map(m => m.userId);
        return teamMemberIds.includes(record.userId);
    }
    if (currentUser.role === 'Employee') return record.userId === currentUser.name;
    return false;
}

>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
const getStatusVariant = (status: string) => {
    switch (status) {
        case 'Present': return 'default';
        case 'Absent': return 'destructive';
        case 'Pending Approval': return 'secondary';
        default: return 'outline';
    }
<<<<<<< HEAD
};
=======
}

>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
const getVerificationStatusVariant = (status: string) => {
    switch (status) {
        case 'Verified': return 'default';
        case 'Location Mismatch': return 'destructive';
        case 'IP Mismatch': return 'destructive';
        case 'Pending Review': return 'secondary';
        default: return 'outline';
    }
<<<<<<< HEAD
};
=======
}

>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Present': return <Check className="h-4 w-4 text-green-500" />;
        case 'Absent': return <X className="h-4 w-4 text-red-500" />;
        case 'Pending Approval': return <Clock className="h-4 w-4 text-yellow-500" />;
        default: return null;
    }
<<<<<<< HEAD
};
const formatTime = (isoString: string | null) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function AttendancePage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'checkin'|'checkout'|'edit'|'approve'|'leave'|null>(null);
  const [form, setForm] = useState<any>(initialForm);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/internal/attendance', {
        headers: { 'X-User-Id': currentUser.id, 'X-User-Role': currentUser.role }
      });
      if (!res.ok) throw new Error('Failed to fetch attendance');
      const data = await res.json();
      setRecords(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchRecords(); }, []);

  // Modal openers
  const openCheckIn = () => { setForm({ ...initialForm, date: new Date().toISOString().slice(0,10), clockInTime: new Date().toISOString() }); setModalType('checkin'); setShowModal(true); };
  const openCheckOut = (record: any) => { setForm({ ...record, clockOutTime: new Date().toISOString() }); setEditingRecord(record); setModalType('checkout'); setShowModal(true); };
  const openEdit = (record: any) => { setForm({ ...record }); setEditingRecord(record); setModalType('edit'); setShowModal(true); };
  const openApprove = (record: any) => { setForm({ ...record, overtimeApprovalStatus: 'Approved', overtimeApprovedByUserId: currentUser.id, overtimeApprovedAt: new Date().toISOString() }); setEditingRecord(record); setModalType('approve'); setShowModal(true); };
  const openLeave = () => { setForm({ ...initialForm, date: new Date().toISOString().slice(0,10), status: 'Absent' }); setModalType('leave'); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setModalType(null); setForm(initialForm); setEditingRecord(null); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setForm((f: any) => ({ ...f, [e.target.name]: e.target.value })); };

  // CRUD actions
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modalType === 'edit' && editingRecord) {
        const res = await fetch(`/api/internal/attendance/${editingRecord.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Failed to update record');
      } else if (modalType === 'checkout' && editingRecord) {
        const res = await fetch(`/api/internal/attendance/${editingRecord.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Failed to check out');
      } else if (modalType === 'approve' && editingRecord) {
        const res = await fetch(`/api/internal/attendance/${editingRecord.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Failed to approve');
      } else {
        // checkin or leave
        const res = await fetch('/api/internal/attendance', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Failed to create record');
      }
      await fetchRecords();
      closeModal();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (record: any) => {
    if (!window.confirm(`Delete attendance record for ${record.user} on ${record.date}?`)) return;
    setDeleting(record.id);
    try {
      const res = await fetch(`/api/internal/attendance/${record.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete record');
      await fetchRecords();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setDeleting(null);
    }
  };

  // Role-based action helpers
  const canEdit = (record: any) => {
    if (currentUser.role === 'Admin') return true;
    if (currentUser.role === 'HR') return record.role !== 'Admin' && record.role !== 'Sub-Admin';
    if (currentUser.role === 'Team Lead') return record.userId === currentUser.id;
    if (currentUser.role === 'Employee') return record.userId === currentUser.id;
    return false;
  };
  const canApprove = (record: any) => ['Admin','HR','Team Lead'].includes(currentUser.role) && record.overtimeApprovalStatus === 'Pending';
  const canDelete = (record: any) => ['Admin','HR'].includes(currentUser.role);
=======
}

const formatTime = (isoString: string | null) => {
    if (!isoString) return '-';
    // When an ISO string is passed to the Date constructor, it's parsed as UTC.
    // toLocaleTimeString then correctly converts it to the runtime's local timezone.
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function AttendancePage() {
  const visibleRecords = getVisibleData();
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

  return (
    <div className="grid gap-8">
        <Card>
            <CardHeader>
                <CardTitle>My Attendance</CardTitle>
                <CardDescription>Record and view your daily attendance. Actions are required for non-admin roles.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-start gap-4">
<<<<<<< HEAD
          <Button onClick={openCheckIn} disabled={currentUser.role === 'Admin' || currentUser.role === 'Sub-Admin'}>
                    <Clock className="mr-2 h-4 w-4" /> Check In
                </Button>
          <Button variant="outline" onClick={() => {
            // Find today's record for this user
            const today = new Date().toISOString().slice(0,10);
            const rec = records.find(r => r.userId === currentUser.id && r.date === today && !r.clockOutTime);
            if (rec) openCheckOut(rec);
          }} disabled={currentUser.role === 'Admin' || currentUser.role === 'Sub-Admin'}>
                    Check Out
                </Button>
          <Button variant="ghost" onClick={openLeave}>
=======
                <Button disabled={currentUser.role === 'Admin' || currentUser.role === 'Sub-Admin'}>
                    <Clock className="mr-2 h-4 w-4" /> Check In
                </Button>
                <Button variant="outline" disabled={currentUser.role === 'Admin' || currentUser.role === 'Sub-Admin'}>
                    Check Out
                </Button>
                 <Button variant="ghost">
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
                    <Send className="mr-2 h-4 w-4" /> Request Leave
                </Button>
            </CardContent>
        </Card>
<<<<<<< HEAD
=======

>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        <Card>
            <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>
                    {currentUser.role === 'Team Lead' ? "Your team's attendance data." : "Viewing all accessible attendance records."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Check-In</TableHead>
                        <TableHead className="hidden sm:table-cell">Check-Out</TableHead>
                        <TableHead className="hidden lg:table-cell">Verification</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
<<<<<<< HEAD
              {records.map((record) => (
=======
                    {visibleRecords.map((record) => (
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
                    <TableRow key={record.id}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell className="font-medium">{record.user}</TableCell>
                        <TableCell>
                            <Badge variant={getStatusVariant(record.status)} className="flex w-fit items-center gap-1">
                                {getStatusIcon(record.status)}
                                <span>{record.status}</span>
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{formatTime(record.clockInTime)}</TableCell>
                        <TableCell className="hidden sm:table-cell">{formatTime(record.clockOutTime)}</TableCell>
                         <TableCell className="hidden lg:table-cell">
                            <Badge variant={getVerificationStatusVariant(record.verificationStatus)} className="flex w-fit items-center gap-1">
                                {record.verificationStatus !== 'Verified' && <AlertTriangle className="h-4 w-4" />}
                                <span>{record.verificationStatus}</span>
                            </Badge>
                         </TableCell>
                        <TableCell className="text-right">
<<<<<<< HEAD
=======
                           {canEdit(record) && (
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
                             <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon">
                                   <MoreVertical className="h-4 w-4" />
                                   <span className="sr-only">Actions</span>
                                 </Button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent align="end">
<<<<<<< HEAD
                        {canEdit(record) && (
                          <DropdownMenuItem onClick={() => openEdit(record)}>
                                   <Edit className="mr-2 h-4 w-4" />
                                   <span>Edit Record</span>
                                 </DropdownMenuItem>
                        )}
                        {canApprove(record) && (
                          <DropdownMenuItem onClick={() => openApprove(record)}>
=======
                                 <DropdownMenuItem>
                                   <Edit className="mr-2 h-4 w-4" />
                                   <span>Edit Record</span>
                                 </DropdownMenuItem>
                                 {(currentUser.role === 'Team Lead' || currentUser.role === 'HR' || currentUser.role === 'Admin') && (
                                     <DropdownMenuItem>
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
                                        <ThumbsUp className="mr-2 h-4 w-4" />
                                        <span>Approve</span>
                                     </DropdownMenuItem>
                                 )}
<<<<<<< HEAD
                        {canDelete(record) && (
                          <DropdownMenuItem onClick={() => handleDelete(record)} disabled={deleting === record.id}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>{deleting === record.id ? 'Deleting...' : 'Delete'}</span>
                          </DropdownMenuItem>
                        )}
                               </DropdownMenuContent>
                             </DropdownMenu>
=======
                               </DropdownMenuContent>
                             </DropdownMenu>
                           )}
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
<<<<<<< HEAD
=======

>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        <Card>
            <CardHeader>
                <CardTitle>Weekly Attendance Trends</CardTitle>
                <CardDescription>A visual overview of attendance this week.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <LineChart data={trendData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
<<<<<<< HEAD
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
=======
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line dataKey="Present" type="monotone" stroke="var(--color-Present)" strokeWidth={2} dot={false} />
                        <Line dataKey="Absent" type="monotone" stroke="var(--color-Absent)" strokeWidth={2} dot={false} />
                        <Line dataKey="Late" type="monotone" stroke="var(--color-Late)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
<<<<<<< HEAD
      {/* Modal for all actions */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form onSubmit={handleSave} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="font-semibold mb-4">
              {modalType === 'checkin' && 'Check In'}
              {modalType === 'checkout' && 'Check Out'}
              {modalType === 'edit' && 'Edit Attendance'}
              {modalType === 'approve' && 'Approve Overtime'}
              {modalType === 'leave' && 'Request Leave'}
            </h2>
            <div className="grid gap-3">
              <input name="date" value={form.date ?? ''} onChange={handleChange} type="date" className="border rounded px-2 py-1" required />
              <input name="user" value={form.user ?? ''} onChange={handleChange} placeholder="User" className="border rounded px-2 py-1" required />
              <input name="role" value={form.role ?? ''} onChange={handleChange} placeholder="Role" className="border rounded px-2 py-1" required />
              {(modalType === 'checkin' || modalType === 'edit') && (
                <input name="clockInTime" value={form.clockInTime ?? ''} onChange={handleChange} type="datetime-local" className="border rounded px-2 py-1" required />
              )}
              {(modalType === 'checkout' || modalType === 'edit') && (
                <input name="clockOutTime" value={form.clockOutTime ?? ''} onChange={handleChange} type="datetime-local" className="border rounded px-2 py-1" required={modalType==='checkout'} />
              )}
              {(modalType === 'leave') && (
                <input name="status" value={form.status ?? 'Absent'} onChange={handleChange} className="border rounded px-2 py-1" readOnly />
              )}
              {(modalType === 'approve') && (
                <input name="overtimeApprovalStatus" value={form.overtimeApprovalStatus ?? ''} onChange={handleChange} className="border rounded px-2 py-1" readOnly />
              )}
              <input name="overtimeReason" value={form.overtimeReason ?? ''} onChange={handleChange} placeholder="Reason" className="border rounded px-2 py-1" />
              <input name="adminComment" value={form.adminComment ?? ''} onChange={handleChange} placeholder="Admin Comment" className="border rounded px-2 py-1" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            </div>
          </form>
        </div>
      )}
=======
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    </div>
  );
}
