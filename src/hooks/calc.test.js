import { it, describe, expect } from 'vitest'
import * as logic from './calcLogic.js'

describe('Logica de Calculadora:',()=>{

    describe('operaciones',()=>{
        it('suma',()=>{
            expect(logic.calculate(1,'+',2)).toBe(3)
        })
        it('resta',()=>{
            expect(logic.calculate(8,'-',2)).toBe(6)
        })
        it('multipliacion',()=>{
            expect(logic.calculate(5,'*',2)).toBe(10)
        })
        it('division',()=>{
            expect(logic.calculate(6,'/',2)).toBe(3)
        })
        it('division entre 0',()=>{
            expect(logic.calculate(6,'/',0)).toBe('Error')
        })
        it('sin operador',()=>{
            expect(logic.calculate(1,'',2)).toBe(1)
        })
    })
    
    
    describe('errores en la calculadora',()=>{
        it('resultado positivo (sin error)',()=>{
            expect(logic.errorCatcher(124)).toBe(false)
        })
        it('resultado negativo (error)',()=>{
            expect(logic.errorCatcher(-124)).toBe(true)
        })
        it('entero con 9 digitos o menos (sin error)',()=>{
            expect(logic.errorCatcher(123456789)).toBe(false)
        })
        it('entero mayor a 9 (error)',()=>{
            expect(logic.errorCatcher(12345678910)).toBe(true)
        })
        it('decimal con 9 digitos o menos contando el punto (Sin error)',()=>{
            expect(logic.errorCatcher(1234.6789)).toBe(false)
        })
        it('decimal con mas de 9 digitos, parte entera menor a 7 ditgitos (sin error)',()=>{
            expect(logic.errorCatcher(1234.67891)).toBe(false)
        })
        it('decimal con mas de 9 digitos, parte entera mayor a 7 ditgitos (error)',()=>{
            expect(logic.errorCatcher(123456789.67891)).toBe(true)
        })
    })
    
    describe('Formateo de decimal (contando el punto)',()=>{
        it('Decimal con digitos totales menor a 9:\n       1.1 -> 1.1',()=>{
            expect(logic.formatDecimal(1.1)).toBe('1.1')
        })
        it('Decimal con digitos totales mayor a 9, parte entera menor a 7 digitos:\n       123.567891234 -> 123.56789',()=>{
            expect(logic.formatDecimal(123.567891234)).toBe('123.56789')
        })
        it('Decimal con digitos totales mayor a 9, parte entera mayor a 7 digitos\n       12345678.123 -> 12345678',()=>{
            expect(logic.formatDecimal(12345678.123)).toBe('12345678')
        })
    })    
})
