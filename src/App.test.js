import React from 'react';
/**
 * render = usado para renderizar um component
 * screen = usado para acessar recursos da tela
 */
import { render, screen, fireEvent } from '@testing-library/react';

import App, { calcularNovoSaldo } from './App';

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

  describe('Quando eu realizo uma transação', () => {
    it('que é um deposito, o valor deve aumentar', () => {
      const valores = { transacao: 'deposito', valor: 50 };

      expect(calcularNovoSaldo(valores, 100)).toBe(150);
    })

    test('que é um saque, a transação dwve ser realizada', () => {
      /**
       * é possível extrair da renderização de um component métodos para obter elementos html
       * ex: getByText, getByTextId e etc
       */
      const { getByText, getByTestId, getByLabelText } = render(<App />);

      const saldo = getByText('R$ 1000');
      const transacao = getByLabelText('Saque');
      const valor = getByTestId('valor');
      const botaoTransacao = getByText('Realizar operação');

      expect(saldo.textContent).toBe('R$ 1000');

      /**
       * fireEvent é um disparador de evento do @testing-library/react para simular ação de usuário
       * recebe a referência do elemento como primeiro parâmetro e value como segundo valor (target.value)
       */
      fireEvent.click(transacao, { target: { value: 'saque' } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe('R$ 990');
    })
  })
})
