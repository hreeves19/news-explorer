export class SchemaMatching {
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
}
