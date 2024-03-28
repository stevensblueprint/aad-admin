'use client' // Error components must be Client Components
 
import { useEffect } from 'react';
import { Button } from '@mui/material';
 
export default function Error({
  errorMessage,
}: {
  errorMessage: string
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(errorMessage)
  }, [errorMessage])
 
  return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-midnight-sky to-aero">
			<h1 className="py-8 font-sans text-4xl text-white">Something went wrong!</h1>
			<p className='p-4 mb-10 text-3xl text-red-500 bg-white rounded-xl'><b>Error: </b> {errorMessage}</p>
			<Button href='/' variant='contained'>
				Return to Home
			</Button>
    </div>
  )
}