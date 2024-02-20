import React from 'react'
import {Avatar} from '@mui/material'
import { type Profile, Prisma } from '@prisma/client'

export type profileProps = Prisma.ProfileGetPayload<{
  include: {
    user: true
  }
}>

const Profile = ({data}: {data: profileProps}) => {
  return (
    <div className='w-[600px] bg-aero flex p-4 gap-4 rounded-lg'>
      <Avatar src={data.user.image} sx={{width: 80, height: 80}}/>
      <div className='flex-1 text-white'>
        <p>{data.user.name}</p>
        <p>{data.user.email}</p>
        {data.bio && 
          <p>data.bio</p>
        }
      </div>
    </div>
  )
}

export default Profile