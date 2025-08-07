
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
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

// GET /api/admin/teams/{teamId}/tools - Get tool access for a team
<<<<<<< HEAD
export async function GET(req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
    const { teamId } = await params;
    
=======
export async function GET(req: NextRequest, { params }: { params: { teamId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!await checkPermission(req, ['teams:view:tools'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
<<<<<<< HEAD
        const snapshot = await db.collection('teamToolAccess')
            .where('teamId', '==', teamId)
            .get();
=======
        const q = query(collection(db, 'teamToolAccess'), where('teamId', '==', params.teamId));
        const snapshot = await getDocs(q);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        const accessList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(accessList);
    } catch (error) {
        console.error("Error fetching tool access:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


// POST /api/admin/teams/{teamId}/tools - Grant tool access
<<<<<<< HEAD
export async function POST(req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
    const { teamId } = await params;
    
=======
export async function POST(req: NextRequest, { params }: { params: { teamId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!await checkPermission(req, ['teams:manage:tools'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { toolId } = body;

        if (!toolId) {
            return NextResponse.json({ message: 'toolId is required' }, { status: 400 });
        }
        
        // Prevent duplicate entries
<<<<<<< HEAD
        const existing = await db.collection('teamToolAccess')
            .where('teamId', '==', teamId)
            .where('toolId', '==', toolId)
            .get();
=======
        const q = query(collection(db, 'teamToolAccess'), where('teamId', '==', params.teamId), where('toolId', '==', toolId));
        const existing = await getDocs(q);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        if(!existing.empty) {
            return NextResponse.json({ message: 'Tool access already granted for this team.' }, { status: 409 });
        }

        const newAccess = {
<<<<<<< HEAD
            teamId,
            toolId,
        };

        const docRef = await db.collection('teamToolAccess').add(newAccess);
=======
            teamId: params.teamId,
            toolId,
        };

        const docRef = await addDoc(collection(db, 'teamToolAccess'), newAccess);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        return NextResponse.json({ id: docRef.id, ...newAccess }, { status: 201 });
    } catch (error) {
        console.error("Error granting tool access:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
