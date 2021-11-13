import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shortlink-app';
  formdata:any;
  longUrl:any;
  postURI:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.formdata = new FormGroup({
       longUrl: new FormControl("")
    });
 }

  onClickSubmit(data:any) {
    this.longUrl=data.longUrl;
    this.postURI = 'http://localhost:8080/generate'
    this.http.post<any>(this.postURI, data).subscribe(
      (response)=>console.log(response),
      (err) => console.log(err)
    );
  }
}
