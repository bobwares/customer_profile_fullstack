// App: Client Profile Module
// Package: api
// File: update-profile.dto.ts
// Version: 0.0.11
// Author: Bobwares
// Date: 2025-06-08T10:00:00Z
// Description: DTO with validation rules for updating profile fields.

import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^\+?\d{7,15}$/)
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
