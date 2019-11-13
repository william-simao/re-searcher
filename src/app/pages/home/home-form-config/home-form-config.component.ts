import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home-form-config',
  templateUrl: './home-form-config.component.html',
  styleUrls: ['./home-form-config.component.css']
})
export class HomeFormConfigComponent implements OnInit {
  baseString: string = '';

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }
  
  ngDoCheck() {
    this.baseString = localStorage.getItem("searchString");
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
