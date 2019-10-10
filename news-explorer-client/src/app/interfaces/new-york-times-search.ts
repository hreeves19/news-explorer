export interface NewYorkTimesSearch {

    begin_date: string; //matches ^\d{8}$; Begin date (e.g. 20120101)
    end_date: string;
    facet: string; // True or false; shows facet count
    facet_fields: string;
    facet_filter: string;
    f1: string;
    fq: string;
    page: number;// page number; integer between 0 <= value <= 100
    q: string;
    sort: string // Can either be: newest; oldest; relevance
}

// abstract: "Soliciting foreign interference sets a precedent. Here’s what that looks like."
// byline: {original: "By Alex Kingsbury", person: Array(1), organization: null}
// document_type: "article"
// headline: {main: "Donald Trump’s Invitation to the World", kicker: null, content_kicker: null, print_headline: "Donald Trump’s Invitation to the World", name: null, …}
// keywords: (5) [{…}, {…}, {…}, {…}, {…}]
// lead_paragraph: "Nations of the world, take heed."
// multimedia: (72) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// news_desk: "Editorial"
// print_page: "26"
// pub_date: "2019-10-04T10:08:16+0000"
// section_name: "Opinion"
// snippet: "Soliciting foreign interference sets a precedent. Here’s what that looks like."
// source: "The New York Times"
// type_of_material: "Op-Ed"
// uri: "nyt://article/84e7a531-986a-5293-b7a7-c343466738a0"
// web_url: "https://www.nytimes.com/2019/10/04/opinion/trump-china-ukraine-corruption.html"
// word_count: 795
// _id: "nyt://article/84e7a531-986a-5293-b7a7-c343466738a0"
