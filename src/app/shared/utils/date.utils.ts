export default class DateUtils {
    static olderThanNDays(lastDataUpdate: Date, days: number): boolean {
        const now = new Date();
        const diff = Math.abs(now.getTime() - new Date(lastDataUpdate).getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays > days; 
    }
}