import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import './Button.css'
import useButton from "../../hooks/useButton"

const Button = ({ text, onClick }) => {
    const {selected} = useButton();

    return (
        <>
            {selected===text ?
                (<button onClick={onClick} id="selected">
                    {text}
                </button>)
                :
                (<button onClick={onClick}>
                    {text}
                </button>)

            }
        </>

    )
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default Button