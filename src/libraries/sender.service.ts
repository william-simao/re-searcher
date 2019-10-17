import { Injectable } from '@angular/core';
import { Paper } from './paper.service';
import { PapersService } from 'src/common/papers.service';

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  public papers: Paper[] = [];
  constructor(public paper: PapersService) { }
  public getResults(url: string, source: any): any {
    const Http = new XMLHttpRequest();
		Http.open("GET", `https://cors-anywhere.herokuapp.com/${url}`);
		Http.send();
		Http.onreadystatechange = (e) => {
      if (Http.readyState == 4 && Http.status == 200) {
        var result = Http.responseText;
        this.readerResults(result, source, url);
      }
		}
  }

  private readerResults(result, source, url): void {
    if (source === "Springer Link") {
      this.paper.SpringerResult(result, url);
    }

    if (source.startsWith("ACM DL"))
      this.paper.ACMResult(result, source, url);

    if (source === "Science Direct") {
      this.paper.ScienceDirectResult(result, url);
    }

    if (source.startsWith("Scopus"))
      this.paper.ScopusResult(result, source, url);
  }

  public sendRequest(url: string, source: any): any {
    const Http = new XMLHttpRequest();
		Http.open("GET", `https://cors-anywhere.herokuapp.com/${url}`);
		Http.send();
		Http.onreadystatechange = (e) => {
      if (Http.readyState == 4 && Http.status == 200) {
        var result = Http.responseText;
        this.reader(result, source, url);
      }
		}
  }

  private reader(result, source, url): void {
    if (source === "Springer")
      this.paper.SpringerReader(result, url);

    if (source == "Science Direct")
      this.paper.ScienceDirectReader(result, url);

    if (source.startsWith("ACM DL"))
      this.paper.ACMReader(result, source, url);
  }
}
