import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NotifyService, Directions, Rotations, RoverService } from '@app/shared';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
})
export class SimulatorComponent {
  x: number = null;
  y: number = null;
  direction: Directions = null;
  rotations = Rotations;
  minVal = 0;
  maxVal = 10;
  directions: string[] = Object.values(Directions);
  directionArray: {
    value: string;
    label: string;
  }[] = this.directions.map((direction) => ({
    value: direction,
    label: direction,
  }));

  updateForm: FormGroup = this.fb.group({
    input: [null, Validators.required],
  });

  get input(): AbstractControl {
    return this.updateForm?.get('input');
  }

  form: FormGroup = this.fb.group({
    x_position: [null, Validators.required],
    y_position: [null, [Validators.required]],
    direction: [null, Validators.required],
  });

  get xPosition(): AbstractControl {
    return this.form?.get('x_position');
  }

  get yPosition(): AbstractControl {
    return this.form?.get('y_position');
  }

  get roverDirection(): AbstractControl {
    return this.form?.get('direction');
  }

  constructor(private fb: FormBuilder, private notify: NotifyService, private roverService: RoverService) {}

  ngOnInit() {
    this.roverService.getRover().subscribe((res: any) => {
      this.x = res.data.x;
      this.y = res.data.y;
      this.direction = res.data.direction;
    });
  }

  moveRover(): void {
    if (!this.isRoverPlaced()) {
      this.notify?.error &&
        this.notify.error('Please place the rover first', 'Unable to move');
      return;
    }
      this.roverService.moveRover(this.updateForm.value).subscribe((res: any) => {
        this.x = res.data.x;
        this.y = res.data.y;
        this.direction = res.data.direction;
      });
  }

  placeRover(): void {
    if (this.form.invalid) {
      this.notify?.warning &&
        this.notify.warning('Invalid input', 'Unable to place');
      return;
    }

    const placeInput = this.form.value;
    if (!this.directions.includes(placeInput.direction)) {
      this.notify?.error &&
        this.notify.error('Please enter valid direction', 'Unable to place');
    } else if (
      !this.between(placeInput.x_position) ||
      !this.between(placeInput.y_position)
    ) {
      this.notify?.error &&
        this.notify.error('Please enter valid coordinate', 'Unable to place');
    } else {
      this.x = placeInput.x_position;
      this.y = placeInput.y_position;
      this.direction = placeInput.direction;
      this.roverService.addRover({
        x: this.x,
        y: this.y,
        direction: this.direction
      }).subscribe((res: any) => {
        this.x = res.data.x;
        this.y = res.data.y;
        this.direction = res.data.direction;
      });
    }
  }

  report(): void {
    if (!this.isRoverPlaced()) {
      this.notify?.error &&
        this.notify.error('Please place the rover first', 'Unable to report');
      return;
    }

    this.notify?.success &&
      this.notify.success(
        `Output: ${this.x}, ${this.y}, ${this.direction}`,
        'Position'
      );
  }

  counter(i: number): Array<number> {
    return new Array(i);
  }

  isCurrent(i: number, j: number): boolean {
    return i === this.x && j === this.y;
  }

  private isRoverPlaced(): boolean {
    return this.direction && this.x !== null && this.y !== null;
  }

  private between(
    value: number,
    minValue: number = this.minVal,
    maxValue: number = this.maxVal
  ): boolean {
    return value >= minValue && value < maxValue;
  }
}
