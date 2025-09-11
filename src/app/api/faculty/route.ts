
import { NextResponse } from 'next/server';
import { mockFaculty } from '@/lib/data';

export async function GET() {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(mockFaculty);
}
