import React from 'react';
import { describe, expect, it } from "vitest";
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Calculator from './Calculator';
import { CalcContext, CalcProvider } from '../../hooks/useCalc';

describe('Calculator component tests', () => {
    it('Numeros funcionan con click', async () => {
        let temDisplay;
        const { getByText, getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ displayText }) => {
                        temDisplay = displayText;
                        return (
                            <Calculator />
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        const display = getByTestId('display');

        fireEvent.click(getByText('1'));

        await waitFor(() => {
            expect(display).toHaveTextContent('1');
        });
        fireEvent.click(getByText('2'));
        await waitFor(() => {
            expect(display).toHaveTextContent('12');
        });
    });

    it('Operaciones funcionan con click', async () => {
        let temDisplay;
        const { getByText, getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ displayText }) => {
                        temDisplay = displayText;
                        return (
                            <Calculator />
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        const display = getByTestId('display');
        const operation = getByTestId('operation');

        fireEvent.click(getByText('5'));

        await waitFor(() => {
            expect(display).toHaveTextContent('5');
            expect(operation).toHaveTextContent('');
        });
        fireEvent.click(getByText('-'));
        await waitFor(() => {
            expect(display).toHaveTextContent('5');
            expect(operation).toHaveTextContent('5-');
        });
        fireEvent.click(getByText('3'));
        await waitFor(() => {
            expect(display).toHaveTextContent('3');
            expect(operation).toHaveTextContent('5-');
        });
        fireEvent.click(getByText('='));
        await waitFor(() => {
            expect(display).toHaveTextContent('2');
            expect(operation).toHaveTextContent('');
        });
    });

    it('Teclas funcionan con teclado', async () => {
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {() => (
                        <Calculator />
                    )}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        const display = getByTestId('display');
        const operation = getByTestId('operation');
        const calculator = getByTestId('calculator');

        await act(async () => {
            calculator.focus(); 
            fireEvent.keyDown(calculator, { key: '1' });
            fireEvent.keyUp(calculator, { key: '1' });
        });
        await waitFor(() => {
            expect(display).toHaveTextContent('1');
            expect(operation).toHaveTextContent('');
        })

        await act(async () => {
            calculator.focus(); 
            fireEvent.keyDown(calculator, { key: '3' });
            fireEvent.keyUp(calculator, { key: '3' });
        });
        await waitFor(() => {
            expect(display).toHaveTextContent('13');
            expect(operation).toHaveTextContent('');
        })

        await act(async () => {
            calculator.focus(); 
            fireEvent.keyDown(calculator, { key: '*' });
            fireEvent.keyUp(calculator, { key: '*' });
        });
        await waitFor(() => {
            expect(display).toHaveTextContent('13');
            expect(operation).toHaveTextContent('13*');
        })

        await act(async () => {
            calculator.focus(); 
            fireEvent.keyDown(calculator, { key: '=' });
            fireEvent.keyUp(calculator, { key: '=' });
        });
        await waitFor(() => {
            expect(display).toHaveTextContent('169');
            expect(operation).toHaveTextContent('');
        })
    });
});
