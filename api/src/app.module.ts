// App: Client Profile Module
// Package: api
// File: app.module.ts
// Version: 0.0.11
// Author: Bobwares
// Date: 2025-06-08T10:00:00Z
// Description: Root module importing the Profile module.

import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ProfileModule]
})
export class AppModule {}
