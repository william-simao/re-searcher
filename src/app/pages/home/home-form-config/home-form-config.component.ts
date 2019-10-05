import { Component, OnInit, IterableDiffers, SimpleChanges, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { HomeFormComponent } from '../home-form/home-form.component';

@Component({
  selector: 'app-home-form-config',
  templateUrl: './home-form-config.component.html',
  styleUrls: ['./home-form-config.component.css']
})
export class HomeFormConfigComponent implements OnInit {
  baseString: string = '';
  operators: Array<string> = new Array<string>();

  private differ: IterableDiffers;

  constructor(
    private _snackBar: MatSnackBar,
    public _form: HomeFormComponent, 
    private _differs: IterableDiffers
  ) { this.differ = _differs; }

  ngDoCheck() {
    const changesGeneral = this.differ.find(this._form.generalTerms);
    const changesDomains = this.differ.find(this._form.domainTerms);
    if (changesGeneral || changesDomains) {
      this.getStringFormatted();
      this._form.updateBaseString(this.baseString);
    }
  }

  ngOnInit() {
  }

  public isLastTerm(index: number): boolean {
    return (index + 1) !== this._form.generalTerms.length;
  }

  public updateOperator(index: number, operator: string): void {
    this.operators[index] = operator;
  }

  public getStringFormatted(): void {
    this.baseString = ``;
    if (this._form.generalTerms.length > 0 && this._form.domainTerms.length > 0)
      this.baseString = `(${this.getGeneralTerms()}) AND (${this.getDomainsTerm()})`;
    
    else if (this._form.generalTerms.length > 0 && this._form.domainTerms.length <= 0)
      this.baseString = `(${this.getGeneralTerms()})`;

    else if (this._form.generalTerms.length <= 0 && this._form.domainTerms.length > 0)
      this.baseString = `(${this.getDomainsTerm()})`;
  }

  private getGeneralTerms(): string {
    let string = ``;
    for (let i = 0; i < this._form.generalTerms.length; i++) {
      let term = this._form.generalTerms[i];
      let isLast = this._form.generalTerms.length === i + 1;
      string += `${term}`;      
      if (isLast === false)
        string += ' OR ';
    }
    return string;
  }

  private getDomainsTerm(): string {
    let string = ``;
    for (let i = 0; i < this._form.domainTerms.length; i++) {
      let term = this._form.domainTerms[i];
      let isLast = this._form.domainTerms.length === i + 1;
      string += `${term}`;      
      if (isLast === false)
        string += ' OR ';
    }
    return string;
  }

  public copy(): void {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.baseString));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.showMessage();
  }

  private showMessage(): void {
    this._snackBar.open('The base string was copied', 'Ok!', {
      duration: 2000,
    }); 
  }
}
