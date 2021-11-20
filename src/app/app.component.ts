import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  isVisible: boolean=false;
  copyButtonVisible: boolean=false;
  noServerMessage: string = "Can't connect to our servers! Please refresh the page or try again after some time.";
  noURLmessage: string = "Please provide some url to shorten!";

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { 
    this.windowURL=window.location.href;
  }

  ngOnInit() {
    this.formdata = new FormGroup({
       longUrl: new FormControl("")
    });
 }

  onClickSubmit(data:any) {
    this.copyButtonVisible=false;
    if (!data || data.longUrl==null) {
      this.showSnackBar(this.noURLmessage);   
    }
    else {
      this.shortUrl="";
      this.longUrl=data.longUrl; 
      if (this.longUrl.length>0) {
        this.isVisible=true;
        if (this.longUrl.indexOf('http://')!=0 && this.longUrl.indexOf('https://')!=0) {
          this.longUrl='https://'+this.longUrl;
        }
        // console.log(this.longUrl);
        data.longUrl = this.longUrl;
        this.postURI = environment.APIURL+'/generate'
        // this.postedData = this.http.post<any>(this.postURI, data);
        this.http.post<any>(this.postURI, data).subscribe(
          (response)=>{
            this.shortUrl = environment.APIURL+"/"+response.shortUrl;
            this.isVisible=false;
            this.copyButtonVisible=true;
          },
          (err) => {
            console.log(err);
            this.isVisible=false;
            this.showSnackBar(this.noServerMessage);
          }
        );
        this.formdata.reset();
      } else {
        this.showSnackBar(this.noURLmessage); 
      }
    }
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, "Close");
  }
  

}
