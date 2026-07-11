import { Observable, of } from 'rxjs';

export class MockTranslateService {
  setTranslation() {
    // no-op in tests
  }
  use() {
    // no-op in tests
  }
  get(key: string): Observable<string> {
    return of(key);
  }
}
