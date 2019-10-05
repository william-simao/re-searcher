import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HomeFormComponent } from '../home-form/home-form.component';

@Component({
  selector: 'app-home-form-add',
  templateUrl: './home-form-add.component.html',
  styleUrls: ['./home-form-add.component.css']
})
export class HomeFormAddComponent implements OnInit {
  
  public form: FormGroup = new FormGroup({
    term: new FormControl(''),
    category: new FormControl('')
  });
  public generals: Array<string> = new Array<string>();
  public domains: Array<string> = new Array<string>();

  constructor(
    private _snackBar: MatSnackBar,
    private _form: HomeFormComponent
  ) { }

  ngOnInit() {
    this.domains.push('crowdsourcing');
    this.domains.push('crowd sourcing');
    this.domains.push('crowd');
    this.domains.push('crowdsourced');
    this._form.updateTerms(this.generals, this.domains);
  }

  public addNewTerm(){
    let newTerm = this.form.controls.term.value;
    let newCategory = this.form.controls.category.value;
    if (this.checkTerm(newTerm, newCategory)) {
      this.addNewCategoryTerm(newTerm, newCategory);
      this.form.controls.term.setValue('');
    }
    this._form.updateTerms(this.generals, this.domains);
  }

  public addNewCategoryTerm(term: string, category: string): void {
    if (category === 'General')
      this.generals.push(term);
    else
      this.domains.push(term);
  }
  
  public removeGeneralTerm(term: string): void{
    var index = this.generals.indexOf(term);
    if (index > -1) {
      this.generals.splice(index, 1);
      this.showMessage('The term was removed');
    }
    this._form.updateTerms(this.generals, this.domains);
  }

  public removeDomainTerm(term: string): void{
    var index = this.domains.indexOf(term);
    if (index > -1) {
      this.domains.splice(index, 1);
      this.showMessage('The term was removed');
    }
    this._form.updateTerms(this.generals, this.domains);
  }

  public getTerms(): Array<string>{
    return this.domains;
  }

  //terms section
  private checkTerm(newTerm: string, newCategory: string): boolean {
    if (this.checkIsValid(newTerm)) {
      this.showMessage('The term is invalid');
      return false;
    }

    if (this.checkNewTerm(newTerm, newCategory)) {
      this.showMessage('The term has already been added');
      return false;
    }    

    return true;
  }

  private checkIsValid(newTerm: string): boolean {
    return newTerm.trim() === '' || newTerm === '' || newTerm === null || newTerm === undefined;
  }

  private checkNewTerm(newTerm: string, newCategory: string): boolean {
    if (newCategory === 'General')
      return this.generals.indexOf(newTerm) > -1;
    return this.domains.indexOf(newTerm) > -1;
  }

  //util section
  private showMessage(message: string): void {
    this._snackBar.open(message, 'Ok!', {
      duration: 2000,
    }); 
  }
}
