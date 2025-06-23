import { Avatar, Box, Grid, IconButton, Rating } from '@mui/material'
import Delete from '@mui/icons-material/Delete';
import React from 'react'
import { red } from '@mui/material/colors';

const ReviewCard = () => {
  return (
    <div className='flex justify-between'>
        <Grid container spacing={8}>
            <Grid size={{xs: 1}}>
                <Box>
                  <Avatar className='text-white' sx={{width: 56, height: 56, bgcolor: '#9155FD'}}>
                    Z
                  </Avatar>
                </Box>
            </Grid>
            <Grid size={{xs: 9}}>
                <div className='space-y-2'>
                    <div>
                      <p className='font-semibold text-lg'>Zosh</p>
                      <p className='opacity-70'>2025-06-03</p>
                    </div>
                    <Rating 
                    readOnly
                    value={4.5}
                    precision={0.5} />

                    <p>value for money product.</p>

                    <div>
                      <img className='w-24 h-24 object-cover'
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_j-gbGFRqwGAwhoXIIS_RLlEW78hIEu7GA&s" alt="" />
                    </div>
                </div>
            </Grid>
        </Grid>  
        <div>
            <IconButton>
                <Delete style={{ color: red[700] }} />
            </IconButton>
        </div>
    </div>
  )
}

export default ReviewCard