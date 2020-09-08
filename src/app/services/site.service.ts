import {Injectable} from "@angular/core";
import {filter} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../states/app.state";
import {BehaviorSubject} from "rxjs";
import {UserFacade} from "../reducers/user/user.facade";
import {CURRENT_USER_ID, IUser} from "../interfaces/IUser";

@Injectable({
    providedIn: "root"
})
export class SiteService {

    public showChatContainer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public currentUser: IUser = {
      _id: CURRENT_USER_ID,
      name: "Visitor",
      firstName: "You",
      lastName: "the Visitor",
      fullName: "You the Visitor",
      email: "test@test.test",
      gravatar: "test@test.test",
    };

    private _previousUrl: string;
    private _currentUrl: string;

    constructor(
        private store: Store<AppState>,
        private userFacade: UserFacade,
        private router: Router,
    ) {

        this._currentUrl = this.router.url;
        router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe((evt: NavigationEnd) => {
            this._previousUrl = this._currentUrl;
            this._currentUrl = evt.url;
        });

        userFacade.data.subscribe(value => {
            this.currentUser = value;
        });

    }

    /**
     * Returns the last url of the app visited before the one the browser is already at
     */
    getPreviousUrl() {
        return this._previousUrl;
    }

    getCurrentUrl() {
        return this._currentUrl;
    }

    amISuperUser(): boolean {
        return this.currentUser && this.currentUser.roles && this.currentUser.roles.some(role => role.superAccess);
    }

    amIAdminUser(): boolean {
        return true;
    }

}
