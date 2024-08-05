import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const body = await request.json();
  const { song } = body;
  
  try {
    if (!song) throw new Error('data required');
    await sql`INSERT INTO Songs (Song) VALUES (${song});`;
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const songs = await sql`SELECT * FROM Songs;`;
  return NextResponse.json({ songs }, { status: 200 });
}