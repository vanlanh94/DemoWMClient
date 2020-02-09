import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {setTheme} from 'ngx-bootstrap/utils';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MRV API !!!';
    url: String = '';
    className: String = '';
    isLoading: boolean;
    private isAlive$ = new Subject<boolean>();
    constructor(private router: Router,
                private changeDetectorRef: ChangeDetectorRef) {
        setTheme('bs4');
    }

    ngOnInit() {
        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe(() => {
                let root = this.router.routerState.snapshot.root;
                this.url = this.router.routerState.snapshot.url;
                console.log(this.router.routerState.snapshot);
                while (root) {
                    if (root.children && root.children.length) {
                        root = root.children[0];
                    } else if (root.data && root.data['title']) {
                        this.title = root.data['title'];
                        return;
                    } else if (root.data && root.data['className']) {
                        this.className = root.data['className'];
                        return;
                    } else {
                        return;
                    }
                }
                this.changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this.isAlive$.next(false);
        this.isAlive$.complete();
    }
}
