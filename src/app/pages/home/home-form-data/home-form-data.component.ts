import { Component, OnInit } from '@angular/core';

import { Chart } from 'angular-highcharts';

import { Paper } from 'src/libraries/paper.service';
import { PapersService } from 'src/common/papers.service';
import { HomeFormResultComponent } from '../home-form-result/home-form-result.component';
import { SpringerService } from 'src/libraries/springer.service';
import { ScienceDirectService } from 'src/libraries/science-direct.service';
import { AcmdlService } from 'src/libraries/acmdl.service';
import { UtilService } from 'src/common/util.service';
import { ScopusService } from 'src/libraries/scopus.service';

@Component({
  selector: 'app-home-form-data',
  templateUrl: './home-form-data.component.html',
  styleUrls: ['./home-form-data.component.css']
})
export class HomeFormDataComponent implements OnInit {
//https://dl.acm.org/tab_abstract.cfm?id=3266250
  // private total: number = 0;

  // public yearChart;
  // chart = new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'Publications by year'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [
  //     {
  //       name: 'Publications',
  //       data: [1, 2, 3],
  //       type: "bar"
  //     }
  //   ]
  // });
  constructor(
    public _papers: PapersService,
    public _result: HomeFormResultComponent,
    private _springer: SpringerService,
    private _scienceDirect: ScienceDirectService,
    private _acmdl: AcmdlService,
    private _scopus: ScopusService,
    private _util: UtilService
  ) { }

  ngOnInit() {
  }

  ngDoCheck() { 
    
  }

  public update(): void {
    this.updateSources();
  }

  private updateSources(): void {
    this._scienceDirect.search();
    this._springer.search();
    this._acmdl.search();
    this._scopus.searchAllData();
  }

  public sumSummarySource(source: string): number {
    var total = 0;
    this._papers.papers.forEach(row => {
      if (row.source.startsWith(source))
        total++;
    });
    return total;
  }

  public percentSummarySource(source: string): string {
    var totalSource = this.sumSummarySource(source);
    var total = this.getTotal();
    var result = (totalSource / total * 100).toFixed(2) + "%";
    return (result == "NaN%" ? "-" : result);
  }


  /**2) */
  public sumSummaryType(type: string): number {
    var total = 0;
    this._papers.papers.forEach(row => {
      if (row.type == type)
        total++;
    });
    return total;
  }
  public percentSummaryType(type: string): string {
    var totalType = this.sumSummaryType(type);
    var total = this.getTotal();
    var result = (totalType / total * 100).toFixed(2) + "%";
    return (result == "NaN%" ? "-" : result);
  }

  /**3) */
  public sumRepeateds(): number {
    var total = 0;
    for (let i = 0; i < this._papers.papers.length; i++) {
      var title = this._papers.papers[i].title;
      for (let j = i + 1; j < this._papers.papers.length; j++) {
        var title2 = this._papers.papers[j].title;
        if (title == title2)
          total++;
      }      
    }
    return total;
  }

  /**Util */
  public getTotal(): number {
    return Number(this._papers.papers.length)
  }

  public download(): void {
    var csv = ["SOURCE;TYPE;DOI;YEAR;TITLE;AUTHORS;PAGES;NUM_PAGES;KEYWORDS;JOURNAL_EVENT_NAME;JOURNAL_EVENT_ACRONYM;LOCALIZATION"];
    this._papers.papers.forEach(paper => {
      var title = this._util.replaceAll(paper.title, ";", "");
      title = this._util.removeChars(title);
    
      let year = this._util.removeChars(paper.year);
      let DOI = this._util.removeChars(paper.DOI);
      let source = this._util.removeChars(paper.source);
      let type = this._util.removeChars(paper.type);
      let authors = this._util.removeChars(paper.authors);
      let pages = this._util.removeChars(paper.pages);
      let numPages = this._util.removeChars(paper.numPages);
      let keywords = this._util.removeChars(paper.keywords);
      let journalEventName = this._util.removeChars(paper.journalEventName);
      let journalEventAcronym = this._util.removeChars(paper.journalEventAcronym);
      let localization = this._util.removeChars(paper.localization);

      var row = `\n${source};${type};${DOI};${year};${title};${authors};${pages};${numPages};${keywords};${journalEventName};${journalEventAcronym};${localization}`;
      csv.push(row);
    });
    
    let csvContent = "data:text/csv;charset=utf-8," + csv;
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `re-SEacher (data summary).csv`);
    document.body.appendChild(link); // Required for FF

    link.click();
  }
}
