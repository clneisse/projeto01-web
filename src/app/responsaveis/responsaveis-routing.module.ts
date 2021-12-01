import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadResponsavelComponent } from './pages/cad-responsavel/cad-responsavel.component';
import { ResponsavelComponent } from './pages/responsavel/responsavel.component';

const routes: Routes = [
  { path: '', component: ResponsavelComponent },
  { path: 'cad-responsavel', component: CadResponsavelComponent },
  { path: 'cad-responsavel/:id', component: CadResponsavelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsaveisRoutingModule { }
