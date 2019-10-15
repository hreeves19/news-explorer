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
  tableData = new Array();


  displayedColumns = ['article_id', 'article_title', 'article_source', 'article_published_date'];
  constructor() {
  }

  ngOnInit() {
    console.log(this.googleNews);
    console.log(this.guardian);
    console.log(this.newYorkTimes);
    // Do Schema Mapping for all datasource
    this.tableData = this.tableData.concat(this.shemaMatching.schemaMappingGoogle(this.googleNews.articles));
    this.tableData = this.tableData.concat(this.shemaMatching.schemaMappingNewYorkTimes(this.newYorkTimes.response.docs));
    this.tableData = this.tableData.concat(this.shemaMatching.schemaMappingGuardian(this.guardian.response.results));
    console.log(this.tableData);
  }

}
