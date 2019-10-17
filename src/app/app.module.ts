import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTabsModule,
  MatTableModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkColumnDef } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
//import { SidebarModule } from 'ng-sidebar';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { HomeFormComponent } from './pages/home/home-form/home-form.component';
import { HomeFormAddComponent } from './pages/home/home-form-add/home-form-add.component';
import { HomeFormConfigComponent } from './pages/home/home-form-config/home-form-config.component';
import { HomeFormResultComponent } from './pages/home/home-form-result/home-form-result.component';
import { AboutPageComponent } from './pages/about/about-page/about-page.component';
import { HelpPageComponent } from './pages/help/help-page/help-page.component';
import { routes } from '../app/app-routing/app-routing.module';
import { HomeFormTypesComponent } from './pages/home/home-form-types/home-form-types.component';
import { HttpClientModule } from '@angular/common/http';
import { PaperService } from 'src/libraries/paper.service';
import { HomeFormDataComponent } from './pages/home/home-form-data/home-form-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    HomeFormComponent,
    HomeFormAddComponent,
    HomeFormConfigComponent,
    HomeFormResultComponent,
    AboutPageComponent,
    HelpPageComponent,
    HomeFormTypesComponent,
    HomeFormDataComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    //SidebarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HomeFormComponent,
    HomeFormResultComponent,
    CdkColumnDef,
    PaperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
