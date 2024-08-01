import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const body = await request.json();
  const { venue, city, state, notes, date } = body;

  try {
    if (!date || !venue || !city || !state) throw new Error('data required');
    await sql`INSERT INTO Shows (date, venue, city, state, notes) VALUES (${date}, ${venue}, ${city}, ${state}, ${notes});`;
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const shows = await sql`SELECT * FROM Shows;`;
  return NextResponse.json({ shows }, { status: 200 });
}