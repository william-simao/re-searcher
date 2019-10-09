import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  constructor() { }

  public sendRequest(url: string, callback: any): any {
    const Http = new XMLHttpRequest();
		Http.open("GET", `https://cors-anywhere.herokuapp.com/${url}`);
		Http.send();
		Http.onreadystatechange = (e) => {
        var result = Http.responseText;
  			if (Http.readyState == 4 && Http.status == 200) {
          var dom = new DOMParser().parseFromString(Http.responseText, "text/html");
          callback.apply(this,[dom]);
  			}
		}
  }
}
