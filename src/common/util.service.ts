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
}
