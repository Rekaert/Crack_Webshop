import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpLocalService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { NavbarComponent } from './navbar/navbar.component';

import { UsersService } from './users.service';
import { RendelesComponent } from './rendeles/rendeles.component';
import { KosarComponent } from './kosar/kosar.component';
import { ProfilComponent } from './profil/profil.component';
import { KategoriakComponent } from './kategoriak/kategoriak.component';
import { FooldalComponent } from './fooldal/fooldal.component';
import { SelectedproductComponent } from './selectedproduct/selectedproduct.component';
import { KapcsolatComponent } from './kapcsolat/kapcsolat.component';

const routes: Routes = [
  { path: '', component: NavbarComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'fooldal', component: FooldalComponent },
  { path: 'kategoriak', component: KategoriakComponent },
  { path: 'kosar', component: KosarComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'rendeles', component: RendelesComponent },
  { path: 'kapcsolat', component: KapcsolatComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'selectedproduct', component: SelectedproductComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    OrdersComponent,
    NavbarComponent,
    RendelesComponent,
    KosarComponent,
    ProfilComponent,
    KategoriakComponent,
    FooldalComponent,
    SelectedproductComponent,
    KapcsolatComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    Ng2GoogleChartsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [HttpLocalService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }