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
