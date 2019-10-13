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

  public SpringerReader(result){
    let paperList = result.split("\n");
    for (let i = 1; i < paperList.length; i++) {
      var row = paperList[i].split(`","`);
      var paper = new Paper("Springer", "", row[0], row[5], row[7]);
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
