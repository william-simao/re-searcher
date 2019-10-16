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
    /*for (let i = 1; i < paperList.length; i++) {
      var row = paperList[i].split(`","`);
      var paper = new Paper("Springer", "", row[0], row[5], row[7]);
      if (paper != null && paper != undefined)
        this.update(paper);
    }*/
    this.result.push(new Result("Springer", "Title, Abstract, and Keyword", paperList.length - 1, url));
  }

  public ScienceDirectReader(result, url) {
    var doc = new DOMParser().parseFromString(result, "text/html");
    var paperList = doc.getElementsByClassName("ResultItem col-xs-24 push-m");
    /*for(let i = 0; i < paperList.length; i++){
      var row = paperList[i];
      let type =  (<HTMLElement>row.getElementsByClassName("article-type u-clr-grey8")[0]).innerText;
      let title = (<HTMLElement>row.getElementsByClassName("result-list-title-link u-font-serif text-s")[0]).innerText;
      let DOI = row.getAttribute("data-doi");
      let year = (<HTMLElement>row.getElementsByClassName("SubType hor")[0].children[2]).innerText;
      year = year.replace(",", "").substring(year.length - 6);
      var paper = new Paper("Science Direct", type, title, DOI, year);
      if (paper != null && paper != undefined)
        this.update(paper);
    }*/

    if (this.result.find(i => i.source == "Science Direct") == undefined) 
      this.result.push(new Result("Science Direct", "Title, Abstract, and Keyword", paperList.length - 1, url));
    else {
      for( var i = 0; i < this.result.length; i++){ 
        if ( this.result[i].source === "Science Direct") {
          this.result[i].total += paperList.length - 1;
        }
     }
    }
  }

  public ACMReader(result, type, url){
    let paperList = result.split("\n");
    /*for (let i = 1; i < paperList.length; i++) {
      var row = paperList[i].split(`","`);
      var paper = new Paper("ACM DL", row[0], row[6], row[11], row[18]);
      if (paper != null && paper != undefined)
        this.update(paper);
    }*/
    this.result.push(new Result("ACM DL", type.split(" ")[2], paperList.length - 1, url));
  }

  public ACMResult(result, type, url): void {
    var doc = this.convertResultToDOM(result);
    this.result.push(new Result("ACM DL", type.split(" ")[2], doc.getElementById("searchtots").innerText.split(" ")[0], url));
  }

  public SpringerResult(result, url): void {
    var doc = this.convertResultToDOM(result);
    this.result.push(new Result("Springer Link", "Title, Abstract, and Keywords", doc.getElementById("number-of-search-results-and-search-terms").innerText.split(" ")[0], url));
  }

  public ScienceDirectResult(result, url): void {
    var doc = this.convertResultToDOM(result);
    this.result.push(new Result("Science Direct", "Title, Abstract, and Keywords", doc.getElementsByClassName("search-body-results-text")[0].innerText.split(" ")[0], url));
  }

  private convertResultToDOM(result): any {
    return new DOMParser().parseFromString(result, "text/html");
  }
}
