import { api } from '~/utils/api'
import {Button, ButtonGroup, Stack} from '@mui/material'
import { useState } from 'react'
import Profile from '../components/directory/Profile'

const Directory = () => {

  const [current, setCurrent] = useState<string>("mentee")
  
  const {data, error, isLoading} = api.user.getByRole.useQuery(`${current}`)

  const roles = ['Mentee', 'Mentor', "Admin"]
  const buttons = roles.map(role => (
    <Button key={role} disabled={isLoading} onClick={() => setCurrent(role.toLowerCase())}>{role}</Button>
  ))
  
  return (
    <main className='bg-clear min-h-screen w-full flex flex-col items-center'>
      <h1 className='text-aero font-bold text-6xl mt-6'>Directory</h1>
      <ButtonGroup className='mt-10 mb-4' size='large' color='primary'>
        {buttons}
      </ButtonGroup>
      {data && 
        <Stack spacing={2} >
          {
            data.map(user => (
              <Profile data={user} key={user.id}/>
            )
          )}
        </Stack>
      }
    </main>
  )
}

export default Directory