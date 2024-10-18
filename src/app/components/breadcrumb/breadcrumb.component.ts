import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadCrumb } from '@models/breadcrumbs.models';
import { NftsService } from '@services/nfts.service';
import { distinctUntilChanged, filter } from 'rxjs';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  public breadcrumbs: Array<BreadCrumb>;
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private nftsService: NftsService
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.router.events.pipe(
        filter((event: unknown) => event instanceof NavigationEnd),
        distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    })
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
    const breadcrumb: BreadCrumb = {
        label: label,
        url: nextUrl,
    };
    const newBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs];
    if (route.firstChild) {
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  private extractNameFromId(id: string): string | null {
    return this.nftsService.getNftById(id)!.name || null;
  }
}
