import React from 'react'


const Output = () => {
    const output=localStorage.getItem('output')
  return (
    <div>
        {output}
    </div>
  )
}

export default Output