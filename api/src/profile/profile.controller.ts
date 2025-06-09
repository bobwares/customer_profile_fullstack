// App: Client Profile Module
// Package: api
// File: profile.controller.ts
// Version: 0.0.12
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

  @Get()
  findAll(): Promise<Profile[]> {
    return this.service.findAll();
  }

  @Post()
  update(@Body() dto: UpdateProfileDto): Profile {
    return this.service.updateProfile(dto);
  }
}
