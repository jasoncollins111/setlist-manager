import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    // await sql`Drop Table if exists Songs cascade`;
    // const result =
    //   await sql`CREATE TABLE Songs ( id SERIAL PRIMARY KEY, Song varchar(255) NOT NULL UNIQUE);`;
      const result = await sql`SELECT * from Songs;`;
      // console.log('result', result)
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}