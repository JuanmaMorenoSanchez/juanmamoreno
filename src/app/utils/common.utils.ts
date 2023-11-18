export default class CommonUtils {

    static scrollToTop(): void {
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
    }
}