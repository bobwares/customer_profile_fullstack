// App: Client Profile Module
// Package: ui
// File: __tests__/ProfileOverview.test.tsx
// Version: 0.0.7
// Author: Bobwares
// Date: 2025-06-08T08:52:00Z
// Description: Unit tests for the web ProfileOverview component including edit functionality.

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfileOverview, type Profile } from '../ProfileOverview';

const profile: Profile = {
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '123456789',
  address: '123 Street',
  photoUrl: '/photo.jpg'
};

describe('ProfileOverview', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(profile) })
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('loads and displays profile', async () => {
    render(<ProfileOverview onEdit={jest.fn()} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => screen.getByText(/John Doe/));
    expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
  });

  it('calls onEdit', async () => {
    const onEdit = jest.fn();
    render(<ProfileOverview onEdit={onEdit} />);
    await waitFor(() => screen.getByText(/John Doe/));
    await userEvent.click(screen.getByRole('button', { name: /edit profile/i }));
    expect(onEdit).toHaveBeenCalled();
  });

  it('saves changes successfully', async () => {
    const fetchMock = jest.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(profile) })
      .mockResolvedValueOnce({ ok: true });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(<ProfileOverview onEdit={jest.fn()} />);
    await waitFor(() => screen.getByText(/John Doe/));
    await userEvent.click(screen.getByRole('button', { name: /edit profile/i }));
    await userEvent.type(screen.getAllByRole('textbox')[0], ' Jr.');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(fetchMock).toHaveBeenLastCalledWith(
      '/api/profile/update',
      expect.objectContaining({ method: 'POST' })
    );
    await waitFor(() => screen.getByText(/Profile updated/));
  });

  it('shows error on server failure', async () => {
    const fetchMock = jest.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(profile) })
      .mockResolvedValueOnce({ ok: false });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(<ProfileOverview onEdit={jest.fn()} />);
    await waitFor(() => screen.getByText(/John Doe/));
    await userEvent.click(screen.getByRole('button', { name: /edit profile/i }));
    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByRole('alert')).toHaveTextContent(/Failed to save/);
  });
});
