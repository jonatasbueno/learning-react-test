import React from 'react';
/**
 * render = usado para renderizar um component
 * screen = usado para acessar recursos da tela
 */
import { render, screen } from '@testing-library/react';

import App from './App';

describe("Componente principal", () => {
  describe('Quando eu abro o app do banco', () => {
    /**
     * text e it tem a mesma finalidade, recebendo dois parametros, um é o texto e o outro é a função a ser executada
     */
    test('Mostrar o nome do banco', () => {
      render(<App />);

      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    })

    it('Mostrar saldo', () => {
      render(<App />);

      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    })

    it('O botão é exibido', () => {
      render(<App />);

      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    })
  })
})
