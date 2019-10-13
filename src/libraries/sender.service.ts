import { Injectable } from '@angular/core';
import { Paper } from './paper.service';
import { PapersService } from 'src/common/papers.service';

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  public papers: Paper[] = [];
  constructor(public paper: PapersService) { }

  public sendRequest(url: string, source: any): any {
    const Http = new XMLHttpRequest();
		Http.open("GET", `https://cors-anywhere.herokuapp.com/${url}`);
		Http.send();
		Http.onreadystatechange = (e) => {
      if (Http.readyState == 4 && Http.status == 200) {
        var result = Http.responseText;
        this.reader(result, source);
      }
		}
  }

  private reader(result, source): void {
    if (source === "Springer")
      this.paper.SpringerReader(result);

    if (source === "ACM DL")
      this.paper.ACMReader(result);
  }
}
