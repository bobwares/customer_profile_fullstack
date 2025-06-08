// App: Client Profile Module
// Package: ui
// File: ProfileOverview.tsx
// Version: 0.0.11
// Author: Bobwares
// Date: 2025-06-08T10:00:00Z
// Description: React component to display and edit a user's profile information with API integration.

"use client";

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { EditProfileForm } from './EditProfileForm';

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
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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

  const startEdit = () => {
    if (profile) {
      setEditing(true);
      onEdit();
    }
  };

const handleSaved = (updated: Profile) => {
  setProfile(updated);
  setEditing(false);
  setMessage('Profile updated');
};

  if (error) {
    return <div role="alert" className="text-red-600">{error}</div>;
  }
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <Image src={profile.photoUrl} alt="Profile" width={128} height={128} className="rounded-full mx-auto" />

      {editing ? (
        <EditProfileForm profile={profile} onSaved={handleSaved} />
      ) : (
        <div className="mt-4 space-y-2">
          <div className="p-2 border rounded">Name: {profile.fullName}</div>
          <div className="p-2 border rounded">Email: {profile.email}</div>
          <div className="p-2 border rounded">Phone: {profile.phone}</div>
          <div className="p-2 border rounded">Address: {profile.address}</div>
        </div>
      )}
      {!editing && (
        <button
          onClick={startEdit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Edit Profile
        </button>
      )}

      {message && <div role="status" className="text-green-600 mt-2">{message}</div>}

    </div>
  );
};
