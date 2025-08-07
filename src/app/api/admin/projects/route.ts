
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { Timestamp } from 'firebase-admin/firestore';
import { db } from '@/lib/firebase-admin';
import { getSessionAndUserRole } from '@/lib/auth';



=======
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getSessionAndUserRole } from '@/lib/auth';

>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
async function checkPermission(req: NextRequest, requiredPermissions: string[]): Promise<boolean> {
    const userRole = await getSessionAndUserRole(req); 

    if (!userRole) {
        console.warn('Authentication failed: No user role found.');
        return false;
    }

    const rolePermissionsMap: { [key: string]: string[] } = {
        'Admin': ['projects:create', 'projects:view'],
    };

    const userPermissions = rolePermissionsMap[userRole] || [];
    const hasPermission = requiredPermissions.every(perm => userPermissions.includes(perm));

    if (!hasPermission) {
        console.warn(`Authorization failed for role '${userRole}'. Required: [${requiredPermissions.join(', ')}]`);
    }

    return hasPermission;
}


// POST /api/admin/projects - Create a new project
export async function POST(req: NextRequest) {
    if (!await checkPermission(req, ['projects:create'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { name, description, status } = body;

        if (!name || !status) {
            return NextResponse.json({ message: 'Name and status are required' }, { status: 400 });
        }

        const newProject = {
            name,
            description: description || '',
            status,
            createdAt: Timestamp.now(),
        };

<<<<<<< HEAD
        const docRef = await db.collection('projects').add(newProject);
=======
        const docRef = await addDoc(collection(db, 'projects'), newProject);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        return NextResponse.json({ id: docRef.id, ...newProject }, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// GET /api/admin/projects - List all projects
export async function GET(req: NextRequest) {
    if (!await checkPermission(req, ['projects:view'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
<<<<<<< HEAD
        const projectsSnapshot = await db.collection('projects').get();
=======
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
        const projectsList = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(projectsList);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
