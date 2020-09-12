import {Injectable, OnDestroy} from "@angular/core";
import {ScrollToService, ScrollToConfigOptions} from "@nicky-lenaers/ngx-scroll-to";
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ModalComponent} from '../../components/modal/modal.component';
import {ILandmark} from '../../interfaces/ILandmark';

@Injectable({
    providedIn: "root",
})

export class NavigationService implements OnDestroy{

    private _unsub$: Subject<void> = new Subject<void>();

    public disabledNav$ = new BehaviorSubject<number>(0);

    constructor(
        private _scrollToService: ScrollToService
    ) {
    }

    ngOnDestroy(): void {
        this._unsub$.next();
    }

    /**
     * @param target
     * @description scrolls to the element with the given id
     */
    public scrollToId(target: string): Observable<any> {
        const config: ScrollToConfigOptions = {
            target,
            duration: 500
        };

        return this._scrollToService.scrollTo(config);
    }

    /**
     * @param offset
     * @description scrolls to the given offset position
     */
    public scrollToOffset(offset: number = 0): Observable<any> {
        const config: ScrollToConfigOptions = {
            offset,
            duration: 500
        };

        return this._scrollToService.scrollTo(config);
    }

    /**
     * @param options
     * @description calls scrollTo with the given options
     */
    public scrollTo(options: ScrollToConfigOptions = null): Observable<any> {
        if (options) {
            return this._scrollToService.scrollTo(options);
        }
    }

}
