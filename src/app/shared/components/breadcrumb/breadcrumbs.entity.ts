export interface BreadCrumb {
  label: string;
  url: string;
  queryParams?: { [key: string]: string | string[] };
  // True for the chips representing an active year filter (as opposed to a
  // route-name breadcrumb like "Paintings") — these get a remove button.
  isYear?: boolean;
}
