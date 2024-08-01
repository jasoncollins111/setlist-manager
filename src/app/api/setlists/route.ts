import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    await sql`DROP TABLE setlists`;
    
    const result =
      await sql`CREATE TABLE setlists (
        show_id INTEGER REFERENCES shows(id), 
        song_id INTEGER REFERENCES songs(id),
        CONSTRAINT setlists_pk PRIMARY KEY(show_id, song_id));`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}