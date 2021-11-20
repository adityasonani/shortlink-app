import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

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
  shortUrl:any;
  windowURL: any;

  constructor(private http: HttpClient) { 
    this.windowURL=window.location.href;
  }

  ngOnInit() {
    this.formdata = new FormGroup({
       longUrl: new FormControl("")
    });
 }

  onClickSubmit(data:any) {
    if (!data || data.longUrl==null) {
      alert("Please provide some url to shorten!");   
    }
    else {
      this.longUrl=data.longUrl; 
      if (this.longUrl.length>0) {
        if (this.longUrl.indexOf('http://')!=0 && this.longUrl.indexOf('https://')!=0) {
          this.longUrl='https://'+this.longUrl;
        }
        this.postURI = environment.APIURL+'/generate'
        // this.postedData = this.http.post<any>(this.postURI, data);
        this.http.post<any>(this.postURI, data).subscribe(
          (response)=>this.shortUrl = environment.APIURL+"/"+response.shortUrl,
          (err) => console.log(err)
        );
        this.formdata.reset();
      } else {
        alert("Please provide some url to shorten!");   
      }
    }
  }

}
