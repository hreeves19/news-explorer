import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-global-table',
  templateUrl: './global-table.component.html',
  styleUrls: ['./global-table.component.scss']
})
export class GlobalTableComponent implements OnInit {
  @Input() googleNews;
  @Input() guardian;
  @Input() newYorkTimes;
  constructor() {
  }

  ngOnInit() {
    console.log(this.googleNews);
    console.log(this.guardian);
    console.log(this.newYorkTimes);
  }

}
