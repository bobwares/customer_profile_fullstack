// App: Client Profile Module
// Package: ui
// File: pages/index.tsx
// Version: 0.0.9
// Author: Bobwares
// Date: 2025-06-08T09:30:00Z
// Description: Default Next.js page rendering the ProfileOverview component.

"use client"

import { ProfileOverview } from '@/components/ProfileOverview';

export default function Home() {
  return <ProfileOverview onEdit={() => {}} />;
}
