import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const venue = searchParams.get('venue');
  const city = searchParams.get('city');
  
  try {
    if (!date || !venue || !city) throw new Error('data required');
    await sql`INSERT INTO Shows (date, venue, city) VALUES (${date}, ${venue}, ${city});`;
    console.log('yoooooo should have inserted')
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const shows = await sql`SELECT * FROM Shows;`;
  return NextResponse.json({ shows }, { status: 200 });
}