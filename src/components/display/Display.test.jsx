import React from 'react';
import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from '@testing-library/react'
import Display from './Display';

describe('Display Component', () => {
    it('Renderiza Correctamente',()=>{
        const calcOptions = {
            displayText: '987654321',
            operation: 'SUBTRACT'
          };
        render(<Display calcOptions={calcOptions}/>);

    })
      it('renders with useCalc hook when calcOptions is not provided', async () => {
        const calcOptions = {
            displayText: '987654321',
            operation: 'SUBTRACT'
          };
        render(<Display calcOptions={calcOptions}/>);
    
        await waitFor(() => {
          expect(screen.getByText('SUBTRACT')).toBeInTheDocument();
          expect(screen.getByText('987654321')).toBeInTheDocument(); 
        });
      });


  it('catches errors in useEffect', () => {
    const calcOptions = {
      displayText: null,
      operation: 'ERROR'
    };

    render(<Display calcOptions={calcOptions} />);

    expect(screen.getByText('ERROR')).toBeInTheDocument();
  });
});