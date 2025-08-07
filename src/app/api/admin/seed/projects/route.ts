
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { writeBatch, doc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
import { initialProjects, projectAssignments } from '@/app/dashboard/_data/seed-data';
import { getSessionAndUserRole } from '@/lib/auth';

async function checkPermission(req: NextRequest, requiredPermissions: string[]): Promise<boolean> {
    const userRole = await getSessionAndUserRole(req); 
    if (!userRole || userRole !== 'Admin') { // Seeding should be strictly Admin
        console.warn(`Authorization failed for role '${userRole}'. Required: Admin`);
        return false;
    }
    return true;
}

export async function POST(req: NextRequest) {
    if (!await checkPermission(req, ['system:seed'])) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
<<<<<<< HEAD
        const batch = db.batch();

        // Seed Projects
        initialProjects.forEach(project => {
            const projectRef = db.collection("projects").doc(project.id);
=======
        const batch = writeBatch(db);

        // Seed Projects
        initialProjects.forEach(project => {
            const projectRef = doc(db, "projects", project.id);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
            batch.set(projectRef, project);
        });

        // Seed Project Assignments
        projectAssignments.forEach(assignment => {
<<<<<<< HEAD
            const assignmentRef = db.collection("projectAssignments").doc();
=======
            const assignmentRef = doc(collection(db, "projectAssignments"));
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
            batch.set(assignmentRef, assignment);
        });

        await batch.commit();

        return NextResponse.json({ message: 'Projects data seeded successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error seeding projects:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
