import { of } from 'rxjs';

export class MockTranslateService {
  setTranslation(lang: string, translations: Object) {}
  use(lang: string) {}
  get(key: any): any {
    return of(key);
  }
}
