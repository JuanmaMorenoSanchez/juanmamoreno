// import { TestBed } from '@angular/core/testing';
// import { TranslateService } from '@ngx-translate/core';
// import { NftsService } from '@services/nfts.service';
// import { AppComponent } from './app.component';
// import { TopMenuComponent } from './components/top-menu/top-menu.component';
// import { ShareButtonComponent } from './components/share-button/share-button.component';
// import { MockTranslateService } from '@mocks/mock-translate.service';
// import { MockNftsService } from '@mocks/mock-nfts.service';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';

// describe('AppComponent', () => {
//   let component: AppComponent;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppComponent, TopMenuComponent, ShareButtonComponent, BreadcrumbComponent, RouterModule.forRoot(
//         [
//           // { path: 'some-path', component: AppComponent },
//         ]
//       )],
//       providers: [
//         { provide: TranslateService, useClass: MockTranslateService },
//         { provide: NftsService, useClass: MockNftsService },
//         {
//           provide: ActivatedRoute,
//           useValue: { 
//             snapshot: { 
//               paramMap: { 
//                 get: () => null 
//               }, 
//               routeConfig: {
//                 data: { breadcrumb: 'Test Breadcrumb' },
//                 path: "mockPath"
//               } 
//             } 
//           },
//         },
//       ],
//     }).compileComponents();

//     const fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the app component', () => {
//     expect(component).toBeTruthy();
//   });

// });
