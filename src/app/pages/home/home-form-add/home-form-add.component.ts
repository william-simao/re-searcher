import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { HomeFormComponent } from '../home-form/home-form.component';

@Component({
  selector: 'app-home-form-add',
  templateUrl: './home-form-add.component.html',
  styleUrls: ['./home-form-add.component.css']
})
export class HomeFormAddComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    searchString: new FormControl('')
  });

  constructor(
    public _form: HomeFormComponent
  ) { }

  ngOnInit() {
  }

  ngDoCheck() {
    var isInvalid = this.checkQuotationMark() || this.checkParentheses();
    localStorage.setItem("searchString", this.form.controls.searchString.value);
    localStorage.setItem("isInvalidSearchString", `${isInvalid}`);
  }


  public checkQuotationMark(): boolean {    
    let occurrences = this.checkOccurrences(`"`);
    return (occurrences % 2 !== 0);
  }

  public checkParentheses(): boolean {
    let occurrencesOpen = this.checkOccurrences(`(`);
    let occurrencesClose = this.checkOccurrences(`)`);
    return (occurrencesClose !== occurrencesOpen);
  }

  private checkOccurrences(char): number {
    let searchString = this.form.controls.searchString.value;
    return searchString.split(char).length - 1;
  }
}
