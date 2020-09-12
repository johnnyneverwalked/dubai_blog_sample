import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {NgxSpinnerService} from "ngx-spinner";
import {Size} from "ngx-spinner/lib/ngx-spinner.enum";
import {LoaderTypes} from "./LoaderTypes";
import {NavigationService} from '../../services/navigation/navigation.service';

@Component({
    selector: "app-loader",
    templateUrl: "./loader.component.html",
    styleUrls: ["./loader.component.scss"],
    providers: [NgxSpinnerService]
})
export class LoaderComponent implements OnInit, AfterViewInit {

    private readonly _loaderTypes = Object.values(LoaderTypes);

    @Input("loading") set setLoading(loading: boolean){
        this.loading = loading;

        if (loading) {
            this.show();
        } else {
            this.hide();
        }
        this.cd.markForCheck();
    }

    @Input() type: LoaderTypes|string|any;
    @Input() random: boolean = false;

    @Input() fullScreen: boolean = false;
    @Input() color: string = "#fff";
    @Input() bgColor: string = "rgba(0,0,0,0.3)";
    @Input() textColor: string = null;

    @Input() size: Size = "medium";

    public loading: boolean = false;

    constructor(private spinner: NgxSpinnerService,
                private nav: NavigationService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        if (this.random) {
            this.type = this._loaderTypes[Math.floor(Math.random() * this._loaderTypes.length)];
        } else {
            this.type = this._loaderTypes.includes(this.type) ? this.type : LoaderTypes.ballscalemultiple;
        }
    }

    ngAfterViewInit() {
        if (this.loading) {
            this.spinner.show();
        }
        this.cd.detectChanges();
    }

    public show() {
      if (this.fullScreen) {
        this.nav.disabledNav$.next(this.nav.disabledNav$.getValue() + 1);
      }
        this.spinner.show();
    }

    public hide() {
      if (this.fullScreen) {
        this.nav.disabledNav$.next(this.nav.disabledNav$.getValue() - 1);
      }
        this.spinner.hide();
    }

}
