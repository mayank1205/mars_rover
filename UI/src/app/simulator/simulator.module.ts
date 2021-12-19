import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SimulatorRoutingModule } from './simulator-routing.module';
import { SimulatorComponent } from './simulator-component/simulator.component';
import { NotifyService, RoverService } from '@app/shared';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SimulatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  declarations: [SimulatorComponent],
  providers: [NotifyService, RoverService],
})
export class SimulatorModule {}
