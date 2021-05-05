import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetComponent } from './pages/fleet.component';
import { VehiclesTableComponent } from './pages/vehicles-table/vehicles-table.component';
import { DriversTableComponent } from './pages/drivers-table/drivers-table.component';
import { SkeletonTableComponent } from 'src/app/shared/components/skeleton-table/skeleton-table.component';

import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { FleetRoutingModule } from './fleet-routing.module';
import { TimelineModule } from 'primeng/timeline';
import { TreeTableModule } from 'primeng/treetable';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { DriversDetailDialogComponent } from './pages/drivers-table/pages/drivers-detail-dialog/drivers-detail-dialog.component';
import { VehiclesDetailDialogComponent } from './pages/vehicles-table/pages/vehicles-detail-dialog/vehicles-detail-dialog.component';
import { VehiclesFormDialogComponent } from './pages/vehicles-table/pages/vehicles-form-dialog/vehicles-form-dialog.component';
import { DriversFormDialogComponent } from './pages/drivers-table/pages/drivers-form-dialog/drivers-form-dialog.component';

@NgModule({
  declarations: [
    FleetComponent,
    VehiclesTableComponent,
    DriversTableComponent,
    SkeletonTableComponent,
    DriversDetailDialogComponent,
    VehiclesDetailDialogComponent,
    VehiclesFormDialogComponent,
    DriversFormDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FleetRoutingModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    CheckboxModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    CalendarModule,
    MultiSelectModule,
    TooltipModule,
    DialogModule,
    TableModule,
    SkeletonModule,
    TimelineModule,
    TreeTableModule,
    ConfirmPopupModule,
  ],
  providers: [MessageService, FilterService, ConfirmationService, DialogService],
})
export class FleetModule {}
