import { it, describe, expect } from 'vitest';
import React from 'react';
import { CalcProvider, CalcContext } from './useCalc'; // Adjust the import path accordingly
import { render, waitFor } from '@testing-library/react'


describe('useCalc tests:', () => {
    it('Inicializa adecuadamente', async () => {
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText }) => (
                        <div data-testid="test-component">
                            <span data-testid="operation">{operation}</span>
                            <span data-testid="selected">{selected}</span>
                            <span data-testid="displayText">{displayText}</span>
                        </div>
                    )}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        const testComponent = getByTestId('test-component');
        expect(testComponent).toBeDefined();

        expect(getByTestId('operation')).toHaveTextContent('');
        expect(getByTestId('selected')).toHaveTextContent('');
        expect(getByTestId('displayText')).toHaveTextContent('');

    });

    it('Seleccion: numero -> numero : concatena', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('5')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('7')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('57');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('9')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('579');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
    });

    it('Seleccion: numero -> operacion -> operacion : opera', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('5')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('*')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('5*');
        });
        simulateSelect('-')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('25-');
        });
    });

    it('Seleccion: numero -> operacion -> answer: opera', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('5')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('+')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('5+');
        });
        simulateSelect('=')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('10');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
    });

    it('Seleccion: numero -> operacion -> numero -> operacion: opera', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('4')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('4');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('+')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('4');
            expect(getByTestId('operation')).toHaveTextContent('4+');
        });
        simulateSelect('6')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('6');
            expect(getByTestId('operation')).toHaveTextContent('4+');
        });
        simulateSelect('*')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('6');
            expect(getByTestId('operation')).toHaveTextContent('10*');
        });
    });

    it('Seleccion: operacion: opera sobre 0', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('-')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('');
            expect(getByTestId('operation')).toHaveTextContent('0-');
        });
        simulateSelect('+')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('');
            expect(getByTestId('operation')).toHaveTextContent('0+');
        });
    });

    it('Seleccion CE/CA borra display', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('4')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('4');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('+')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('4');
            expect(getByTestId('operation')).toHaveTextContent('4+');
        });
        simulateSelect('CE')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('');
            expect(getByTestId('operation')).toHaveTextContent('4+');
        });
        simulateSelect('7')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('7');
            expect(getByTestId('operation')).toHaveTextContent('4+');
        });
        simulateSelect('CA')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
    });

    it('Seleccion: numero -> +/- cambia signo', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('5')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('+/-')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('-5');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('+/-')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
    });

    it('Seleccion: numero -> ⌫: borra ultimo digito', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('5')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('7')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('57');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('8')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('578');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('⌫')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('57');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('⌫')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
    });

    it('Resultado negativo da Error', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('5')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('-')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('5');
            expect(getByTestId('operation')).toHaveTextContent('5-');
        });
        simulateSelect('8')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('8');
            expect(getByTestId('operation')).toHaveTextContent('5-');
        });
        simulateSelect('=')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('Error');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
    });

    it('Resultado muy grande da Error', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        for (let i = 1; i < 9; i++) {
            await waitFor(() => {
                simulateSelect('9')
                expect(getByTestId('displayText')).toHaveTextContent('9'.repeat(i));
            });
        }
        simulateSelect('*')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('999999999');
            expect(getByTestId('operation')).toHaveTextContent('999999999*');
        });
        simulateSelect('2')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('2');
            expect(getByTestId('operation')).toHaveTextContent('999999999*');
        });
        simulateSelect('=')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('Error');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
    });
    it('Cambiar signo en un numero muy grande da error', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        for (let i = 1; i < 9; i++) {
            await waitFor(() => {
                simulateSelect('9')
                expect(getByTestId('displayText')).toHaveTextContent('9'.repeat(i));
            });
        }
        simulateSelect('+/-')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('Error');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
    });

    it('Division da decimal formateado', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('1')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('1');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('/')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('1');
            expect(getByTestId('operation')).toHaveTextContent('1/');
        });
        simulateSelect('3')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('3');
            expect(getByTestId('operation')).toHaveTextContent('1/');
        });
        simulateSelect('=')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('0.3333333');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
    });

    it('Division entre 0 da error', async () => {
        let simulateSelect
        const { getByTestId } = render(
            <CalcProvider>
                <CalcContext.Consumer>
                    {({ operation, selected, displayText, setSelected }) => {
                        // Assign setSelected to the variable when component mounts
                        simulateSelect = setSelected;

                        return (
                            <div data-testid="test-component">
                                {/* Render displayText for testing */}
                                <span data-testid="displayText">{displayText}</span>
                                <span data-testid="operation">{operation}</span>
                            </div>
                        );
                    }}
                </CalcContext.Consumer>
            </CalcProvider>
        );

        simulateSelect('1')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('1');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
        simulateSelect('/')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('1');
            expect(getByTestId('operation')).toHaveTextContent('1/');
        });
        simulateSelect('0')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('0');
            expect(getByTestId('operation')).toHaveTextContent('1/');
        });
        simulateSelect('=')
        await waitFor(() => {
            expect(getByTestId('displayText')).toHaveTextContent('Error');
            expect(getByTestId('operation')).toHaveTextContent('');
        });
    });
})



