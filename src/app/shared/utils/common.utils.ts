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

  static composeImgSrc(base64: string): string {
    return `data:image/jpeg;base64,${base64}`
  }
}