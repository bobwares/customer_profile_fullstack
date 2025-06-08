// App: Client Profile Module
// Package: ui
// File: __tests__/ProfileOverview.test.tsx
// Version: 0.0.6
// Author: Bobwares
// Date: 2025-06-08T08:45:29Z
// Description: Unit tests for the web ProfileOverview component.

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
});
