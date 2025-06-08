// App: Client Profile Module
// Package: ui
// File: EditProfileForm.tsx
// Version: 0.0.11
// Author: Bobwares
// Date: 2025-06-08T10:00:00Z
// Description: Form component for editing personal info with inline validation.

"use client";

import type { FC } from 'react';
import { useState } from 'react';
import type { Profile } from './ProfileOverview';

interface Props {
  profile: Profile;
  onSaved: (updated: Profile) => void;
}

export const EditProfileForm: FC<Props> = ({ profile, onSaved }) => {
  const [form, setForm] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    address: profile.address
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Profile, string>>>({});
  const [message, setMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Partial<Record<keyof Profile, string>> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Invalid email';
    }
    if (!/^\+?\d{7,15}$/.test(form.phone)) {
      errs.phone = 'Invalid phone';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
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
      const updated = { ...profile, ...changed };
      setMessage('Profile updated');
      onSaved(updated);
    } catch {
      setErrors({ address: 'Failed to save' });
    }
  };

  return (
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
      {errors.email && <div role="alert" className="text-red-600">{errors.email}</div>}
      <input
        className="p-2 border rounded w-full"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      {errors.phone && <div role="alert" className="text-red-600">{errors.phone}</div>}
      <input
        className="p-2 border rounded w-full"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      {errors.address && <div role="alert" className="text-red-600">{errors.address}</div>}
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        Save
      </button>
      {message && <div role="status" className="text-green-600 mt-2">{message}</div>}
    </form>
  );
};
