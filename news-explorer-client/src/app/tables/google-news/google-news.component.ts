import { Component, OnInit } from '@angular/core';
import { GoogleNewsService } from 'src/app/services/google-news.service';

@Component({
  selector: 'app-google-news',
  templateUrl: './google-news.component.html',
  styleUrls: ['./google-news.component.scss']
})
export class GoogleNewsComponent implements OnInit {

  googleNews: any;
  displayColumnsGoogle: string[] = ['Source', 'Title', 'Description', 'Published At', 'View'];
  isGoogleLoaded: boolean = false;

  constructor(
    private googleNewsService: GoogleNewsService
  ) { }

  ngOnInit() {
    this.getHeadlines();
  }

  getHeadlines() {
    this.googleNewsService.getAllHeadlines().subscribe(
      (result) => {
        this.googleNews = result;
        console.log(this.googleNews.articles);
        this.isGoogleLoaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
