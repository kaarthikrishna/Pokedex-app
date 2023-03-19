import React from 'react'
import Link from 'next/link'
function Navbar() {
  return (
    <div className='h-14 p-2 mt-5 flex items-center justify-center'>
      <Link href="/">
            <img src='/download' alt="" height={56} width={224} />
        </Link>
    </div>
  )
}

export default Navbar
