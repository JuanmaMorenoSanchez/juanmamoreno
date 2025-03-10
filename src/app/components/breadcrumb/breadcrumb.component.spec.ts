// import { TestBed } from '@angular/core/testing';

// import { BreadcrumbComponent } from './breadcrumb.component';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
// import { NftsService } from '@services/nfts.service';
// import { MockTranslateService } from '@mocks/mock-translate.service';
// import { MockNftsService } from '@mocks/mock-nfts.service';

// describe('BreadcrumbComponent', () => {
//     let component: BreadcrumbComponent;

//     beforeEach(async () => {
//         TestBed.configureTestingModule({
//             imports: [BreadcrumbComponent, RouterModule.forRoot(
//                 [
//                 // { path: 'some-path', component: AppComponent },
//                 ]
//             )],
//             providers: [
//                 { provide: TranslateService, useClass: MockTranslateService },
//                 { provide: NftsService, useClass: MockNftsService },
//                 {
//                     provide: ActivatedRoute,
//                     useValue: { 
//                         snapshot: { 
//                             paramMap: { 
//                                 get: () => 1 
//                             }, 
//                             routeConfig: {
//                                 data: { breadcrumb: 'Test Breadcrumb' },
//                                 path: "mockPath"
//                             } 
//                         } 
//                     },
//                 },
//             ],
//         }).compileComponents();

//         const fixture = TestBed.createComponent(BreadcrumbComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create the app component', () => {
//         expect(component).toBeTruthy();
//     });
// });
