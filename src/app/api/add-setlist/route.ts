import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const song = searchParams.get('song');
  const showVenue = searchParams.get('venue'); 
  const showDate = searchParams.get('date'); 
  let song_id;
  let show_id;

  try {
    const songId = await sql`SELECT id FROM songs WHERE song_name = ${song}`;
    // const showId = await sql`SELECT id FROM shows WHERE date = ${showDate} AND venue = ${showVenue}`; 
    console.log('show id', songId)
    song_id = songId;
    // show_id = showId;
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }

  try {
    console.log('songId', song_id); 
    // if (!show_id || !song_id) throw new Error('data required');
    // await sql`INSERT INTO setlists (show_id, song_id) VALUES (${song_id});`;
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const shows = await sql`SELECT * FROM Shows;`;
  return NextResponse.json({ shows }, { status: 200 });
}