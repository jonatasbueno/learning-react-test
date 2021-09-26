import React from 'react';
import Transacao from './Transacao';
import { render } from '@testing-library/react';

describe('Componente Transação', () => {
  /**
   * O teste de snapshot ocorre pra gantir a renderização de todos lementos HTML
   */
  it('teste snapshot', () => {
    const { container } = render(<Transacao data="25/09/2021" tipo="deposito" valor='100' />);

    expect(container.firstChild).toMatchSnapshot();
  })
})