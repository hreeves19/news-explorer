// https://open-platform.theguardian.com/documentation/search
export interface GuardianSearch {
  format: string; // json or xml
  q: string; // query user writes
  section: string;
  tag: string;
  lang: string; // Languages: en fr
  'star-rating': number;
  'order-by': string; // newest (default), oldest, relevance
  'to-date': string;
  'from-date': string;
}

// apiUrl: "https://content.guardianapis.com/us-news/2019/oct/04/should-trump-be-banned-from-twitter"
// id: "us-news/2019/oct/04/should-trump-be-banned-from-twitter"
// isHosted: false
// pillarId: "pillar/news"
// pillarName: "News"
// sectionId: "us-news"
// sectionName: "US news"
// type: "article"
// webPublicationDate: "2019-10-04T06:00:15Z"
// webTitle: "Should Trump be banned from Twitter? | Arwa Mahdawi"
// webUrl: "https://www.theguardian.com/us-news/2019/oct/04/should-trump-be-banned-from-twitter"
