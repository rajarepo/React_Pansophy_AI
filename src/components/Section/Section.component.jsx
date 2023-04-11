import React from 'react'

const PageHeading = ({ children }) => {
    return (
        <div className='grid grid-rows grid-flow-col justify-items-around py-3'>{children}</div>
    )
}

const Section = {
    PageHeading
}

export default Section