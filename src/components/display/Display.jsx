import React, { useEffect } from "react";
import './Display.css'
import useCalc from "@hooks/useCalc";

const Display = ({ calcOptions }) => {
    const { displayText, operation } = calcOptions || useCalc();
    useEffect(() => {
        try {
            if (displayText.length > 9) {

            }
        } catch (error) { }
    }, [displayText])

    return (
        <div className="displayScreen">
            <div className="displayGrid">
                <p className="displayOperation">
                    {`${operation.substring(0, 10)}`}
                </p>
                <h2 className="displayMain">
                    {`${displayText.substring(0, 9)}`}
                </h2>
            </div>
        </div>
    )
}

export default Display