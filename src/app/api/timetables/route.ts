
import { NextResponse } from 'next/server';
import { mockPastTimetables } from '@/lib/data';

export async function GET() {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return NextResponse.json(mockPastTimetables);
}
