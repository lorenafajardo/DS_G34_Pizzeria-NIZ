import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  constructor(private http: HttpClient) { }
  SaveAndSendMail(emailOfUser: string){
    const saveData ={
      email: emailOfUser
    };

    this.http.post<{message:string}>('http://localhost:4200/subscribe/', saveData)
    .subscribe((response)=>{console.log(response.message);
    });
  }
}
