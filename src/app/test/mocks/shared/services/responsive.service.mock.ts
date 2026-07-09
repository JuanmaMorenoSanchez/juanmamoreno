import { BehaviorSubject } from 'rxjs';

export const mockResponsiveService = {
  displayMobileLayout: new BehaviorSubject<boolean>(false),
};
