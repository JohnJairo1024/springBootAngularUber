import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {Vehicle} from "../../vehicle";
import {VehiclesService} from "../../vehicles.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  angForm: FormGroup;
  vehicle:any={};

  constructor(private route: ActivatedRoute, private router: Router,private fb: FormBuilder,private ps:VehiclesService,
    private toasterService: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      VehicleBrand: ['', Validators.required ],
      VehicleModel: ['', Validators.required ],
      VehiclePlate: ['',Validators.required],
      VehicleLicense: ['', Validators.required ]
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.ps.findById(params['id']).subscribe(res => {
        this.vehicle=res;
      })
    });
  }

  onSubmit(){
    this.ps.update(this.vehicle.id,this.vehicle).subscribe(data =>{
      this.toasterService.success('Vehicle updated successfully','Success', { positionClass: 'toast-top-right' });
      this.vehicle=new Vehicle();
      this.gotoList();
    });

  }

  gotoList(){
    this.router.navigate(['/vehicle']);
  }

}
