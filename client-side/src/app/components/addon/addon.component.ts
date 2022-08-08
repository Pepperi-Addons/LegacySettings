import { viewFlagDictionary } from './../../../../../server-side/dictionary';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { singleSpaPropsSubject } from "src/single-spa/single-spa-props";
import { Subscription } from "rxjs";
// import { AddonService } from './addon.service';
// import { TranslateService } from "@ngx-translate/core";
import {
    // PepLayoutService, PepScreenSizeType,
    PepHttpService, PepCookieService, PepSessionService } from '@pepperi-addons/ngx-lib';
import { iframeDictionary } from '../../../../../server-side/dictionary';
import jwt from 'jwt-decode';

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
    private readonly PEPPERI_TOKEN_COOKIE = 'PepperiUserSettings';
    subscription: Subscription;
    iframeData;
    addon = null;
    userRole;

    constructor(
        // private service: AddonService,
        private http: PepHttpService,
        public routeParams: ActivatedRoute,
        public router: Router,
        private cookies: PepCookieService,
        private session:  PepSessionService
    ) {
    }

    ngOnInit(): void {
        //this.userRole = JSON.parse(this.cookies.get(this.PEPPERI_TOKEN_COOKIE))?.values?.items?.userRole

        const accessToken = this.session.getIdpToken();
        const parsedToken = jwt(accessToken);
        this.userRole = USER_ROLE[parsedToken["pepperi.employeetype"]];                               

        singleSpaPropsSubject.subscribe(props => this.addon = props['addon']);
        this.subscription = this.routeParams.queryParams.subscribe( queryParams => {
            const view = queryParams?.view;
            const addonUUID = this.routeParams.snapshot.params.addon_uuid;
            this.getPath(addonUUID, view).then( path =>{
                const relativePath = path[0]?.Value ? path[0]?.Value : path;
                if (relativePath && (this.userRole === 'Admin' || this.userRole === 'VARAdmin')){
                    this.iframeData = { addon: this.addon, uuid: addonUUID,  top: 70, borderTop: 16, path: relativePath }
                }
            })
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

}
