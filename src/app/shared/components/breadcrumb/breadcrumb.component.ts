import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChip, MatChipListbox, MatChipRemove } from '@angular/material/chips';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SessionQuery } from '@shared/store/session.query';
import { distinctUntilChanged, filter } from 'rxjs';
import { BreadCrumb } from './breadcrumbs.entity';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [
    MatChipListbox,
    MatChip,
    MatChipRemove,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatFormField,
    MatSelect,
    FormsModule,
    MatOption,
    TranslatePipe,
    MatLabel,
  ],
})
export class BreadcrumbComponent implements OnInit {
  private artworkService = inject(ARTWORK_PORT);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private translateService = inject(TranslateService);
  private sessionQuery = inject(SessionQuery);

  // Signals (not plain fields) so navigation updates actually schedule a
  // re-render under the app's zoneless change detection — a plain field
  // mutated inside a router.events subscription never notifies Angular here.
  public breadcrumbs: WritableSignal<Array<BreadCrumb>>;
  public selectedYears: number[] = [];
  public newYear: WritableSignal<number | null> = signal(null);

  constructor() {
    this.breadcrumbs = signal(this.buildBreadCrumb(this.activatedRoute.root));
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: unknown) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.selectedYears = this.extractSelectedYears();
        this.breadcrumbs.set(this.buildBreadCrumb(this.activatedRoute.root));
      });
  }

  public handleYearChange(event: number) {
    if (this.validYears.includes(event)) {
      this.newYear.set(event);
      if (!this.selectedYears.includes(event)) {
        this.selectedYears.push(event);
        this.updateQueryParams();
      }
    }
    // Deferred to the next tick: setting null in the same tick as the value
    // never registers as a change on [ngModel], so mat-select's internal
    // selection never clears and a removed year can look "stuck" selected.
    setTimeout(() => this.newYear.set(null));
  }

  public removeYearFilter(label: string) {
    this.selectedYears = this.selectedYears.filter((y) => y !== Number(label));
    this.updateQueryParams();
  }

  get validYears(): number[] {
    return [...this.artworkService.getAvailableYears()].filter(
      (year) => !this.selectedYears.includes(year)
    );
  }

  private updateQueryParams() {
    const queryParams = { years: this.selectedYears.length ? this.selectedYears.join(',') : null };
    this.router.navigate([], { queryParams });
  }

  private extractSelectedYears(): number[] {
    const queryParams = this.activatedRoute.snapshot.queryParamMap.get('years');
    return queryParams ? queryParams.split(',').map((param) => Number(param)) : [];
  }

  private buildBreadCrumb(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: Array<BreadCrumb> = []
  ): Array<BreadCrumb> {
    let label: string =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const lastRoutePart = path ? path.split('/').pop() : '';
    const isDynamicRoute = lastRoutePart!.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart!.split(':')[1];
      const paramValue = route.snapshot.params[paramName];
      path = path!.replace(lastRoutePart!, paramValue);
      if (paramName === 'id') {
        const name = this.extractNameFromId(paramValue);
        label = name || paramValue;
      } else {
        label = paramValue;
      }
    }
    const nextUrl = path ? `${url}/${path}` : url;
    const baseBreadcrumb: BreadCrumb = {
      label: label ? this.translateService.instant(label.toLowerCase()) : '',
      url: nextUrl,
      queryParams: { years: [] },
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
            isYear: true,
          });
        });
      }
    }
    return newBreadcrumbs;
  }

  private extractNameFromId(id: string): string | null {
    return this.artworkService.getNftById(id, this.sessionQuery.selectArtPieces)?.name || null;
  }
}
