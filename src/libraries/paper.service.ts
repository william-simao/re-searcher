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
    this.type = type.replace(`"`, "");
    this.title = title.replace(`"`, "");
    this.DOI = doi;
    this.year = year;
  }
}

export class PaperService {
  constructor() {};
}
