import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const song = searchParams.get('song');
  const showVenue = searchParams.get('venue'); 
  // const showVenue = 'cervantes'; 
  const showDate = searchParams.get('date'); 
  // const showDate = '2024-01-26'; 
  let song_id;
  let show_id;

  try {
    const songResult = await sql`SELECT id FROM songs WHERE song_name = ${song}`;
    const showResult = await sql`SELECT id FROM shows WHERE date = ${showDate} AND venue = ${showVenue}`; 
    if (songResult.rowCount === 0) throw new Error('Song not found');
    if (showResult.rowCount === 0) throw new Error('Show not found');
    
    song_id = songResult.rows[0].id;
    show_id = showResult.rows[0].id;
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }

  try {
    console.log('songId', song_id); 
    if (!show_id || !song_id) throw new Error('data required');
    await sql`INSERT INTO setlists (show_id, song_id) VALUES (${show_id}, ${song_id});`;
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const shows = await sql`SELECT * FROM Shows;`;
  return NextResponse.json({ shows }, { status: 200 });
}