import { Injectable } from '@angular/core';
import { SenderService } from './sender.service';

@Injectable({
  providedIn: 'root'
})
export class ScienceDirectService {
  private string = ``;
  constructor(private _sender: SenderService) { }

  public search(): void {
    if (this.string != "") {
      let url = `https://www.sciencedirect.com/search/advanced?qs=${this.string}&show=100&sortBy=relevance`;
      this._sender.sendRequest(url, "Science Direct");

      this.Researcher(100);
      this.Researcher(200);
      this.Researcher(300);
      this.Researcher(400);
    }
  }

  private Researcher(offset): void {
    this.sleep(3);
    let url = `https://www.sciencedirect.com/search/advanced?tak=${this.string}&show=100&sortBy=relevance&offset=${offset}`;
    this._sender.sendRequest(url, "Science Direct");
  }

  public getResults(baseString: string): void {
    this.string = baseString;
    let url = `https://www.sciencedirect.com/search/advanced?tak=${baseString}`;
    this._sender.getResults(url, "Science Direct")
  }

  private sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*500;
    while(new Date().getTime() < waitUntil) true;
  }
}
