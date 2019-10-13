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
    this.type = type ? type.replace(`"`, "") : "";
    this.title = title ? title.replace(`"`, "") : "";
    this.DOI = doi;
    this.year = year;
  }
}

export class Result {
  source: string;
  type: string;
  total: number;

  constructor(source, type, total) {
    this.source = source;
    this.type = type;
    this.total = total;
  }
}

export class PaperService {
  constructor() {};
}
