import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/admin-auth';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  if (await isAuthed()) redirect('/admin/dashboard');
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl">
        <h1 className="mb-1 text-xl font-semibold">Admin</h1>
        <p className="mb-6 text-sm text-neutral-400">Enter your passcode to continue.</p>
        <LoginForm />
      </div>
    </div>
  );
}
