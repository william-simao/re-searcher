import { Injectable } from '@angular/core';

import { SenderService } from './sender.service';

@Injectable({
  providedIn: 'root'
})
export class SpringerService {

  constructor(private _sender: SenderService) { }

  public getResults(baseString: string): void {    
    let url = `https://link.springer.com/search?query=${baseString}`;
    this._sender.getResults(url, "Springer Link")
  }

  public search(baseString: string): void {
    let url = `https://link.springer.com/search/csv?query=${baseString}`;
    this._sender.sendRequest(url, "Springer");
  }
}
