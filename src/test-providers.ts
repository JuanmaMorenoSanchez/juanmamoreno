import { provideZonelessChangeDetection } from '@angular/core';

// Applied to the TestBed for every spec. The application runs zoneless, so the
// tests must too — otherwise TestBed would look for zone.js, which is not a
// dependency of this project.
export default [provideZonelessChangeDetection()];
