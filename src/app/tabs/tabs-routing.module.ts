import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule),
              canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'tab2/:id',
        children: [
          {
            path: '',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      
      {
        path: 'tab3',
        children: [
          {
            path: '',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'shop-map',
        children: [
          {
            path: '',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../shop-map/shop-map.module').then(m => m.ShopMapPageModule)
          }
        ]
      },
      // { path: 'shop-map', loadChildren: '../shop-map/shop-map.module#ShopMapPageModule' },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
