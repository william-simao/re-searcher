import { Injectable } from '@angular/core';

import { HomeFormComponent } from 'src/app/pages/home/home-form/home-form.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }

  public removeBaseParenthesis(baseString): string {
    let base = this.replaceAll(baseString, '(', '');
    base = this.replaceAll(base, ')', '');
    return base;
  }

  public replaceAll(text: string, oldChar: string, newChar: string): string {
    return text.split(oldChar).join(newChar);
  }

  public removeChars(text: string): string {
    var newText = "";
    try {     
      newText = text.split("#").join("");
      newText = newText.split("&").join("e"); 
    } catch (error) {
      
    }
    return newText;
  }

  public GetYearsFromPapers(papers): any {
    let years = [];
    papers.forEach(paper => {
      if (years.find(f => f == paper.year) == undefined)
        years.push(new Number(paper.year));
    });
    return years.sort();
  }

  public GetOccurrencesYear(years, papers): any {
    let data = [];
    years.forEach(year => {      
      data.push(papers.filter(paper => paper.year == year.toString()).length);
    });
    return data;
  }
}
