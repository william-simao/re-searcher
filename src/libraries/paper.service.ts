import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Paper {
  source: string;
  type: string;
  title: string;
  DOI: string;
  year: string;

  constructor(source, type, title, doi, year){
    this.source = source;
    this.type = type;
    this.title = title;
    this.DOI = doi;
    this.year = year;
  }
}

export class PaperService {
  public data: Paper[] = [];
  constructor() {};
  public update(x): void {
    this.data = x;
  }
  /*public source = ``;
  public type = ``;
  public title = ``;
  public DOI = ``;
  public year = ``;

  constructor() { }

  public setPaper(source, type, title, doi, year): void {
    this.source = source;
    this.type = type;
    this.title = title;
    this.DOI = doi;
    this.year = year;
  }*/
}
