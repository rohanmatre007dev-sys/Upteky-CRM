
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
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

// DELETE /api/admin/teams/{teamId}/tools/{toolId} - Revoke tool access
<<<<<<< HEAD
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ teamId: string, toolId: string }> }) {
    const { teamId, toolId } = await params;
    
=======
export async function DELETE(req: NextRequest, { params }: { params: { teamId: string, toolId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!await checkPermission(req, ['teams:manage:tools'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
<<<<<<< HEAD
        const snapshot = await db.collection('teamToolAccess')
            .where('teamId', '==', teamId)
            .where('toolId', '==', toolId)
            .get();
=======
        const q = query(collection(db, 'teamToolAccess'), where('teamId', '==', params.teamId), where('toolId', '==', params.toolId));
        const snapshot = await getDocs(q);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        
        if (snapshot.empty) {
            return NextResponse.json({ message: 'Tool access record not found' }, { status: 404 });
        }

        // Delete all found documents (should be only one)
<<<<<<< HEAD
        const batch = db.batch();
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
=======
        const batch = [];
        snapshot.forEach(doc => {
            batch.push(deleteDoc(doc.ref));
        });
        await Promise.all(batch);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

        return NextResponse.json({ message: 'Tool access revoked successfully' });
    } catch (error) {
        console.error("Error revoking tool access:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
