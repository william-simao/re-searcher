import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Paper {
  source: string;
  type: string;
  paperType: string;
  title: string;
  DOI: string;
  year: string;
  authors: string;
  pages: string;
  numPages: string;
  keywords: string;
  journalEventName: string;
  journalEventAcronym: string;
  localization: string;

  constructor(source, type, paperType, title, doi, year, authors, pages, numPages, keywords, journalEventName, journalEventAcronym, localization){
    this.source = source;
    this.type = type ? type.replace(`"`, "") : "";
    this.paperType = paperType ? paperType.replace(`"`, "") : "";;
    this.title = title ? title.replace(`"`, "") : "";
    this.DOI = doi;
    this.year = year;
    this.authors = authors ? authors.replace(";", "") : "";
    this.pages = pages ? pages.replace(";", "") : "";
    this.numPages = numPages ? numPages.replace(";", "") : "";
    this.keywords = keywords ? keywords.replace(";", "") : "";
    this.journalEventName = journalEventName ? journalEventName.replace(";", "") : "";
    this.journalEventAcronym = journalEventAcronym ? journalEventAcronym.replace(";", "") : "";
    this.localization = localization ? localization.replace(";", "") : "";
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
