// App: Client Profile Module
// Package: mobile
// File: __tests__/ProfileOverview.test.tsx
// Version: 0.0.6
// Author: Bobwares
// Date: 2025-06-08T08:45:29Z
// Description: Unit tests for the mobile ProfileOverview component.

import { render, waitFor } from '@testing-library/react-native';
import { ProfileOverview, type Profile } from '../ProfileOverview';

const profile: Profile = {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  phone: '987654321',
  address: '321 Avenue',
  photoUrl: '/photo.jpg'
};

describe('ProfileOverview (mobile)', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(profile) })
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('loads and displays profile', async () => {
    const { getByText } = render(<ProfileOverview onEdit={jest.fn()} />);
    await waitFor(() => getByText(/Jane Doe/));
    expect(getByText(/jane@example.com/)).toBeTruthy();
  });
});
