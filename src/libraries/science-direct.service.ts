import { Injectable } from '@angular/core';
import { SenderService } from './sender.service';

@Injectable({
  providedIn: 'root'
})
export class ScienceDirectService {
  private string = ``;
  private totalPages = 0;
  constructor(private _sender: SenderService) { }

  public search(): void {
    if (this.string != "") {
      let total = new Number(localStorage.getItem("scienceDirectResults"));
      for (let i = 0; i < total; i = i + 100) {
        this.Researcher(i);
      }
    }
  }

  private Researcher(offset): void {
    this.sleep(3);
    let url = `https://www.sciencedirect.com/search/advanced?tak=${this.string}&show=100&sortBy=relevance&offset=${offset}`;
    this._sender.sendRequest(url, "Science Direct");
  }

  private getKey(): string {
    return localStorage.getItem("scienceDirect");
  }

  public getResults(baseString: string): void {
    this.string = baseString;
    let url = `https://www.sciencedirect.com/search/advanced?tak=${baseString}&show=100&sortBy=relevance`;
    this._sender.getResults(url, "Science Direct")
  }

  private sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*500;
    while(new Date().getTime() < waitUntil) true;
  }
}
