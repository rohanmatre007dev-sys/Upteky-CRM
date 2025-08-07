
'use client';

import { useEffect, useState } from 'react';
import { PlusCircle, Upload } from "lucide-react"
import Link from "next/link"
import { collection, getDocs } from "firebase/firestore";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

// This is the initial data that will be used to seed the database.
import {
    initialUsers,
} from '../_data/seed-data';
import { Skeleton } from '@/components/ui/skeleton';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

export default function UserManagementPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersCollection = collection(db, "users");
            const userSnapshot = await getDocs(usersCollection);
            const usersList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
            setUsers(usersList);
        } catch (error) {
            console.error("Error fetching users: ", error);
            toast({
                variant: 'destructive',
                title: "Error fetching users",
                description: "Could not load user data from the database.",
            })
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
        // Call the seed API routes
        const seedPromises = [
            fetch('/api/admin/seed/teams', { method: 'POST' }),
            fetch('/api/admin/seed/projects', { method: 'POST' }),
            fetch('/api/admin/seed/tickets', { method: 'POST' }),
        ];

        await Promise.all(seedPromises);
        
        toast({
            title: "Database Seeded",
            description: "The initial data has been loaded into Firestore.",
        });
        
        // Refetch users after seeding
        fetchUsers();

    } catch (error) {
        console.error("Error seeding database: ", error);
        toast({
            variant: "destructive",
            title: "Seeding Failed",
            description: "There was an error while seeding the database.",
        });
    } finally {
        setIsSeeding(false);
    }
  }


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all users in the Upteky Central system.</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
                <Button size="sm" className="gap-1" onClick={handleSeedDatabase} disabled={isSeeding}>
                    <Upload className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {isSeeding ? "Seeding..." : "Seed Database"}
                    </span>
                </Button>
                <Link href="/dashboard/user-management/add-user">
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add User
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-16" /></TableCell>
                    </TableRow>
                ))
            ) : users.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No users found. Try seeding the database.
                    </TableCell>
                </TableRow>
            ) : (
                users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                            <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                           <Link href={`/dashboard/user-management/${user.id}/edit`}>
                             <Button variant="outline" size="sm">Edit</Button>
                           </Link>
                        </TableCell>
                    </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{users.length}</strong> of <strong>{users.length}</strong> users
        </div>
      </CardFooter>
    </Card>
  )
}
