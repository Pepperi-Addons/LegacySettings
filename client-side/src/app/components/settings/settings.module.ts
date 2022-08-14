import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routes';

import { AddonModule } from '../addon/addon.module';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        AddonModule,
        SettingsRoutingModule,
    ],
    providers: [
    ]
})
export class SettingsModule {
}
