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
  url: string;

  constructor(source, type, total, url) {
    this.source = source;
    this.type = type;
    this.total = Number(this.replaceAll(total, ",", ""));
    this.url = url;
  }

  public replaceAll(text: string, oldChar: string, newChar: string): string {
    return text.split(oldChar).join(newChar);
  }
}

export class PaperService {
  constructor() {};
}
