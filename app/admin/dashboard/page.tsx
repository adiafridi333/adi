import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/admin-auth';
import Dashboard from './Dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  if (!(await isAuthed())) redirect('/admin');
  return <Dashboard />;
}
