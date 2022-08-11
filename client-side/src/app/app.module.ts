import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { AddonModule } from './components/addon/addon.module';
import { PepAddonService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { AddonComponent } from './components/addon/addon.component';

const AddonUUID = '354c5123-a7d0-4f52-8fce-3cf1ebc95314';

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
    bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {
    constructor(
        private injector: Injector,
        private pepAddonService: PepAddonService
    ) {
    }

    ngDoBootstrap() {
        this.pepAddonService.defineCustomElement(`settings-iframe-element-${AddonUUID}`, AddonComponent, this.injector);
    }
}