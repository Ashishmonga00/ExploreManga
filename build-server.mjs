#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

console.log('Compiling server modules for Vercel deployment...');

try {
  // Compile server modules to JavaScript
  execSync('npx esbuild server/routes.ts server/storage.ts shared/schema.ts --platform=node --packages=external --format=cjs --outdir=dist', { stdio: 'inherit' });
  
  // Copy data files to dist directory
  console.log('Copying data files...');
  execSync('cp -r server/data dist/', { stdio: 'inherit' });
  
  console.log('Server modules and data files prepared successfully!');
} catch (error) {
  console.error('Failed to prepare server files:', error);
  process.exit(1);
}