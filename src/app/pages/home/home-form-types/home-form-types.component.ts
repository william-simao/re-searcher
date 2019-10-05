import { Component, OnInit } from '@angular/core';
import { HomeFormComponent } from '../home-form/home-form.component';

@Component({
  selector: 'app-home-form-types',
  templateUrl: './home-form-types.component.html',
  styleUrls: ['./home-form-types.component.css']
})
export class HomeFormTypesComponent implements OnInit {

  constructor(
    public _form: HomeFormComponent
  ) { }

  ngOnInit() {
  }

  public go(isSecondary: boolean): void {
    this._form.updateIsSecondary(isSecondary);
    this._form.goStepperIndex(1);
  }

}
