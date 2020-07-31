import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'producto/:id',
    loadChildren: () => import('./shared/pages/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./shared/pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./shared/pages/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
