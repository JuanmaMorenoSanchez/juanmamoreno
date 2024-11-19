export interface BreadCrumb {
    label: string;
    url: string;
    queryParams?: { [key: string]: string | string[] }
}
