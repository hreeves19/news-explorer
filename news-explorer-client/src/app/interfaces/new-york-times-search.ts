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
