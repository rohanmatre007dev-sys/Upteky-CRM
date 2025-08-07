
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { db } from '@/lib/firebase-admin';
=======
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Mock data - in a real app, this would be your 'timesheetEntries' collection in Firestore
const timesheetEntries = [
    { id: 'time-1', date: '2024-07-29', user: 'Jane Smith', userId: 'user-emp-jane', task: 'Develop new homepage design', hours: 4.5, status: 'Approved' },
    { id: 'time-2', date: '2024-07-29', user: 'John Doe', userId: 'user-tl-john', task: 'Fix login page bug', hours: 3.0, status: 'Approved' },
    { id: 'time-3', date: '2024-07-29', user: 'Peter Jones', userId: 'user-hr-peter', task: 'Setup CI/CD pipeline', hours: 6.0, status: 'Pending' },
    { id: 'time-4', date: '2024-07-28', user: 'John Doe', userId: 'user-tl-john', task: 'User research for new feature', hours: 5.5, status: 'Approved' },
    { id: 'time-5', date: '2024-07-28', user: 'Jane Smith', userId: 'user-emp-jane', task: 'Develop new homepage design', hours: 4.0, status: 'Approved' },
    { id: 'time-6', date: '2024-07-27', user: 'Admin User', userId: 'user-admin', task: 'Deploy marketing website', hours: 8.0, status: 'Pending' },
    { id: 'time-7', date: '2024-07-30', user: 'Sam Wilson', userId: 'user-bd-sam', task: 'Client Follow-up', hours: 2.0, status: 'Pending' },
    { id: 'time-8', date: '2024-07-30', user: 'Jane Smith', userId: 'user-emp-jane', task: 'Update component library', hours: 5.0, status: 'Pending' },
];
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3

// GET /api/internal/timesheets - List timesheets based on user role
export async function GET(req: NextRequest) {
    const userId = req.headers.get('X-User-Id');
    const userRole = req.headers.get('X-User-Role');

    if (!userId || !userRole) {
        return NextResponse.json({ message: 'User ID and Role are required headers' }, { status: 400 });
    }

    try {
<<<<<<< HEAD
        const snapshot = await db.collection('timesheets').get();
        let allEntries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (userRole === 'Admin' || userRole === 'HR') {
            return NextResponse.json(allEntries);
        }

        if (userRole === 'Team Lead') {
            // Find which teams the user is a lead of.
            const leadTeamsSnapshot = await db.collection('teamMembers')
                .where('userId', '==', userId)
                .get();
            const teamIds = leadTeamsSnapshot.docs.map(doc => doc.data().teamId);

            if (teamIds.length === 0) {
                // Not a lead of any team, just return own timesheets
                return NextResponse.json(allEntries.filter(entry => entry.userId === userId));
            }

            // Get all members of those teams.
            function chunkArray(array, size) {
                const result = [];
                for (let i = 0; i < array.length; i += size) {
                    result.push(array.slice(i, i + size));
                }
                return result;
            }
            let teamMembersDocs = [];
            for (const chunk of chunkArray(teamIds, 30)) {
                const snap = await db.collection('teamMembers')
                    .where('teamId', 'in', chunk)
                    .get();
                teamMembersDocs.push(...snap.docs);
            }
            const teamMemberUserIds = teamMembersDocs.map(doc => doc.data().userId);
            return NextResponse.json(allEntries.filter(entry => teamMemberUserIds.includes(entry.userId)));
        }

        // Default to Employee role: only see their own timesheets
        return NextResponse.json(allEntries.filter(entry => entry.userId === userId));
=======
        if (userRole === 'Admin' || userRole === 'HR') {
            // Admins and HR can see all timesheets
            // In a real Firestore query, you'd just get all documents.
            // For this mock, we just return the full array.
            return NextResponse.json(timesheetEntries);
        }

        if (userRole === 'Team Lead') {
            // Team Leads can see timesheets for their team members
            const teamMembersQuery = query(collection(db, 'teamMembers'), where('reportsToMemberId', '==', userId));
            const leadTeamsQuery = query(collection(db, 'teamMembers'), where('userId', '==', userId), where('teamRole', 'like', '%Lead%'));

            // A real implementation would be more robust. This is a simplified example.
            // Find which teams the user is a lead of.
             const leadTeamsSnapshot = await getDocs(
                query(collection(db, 'teamMembers'), where('userId', '==', userId))
            );
            const teamIds = leadTeamsSnapshot.docs.map(doc => doc.data().teamId);

            if (teamIds.length === 0) {
                 // Not a lead of any team, just return own timesheets
                const userTimesheets = timesheetEntries.filter(entry => entry.userId === userId);
                return NextResponse.json(userTimesheets);
            }

            // Get all members of those teams.
            const teamMembersSnapshot = await getDocs(
                query(collection(db, 'teamMembers'), where('teamId', 'in', teamIds))
            );
            const teamMemberUserIds = teamMembersSnapshot.docs.map(doc => doc.data().userId);
            
            // Filter the mock data. In a real query: where('userId', 'in', teamMemberUserIds)
            const teamTimesheets = timesheetEntries.filter(entry => teamMemberUserIds.includes(entry.userId));
            return NextResponse.json(teamTimesheets);
        }

        // Default to Employee role: only see their own timesheets
        const userTimesheets = timesheetEntries.filter(entry => entry.userId === userId);
        return NextResponse.json(userTimesheets);
        

>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
    } catch (error) {
        console.error("Error fetching timesheets:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
<<<<<<< HEAD

// POST /api/internal/timesheets - Create a new timesheet entry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, user, userId, task, hours, status } = body;
    if (!date || !user || !userId || !task || hours === undefined) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const newEntry = {
      date,
      user,
      userId,
      task,
      hours: Number(hours),
      status: status || 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await db.collection('timesheets').add(newEntry);
    return NextResponse.json({ id: docRef.id, ...newEntry }, { status: 201 });
  } catch (error) {
    console.error('Error creating timesheet entry:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
=======
>>>>>>> 9f28865dde4974f7bb9dc46bc61a2663467f1ce3
