import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';

import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { threeDigitValidator, twoDigitValidator } from '../custom-validators/custom-validators'; // Import the custom validator
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public packages: string[] = ["Monthly", "Quarterly", "Yearly"];
  public genders: string[] = ["Male", "Female"];
  public importants: string[] = [
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ];
  public registrationForm!: FormGroup;
  public useridupdate!: number;
  public isupdateactive: boolean = false;


  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private ngtoast: NgToastService) { }
  ngOnInit(): void {
    this.registrationForm = this.fb.group({

      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(10)]],
      LastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      weight: ['', [Validators.required, twoDigitValidator()]],
      height: ['', [Validators.required, threeDigitValidator()]],
      bmi: ['', [Validators.required]],
      bmiresult: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      requiretrainer: ['', [Validators.required]],
      package: ['', [Validators.required]],
      important: ['', [Validators.required]],
      havegymbefore: ['', [Validators.required]],
      inquiryDate: ['', [Validators.required]]
    });

    //height value changes then call calculate function and pass height value
    this.registrationForm.controls['height'].valueChanges.subscribe(res => {
      this.calculatebmi(res);
    })
    //userid update get the activated id value  with help of Activated route
    this.activatedRoute.params.subscribe(val => {
      this.useridupdate = val['id'];
      this.api.getRegistrationUserId(this.useridupdate).subscribe(res => {
        this.isupdateactive = true;//update active
        this.fillupdateForm(res);
      });
    });

  }


  submit() {
    //console.log(this.registrationForm.value);
    this.api.postRegistration(this.registrationForm.value).subscribe(res => {
      //alert("Information submitted succesfully")
      this.ngtoast.success({ detail: "success", summary: "Enquiry Form submited Sucessfully", duration: 5000 });
      this.registrationForm.reset();
    });


  }
  // update function declare
  update() {
    //
    this.api.updateRegistration(this.registrationForm.value, this.useridupdate).subscribe(res => {

      this.ngtoast.success({ detail: "success", summary: "Enquiry updated Sucessfully", duration: 5000 });
      this.registrationForm.reset();
      this.router.navigate(['registerlist']);
    });
  }
  calculatebmi(heightv: number) {
    const weight = this.registrationForm.value.weight;
    const height = heightv / 100;
    const bmi = Math.floor(weight / (height * height));
    this.registrationForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiresult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registrationForm.controls['bmiresult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registrationForm.controls['bmiresult'].patchValue("overweight");
        break;
      default:
        this.registrationForm.controls['bmiresult'].patchValue("Obese");
        break;
    }
  }
  //update fill form
  fillupdateForm(up: User) {
    console.log(up);

    this.registrationForm.setValue({
      firstName: up.firstName,
      LastName: up.LastName,
      email: up.email,
      mobile: up.mobile,
      weight: up.weight,
      height: up.height,
      bmi: up.bmi,
      bmiresult: up.bmiresult,
      gender: up.gender,
      requiretrainer: up.requiretrainer,
      package: up.package,
      important: up.important,
      inquiryDate: up.inquiryDate,
      havegymbefore: up.havegymbefore


    });
  }

}
