// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// src/setupTests.js

import { render } from '@testing-library/react';
import { CartProvider } from './Services/CartContext';

const customRender = (ui, options) =>
  render(ui, { wrapper: CartProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };
