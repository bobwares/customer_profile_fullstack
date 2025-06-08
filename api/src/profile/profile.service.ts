// App: Client Profile Module
// Package: api
// File: profile.service.ts
// Version: 0.0.11
// Author: Bobwares
// Date: 2025-06-08T10:00:00Z
// Description: Service handling profile retrieval and updates.

import { Injectable } from '@nestjs/common';
import type { Profile } from './types';

@Injectable()
export class ProfileService {
  private profile: Profile = {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '123456789',
    address: '123 Street',
    photoUrl: '/photo.jpg'
  };

  getProfile(): Profile {
    return this.profile;
  }

  updateProfile(update: Partial<Profile>): Profile {
    this.profile = { ...this.profile, ...update };
    return this.profile;
  }
}
