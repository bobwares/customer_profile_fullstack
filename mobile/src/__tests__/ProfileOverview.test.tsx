// App: Client Profile Module
// Package: mobile
// File: __tests__/ProfileOverview.test.tsx
// Version: 0.0.7
// Author: Bobwares
// Date: 2025-06-08T08:52:00Z
// Description: Unit tests for the mobile ProfileOverview component including edit functionality.

import { render, waitFor, fireEvent } from '@testing-library/react-native';
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

  it('saves edits successfully', async () => {
    const fetchMock = jest.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(profile) })
      .mockResolvedValueOnce({ ok: true });
    global.fetch = fetchMock as unknown as typeof fetch;

    const { getByText, getAllByDisplayValue } = render(
      <ProfileOverview onEdit={jest.fn()} />
    );
    await waitFor(() => getByText(/Jane Doe/));
    fireEvent.press(getByText(/edit profile/i));
    const inputs = getAllByDisplayValue(/Doe/);
    fireEvent.changeText(inputs[0], 'Jane Smith');
    fireEvent.press(getByText(/save/i));

    expect(fetchMock).toHaveBeenLastCalledWith(
      '/api/profile/update',
      expect.objectContaining({ method: 'POST' })
    );
    await waitFor(() => getByText(/Profile updated/));
  });

  it('shows error when server fails', async () => {
    const fetchMock = jest.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(profile) })
      .mockResolvedValueOnce({ ok: false });
    global.fetch = fetchMock as unknown as typeof fetch;

    const { getByText } = render(<ProfileOverview onEdit={jest.fn()} />);
    await waitFor(() => getByText(/Jane Doe/));
    fireEvent.press(getByText(/edit profile/i));
    fireEvent.press(getByText(/save/i));

    await waitFor(() => getByText(/Failed to save/));
  });
});
