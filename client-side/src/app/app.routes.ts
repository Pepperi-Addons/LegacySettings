import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { AddonComponent } from './components/addon/addon.component';
// import * as config from '../../../addon.config.json';

const routes: Routes = [
    {
        path: ':settingsSectionName/:addon_uuid',
        children: [
            {
                path: ':editor',
                component: AddonComponent
            },
        ]
    },
    {
        path: '**',
        component: EmptyRouteComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
