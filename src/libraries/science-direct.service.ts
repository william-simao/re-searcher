import { Injectable } from '@angular/core';
import { SenderService } from './sender.service';

@Injectable({
  providedIn: 'root'
})
export class ScienceDirectService {

  constructor(private _sender: SenderService) { }

  public Search(baseString: string): void {
    let url = `https://www.sciencedirect.com/search/advanced?qs=${baseString}&show=100&sortBy=relevance`;
    this._sender.sendRequest(url, "Science Direct");

    this.Researcher(baseString, 100);
    this.Researcher(baseString, 200);
    this.Researcher(baseString, 300);
    this.Researcher(baseString, 400);
  }

  private Researcher(baseString: string, offset): void {
    this.sleep(3);
    let url = `https://www.sciencedirect.com/search/advanced?qs=${baseString}&show=100&sortBy=relevance&offset=${offset}`;
    this._sender.sendRequest(url, "Science Direct");
  }

  private sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*500;
    while(new Date().getTime() < waitUntil) true;
}
}
