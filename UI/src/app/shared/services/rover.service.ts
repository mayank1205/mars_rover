import { Injectable } from '@angular/core';
import { ToastrService, ActiveToast, IndividualConfig } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const options: Partial<IndividualConfig> = {
  closeButton: false,
  timeOut: 2000,
  progressBar: true,
  progressAnimation: 'increasing',
  toastClass: 'ngx-toastr',
  positionClass: 'toast-top-right',
  tapToDismiss: true,
  newestOnTop: true,
};

@Injectable()
export class RoverService {
  options = options;

  constructor(private http: HttpClient) {}

  addRover(rover: any) {
    return this.http.post(`${environment.API_URL}/rover`, rover);
  }

  getRover() {
    return this.http.get(`${environment.API_URL}/rover`);
  }

  moveRover(input: any) {
    return this.http.post(`${environment.API_URL}/move`, input);
  }
}
