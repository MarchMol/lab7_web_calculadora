import React from "react";
import Button from "@button/Button.jsx";
import Display from '@display/Display.jsx'
import './Calculator.css'
import useCalc from "@hooks/useCalc.jsx";

const button_obj = {
    1:['CA',1],
    2:['CE',1],
    3:['⌫',1],
    4:['/',0],
    5:['7',0],
    6:['8',0],
    7:['9',0],
    8:['+',0],
    9:['4',0],
    10:['5',0],
    11:['6',0],
    12:['-',0],
    13:['1',0],
    14:['2',0],
    15:['3',0],
    16:['*',0],
    17:['+/-',0],
    18:['0',0],
    19:['.',0],
    20:['=',3]
};

const Calculator = () => {
    const {setSelected} = useCalc();

    const handleClick = (value) => {
        console.log(value)
        setSelected(value)
    }

    return (
        <div className='calculator'>
                <Display text='HOLAAA' />
            <div className='numberGrid'>
            
                {Object.entries(button_obj).map(([item, index])=> (
                    <Button key={item} type={index[1]} text={index[0]} onClick={() => handleClick(index[0])} />
                ))}
            </div>
        </div>
    )

}

export default Calculator