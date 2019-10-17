import { Injectable } from '@angular/core';
import { SenderService } from './sender.service';

@Injectable({
  providedIn: 'root'
})
export class ScopusService {
  private key = `&apiKey=`;
  private urlBase = `https://api.elsevier.com/content/search/scopus?query=`;
  public title = ``;
  public abstract = ``;
  public keywords = ``;
  constructor(private _sender: SenderService) { }

  public searcInTitle(baseString: string): void {
    let url = `${this.urlBase}TITLE(${baseString})${this.key}`;
    this.title = url;
    this._sender.getResults(url, "Scopus Title");
  }

  public searcInAbstract(baseString: string): void {
    let url = `${this.urlBase}ABS(${baseString})${this.key}`;
    this.abstract = url;
    this._sender.getResults(url, "Scopus Abstract");
  }

  public searcInKeywords(baseString: string): void {
    let url = `${this.urlBase}KEY(${baseString})${this.key}`;
    this.keywords = url;
    this._sender.getResults(url, "Scopus Keywords");
  }
}
