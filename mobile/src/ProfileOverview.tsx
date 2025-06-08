// App: Client Profile Module
// Package: mobile
// File: ProfileOverview.tsx
// Version: 0.0.7
// Author: Bobwares
// Date: 2025-06-08T08:52:00Z
// Description: React Native component to display and edit a user's profile information with API integration.

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

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
    return <Text accessibilityRole="alert" style={styles.error}>{error}</Text>;
  }
  if (!profile) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: profile.photoUrl }} style={styles.photo} />
      {editing ? (
        <View style={styles.fields}>
          <TextInput
            value={form.fullName}
            onChangeText={(t) => setForm({ ...form, fullName: t })}
            style={styles.input}
          />
          <TextInput
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
            style={styles.input}
          />
          {formErrors.email && <Text style={styles.error}>{formErrors.email}</Text>}
          <TextInput
            value={form.phone}
            onChangeText={(t) => setForm({ ...form, phone: t })}
            style={styles.input}
          />
          {formErrors.phone && <Text style={styles.error}>{formErrors.phone}</Text>}
          <TextInput
            value={form.address}
            onChangeText={(t) => setForm({ ...form, address: t })}
            style={styles.input}
          />
          {formErrors.address && <Text style={styles.error}>{formErrors.address}</Text>}
          <Button title="Save" onPress={save} />
        </View>
      ) : (
        <View style={styles.fields}>
          <Text>Name: {profile.fullName}</Text>
          <Text>Email: {profile.email}</Text>
          <Text>Phone: {profile.phone}</Text>
          <Text>Address: {profile.address}</Text>
        </View>
      )}
      {!editing && <Button title="Edit Profile" onPress={startEdit} />}
      {message && <Text accessibilityRole="alert" style={styles.success}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderWidth: 1, borderRadius: 4, alignItems: 'center' },
  photo: { width: 128, height: 128, borderRadius: 64 },
  fields: { marginVertical: 8 },
  input: { borderWidth: 1, padding: 8, marginBottom: 4, width: 200 },
  error: { color: 'red' },
  success: { color: 'green', marginTop: 4 }
});
