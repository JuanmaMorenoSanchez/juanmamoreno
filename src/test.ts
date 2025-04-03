import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

@NgModule({
    providers: [provideExperimentalZonelessChangeDetection()]
})
class ZonelessTestModule {}
  
getTestBed().initTestEnvironment(
    [
        BrowserDynamicTestingModule, 
        ZonelessTestModule
    ], 
    platformBrowserDynamicTesting()
);
