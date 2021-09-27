import React from 'react';
import App from './App';
import Conta from './conta/Conta';
import { screen, render, fireEvent } from '@testing-library/react';
import api from './api';

jest.mock('./api');

describe('Integração', () => {
  test('Exibir lista de transações da API', async () => {
    api.listaTransacoes.mockResolvedValue([
      {
        "valor": "10",
        "transacao": "saque",
        "data": "10/08/2020",
        "id": 1
      },
      {
        "transacao": "deposito",
        "valor": "20",
        "data": "26/09/2020",
        "id": 2
      }
    ]);

    render(<App />);
    expect(await screen.findByText('saque')).toBeInTheDocument();
    expect(screen.getByTestId('transacoes').children.length).toBe(2);
  })

  test('Chama funçao de realizar transação, quando o botão é clicado', () => {
    const funçãoRealizarTransação = jest.fn(); // simulando click

    render(<Conta saldo={1000} realizarTransacao={funçãoRealizarTransação} />); // passando funçao simulada
    fireEvent.click(screen.getByText('Realizar operação'));

    expect(funçãoRealizarTransação).toHaveBeenCalled(); // checando se a função foi cahamada pelo menos uma vez
  })
})