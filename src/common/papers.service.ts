import { Injectable } from '@angular/core';

import { Paper, Result } from 'src/libraries/paper.service';

@Injectable({
  providedIn: 'root'
})
export class PapersService {

  public papers: Paper[] = [];
  public result: Result[] = [];

  constructor() { }
  
  public update(paper){
    this.papers.push(paper);
  }

  public SpringerReader(result, url) {
    let paperList = result.split("\n");
    for (let i = 1; i < paperList.length; i++) {
      var row = paperList[i].split(`","`);
      var paper = new Paper("Springer", "Title, Abstract, and Keywords", row[9], row[0], row[5], row[7], row[6], "?", "?", "?", `${row[1]} ${row[2]}`, "?", "?");
      if (paper != null && paper != undefined)
        this.update(paper);
    }
  }

  public ScienceDirectReader(result, url) {
    var doc = new DOMParser().parseFromString(result, "text/html");
    var paperList = doc.getElementsByClassName("ResultItem col-xs-24 push-m");
    for(let i = 0; i < paperList.length; i++){
      var row = paperList[i];
      let title = (<HTMLElement>row.getElementsByClassName("result-list-title-link u-font-serif text-s")[0]).innerText;
      let DOI = row.getAttribute("data-doi");
      let year = (<HTMLElement>row.getElementsByClassName("SubType hor")[0].children[2]).innerText;
      year = year.replace(",", "").substring(year.length - 6);
      var paper = new Paper("Science Direct", "Title, Abstract, and Keywords", 
        title, 
        this.getPaperType(row),
        DOI, 
        this.getYear(row), 
        this.getAuthors(row), 
        this.getPages(row),
        this.getNumPages(row),
        "?",
        this.getJournalName(row), 
        "?",
         "?");

      if (paper != null && paper != undefined)
        this.update(paper);
    }
  }

  private getPaperType(row): string {
    try {
      return row.getElementsByClassName("article-type u-clr-grey8").innerText;
    } catch (error) {
      return "?";
    }
  }

  private getYear(row): string {
    try {      
      let year = row.getElementsByClassName("SubType hor")[0].children[2].innerText;
      year = year.replace(",", "").substring(year.length - 6);
      return year;
    } catch (error) {
      return "?";
    }
  }

  private getAuthors(row): string {
    try {
      let obj = row.getElementsByClassName("Authors hor undefined")[0];
      if (obj)
        return obj.innerText;
      else
        return row.getElementsByClassName("Authors hor reduce-list")[0].innerText;
    } catch (error) {
      return "?"
    }
  }

  private getPages(row): string {
    try {
      return row.getElementsByClassName("SubType hor")[0].innerText.split("Pages ")[1];      
    } catch (error) {
      return "?";
    }
  }

  private getNumPages(row): string {
    try {
      let pages = row.getElementsByClassName("SubType hor")[0].innerText.split("Pages ")[1].split("-");
      return (pages[1].replace(",", "") - pages[0]).toString();
    } catch (error) {
      return "?";
    }
  }

  private getJournalName(row): string {
    try {
      return row.getElementsByClassName("subtype-srctitle-link")[0].innerText;
    } catch (error) {
      return "?";
    }
  }

  public ACMReader(result, type, url){
    let paperList = result.split("\n");
    for (let i = 1; i < paperList.length - 1; i++) {
      var row = paperList[i].split(`","`);
      var paper = new Paper("ACM DL", type.split(" ")[2], row[0], row[6], row[11], row[18], row[2], row[7], row[9], row[10], `${row[12]} - ${row[20]}`, row[21], row[24]);
      if (paper != null && paper != undefined)
        this.update(paper);
    }
  }

  public ACMResult(result, type, url): void {
    var doc = this.convertResultToDOM(result);
    this.result.push(new Result("ACM DL", type.split(" ")[2], doc.getElementById("searchtots").innerText.split(" ")[0], url));
  }

  public SpringerResult(result, url): void {
    var doc = this.convertResultToDOM(result);
    this.result.push(new Result("Springer Link", "Title, Abstract, and Keywords", doc.getElementById("number-of-search-results-and-search-terms").innerText.trim().split(" ")[0].trim(), url));
  }

  public ScienceDirectResult(result, url): void {
    var doc = this.convertResultToDOM(result);
    try {
      var total = doc.getElementsByClassName("search-body-results-text")[0].innerText.split(" ")[0];
      localStorage.setItem("scienceDirectResults", total);
      this.result.push(new Result("Science Direct", "Title, Abstract, and Keywords", total, url));
    } catch (error) {
      localStorage.setItem("scienceDirectResults", "0");
      this.result.push(new Result("Science Direct", "Title, Abstract, and Keywords", "0", url));
    }
  }

  public ScopusResult(result, type, url): void {
    var jsonResult = JSON.parse(result);
    var nameType = type === "Scopus Title, Abstract and Keywords" ? type : type.split(" ")[1];
    this.result.push(new Result("Scopus", nameType, jsonResult["search-results"]["opensearch:totalResults"], url));
  }

  public ScopusReader(jsonResult, type): void {
    var jsonResult = JSON.parse(jsonResult);
    for (let i = 0; i < jsonResult["search-results"].entry.length; i++) {
      const json = jsonResult["search-results"].entry[i];
      var date = new Date(json["prism:coverDate"]).getFullYear();
      var paper = new Paper("Scopus", 
        type, 
        json["subtypeDescription"],
        json["dc:title"], 
        json["prism:doi"], 
        date,
        json["dc:creator"],
        json["prism:pageRange"],
        this.getNumPagesScopus(json["prism:pageRange"]),
        "?",
        json["prism:publicationName"],
        "?",
        "?");
      this.update(paper);
    }
  }

  private getNumPagesScopus(pages): string {
    try {
      return (pages[1] - pages[0]).toString();
    } catch (error) {
      return "?";
    }
  }

  private convertResultToDOM(result): any {
    return new DOMParser().parseFromString(result, "text/html");
  }
}
