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
  domainOperators: Array<string> = new Array<string>();
  generalOperators: Array<string> = new Array<string>();

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
  

  /**
   * Load and config string 
   */
  public getStringFormatted(): void {
    this.baseString = ``;
    if (this._form.generalTerms.length > 0 && this._form.domainTerms.length > 0)
      this.baseString = `(${this.getGeneralTerms()}) AND (${this.getDomainsTerm()})`;
    
    else if (this._form.generalTerms.length > 0 && this._form.domainTerms.length <= 0)
      this.baseString = `(${this.getGeneralTerms()})`;

    else if (this._form.generalTerms.length <= 0 && this._form.domainTerms.length > 0)
      this.baseString = `(${this.getDomainsTerm()})`;

    this.replaceAll();
  }

  private getGeneralTerms(): string {
    let string = ``;
    for (let i = 0; i < this._form.generalTerms.length; i++) {
      let term = this.getTerm(this._form.generalTerms[i]);
      let operator = this.getOperator(this.generalOperators[i]);
      let isLast = this._form.generalTerms.length === i + 1;
      string += `${term}`;      
      if (isLast === false) {
        string += ` ${operator} `;
        this.generalOperators[i] = operator;
      }
    }
    return string;
  }

  private getDomainsTerm(): string {
    let string = ``;
    for (let i = 0; i < this._form.domainTerms.length; i++) {
      let term = this.getTerm(this._form.domainTerms[i]);
      let operator = this.getOperator(this.domainOperators[i]);
      let isLast = this._form.domainTerms.length === i + 1;
      string += `${term}`;      
      if (isLast === false) {
        string += ` ${operator} `;
        this.domainOperators[i] = operator;
      }
    }
    return string;
  }
  
  private getOperator(operator): string {
    if (operator === undefined)
      return "OR";
    if (operator.indexOf("AND") == 0)
      return ") AND (";
    return operator;
  }

  private getTerm(term): string {
    if (term.trim().indexOf(" ") >= 0)
      return `"${term}"`;
    return term;    
  }

  /**
   * Update operators
   */
  
  public updateGeneralOperator(index: number, operator: string): void {
    this.generalOperators[index] = operator;
    this.getStringFormatted();
    this._form.updateBaseString(this.baseString);
  }

  public updateDomainOperator(index: number, operator: string): void {
    this.domainOperators[index] = operator;
    this.getStringFormatted();
    this._form.updateBaseString(this.baseString);
  }

  /**
   * Util methods
   */
  public isLastGeneralTerm(index: number): boolean {
    return (index + 1) !== this._form.generalTerms.length;
  }

  public isLastDomainTerm(index: number): boolean {
    return (index + 1) !== this._form.domainTerms.length;
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

  private replaceAll() {
    this.baseString = this.baseString.split(" )").join(")");
    this.baseString = this.baseString.split("( ").join("(");
};
}
