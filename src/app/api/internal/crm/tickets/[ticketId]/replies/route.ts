
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

// A simple permission check middleware placeholder
function hasPermission(req: NextRequest, permission: string) {
    const userRole = req.headers.get('X-User-Role');
    return userRole === 'Admin' || userRole === 'Team Lead' || userRole === "HR";
}

// In a real app, you'd get user details from a session decoded from a token
function getAuthor(req: NextRequest) {
    const userRole = req.headers.get('X-User-Role');
    const userId = req.headers.get('X-User-Id');
    return {
        id: userId || 'internal-user-id-placeholder',
        name: `Internal User (${userRole || 'Unknown'})`
    }
}

// POST /api/internal/crm/tickets/{ticketId}/replies - Add a reply
<<<<<<< HEAD
export async function POST(req: NextRequest, { params }: { params: Promise<{ ticketId: string }> }) {
=======
export async function POST(req: NextRequest, { params }: { params: { ticketId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!hasPermission(req, 'tickets:reply')) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

<<<<<<< HEAD
    const { ticketId } = await params;
=======
    const { ticketId } = params;
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    const author = getAuthor(req);

    try {
        const body = await req.json();
        const { message, isInternalNote } = body;

        if (!message) {
            return NextResponse.json({ message: 'Message is required' }, { status: 400 });
        }

        const newReply = {
            ticketId,
            authorId: author.id,
            authorName: author.name,
            message,
            isInternalNote: isInternalNote || false,
<<<<<<< HEAD
            createdAt: new Date(),
        };

        const docRef = await db.collection('ticketReplies').add(newReply);
=======
            createdAt: Timestamp.now(),
        };

        const docRef = await addDoc(collection(db, 'ticketReplies'), newReply);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        return NextResponse.json({ id: docRef.id, ...newReply }, { status: 201 });

    } catch (error) {
        console.error(`Error adding reply to ticket ${ticketId}:`, error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
