import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from './app-routes';
import { AuthGuard } from './core/guards/auth-guard';
import { LoginGuard } from './core/guards/login-guard';
import { PublicGuard } from './core/guards/public-guard';
import { LoginComponent } from './login/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  },
  {
    path: AppRoutes.Login.base(),
    component: LoginComponent,
    canActivate: [LoginGuard]
  },   
  {
    path: AppRoutes.Fornecedores.base(),
    loadChildren: () => import('./fornecedores/fornecedores.module').then(m => m.FornecedoresModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.Responsaveis.base(),
    loadChildren: () => import('./responsaveis/responsaveis.module').then(m => m.ResponsaveisModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.Grupos.base(),
    loadChildren: () => import('./grupos/grupos.module').then(m => m.GruposModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.FormaPagamento.base(),
    loadChildren: () => import('./forma-pagamento/forma-pagamento.module').then(m => m.FormaPagamentoModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.Produto.base(),
    loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.Caixa.base(),
    loadChildren: () => import('./caixas/caixas.module').then(m => m.CaixasModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.Usuarios.base(),
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: "publico",
    loadChildren: () => import('./publico/publico.module').then(m => m.PublicoModule),    
    canActivate: [PublicGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
