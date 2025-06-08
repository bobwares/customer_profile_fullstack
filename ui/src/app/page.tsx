// App: Client Profile Module
// Package: ui
// File: page.tsx
// Version: 0.0.11
// Author: Bobwares
// Date: 2025-06-08T10:30:00Z
// Description: Default Next.js page rendering the ProfileOverview component.

'use client';

import { ProfileOverview } from './components/ProfileOverview';

export default function Home() {
  return <ProfileOverview onEdit={() => {}} />;
}
