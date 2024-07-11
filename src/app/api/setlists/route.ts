import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE setlists (show_id INTEGER REFERENCES song(id), 
        song_id INTEGER REFERENCES show(id),
        CONSTRAINT setlists_pk PRIMARY KEY(show_id, song_id));`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}