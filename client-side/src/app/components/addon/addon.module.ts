import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddonComponent } from './addon.component';
import { SettingsIframeModule } from '../settings-iframe/settings-iframe.module';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
@NgModule({
    declarations: [
        AddonComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        // MaterialModule,
        SettingsIframeModule,
    ],
    exports: [AddonComponent],
    providers: []
})
export class AddonModule {

}




