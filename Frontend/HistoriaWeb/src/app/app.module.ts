import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooldalComponent } from './fooldal/fooldal.component';
import { HitelesitoComponent } from './hitelesito/hitelesito.component';
import { TortenetComponent } from './tortenet/tortenet.component';
import { TortenetMegosztasComponent } from './tortenet-megosztas/tortenet-megosztas.component';
import { TortenetekComponent } from './tortenetek/tortenetek.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { FiokSzerkesztesComponent } from './fiok-szerkesztes/fiok-szerkesztes.component';
import { TortenetSzerkesztesComponent } from './tortenet-szerkesztes/tortenet-szerkesztes.component';
import { NgSelectModule, NgDropdownPanelComponent } from '@ng-select/ng-select';
import { OsszesTortenetComponent } from './osszes-tortenet/osszes-tortenet.component';
import { NgxPanZoomModule } from 'ngx-panzoom';

@NgModule({
  declarations: [
  AppComponent,
  FooldalComponent,
  HitelesitoComponent,
  TortenetComponent,
  TortenetMegosztasComponent,
  TortenetekComponent,
  NavbarComponent,
  FooterComponent,
  FiokSzerkesztesComponent,
  TortenetSzerkesztesComponent,
  OsszesTortenetComponent
],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgDropdownPanelComponent,
    NgxPanZoomModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
