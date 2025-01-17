import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadCrumb } from '@models/breadcrumbs.models';
import { TranslateService } from '@ngx-translate/core';
import { NftsService } from '@services/nfts.service';
import { SessionQuery } from '@store/session.query';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  public breadcrumbs: Array<BreadCrumb>;
  public selectedYears: number[] = [];
  public newYear: WritableSignal<number | null> = signal(null);
  
  constructor(
    private sessionQuery: SessionQuery,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private nftsService: NftsService,
    private translateService: TranslateService
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.router.events.pipe(
        filter((event: unknown) => event instanceof NavigationEnd),
        distinctUntilChanged(),
    ).subscribe(() => {
      this.selectedYears = this.extractSelectedYears(); 
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    })
  }

  public handleYearChange(event: number) {
    if (this.validYears.includes(event)) {
      this.newYear.set(event);
      if (!this.selectedYears.includes(event)) {
        this.selectedYears.push(event);
        this.updateQueryParams();
      }
    }
    this.newYear.set(null);
  }

  public removeYearFilter(label: string) {
    this.selectedYears.filter(y => y === Number(label))
  }

  get validYears(): number[] {
    return [...this.sessionQuery.years].filter(year => !this.selectedYears.includes(year));
  }

  private updateQueryParams() {
    const queryParams = { years: this.selectedYears.join(',') };
    this.router.navigate([], { queryParams: queryParams });
  }

  private extractSelectedYears(): number[] {
    const queryParams = this.activatedRoute.snapshot.queryParamMap.get('years');
    return queryParams ? queryParams.split(',').map(param => Number(param)) : [];
  }

  private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    let label: string = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const lastRoutePart = path ? path.split('/').pop(): "";
    const isDynamicRoute = lastRoutePart!.startsWith(':');
    if(isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart!.split(':')[1];
      const paramValue = route.snapshot.params[paramName];
      path = path!.replace(lastRoutePart!, paramValue);
      if (paramName === "id") {
        const name = this.extractNameFromId(paramValue);
        label = name || paramValue;
      } else {
        label = paramValue;
      }
    }
    const nextUrl = path ? `${url}/${path}` : url;
    const baseBreadcrumb: BreadCrumb = {
      label: label ? this.translateService.instant(label.toLowerCase()): '',
      url: nextUrl,
      queryParams: {years: []},
    };
    const newBreadcrumbs = label ? [...breadcrumbs, baseBreadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    } else {
      const queryParams = route.snapshot.queryParamMap.get('years');
      if (queryParams) {
        const years = queryParams.split(',');
        years.forEach((year) => {
          newBreadcrumbs.push({
            label: year,
            url: nextUrl,
            queryParams: { years: year },
          });
        });
      }
    }
    return newBreadcrumbs;
  }

  private extractNameFromId(id: string): string | null {
    return this.nftsService.getNftById(id)!.name || null;
  }
}
