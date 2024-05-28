import React from "react";
import PropTypes from 'prop-types'
import './Display.css'

const Display = ({text}) => {
    return(
        <h2 className="display">{text}</h2>
    )
}

Display.propTypes = {
    text: PropTypes.string
}

export default Display