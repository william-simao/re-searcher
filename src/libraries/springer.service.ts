import { Injectable } from '@angular/core';

import { SenderService } from './sender.service';

@Injectable({
  providedIn: 'root'
})
export class SpringerService {
  public string = ``
  constructor(private _sender: SenderService) { }

  public getResults(baseString: string): void {    
    this.string = baseString;
    let url = `https://link.springer.com/search?query=${baseString}`;
    this._sender.getResults(url, "Springer Link")
  }

  public search(): void {
    if (this.string != "") {
      let url = `https://link.springer.com/search/csv?query=${this.string}`;
      this._sender.sendRequest(url, "Springer");
    }
  }
}
