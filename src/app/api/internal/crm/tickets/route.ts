
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

// A simple permission check middleware placeholder
function hasPermission(req: NextRequest, permission: string) {
    const userRole = req.headers.get('X-User-Role');
    return userRole === 'Admin' || userRole === 'Team Lead' || userRole === "HR";
}

// GET /api/internal/crm/tickets - List all tickets with filtering
export async function GET(req: NextRequest) {
    if (!hasPermission(req, 'tickets:view')) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignee = searchParams.get('assignee');

    try {
<<<<<<< HEAD
        let q = db.collection('tickets');
        
        if (status) {
            q = q.where('status', '==', status);
        }
        if (priority) {
            q = q.where('priority', '==', priority);
        }
        if (assignee) {
            q = q.where('assignedToUserId', '==', assignee);
        }

        const ticketsSnapshot = await q.get();
        const ticketsList = ticketsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        console.log(`Found ${ticketsList.length} tickets`);
=======
        let q = query(collection(db, 'tickets'));
        
        if (status) {
            q = query(q, where('status', '==', status));
        }
        if (priority) {
            q = query(q, where('priority', '==', priority));
        }
        if (assignee) {
            q = query(q, where('assignedToUserId', '==', assignee));
        }

        const ticketsSnapshot = await getDocs(q);
        const ticketsList = ticketsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        return NextResponse.json(ticketsList);

    } catch (error) {
        console.error("Error fetching tickets:", error);
<<<<<<< HEAD
        return NextResponse.json({ 
            message: 'Internal Server Error', 
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
=======
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    }
}
