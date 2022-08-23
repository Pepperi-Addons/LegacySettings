import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddonComponent } from '../addon/addon.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
    {
        path: ':settingsSectionName/:addon_uuid',
        component: SettingsComponent,
        children: [
            {
                path: ':editor',
                component: AddonComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }



