import { InjectionToken } from '@angular/core';
import { ArtworkPort } from './artwork.port';

export const ARTWORK_PORT = new InjectionToken<ArtworkPort>('ARTWORK_PORT');
