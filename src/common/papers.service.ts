import { Injectable } from '@angular/core';

import { Paper } from 'src/libraries/paper.service';

@Injectable({
  providedIn: 'root'
})
export class PapersService {

  public papers: Paper[] = [];

  constructor() { }
  
  public update(paper){
    this.papers.push(paper);
  }

  public SpringerReader(result) {
    let paperList = result.split("\n");
    for (let i = 1; i < paperList.length; i++) {
      var row = paperList[i].split(`","`);
      var paper = new Paper("Springer", "", row[0], row[5], row[7]);
      if (paper != null && paper != undefined)
        this.update(paper);
    }
  }

  public ScienceDirectReader(result) {
    var doc = new DOMParser().parseFromString(result, "text/html");
    var paperList = doc.getElementsByClassName("ResultItem col-xs-24 push-m");
    for(let i = 0; i < paperList.length; i++){
      var row = paperList[i];
      let type =  (<HTMLElement>row.getElementsByClassName("article-type u-clr-grey8")[0]).innerText;
      let title = (<HTMLElement>row.getElementsByClassName("result-list-title-link u-font-serif text-s")[0]).innerText;
      let DOI = row.getAttribute("data-doi");
      let year = (<HTMLElement>row.getElementsByClassName("SubType hor")[0].children[2]).innerText;
      year = year.replace(",", "").substring(year.length - 6);
      var paper = new Paper("Science Direct", type, title, DOI, year);
      if (paper != null && paper != undefined)
        this.update(paper);
    }
  }

  public ACMReader(result){
    let paperList = result.split("\n");
    for (let i = 1; i < paperList.length; i++) {
      var row = paperList[i].split(`","`);
      var paper = new Paper("ACM DL", row[0], row[6], row[11], row[18]);
      if (paper != null && paper != undefined)
        this.update(paper);
    }
  }
}
