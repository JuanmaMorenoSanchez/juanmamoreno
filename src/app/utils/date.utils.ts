export default class DateUtils {

    static dataIsOld(lastDataUpdate: Date): boolean {
        const now = new Date();
        const diff = Math.abs(now.getTime() - new Date(lastDataUpdate).getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays > 7; 
    }

}