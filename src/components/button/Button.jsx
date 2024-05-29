import React, { useState } from "react"
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ text, onClick, type }) => {
    const [isHolding, setIsHolding] = useState(false)

    const handleDown = () => {
        setIsHolding(true)
    }

    const handleUp = () => {
        setIsHolding(false)
    }

    return (
        <button 
        onClick={onClick} 
        onMouseDown={handleDown} 
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        id={isHolding ? 'selected' : ''}
        className={type>0 ? (type===1 ? 'option' : 'equal') : 'other'}
        >
            {text}
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.number
}

export default Button