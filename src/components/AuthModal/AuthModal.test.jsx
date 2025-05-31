import { vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AuthModal from './AuthModal';

// Мокируем fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'fake-token', user: { email: 'test@example.com' } }),
  })
);

// Мокаем localStorage
Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true
});

beforeEach(() => {
  fetch.mockClear();
  localStorage.clear();
});

describe('AuthModal', () => {
  const mockOnClose = vi.fn();

  it('1. Рендерится только при isOpen=true', () => {
    const { rerender } = render(<AuthModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText('Вход в аккаунт')).not.toBeInTheDocument();

    rerender(<AuthModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Вход в аккаунт')).toBeInTheDocument();
  });

  it('2. Переключается между логином и регистрацией', () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Зарегистрироваться'));
    expect(screen.getByPlaceholderText('Подтвердите пароль')).toBeInTheDocument();
  });

  it('3. Валидация: пароли не совпадают', async () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Зарегистрироваться'));

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const confirmPasswordInput = screen.getByPlaceholderText('Подтвердите пароль');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123');
    await userEvent.type(confirmPasswordInput, '456');

    fireEvent.click(screen.getByText('Зарегистрироваться'));

    expect(await screen.findByText('Пароли не совпадают')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('4. Успешный логин (мок API)', async () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Пароль');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123');

    fireEvent.click(screen.getByText('Войти'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: '123' }),
      });
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('5. Ошибка API (неверный логин)', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Неверный email или пароль' }),
      })
    );

    render(<AuthModal isOpen={true} onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Пароль');

    await userEvent.type(emailInput, 'wrong@example.com');
    await userEvent.type(passwordInput, '123');

    fireEvent.click(screen.getByText('Войти'));

    expect(await screen.findByText('Неверный email или пароль')).toBeInTheDocument();
  });
});
