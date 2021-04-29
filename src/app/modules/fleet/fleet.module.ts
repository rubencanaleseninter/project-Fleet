import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetComponent } from './pages/fleet.component';
import { VehiclesTableComponent } from './pages/vehicles-table/vehicles-table.component';
import { DriversTableComponent } from './pages/drivers-table/drivers-table.component';
import { SkeletonTableComponent } from 'src/app/shared/components/skeleton-table/skeleton-table.component';
import { VehiclesHistoryComponent } from './pages/vehicles-history/vehicles-history.component';

import { FilterService, MessageService } from 'primeng/api';

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

@NgModule({
  declarations: [
    FleetComponent,
    VehiclesTableComponent,
    DriversTableComponent,
    SkeletonTableComponent,
    VehiclesHistoryComponent,
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
  ],
  providers: [MessageService, FilterService],
})
export class FleetModule {}
