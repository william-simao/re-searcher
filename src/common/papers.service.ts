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
}
