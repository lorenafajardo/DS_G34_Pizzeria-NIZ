import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailServiceService } from 'src/app/services/email-service.service';

@Component({
  selector: 'app-sendgrid-email',
  templateUrl: './sendgrid-email.component.html',
  styleUrls: ['./sendgrid-email.component.css']
})
export class SendgridEmailComponent implements OnInit {

  constructor(private http:HttpClient,
    private emailservice: EmailServiceService) { }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  ngOnInit(){
    this.form = new FormGroup({
      email: new FormControl(null,{validators:[Validators.required,Validators.email]}),
    });
  }

  onSubscribeClick(){
    if(this.form.invalid){
      return;
    }
    this.emailservice.SaveAndSendMail(this.form.value.email)
  }
}
