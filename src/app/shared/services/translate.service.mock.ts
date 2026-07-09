import { Observable, of } from 'rxjs';

export class MockTranslateService {
  setTranslation(lang: string, translations: object) {
    // no-op in tests
  }
  use(lang: string) {
    // no-op in tests
  }
  get(key: string): Observable<string> {
    return of(key);
  }
}
