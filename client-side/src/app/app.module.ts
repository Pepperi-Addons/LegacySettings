import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { AddonModule } from './components/addon/addon.module';
import { PepAddonService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { AddonComponent } from './components/addon/addon.component';

import { config } from './app.config';
import { SettingsIframeComponent } from './components/settings-iframe/settings-iframe.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        PepNgxLibModule,
        AddonModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [
        // AppComponent
    ]
})
export class AppModule implements DoBootstrap {
    constructor(
        private injector: Injector,
        private pepAddonService: PepAddonService
    ) {
    }

    ngDoBootstrap() {
        this.pepAddonService.defineCustomElement(`settings-iframe-element-${config.AddonUUID}`, SettingsIframeComponent, this.injector);
    }
}