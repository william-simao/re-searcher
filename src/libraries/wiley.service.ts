import { Injectable } from '@angular/core';

import { SenderService } from './sender.service';
import { UtilService } from 'src/common/util.service';

@Injectable({
  providedIn: 'root'
})
export class WileyService {

  constructor(
    private _sender: SenderService,
    private _util: UtilService
  ) { }

  public GetTitleResults(baseString: string): void {
    let url = `https://onlinelibrary.wiley.com/action/doSearch?field1=Title&text1=${this.formatString(baseString)}&Ppub=`;
    console.log(url);
    this._sender.getResults(url, "Wiley Online Library");
  }

  private formatString(baseString: string): string {
    baseString = this._util.replaceAll(baseString, " OR ", "+OR+");
    return this._util.replaceAll(baseString, " AND ", "+AND+");
  }
}
