import { ElementRef } from '@angular/core';

export default class CommonUtils {

    static scrollToTop(): void {
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
    }

    static isElementDisplayed(elementId: string): boolean {
      const element = document.getElementById(elementId);
      if (!element) {
        console.warn(`Element with id "${elementId}" not found.`);
        return false;
      }
      const style = window.getComputedStyle(element);
      return style.display !== 'none';
    }
    

    // static isElementDisplayed(elementRef: ElementRef): boolean {
    //   const element = elementRef.nativeElement as HTMLElement;
    //   const style = window.getComputedStyle(element);
    //   return style.display !== 'none';
    // }
}