import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { SettingsIframeComponent } from './settings-iframe.component';

@NgModule({
    declarations: [
        SettingsIframeComponent,
        SafePipe
    ],
    imports: [
        CommonModule,
        PepNgxLibModule
    ],
    exports: [SettingsIframeComponent]
})
export class SettingsIframeModule {
}


