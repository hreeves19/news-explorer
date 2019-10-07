import { GoogleNews } from '../interfaces/google-news';
import { GoogleNewsService } from '../services/google-news.service';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';

export class SearchNews {
  googleNews: GoogleNews;

  constructor(
    private googleNewsService: GoogleNewsService
  ) {
    this.googleNews = {
      q: null,
      qInTitle: null,
      sources: null,
      domains: null,
      excludeDomains: null,
      from: null,
      to: null,
      language: null,
      pageSize: null,
      page: null
    };
  }

  public getHeadlines() {
    this.googleNewsService.getAllHeadlines().pipe(take(1)).subscribe(
      (news) => {
        console.log(news);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public searchHeadlines(search: GoogleNews) {
    this.googleNewsService.searchHeadlines(search).pipe(take(1)).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public mapGoogleSearch(formData: any) {
    console.log(formData);
    console.log(this.googleNews);
  }
}
