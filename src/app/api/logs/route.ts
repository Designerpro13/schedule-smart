
import { NextResponse } from 'next/server';
import { addLog } from '@/lib/log-store';
import type { SystemLog } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { message, level, user } = (await request.json()) as { message: string; level: SystemLog['level']; user: string };
    
    if (!message || !level || !user) {
      return NextResponse.json({ message: 'Missing required log fields' }, { status: 400 });
    }

    addLog(message, level, user);
    
    return NextResponse.json({ message: 'Log received' }, { status: 200 });
  } catch (error) {
    console.error('Failed to process log:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred while logging.' },
      { status: 500 }
    );
  }
}
