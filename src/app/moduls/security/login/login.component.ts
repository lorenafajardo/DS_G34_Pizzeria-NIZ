import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   login: FormGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
   });
   submitted = false;

   constructor(private formBuilder: FormBuilder,) { }

   ngOnInit(): void {
      this.login = this.formBuilder.group({
         email: ['', [Validators.required, Validators.email]],
         password: ['', [Validators.required, Validators.minLength(8)]],
      });
   }

   get f(): { [key: string]: AbstractControl } {
      return this.login.controls;
   }

   onSubmit(): void {
      this.submitted = true;
      if (this.login.invalid) {
         return;
      }
      console.log(JSON.stringify(this.login.value, null, 2));
   }

   onReset(): void {
      this.submitted = false;
      this.login.reset();
   }
}
