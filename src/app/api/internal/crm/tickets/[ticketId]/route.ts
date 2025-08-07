
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

// A simple permission check middleware placeholder
function hasPermission(req: NextRequest, permission: string) {
    const userRole = req.headers.get('X-User-Role');
    return userRole === 'Admin' || userRole === 'Team Lead' || userRole === "HR";
}

// GET /api/internal/crm/tickets/{ticketId} - Get full ticket details
<<<<<<< HEAD
export async function GET(req: NextRequest, { params }: { params: Promise<{ ticketId: string }> }) {
=======
export async function GET(req: NextRequest, { params }: { params: { ticketId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!hasPermission(req, 'tickets:view')) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

<<<<<<< HEAD
    const { ticketId } = await params;

    try {
        const ticketRef = db.collection('tickets').doc(ticketId);
        const ticketSnap = await ticketRef.get();

        if (!ticketSnap.exists) {
            return NextResponse.json({ message: 'Ticket not found' }, { status: 404 });
        }

        const repliesQuery = db.collection('ticketReplies').where('ticketId', '==', ticketId);
        const repliesSnapshot = await repliesQuery.get();
=======
    const { ticketId } = params;

    try {
        const ticketRef = doc(db, 'tickets', ticketId);
        const ticketSnap = await getDoc(ticketRef);

        if (!ticketSnap.exists()) {
            return NextResponse.json({ message: 'Ticket not found' }, { status: 404 });
        }

        const repliesQuery = query(collection(db, 'ticketReplies'), where('ticketId', '==', ticketId));
        const repliesSnapshot = await getDocs(repliesQuery);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        const replies = repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const ticketData = {
            id: ticketSnap.id,
            ...ticketSnap.data(),
            replies: replies,
        };

        return NextResponse.json(ticketData);

    } catch (error) {
        console.error(`Error fetching ticket ${ticketId}:`, error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
