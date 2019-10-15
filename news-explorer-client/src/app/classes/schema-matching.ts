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
    let temp = new Array(googleNews.length);

    return googleNews.map((currentValue, index, obj) => {
      let schema = this.globalSchema;
      // Setting values
      schema.article_id = index;
      schema.article_local_id  = index;
      schema.article_published_date = new Date(currentValue.publishedAt);
      schema.article_source = currentValue.source.name;
      schema.article_title = currentValue.title;
      schema.article_web_url = currentValue.url;
      schema.article_author_name = currentValue.author;
      //this.autoIncrement++;
    });
  }

  schemaMappingNewYorkTimes(newYorkTimes: Array<any>) {
    return newYorkTimes.map((currentValue, index, obj) => {
      let schema = this.globalSchema;
      console.log(currentValue);

      schema.article_id = this.autoIncrement;
      schema.article_local_id = currentValue._id;

      this.autoIncrement++;
      return schema;
    });
  }
}
