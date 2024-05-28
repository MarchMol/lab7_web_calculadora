import React from "react";
import PropTypes from 'prop-types'
import './Display.css'
import useCalc from "../../hooks/useCalc";

const Display = () => {
    const {displayText, operation} = useCalc()
    return(
        <div className="displayGrid">
        <p className="displayOperation">{operation}</p>
        <h2 className="displayMain">{displayText}</h2>
        </div>

    )
}

Display.propTypes = {
    text: PropTypes.string
}

export default Display