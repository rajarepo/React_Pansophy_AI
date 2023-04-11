import Button from 'components/Button/Button.component';
import React from 'react'
import './Banner.styles.css';
function Banner({
    type,
    icon,
    title,
    subtitle,
    buttonText,
    onClick,
}) {
    let className = '';
    switch (type) {
        case 'primary':
            className = 'bg-primary-P50';
            break;
        case 'danger':
            className = 'bg-red-P50';
            break;
        default:
            break;
    }
    return (
        <div className='page-alert flex p-4 my-4 rounded'>
            {/* <div className='grid grid-rows grid-cols-2 p-4 my-4 border border-white rounded'> */}
            <div className='my-auto flex-1 flex'>
                <div className={`${className} rounded-full flex items-center justify-center px-2.5 mr-5`}>
                    {icon}
                </div>
                <div>
                    <p className='text-xs text-light'>{title}</p>
                    <h3 className='text-xl'>{subtitle}</h3>
                </div>
            </div>
            <div className=''>
                <Button type={'secondary'} label={buttonText} onClick={onClick} />
            </div>

        </div>
    )
}

export default Banner;