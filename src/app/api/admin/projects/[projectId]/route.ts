
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
import { getSessionAndUserRole } from '@/lib/auth';

async function checkPermission(req: NextRequest, requiredPermissions: string[]): Promise<boolean> {
    const userRole = await getSessionAndUserRole(req); 

    if (!userRole) {
        console.warn('Authentication failed: No user role found.');
        return false;
    }

    const rolePermissionsMap: { [key: string]: string[] } = {
        'Admin': ['projects:view', 'projects:edit', 'projects:delete'],
    };

    const userPermissions = rolePermissionsMap[userRole] || [];
    const hasPermission = requiredPermissions.every(perm => userPermissions.includes(perm));

    if (!hasPermission) {
        console.warn(`Authorization failed for role '${userRole}'. Required: [${requiredPermissions.join(', ')}]`);
    }

    return hasPermission;
}

// GET /api/admin/projects/{projectId} - Get a single project
<<<<<<< HEAD
export async function GET(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    
=======
export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!await checkPermission(req, ['projects:view'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    try {
<<<<<<< HEAD
        const projectRef = db.collection('projects').doc(projectId);
        const projectSnap = await projectRef.get();
=======
        const projectRef = doc(db, 'projects', params.projectId);
        const projectSnap = await getDoc(projectRef);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        if (!projectSnap.exists()) {
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ id: projectSnap.id, ...projectSnap.data() });
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT /api/admin/projects/{projectId} - Update a project
<<<<<<< HEAD
export async function PUT(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    
=======
export async function PUT(req: NextRequest, { params }: { params: { projectId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!await checkPermission(req, ['projects:edit'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    try {
        const body = await req.json();
        const { name, description, status } = body;
        
<<<<<<< HEAD
        const projectRef = db.collection('projects').doc(projectId);
        await projectRef.update({ name, description, status });
=======
        const projectRef = doc(db, 'projects', params.projectId);
        await updateDoc(projectRef, { name, description, status });
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

        return NextResponse.json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE /api/admin/projects/{projectId} - Delete a project
<<<<<<< HEAD
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    
=======
export async function DELETE(req: NextRequest, { params }: { params: { projectId: string } }) {
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    if (!await checkPermission(req, ['projects:delete'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    try {
<<<<<<< HEAD
        const projectRef = db.collection('projects').doc(projectId);
        await projectRef.delete();
=======
        const projectRef = doc(db, 'projects', params.projectId);
        await deleteDoc(projectRef);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        // In a real app, you'd also want to handle cleanup of projectAssignments, etc.
        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
