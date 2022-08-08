import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { AddonModule } from './components/addon/addon.module';

// import { HttpClient } from '@angular/common/http';
// import { MaterialModule } from './modules/material.module';
// import { PepUIModule } from './modules/pepperi.module';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { SettingsIframeModule } from 'projects/settings-iframe/settings-iframe.module';
// export function createTranslateLoader(http: HttpClient) {
//     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
//   }
@NgModule({
    declarations: [
        AppComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AddonModule
        // PepUIModule,
        // MaterialModule,
        // SettingsIframeModule,
        // TranslateModule.forRoot({
        //     loader: {
        //       provide: TranslateLoader,
        //       useFactory: (createTranslateLoader),
        //       deps: [HttpClient]
        //     }
        //   }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}




