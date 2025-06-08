// App: Client Profile Module
// Package: ui
// File: ProfileOverview.tsx
// Version: 0.0.7
// Author: Bobwares
// Date: 2025-06-08T08:52:00Z
// Description: React component to display and edit a user's profile information with API integration.

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
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '' });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Profile, string>>>({});
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
      setForm({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        address: profile.address
      });
      setEditing(true);
      onEdit();
    }
  };

  const validate = () => {
    const errs: Partial<Record<keyof Profile, string>> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Invalid email';
    }
    if (!/^\+?\d{7,15}$/.test(form.phone)) {
      errs.phone = 'Invalid phone';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const save = async () => {
    if (!validate() || !profile) return;
    const changed: Partial<Profile> = {};
    (['fullName', 'email', 'phone', 'address'] as const).forEach((key) => {
      if (form[key] !== profile[key]) {
        changed[key] = form[key];
      }
    });
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changed)
      });
      if (!res.ok) throw new Error('Server error');
      setProfile({ ...profile, ...changed });
      setMessage('Profile updated');
      setEditing(false);
    } catch {
      setFormErrors({ address: 'Failed to save' });
    }
  };

  if (error) {
    return <div role="alert" className="text-red-600">{error}</div>;
  }
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <img src={profile.photoUrl} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
          className="mt-4 space-y-2"
        >
          <input
            className="p-2 border rounded w-full"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <input
            className="p-2 border rounded w-full"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {formErrors.email && <div role="alert" className="text-red-600">{formErrors.email}</div>}
          <input
            className="p-2 border rounded w-full"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {formErrors.phone && <div role="alert" className="text-red-600">{formErrors.phone}</div>}
          <input
            className="p-2 border rounded w-full"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          {formErrors.address && <div role="alert" className="text-red-600">{formErrors.address}</div>}
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Save
          </button>
        </form>
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
      {message && <div role="alert" className="text-green-600 mt-2">{message}</div>}
    </div>
  );
};
