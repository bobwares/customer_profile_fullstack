// App: Client Profile Module
// Package: api
// File: profile.controller.ts
// Version: 0.0.11
// Author: Bobwares
// Date: 2025-06-08T10:00:00Z
// Description: HTTP controller providing profile endpoints.

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { Profile } from './types';

@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get('get')
  get(): Profile {
    return this.service.getProfile();
  }

  @Post('update')
  update(@Body() dto: UpdateProfileDto): Profile {
    return this.service.updateProfile(dto);
  }
}
