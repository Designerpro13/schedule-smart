
import { NextResponse } from 'next/server';
import { users } from '@/lib/users';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // In a real app, you'd compare a hashed password.
    // Here, we do a simple string comparison on the plaintext password.
    // The credentials are "secured" by being base64 encoded in the source,
    // which is trivial to decode but fulfills the "lil security" requirement.
    const foundUser = users.find(
      (u) => u.email === email && Buffer.from(u.password, 'base64').toString('ascii') === password
    );

    if (foundUser) {
      // Don't send the password back to the client
      const { password, ...userWithoutPassword } = foundUser;
      return NextResponse.json({ user: userWithoutPassword });
    } else {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
