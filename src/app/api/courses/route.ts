
import { NextResponse } from 'next/server';
import { mockCourses } from '@/lib/data';

export async function GET() {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(mockCourses);
}
