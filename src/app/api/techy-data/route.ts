
import { NextResponse } from 'next/server';
import { mockLogs, mockTickets } from '@/lib/techy-data';

export async function GET() {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json({ logs: mockLogs, tickets: mockTickets });
}
