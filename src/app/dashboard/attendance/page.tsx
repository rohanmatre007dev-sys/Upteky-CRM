
'use client'
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
        approvedOvertimeHours: 0,
        status: 'Present',
        approvedByUserId: null,
        approvedAt: null,
        verificationStatus: 'Verified',
        verificationDetails: null,
        overtimeApprovalStatus: 'Pending',
        overtimeApprovedByUserId: null,
        overtimeApprovedAt: null,
  overtimeReason: '',
  adminComment: '',
};

const trendData = [
  { name: 'Mon', Present: 90, Absent: 5, Late: 5 },
  { name: 'Tue', Present: 95, Absent: 2, Late: 3 },
  { name: 'Wed', Present: 88, Absent: 8, Late: 4 },
  { name: 'Thu', Present: 92, Absent: 4, Late: 4 },
  { name: 'Fri', Present: 98, Absent: 1, Late: 1 },
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'Present': return 'default';
        case 'Absent': return 'destructive';
        case 'Pending Approval': return 'secondary';
        default: return 'outline';
    }
};
const getVerificationStatusVariant = (status: string) => {
    switch (status) {
        case 'Verified': return 'default';
        case 'Location Mismatch': return 'destructive';
        case 'IP Mismatch': return 'destructive';
        case 'Pending Review': return 'secondary';
        default: return 'outline';
    }
};
const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Present': return <Check className="h-4 w-4 text-green-500" />;
        case 'Absent': return <X className="h-4 w-4 text-red-500" />;
        case 'Pending Approval': return <Clock className="h-4 w-4 text-yellow-500" />;
        default: return null;
    }
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

  return (
    <div className="grid gap-8">
        <Card>
            <CardHeader>
                <CardTitle>My Attendance</CardTitle>
                <CardDescription>Record and view your daily attendance. Actions are required for non-admin roles.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-start gap-4">
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
                    <Send className="mr-2 h-4 w-4" /> Request Leave
                </Button>
            </CardContent>
        </Card>
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
              {records.map((record) => (
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
                             <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon">
                                   <MoreVertical className="h-4 w-4" />
                                   <span className="sr-only">Actions</span>
                                 </Button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent align="end">
                        {canEdit(record) && (
                          <DropdownMenuItem onClick={() => openEdit(record)}>
                                   <Edit className="mr-2 h-4 w-4" />
                                   <span>Edit Record</span>
                                 </DropdownMenuItem>
                        )}
                        {canApprove(record) && (
                          <DropdownMenuItem onClick={() => openApprove(record)}>
                                        <ThumbsUp className="mr-2 h-4 w-4" />
                                        <span>Approve</span>
                                     </DropdownMenuItem>
                                 )}
                        {canDelete(record) && (
                          <DropdownMenuItem onClick={() => handleDelete(record)} disabled={deleting === record.id}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>{deleting === record.id ? 'Deleting...' : 'Delete'}</span>
                          </DropdownMenuItem>
                        )}
                               </DropdownMenuContent>
                             </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Weekly Attendance Trends</CardTitle>
                <CardDescription>A visual overview of attendance this week.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <LineChart data={trendData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line dataKey="Present" type="monotone" stroke="var(--color-Present)" strokeWidth={2} dot={false} />
                        <Line dataKey="Absent" type="monotone" stroke="var(--color-Absent)" strokeWidth={2} dot={false} />
                        <Line dataKey="Late" type="monotone" stroke="var(--color-Late)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
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
    </div>
  );
}
