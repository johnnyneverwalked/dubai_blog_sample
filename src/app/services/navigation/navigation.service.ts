import {Injectable, OnDestroy} from "@angular/core";
import {ScrollToService, ScrollToConfigOptions} from "@nicky-lenaers/ngx-scroll-to";
import {Observable, Subject} from "rxjs";
import {TabModel} from "../../interfaces/TabModel";

@Injectable({
    providedIn: "root",
})

export class NavigationService implements OnDestroy{

    private _unsub$: Subject<void> = new Subject<void>();

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

    /**
     * @param tabs
     * @param activeTab
     * @description Given an array of tabs returns the next tab of the active one
     */
    public pillsNavNext(tabs: TabModel[] = [], activeTab: string): string {
        let active = activeTab;
        let tab = tabs.findIndex(t => t.name === active);
        if (tab < tabs.length - 1 && tab !== -1) {
            active = tabs[tab + 1].name;
        }
        return active;
    }

    /**
     * @param tabs
     * @param activeTab
     * @description Given an array of tabs returns the previous tab of the active one
     */
    public pillsNavPrevious(tabs: TabModel[] = [], activeTab: string = ""): string {
        let active = activeTab;
        let tab = tabs.findIndex(t => t.name === active);
        if (tab > 0) {
            active = tabs[tab - 1].name;
        }
        return active;
    }

}
