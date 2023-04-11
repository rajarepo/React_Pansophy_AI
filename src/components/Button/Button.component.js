import React from 'react'
import './Button.styles.css';
function Button({ onClick, label, type, icon, className }) {
  let propStyle = '';
  switch (type) {
    case 'primary':
      propStyle = 'bg-primary-P50 text-white-P50';
      break;

    case 'secondary':
      propStyle = 'btn-secondary text-white-P50';
      break;

    default:
      break;

  }
  return (
    <button
      onClick={onClick}
      type={type}
      class={className + " text-sm py-4 px-6 rounded-lg " + propStyle}
    >
      {icon && <p>{icon}</p>}
      {label}
    </button>
  )
}

export default Button