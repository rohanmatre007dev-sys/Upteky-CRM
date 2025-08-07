
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

// A simple permission check middleware placeholder
function hasPermission(req: NextRequest, permission: string) {
    const userRole = req.headers.get('X-User-Role');
    return userRole === 'Admin' || userRole === 'Team Lead' || userRole === "HR";
}

// PUT /api/internal/crm/tickets/{ticketId}/assign - Assign a ticket
<<<<<<< HEAD
export async function PUT(req: NextRequest, { params }: { params: Promise<{ ticketId: string }> }) {
=======
export async function PUT(req: NextRequest, { params }: { params: { ticketId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!hasPermission(req, 'tickets:assign')) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

<<<<<<< HEAD
    const { ticketId } = await params;
=======
    const { ticketId } = params;
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

    try {
        const body = await req.json();
        const { assignedToTeamId, assignedToUserId } = body;

        if (!assignedToTeamId && !assignedToUserId) {
            return NextResponse.json({ message: 'Either assignedToTeamId or assignedToUserId is required' }, { status: 400 });
        }

<<<<<<< HEAD
        const ticketRef = db.collection('tickets').doc(ticketId);
=======
        const ticketRef = doc(db, 'tickets', ticketId);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        
        const updateData: { assignedToTeamId?: string | null; assignedToUserId?: string | null } = {};
        if (assignedToTeamId !== undefined) updateData.assignedToTeamId = assignedToTeamId;
        if (assignedToUserId !== undefined) updateData.assignedToUserId = assignedToUserId;

<<<<<<< HEAD
        await ticketRef.update(updateData);
=======
        await updateDoc(ticketRef, updateData);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

        return NextResponse.json({ message: 'Ticket assignment updated successfully' });

    } catch (error) {
        console.error(`Error assigning ticket ${ticketId}:`, error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
