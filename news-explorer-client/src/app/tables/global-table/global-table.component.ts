import { Component, OnInit, Input } from '@angular/core';
import { SchemaMatching } from 'src/app/classes/schema-matching';

@Component({
  selector: 'app-global-table',
  templateUrl: './global-table.component.html',
  styleUrls: ['./global-table.component.scss']
})
export class GlobalTableComponent implements OnInit {
  @Input() googleNews;
  @Input() guardian;
  @Input() newYorkTimes;
  shemaMatching: SchemaMatching = new SchemaMatching();

  displayColumns = ['ID', 'Title', 'Source', 'Published'];
  constructor() {
  }

  ngOnInit() {
    console.log(this.googleNews);
    console.log(this.guardian);
    console.log(this.newYorkTimes);
    // Do Schema Mapping for all datasource
    this.googleNews = this.shemaMatching.schemaMappingGoogle(this.googleNews.articles);
    //this.newYorkTimes = this.shemaMatching.schemaMappingNewYorkTimes(this.newYorkTimes.response.docs);
    console.log(this.googleNews);
    console.log(this.newYorkTimes);
  }

}
