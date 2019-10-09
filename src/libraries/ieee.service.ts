import { Injectable } from '@angular/core';
import { SenderService } from './sender.service';

@Injectable({
  providedIn: 'root'
})
export class IeeeService {

  private base = "https://ieeexplore.ieee.org/search/searchresult.jsp?";
  private DOMTitle: any = {};

  constructor(private _sender: SenderService) { }

  private setTitle = function(result) {
    this.DOMTitle = result;
    console.log(this.DOMTitle);
  }

  public Search(query: string): void {
    this._sender.sendRequest(`${this.base}/newsearch=true&queryText=${query}`, this.setTitle);
  }
}
