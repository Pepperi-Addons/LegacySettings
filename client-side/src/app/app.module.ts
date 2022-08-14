import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { PepAddonService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';

import { SettingsModule, SettingsComponent } from './components/settings';
import { SettingsIframeComponent, SettingsIframeModule } from './components/settings-iframe';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

import { config } from './app.config';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PepNgxLibModule,
        SettingsModule,
        SettingsIframeModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (addonService: PepAddonService) => 
                    PepAddonService.createMultiTranslateLoader(config.AddonUUID, addonService, ['ngx-lib']),
                deps: [PepAddonService]
            }
        }),
    ],
    providers: [
        TranslateStore
    ],
    bootstrap: [
        // AddonComponent
    ]
})
export class AppModule implements DoBootstrap {
    constructor(
        private injector: Injector,
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }

    ngDoBootstrap() {
        this.pepAddonService.defineCustomElement(`settings-element-${config.AddonUUID}`, SettingsComponent, this.injector);
        this.pepAddonService.defineCustomElement(`settings-iframe-element-${config.AddonUUID}`, SettingsIframeComponent, this.injector);
    }
}