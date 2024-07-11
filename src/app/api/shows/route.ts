import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    await sql`DROP TABLE shows`;
    const result = await sql`CREATE TABLE Shows ( 
        id SERIAL PRIMARY KEY,
        date DATE,
        venue varchar(255),
        city varchar(255)
      );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }
}