import { describe, expect, it, vi } from "vitest";
import { render, fireEvent, screen } from '@testing-library/react'
import Button from "./Button";

describe('Button tests:', () => {
    it('Renderiza correctamente', () => {
        render(<Button />)
    })

    it('Mantener presionado cambia id a selected, y al soltarlo la quita', async () => {
        render(<Button />);
        const button = screen.getByRole('button');
        fireEvent.mouseDown(button);
        expect(button).toHaveAttribute('id', 'selected');
        fireEvent.mouseUp(button);
        expect(button).toHaveAttribute('id', '');
    });

    it('Cambiar el proptype de Type cambia la clase del boton', async () => {
        const { getByText } = render(
            <>
                <Button text='B0' type={0} />
                <Button text='B1' type={1} />
                <Button text='B2' type={2} />
            </>
        );
        const b0 = getByText('B0');
        const b1 = getByText('B1');
        const b2 = getByText('B2');
        expect(b0).toHaveAttribute('class', 'other');
        expect(b1).toHaveAttribute('class', 'option');
        expect(b2).toHaveAttribute('class', 'equal');
    });

    it('Llama una funcion al ser clickeado', () => {
        const spy = vi.fn()
        const { getByText } = render(<Button text='Button Text' onClick={spy} />);
        const buttonElement = getByText('Button Text');
        fireEvent.click(buttonElement);
        expect(spy).toHaveBeenCalledTimes(1);
    })
})

