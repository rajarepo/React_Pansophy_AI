import React from 'react'
import './Input.styles.css';

const Free = ({
  placeholder, onChange, value, type, label, rightIcon, leftIcon, onLeftClick, onRightClick }) => {
  return (
    <div className="input-container">
      {label && <label
        htmlFor="exampleFormControlInput1"
        className="input-label"
      >{label}
      </label>}
      <div className="flex items-center justify-center input-parent my-3 rounded-lg">
        {leftIcon ? <button onClick={onLeftClick}>{leftIcon}</button> : null}
        <input
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          type={type}
          className="input w-full py-3 pl-5 pr-12 text-sm text-white-P600
          active 
          focus-visible:ring-1 focus-visible:border-black-P600 focus-visible:outline-none focus-visible:bg-primary-P600
          focus:ring-0
          "
          id="exampleFormControlInput1" />
        {rightIcon ? <button onClick={onRightClick} className='mr-3 absolute right-10'>{rightIcon}</button> : null}
      </div>
    </div>
  )
}

const CheckBox = ({ checked, onChange }) => {
  return (
    <label className="checkbox-container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkmark rounded-lg"></span>
    </label>

  )
}

const Input = {
  Free,
  CheckBox,
}

export default Input