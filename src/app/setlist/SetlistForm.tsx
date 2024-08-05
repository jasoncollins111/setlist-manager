'use client'

import { useState, useEffect } from 'react';
import { Box, FormControl } from '@mui/material';
import {Checkbox, Button, Dropdown, Input, Menu, MenuItem, MenuButton, Textarea, Typography} from '@mui/joy';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {Dayjs} from 'dayjs';
import axios from 'axios';

export default function SetlistForm() {
  const [venue, setVenue] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const [song, setSong] = useState<string>('');
  const [songList, setSongList] = useState<Array<any>>([]);

  useEffect(() => {
    getSongs();
  },[])

  async function getSongs() {
    const result = await axios.get('/api/songs');
    const songs = result?.data?.result?.rows;
    setSongList(songs);
  }

  async function submitShow(){
    if (venue && city && state && notes && date) {
      axios.post("/api/add-show", { venue, city, state, notes, date });
    }
  }

  async function submitSong() {
    if (song) {
      try {
        await axios.post("/api/add-song", { song });
        setSong('');
      } catch (error) {
        console.log('error', error);
      }
    }
  }

  return (
    <Box>
      <Typography level="h1">Add Setlist</Typography>
      <FormControl>
        <Input placeholder="Venue" onChange={e => setVenue(e.target.value)}/> 
        <Input placeholder="City" onChange={e => setCity(e.target.value)}/>
        <Input placeholder="State" onChange={e => setState(e.target.value)}/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider>
        <Textarea minRows={6} placeholder="Notes" onChange={e => setNotes(e.target.value)}/>
        <Dropdown>
            <MenuButton>
              Songs
            </MenuButton>
          <Menu>
            {songList.map((song, idx) => {
              return (
                <MenuItem key={idx}>
                  <Checkbox label={song.song_name} value={song.song_name} key={idx} />
                </MenuItem>
              )
            })}
          </Menu>
        </Dropdown>
        <Button onClick={submitShow}>Submit</Button>
      </FormControl>
      <Typography level="h1">Add Song</Typography>
      <FormControl>
        <Input placeholder="Song Name" value={song} onChange={e => setSong(e.target.value)} /> 
        <Button onClick={submitSong}>Submit Song</Button>
      </FormControl>
    </Box>
  )

}