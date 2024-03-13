import React from 'react'

function Container({ children }) {
  return (      // these bracets are optional
    <div className='w-full max-w-7xl px-4 rounded-t-sm'>
      {children}
    </div>
  )
}

export default Container
