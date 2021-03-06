import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SchemaMatching } from 'src/app/classes/schema-matching';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-global-table',
  templateUrl: './global-table.component.html',
  styleUrls: ['./global-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class GlobalTableComponent implements OnInit {
  @Input() googleNews;
  @Input() guardian;
  @Input() newYorkTimes;
  shemaMatching: SchemaMatching = new SchemaMatching();
  tableData = new Array();
  dataSource: any;

  columnsToDisplay  = ['article_id', 'article_title', 'article_source', 'article_published_date'];
  // columnsToDisplay = [
  //   {name: 'Id', value: 'article_id'},
  //   {name: 'Title', value: 'article_title'},
  //   {name: 'Source', value: 'article_source'},
  //   {name: 'Published', value: 'article_published_date'}
  // ];
  expandedArticle: any | null;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

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
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
    console.log(this.tableData);
  }

}
