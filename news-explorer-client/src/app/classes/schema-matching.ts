import { share } from 'rxjs/operators';

export class SchemaMatching {
  autoIncrement: number = 1;

  globalSchema = {
    article_id: null,
    article_local_id: null,
    article_section_name: null,
    article_published_date: null,
    article_title: null,
    article_source: null,
    article_web_url: null,
    article_author_name: null
  };

  filterGuardian = [
    {global: 'article_id', local: 'article_id'},
    {global: 'article_local_id', local: 'id'},
    {global: 'article_section_name', local: 'sectionName'},
    {global: 'article_published_date', local: 'webPublicationDate'},
    {global: 'article_source', local: 'article_source'},
    {global: 'article_title', local: 'webTitle'},
    {global: 'article_web_url', local: 'webUrl'},
    {global: 'article_author_name', local: 'webTitle'} // Need to find author name in webTitle
  ];

  filterNewYorkTimes = [
    {global: 'article_id', local: 'article_id'},
    {global: 'article_local_id', local: '_id'},
    {global: 'article_section_name', local: 'section_name'},
    {global: 'article_published_date', local: 'pub_date'},
    {global: 'article_source', local: 'source'},
    {global: 'article_title', local: 'headline'},
    {global: 'article_web_url', local: 'web_url'},
    {global: 'article_author_name', local: 'byline'} // byline.original remove by
  ];

  filterGoogle = [
    {global: 'article_id', local: 'article_id'},
    {global: 'article_local_id', local: null}, // doesn't have an id on local schema
    {global: 'article_section_name', local: null},
    {global: 'article_published_date', local: 'publishedAt'},
    {global: 'article_source', local: 'source'}, // source.name
    {global: 'article_title', local: 'title'},
    {global: 'article_web_url', local: 'url'},
    {global: 'article_author_name', local: 'author'}
  ];

  constructor() {

  }

  schemaMappingGoogle(googleNews: Array<any>) {
    const news = googleNews.map((currentValue, index, obj) => {
      return {
        article_id: this.autoIncrement++,
        article_local_id: null,
        article_section_name: null,
        article_published_date: new Date(currentValue.publishedAt),
        article_title: currentValue.title,
        article_source: currentValue.source.name,
        article_web_url: currentValue.url,
        article_author_name: currentValue.author
      };
    });

    return news;
  }

  schemaMappingNewYorkTimes(newYorkTimes: Array<any>) {
    const news = newYorkTimes.map((currentValue, index, obj) => {
      return {
        article_id: this.autoIncrement++,
        article_local_id: currentValue._id,
        article_section_name: currentValue.section_name,
        article_published_date: new Date(currentValue.pub_date),
        article_title: currentValue.headline,
        article_source: currentValue.source,
        article_web_url: currentValue.web_url,
        article_author_name: currentValue.byline.original
      };
    });

    return news;
  }

  schemaMappingGuardian(guardian: Array<any>) {
    const news = guardian.map((currentValue, index, obj) => {
      const regex = /(\|\s\w+\s\w+)/gm;
      const str = currentValue.webTitle;
      let result = '';
      let m;
      m = regex.exec(str);

      if (m !== null) {
        m = m[0].split(" ");
        result = `${m[1]} ${m[2]}`;
      } else {
        result = null;
      }

      return {
        article_id: this.autoIncrement++,
        article_local_id: currentValue.id,
        article_section_name: currentValue.sectionName,
        article_published_date: new Date(currentValue.webPublicationDate),
        article_title: currentValue.webTitle,
        article_source: currentValue.article_source,
        article_web_url: currentValue.webUrl,
        article_author_name: result
      };
    });

    return news;
  }
}
