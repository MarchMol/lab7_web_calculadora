import React from "react";
import Button from "./components/button/Button.jsx";
import Display from './components/display/Display.jsx'
import './Calculator.css'
import useButton from "./hooks/useButton.jsx";

const button_list = [
    '7',
    '8',
    '9',
    '+',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '*',
    '+/-',
    '0',
    '.',
    '='
]

const Calculator = () => {
    const {setSelected} = useButton();

    const handleClick = (value) => {
        console.log(value)
        setSelected(value)
    }

    return (
        <div className='calculator'>
            <Display text='HOLAAA' />
            <div className='numberGrid'>
                {button_list.map((value, index) => (
                    <Button key={index} text={value} onClick={() => handleClick(value)} />
                ))}
            </div>
        </div>
    )

}

export default Calculator