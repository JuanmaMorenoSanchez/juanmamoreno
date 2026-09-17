import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [provideRouter([]), provideTranslateService()],
    });
    fixture = TestBed.createComponent(ProjectComponent);
    await fixture.whenStable();
  });

  it('shows every decision, each with what it cost', () => {
    const decisions = fixture.nativeElement.querySelectorAll('.project-decision');

    expect(decisions).toHaveLength(5);
    // Chose, instead of, and what it costs: a decision with no cost shown is a
    // boast, and the page is an argument that the trade-off is the work.
    for (const decision of decisions) {
      expect(decision.querySelectorAll('dt')).toHaveLength(3);
      expect(decision.querySelectorAll('dd')).toHaveLength(3);
    }
  });

  it('leads with counted figures rather than adjectives', () => {
    const figures = [...fixture.nativeElement.querySelectorAll('.project-figure dt')].map(
      (node: Element) => node.textContent?.trim()
    );

    expect(figures).toEqual(['147', '180', '25', '1']);
  });

  /**
   * The repository this page ships in is public and the service's is not.
   * Linking the private one would offer a recruiter a 404 and tell everybody
   * else where to knock.
   */
  it('links only the repository that is public', () => {
    const links = [...fixture.nativeElement.querySelectorAll('a')].map((a: HTMLAnchorElement) =>
      a.getAttribute('href')
    );

    expect(links.some((href) => href?.endsWith('/juanmamoreno'))).toBe(true);
    expect(links.some((href) => href?.includes('juanmamoreno-backend'))).toBe(false);
    expect(links.some((href) => href?.includes('juanmamoreno-contracts'))).toBe(false);
  });
});
