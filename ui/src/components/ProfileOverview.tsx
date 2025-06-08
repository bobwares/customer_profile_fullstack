// App: Client Profile Module
// Package: ui
// File: ProfileOverview.tsx
// Version: 0.0.5
// Author: Bobwares
// Date: 2025-06-08T00:00:00Z
// Description: React component to display a user's profile information in a card with an edit button.

import type { FC } from 'react';
import { useEffect, useState } from 'react';

export interface Profile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  photoUrl: string;
}

interface ProfileOverviewProps {
  onEdit: () => void;
}

export const ProfileOverview: FC<ProfileOverviewProps> = ({ onEdit }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch('/api/profile/get', { signal: controller.signal });
        if (!res.ok) throw new Error('Network response was not ok');
        const data: Profile = await res.json();
        setProfile(data);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          setError('Failed to load profile');
        }
      }
    };
    load();
    return () => controller.abort();
  }, []);

  if (error) {
    return <div role="alert" className="text-red-600">{error}</div>;
  }
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <img src={profile.photoUrl} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
      <div className="mt-4 space-y-2">
        <div className="p-2 border rounded">Name: {profile.fullName}</div>
        <div className="p-2 border rounded">Email: {profile.email}</div>
        <div className="p-2 border rounded">Phone: {profile.phone}</div>
        <div className="p-2 border rounded">Address: {profile.address}</div>
      </div>
      <button onClick={onEdit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Edit Profile
      </button>
    </div>
  );
};
