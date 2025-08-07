
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
import { getSessionAndUserRole } from '@/lib/auth';

async function checkPermission(req: NextRequest, requiredPermissions: string[]): Promise<boolean> {
    const userRole = await getSessionAndUserRole(req); 
    if (!userRole || userRole !== 'Admin') {
        console.warn(`Authorization failed for role '${userRole}'. Required: Admin`);
        return false;
    }
    return true;
}

// PUT /api/admin/teams/{teamId}/members/{memberDocId} - Update a member's role or reporting
<<<<<<< HEAD
export async function PUT(req: NextRequest, { params }: { params: Promise<{ teamId: string, memberDocId: string }> }) {
    const { teamId, memberDocId } = await params;
    
=======
export async function PUT(req: NextRequest, { params }: { params: { teamId: string, memberDocId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!await checkPermission(req, ['teams:manage:members'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    try {
        const body = await req.json();
        const { teamRole, reportsToMemberId } = body;

<<<<<<< HEAD
        const memberRef = db.collection('teamMembers').doc(memberDocId);
        // Ensure teamId in body matches param to prevent moving members between teams with this endpoint
        await memberRef.update({ teamRole, reportsToMemberId });
=======
        const memberRef = doc(db, 'teamMembers', params.memberDocId);
        // Ensure teamId in body matches param to prevent moving members between teams with this endpoint
        await updateDoc(memberRef, { teamRole, reportsToMemberId });
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

        return NextResponse.json({ message: 'Team member updated successfully' });
    } catch (error) {
        console.error("Error updating team member:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE /api/admin/teams/{teamId}/members/{memberDocId} - Remove a member from a team
<<<<<<< HEAD
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ teamId: string, memberDocId: string }> }) {
    const { teamId, memberDocId } = await params;
    
=======
export async function DELETE(req: NextRequest, { params }: { params: { teamId: string, memberDocId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!await checkPermission(req, ['teams:manage:members'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    try {
<<<<<<< HEAD
        const memberRef = db.collection('teamMembers').doc(memberDocId);
        await memberRef.delete();
=======
        const memberRef = doc(db, 'teamMembers', params.memberDocId);
        await deleteDoc(memberRef);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

        return NextResponse.json({ message: 'Team member removed successfully' });
    } catch (error) {
        console.error("Error removing team member:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
