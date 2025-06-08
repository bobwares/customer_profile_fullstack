// App: Client Profile Module
// Package: mobile
// File: ProfileOverview.tsx
// Version: 0.0.5
// Author: Bobwares
// Date: 2025-06-08T00:00:00Z
// Description: React Native component to display a user's profile information in a card with an edit button.

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, StyleSheet } from 'react-native';

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
    return <Text accessibilityRole="alert" style={styles.error}>{error}</Text>;
  }
  if (!profile) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: profile.photoUrl }} style={styles.photo} />
      <View style={styles.fields}>
        <Text>Name: {profile.fullName}</Text>
        <Text>Email: {profile.email}</Text>
        <Text>Phone: {profile.phone}</Text>
        <Text>Address: {profile.address}</Text>
      </View>
      <Button title="Edit Profile" onPress={onEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderWidth: 1, borderRadius: 4, alignItems: 'center' },
  photo: { width: 128, height: 128, borderRadius: 64 },
  fields: { marginVertical: 8 },
  error: { color: 'red' }
});
