import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PepUIModule } from '../../modules/pepperi.module';
// import { MaterialModule } from '../../modules/material.module';
import { AddonComponent } from './addon.component';
import { SettingsIframeModule } from '../settings-iframe/settings-iframe.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }@NgModule({
    declarations: [
        AddonComponent

    ],
    imports: [
        CommonModule,
        PepUIModule,
        // MaterialModule,
        SettingsIframeModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient]
            }
          }),
    ],
    exports: [AddonComponent],
    providers: []
})
export class AddonModule {

}




