import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-config-keys',
  templateUrl: './config-keys.component.html',
  styleUrls: ['./config-keys.component.css']
})
export class ConfigKeysComponent implements OnInit {
  
  public form: FormGroup = new FormGroup({
    ieeeXplore: new FormControl(''),
    webOfScience: new FormControl(''),
    scopus: new FormControl('')
  });

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form.controls.ieeeXplore.setValue(localStorage.getItem("ieeeXplore"));
    this.form.controls.webOfScience.setValue(localStorage.getItem("webOfScience"));
    this.form.controls.scopus.setValue(localStorage.getItem("scopus"));
  }

  public saveKeys(): void {
    localStorage.setItem("ieeeXplore", this.form.value.ieeeXplore);
    localStorage.setItem("webOfScience", this.form.value.webOfScience);
    localStorage.setItem("scopus", this.form.value.scopus);

    this._snackBar.open("Save with success", "OK", {
      duration: 2000,
    });
  }
}
