import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import validation from 'src/app/validations/validations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    user_name: new FormControl(''),
    first_lastname: new FormControl(''),
    second_lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms:new FormControl(false)
  });

  submitted = false;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      user_name:['',[Validators.required, Validators.minLength(3)]],
      first_lastname:['',[Validators.required, Validators.minLength(3)]],
      second_lastname:['',[Validators.required, Validators.minLength(3)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]],
      confirmPassword:['',Validators.required],
      acceptTerms:[false,Validators.requiredTrue],
    },
    {
      Validators:[validation.match('password','confirmPassword')]
    }
    );
  }
    get f ():{[key:string]:AbstractControl}{
      return this.form.controls;
    }

    onSubmit(): void{
      this.submitted =true;
      if (this.form.invalid){
        return;
      }
      console.log(JSON.stringify(this.form.value, null, 2));
    }

    onReset(): void{
      this.submitted = false;
      this.form.reset();
    }
}
