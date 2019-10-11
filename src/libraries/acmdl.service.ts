import { Injectable, IterableDiffers } from '@angular/core';

import { SenderService } from './sender.service';

@Injectable({
  providedIn: 'root'
})
export class AcmdlService {

  constructor(
    private _sender: SenderService
  ) { }

  public Search(query: string): void {
    this._sender.sendRequest(`https://dl.acm.org/exportformats_search.cfm?query=${query}&filtered=&within=owners%2Eowner%3DHOSTED&dte=&bfr=&srt=%5Fscore&expformat=csv`, "ACM DL");
  }
}
