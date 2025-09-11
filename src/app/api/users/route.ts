
import { NextResponse } from 'next/server';
import { users } from '@/lib/users';

export async function GET() {
  // In a real app, you'd want to protect this route
  // and likely not send the password hash.
  // For this prototype, we return all user data.
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  return NextResponse.json(usersWithoutPasswords);
}
