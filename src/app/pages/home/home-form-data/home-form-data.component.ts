import { Component, OnInit } from '@angular/core';
import { PapersService } from 'src/common/papers.service';

@Component({
  selector: 'app-home-form-data',
  templateUrl: './home-form-data.component.html',
  styleUrls: ['./home-form-data.component.css']
})
export class HomeFormDataComponent implements OnInit {

  constructor(
    public _papers: PapersService
  ) { }

  ngOnInit() {
  }

  public sumSummarySource(source: string): number {
    var total = 0;
    this._papers.result.forEach(row => {
      if (row.source.startsWith(source))
        total += row.total;
    });
    return total;
  }

  public percentSummarySource(source: string): string {
    var totalSource = this.sumSummarySource(source);
    var total = this.getTotal();
    return (total / totalSource).toFixed(2) + "%";
  }


  /**2) */
  public sumSummaryType(type: string): number {
    var total = 0;
    this._papers.result.forEach(row => {
      if (row.type == type)
        total += row.total;
    });
    return total;
  }
  public percentSummaryType(type: string): string {
    var totalType = this.sumSummaryType(type);
    var total = this.getTotal();
    return (total / totalType).toFixed(2) + "%";
  }

  /**Util */
  public getTotal(): number {
    var total = 0
    this._papers.result.forEach(row => {
      total += row.total;
    });
    return Number(total);
  }

}
