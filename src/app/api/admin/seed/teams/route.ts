
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { writeBatch, doc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
import { initialTeams, initialTeamMembers, teamToolAccess } from '@/app/dashboard/_data/seed-data';
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

        // Seed Teams
        initialTeams.forEach(team => {
            const teamRef = db.collection("teams").doc(team.id);
=======
        const batch = writeBatch(db);

        // Seed Teams
        initialTeams.forEach(team => {
            const teamRef = doc(db, "teams", team.id);
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
            batch.set(teamRef, team);
        });

        // Seed Team Members
        initialTeamMembers.forEach(member => {
<<<<<<< HEAD
            const memberRef = db.collection("teamMembers").doc();
=======
            const memberRef = doc(collection(db, "teamMembers"));
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
            batch.set(memberRef, member);
        });
        
        // Seed Team Tool Access
        teamToolAccess.forEach(access => {
<<<<<<< HEAD
            const accessRef = db.collection("teamToolAccess").doc();
=======
            const accessRef = doc(collection(db, "teamToolAccess"));
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
            batch.set(accessRef, access);
        });

        await batch.commit();

        return NextResponse.json({ message: 'Teams data seeded successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error seeding teams:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
