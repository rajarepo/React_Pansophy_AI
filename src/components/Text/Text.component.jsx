import React from 'react'

const P = () => {
    return (
        <div>Text</div>
    )
}

const Page = () => {
    return (
        <div>Text</div>
    )
}

const PageHeading = ({text}) => {
    return (
        <h1 className='text-3xl my-auto font-bold text-white'>{text}</h1>
    )
}

const Heading = () => {
    return (
        <div>Text</div>
    )
}


const SubHeading = () => {
    return (
        <div>Text</div>
    )
}

const Small = () => {
    return (
        <div>Text</div>
    )
}

const Text = {
    P,
    Page,
    PageHeading,
    Heading,
    SubHeading,
    Small
}

export default Text