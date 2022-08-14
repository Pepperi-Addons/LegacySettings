import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// import { singleSpaPropsSubject } from "src/single-spa/single-spa-props";
import { Subscription } from "rxjs";
// import { AddonService } from './addon.service';
// import { TranslateService } from "@ngx-translate/core";
import { PepHttpService, PepSessionService } from '@pepperi-addons/ngx-lib';
import { iframeDictionary, viewFlagDictionary } from '../../../../../server-side/dictionary';
import jwt from 'jwt-decode';
import { config } from 'src/app/app.config';

export enum USER_ROLE {
    'Admin' = 1,
    'Rep' = 2,
    'Buyer' = 3,
    'VARAdmin' = 301
}

@Component({
    selector: 'addon',
    templateUrl: './addon.component.html',
    styleUrls: ['./addon.component.scss'],
    providers: [
    //   AddonService
    ]
})
export class AddonComponent implements OnInit {
    // private readonly PEPPERI_TOKEN_COOKIE = 'PepperiUserSettings';
    subscription: Subscription;
    iframeData;
    addon = null;
    userRole;
    
    private _hostObject = null;
    @Input()
    set hostObject(value: any) {
      this._hostObject = value;
    }
    get hostObject(): any {
      return this._hostObject;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter();    
    
    addonUUID;

    constructor(
        // private service: AddonService,
        private http: PepHttpService,
        public routeParams: ActivatedRoute,
        public router: Router,
        // private cookies: PepCookieService,
        private session:  PepSessionService
    ) {
        this.addonUUID = config.AddonUUID;
    }

    ngOnInit(): void {
        //this.userRole = JSON.parse(this.cookies.get(this.PEPPERI_TOKEN_COOKIE))?.values?.items?.userRole
        const accessToken = this.session.getIdpToken();
        const parsedToken = jwt(accessToken);
        this.userRole = USER_ROLE[parsedToken["pepperi.employeetype"]];                               

        // singleSpaPropsSubject.subscribe(props => this.addon = props['addon']);
        this.subscription = this.routeParams.queryParams.subscribe( queryParams => {
            const view = queryParams?.view;
            // const addonUUID = this.routeParams.snapshot.params.addon_uuid;
            if (view) {
                this.getPath(this.addonUUID, view).then( path =>{
                    const relativePath = path[0]?.Value ? path[0]?.Value : path;
                    if (relativePath && (this.userRole === 'Admin' || this.userRole === 'VARAdmin')){
                        this.iframeData = { addon: this.hostObject?.options?.addon, uuid: this.addonUUID, top: 70, borderTop: 16, path: relativePath }
                    }
                })
            }
        });
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    async getPath(uuid, viewKey): Promise<any> {
        // const flags = Object.keys(viewFlagDictionary);
        // hack for DI-17999
        if (viewKey == 'accounts_genericlist'){
            const hasPermission = await this.checkLicense(viewFlagDictionary[viewKey]).catch(err => false);
            if (!hasPermission){
                this.router.navigate(['/settings/no_license']);
            }
        }
        // const promises = [];
        // flags.forEach(flag => promises.push(this.checkLicense(flag)));
        //    return  this.http.getPapiApiCall(`/addons/data/${uuid}/backoffice_views?where=IframeKey=${viewKey}`).toPromise();

        return Promise.resolve(iframeDictionary[viewKey]);
    }

    async checkLicense(flag){
        return await this.http.getPapiApiCall(`/meta_data/flags/${flag}`).toPromise();
    }

    onHostEvents(event) {
        this.hostEvents.emit(event);
    }

}
