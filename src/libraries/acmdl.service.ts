import { Injectable, IterableDiffers } from '@angular/core';

import { SenderService } from './sender.service';
import { UtilService } from 'src/common/util.service';

@Injectable({
  providedIn: 'root'
})
export class AcmdlService {

  public title = ``;
  public abstract = ``;
  public keyword = ``;

  constructor(
    private _sender: SenderService,
    private _util: UtilService
  ) { }

  public getResults(baseString: string, type: string): void {
    this.formatAcm(baseString, type);
    if (type === "title")
      this._sender.getResults(`https://dl.acm.org/results.cfm?query=${this.title}`, "ACM DL Title");
    if (type === "abstract")
      this._sender.getResults(`https://dl.acm.org/results.cfm?query=${this.abstract}&Go.x=0&Go.y=0`, "ACM DL Abstract");
    if (type === "keyword")
      this._sender.getResults(`https://dl.acm.org/results.cfm?query=${this.keyword}&Go.x=0&Go.y=0`, "ACM DL Keyword");
  }

  public search(): void {
    if (this.title !== "")
      this._sender.sendRequest(`https://dl.acm.org/exportformats_search.cfm?query=${this.title}&filtered=&within=owners%2Eowner%3DHOSTED&dte=&bfr=&srt=%5Fscore&expformat=csv`, "ACM DL Title");
    if (this.abstract != "")
      this._sender.sendRequest(`https://dl.acm.org/exportformats_search.cfm?query=${this.abstract}&filtered=&within=owners%2Eowner%3DHOSTED&dte=&bfr=&srt=%5Fscore&expformat=csv`, "ACM DL Abstract");
    if (this.keyword != "")
      this._sender.sendRequest(`https://dl.acm.org/exportformats_search.cfm?query=${this.keyword}&filtered=&within=owners%2Eowner%3DHOSTED&dte=&bfr=&srt=%5Fscore&expformat=csv`, "ACM DL Keyword");
  }

  private formatAcm(baseString: string, type: string): void {
    let acmBase = this._util.removeBaseParenthesis(baseString);
    acmBase = this.addSignalAcm(acmBase);
    this.addKeysAcm(acmBase, type);
  }

  private addSignalAcm(acmBase: string): string {
    acmBase = this._util.replaceAll(acmBase, ' OR ', ' OR +');
    acmBase = this._util.replaceAll(acmBase, ' AND ', ' AND +');
    return `(+${acmBase})`;
  }

  private addKeysAcm(acmBase: string, type: string): void {
    if (type === "title")
      this.title = `acmdlTitle:(${acmBase})`;
    if (type === "abstract")
      this.abstract = `recordAbstract:(${acmBase})`;
    if (type === "keyword")
      this.keyword = `keywords.author.keyword:(${acmBase})`;
  }
}
