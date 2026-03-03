import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooldalComponent } from './fooldal/fooldal.component';
import { HitelesitoComponent } from './hitelesito/hitelesito.component';
import { TortenetComponent } from './tortenet/tortenet.component';
import { TortenetMegosztasComponent } from './tortenet-megosztas/tortenet-megosztas.component';
import { TortenetekComponent } from './tortenetek/tortenetek.component';
import { Kijelentkezett } from './kijelentkezett.guard';
import { FiokSzerkesztesComponent } from './fiok-szerkesztes/fiok-szerkesztes.component';
import { Bejelentkezett } from './bejelentkezett.guard';
import { TortenetSzerkesztesComponent } from './tortenet-szerkesztes/tortenet-szerkesztes.component';
import { OsszesTortenetComponent } from './osszes-tortenet/osszes-tortenet.component';

const routes: Routes = [
  {path: "", component: FooldalComponent},
  {path: "hitelesito", component: HitelesitoComponent, canActivate:[Kijelentkezett]},
  {path: "tortenetek/:telepules/:id", component: TortenetComponent},
  {path: "tortenet_megosztas", component: TortenetMegosztasComponent,canActivate:[Bejelentkezett]},
  {path: "tortenetek/:telepules", component: TortenetekComponent},
  {path: "fiok_szerkesztes",component:FiokSzerkesztesComponent,canActivate:[Bejelentkezett]},
  {path:"tortenet_szerkesztes/:id",component:TortenetSzerkesztesComponent,canActivate:[Bejelentkezett]},
  {path: "osszes", component: OsszesTortenetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
