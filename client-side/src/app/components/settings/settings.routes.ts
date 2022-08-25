import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddonComponent } from '../addon/addon.component';
import { SettingsComponent } from './settings.component';

// Important for single spa
@Component({
    selector: 'app-empty-route',
    template: '<div>Route is not exist settings.</div>',
})
export class EmptyRouteComponent {}

const routes: Routes = [
    {
        path: ':settingsSectionName/:addon_uuid',
        component: SettingsComponent,
        children: [
            {
                path: ':editor',
                component: AddonComponent
            },
            { path: '**', component: EmptyRouteComponent },
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



