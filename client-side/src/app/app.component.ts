import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PepCustomizationService, PepLoaderService, PepStyleType } from '@pepperi-addons/ngx-lib';

declare var CLIENT_MODE: any;

@Component({
    selector: 'addon-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    footerHeight: number;
    showLoading = false;
    clientMode: string;
    page;

    constructor(
        public customizationService: PepCustomizationService,
        public loaderService: PepLoaderService,
        // private route: ActivatedRoute

    ) {

        this.loaderService.onChanged$
            .subscribe((show) => {
                this.showLoading = show;
            });

    }

    ngOnInit(){

        // this.route.queryParams.subscribe(queryParams => {
        //     this.page = queryParams.view;
        // })

    }


}
