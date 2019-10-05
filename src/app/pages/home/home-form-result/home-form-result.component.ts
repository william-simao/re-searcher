import { Component, OnInit, IterableDiffers } from '@angular/core';

import { HomeFormComponent } from '../home-form/home-form.component';

export interface StringBase {
  source: string;
  type: string;
  text: string;
  url: string;
}

@Component({
  selector: 'app-home-form-result',
  templateUrl: './home-form-result.component.html',
  styleUrls: ['./home-form-result.component.css']
})
export class HomeFormResultComponent implements OnInit {
  displayedColumns: string[] = ['source', 'type', 'text', 'url'];
  public dataSource;
  private differ: IterableDiffers;

  public baseString: string = '';
  public ieeeString: string = '';
  public ieee: object = {};

  isTitle = false;
  isAbstract = false;
  isKeyword = false;

  constructor(
    private _form: HomeFormComponent,
    private _differs: IterableDiffers
  ) { this.differ = _differs; }

  ngOnInit() {
  }

  public search(): void {
    debugger;
  }


  public checkShowCell(i): boolean {
    if (this.isTitle && (i === 0 || i === 3))
      return true;
    
    if (this.isAbstract && (i === 1 || i === 4))
      return true;

    if (this.isKeyword && (i === 2 || i === 5))
      return true;
    
    if (i === 6)
      return true;
    return false;
  }

  ngDoCheck() {
    const changes = this.differ.find(this._form.generalTerms);
    if (changes) {
      this.baseString = this._form.baseString;
      this.formatIeee();
      this.formatAcm();
      this.formatScienceDirect();
    }
  }

  private replaceAll(text: string, oldChar: string, newChar: string): string {
    return text.split(oldChar).join(newChar);
  }
  
  private countEndParenthesis(text: string): number {
    return text.split(')').length - 1;   
  }

  private removeBaseParenthesis(): string {
    let base = this.replaceAll(this.baseString, '(', '');
    base = this.replaceAll(base, ')', '');
    return base;
  }

  /**
   * SCIENCE DIRECT
   */
  private formatScienceDirect(): void {
    let scienceDirectBase = `title-abs-key(${this.baseString})`;
    let url = `https://www.sciencedirect.com/search?qs=#query#`
    
    this.dataSource[6] = {
      'source': 'Science Direct',
      'type': 'Title, Abstract, and Keywords',
      'text': scienceDirectBase,
      'url': url.replace('#query#', scienceDirectBase)
    };
  }

  /**
   * ACM DL
   */
  private formatAcm(): void {
    let acmBase = this.removeBaseParenthesis();
    acmBase = this.addSignalAcm(acmBase);
    this.addKeysAcm(acmBase);
  }

  private addSignalAcm(acmBase: string): string {
    acmBase = this.replaceAll(acmBase, ' OR ', ' OR +');
    acmBase = this.replaceAll(acmBase, ' AND ', ' AND +');
    return `(+${acmBase})`;
  }

  private addKeysAcm(acmBase: string): void {
    let title = `acmdlTitle:(${acmBase})`;
    let abstract = `recordAbstract:(${acmBase})`;
    let keyword = `keywords.author.keyword:(${acmBase})`;
    let url = `https://dl.acm.org/results.cfm?query=#query#&within=owners.owner=HOSTED&filtered=&dte=&bfr=`
    
    this.dataSource[3] = {
      'source': 'ACM DL',
      'type': 'Title',
      'text': title,
      'url': url.replace('#query#', title)
    };
    this.dataSource[4] = {
      'source': 'ACM DL',
      'type': 'Abstract',
      'text': abstract,
      'url': url.replace('#query#', abstract)
    };
    this.dataSource[5] = {
      'source': 'ACM DL',
      'type': 'Keyword',
      'text': keyword,
      'url': url.replace('#query#', keyword)
    };
  }

  /**
   * IEEEXplore
   */
  private formatIeee(): void {
    let ieeeBase = this.removeBaseParenthesis();
    ieeeBase = this.addParenthesisInEndIeee(ieeeBase);
    ieeeBase = this.addParenthesisInStartIeee(ieeeBase);
    this.addKeysIeee(ieeeBase);
  }

  private addParenthesisInEndIeee(ieeeBase: string): string {
    ieeeBase = this.replaceAll(ieeeBase, ' OR ', ') OR ');
    ieeeBase = this.replaceAll(ieeeBase, ' AND ', ') AND ');
    return `${ieeeBase})`;
  }

  private addParenthesisInStartIeee(ieeeBase: string): string {
    let countParenthesis = this.countEndParenthesis(ieeeBase);
    let stringBase = ``;
    for (let i = 0; i < countParenthesis; i++)
      stringBase += `(`;
    return `${stringBase}#change#${ieeeBase}`;
  }

  private addKeysIeee(ieeeBase: string): void {
    let title = this.utilFormatterKeysIeee(ieeeBase, '"Document Title"');
    let abstract = this.utilFormatterKeysIeee(ieeeBase, '"Abstract"');
    let keyword = this.utilFormatterKeysIeee(ieeeBase, '"Index Terms"');
    let url = `https://ieeexplore.ieee.org/search/searchresult.jsp?action=search&matchBoolean=true&searchField=Search_All&queryText=(#query#)&newsearch=true`;
    
    this.dataSource = [
      {
        'source': 'IEEE Xplore',
        'type': 'Title',
        'text': title,
        'url': url.replace('#query#', title)
      },{
        'source': 'IEEE Xplore',
        'type': 'Abstract',
        'text': abstract,
        'url': url.replace('#query#', abstract)
      },{
        'source': 'IEEE Xplore',
        'type': 'Keywords',
        'text': keyword,
        'url': url.replace('#query#', keyword)
      }
    ];

    this.ieeeString = ieeeBase;
  }

  private utilFormatterKeysIeee(ieeeBase: string, key: string): string {
    ieeeBase = ieeeBase.replace('#change#', `${key}:`);
    ieeeBase = this.replaceAll(ieeeBase, ' OR ', ` OR ${key}:`);
    ieeeBase = this.replaceAll(ieeeBase, ' AND ', ` AND ${key}:`);
    return ieeeBase;
  }

}