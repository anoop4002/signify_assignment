# signify_assignment

# Step to Run the project

1. Install all node modules using "npm install" command
2. Default port for running the server is 9000 which is configured in config.yml, you can change it to whatever port you like.
3. To run the server run command "npm start"
4. After running the above command, server will create a in-memory sqlite DB and insert all the records from "alexa.json"(renamed as review.json in the project).
5. Below are the list of API end points and the payload accepted by the api.
    a.  api name - "/api/review/search" POST (http://localhost:9000/api/review/search)
        api payload  - {
                            "review": {
                                "rating": [1,2,3], //for filtering reviews by rating - takes "array of numbers" or only "number"
                                "date": {
                                    "min": "2017-09-04T00:00:00.000Z",
                                    "max": "2018-02-24T00:00:00.000Z"
                                },                                          //for filtering reivews by date , takes any valid javascript "date format" and both min/max is not compulsory 
                                                                            either of them will also work
                                "review_source": ["iTunes"]                 //For filtering according to stopre type - takes "array of string" or only "string"
                            },
                            "pageSize": 100,                                //limit the result, should be greater than zero 
                            "page": 1,                                      //get the record according to page should b greater than zero
                            "source": ["reviewed_date","author","rating","review","product_name","review_source"],  // source array to get only the specified fields from the db.
                            "sort": {"fieldName": "reviewed_date","order": "desc"}                                  //field on which sort is required either asc or desc
                        }
    b.  api name - "/api/review/add" - PUT (http://localhost:9000/api/review/add)  //required all the field to add new review
        api payload -   {
                            "review": "Me and my kids love this app!! We play games and sing songs its great.",
                            "author": "Toni O'Brien",
                            "review_source": "GooglePlayStore",
                            "rating": 5,
                            "title": "",
                            "product_name": "Amazon Alexa",
                            "reviewed_date": "2017-10-09T00:00:00.000Z"
                        }
    c.  api name - "/api/review/monthly-avg" - GET  (http://localhost:9000/api/review/monthly-avg)

    d.  api name - "/api/review/total-rating-by-category - GET (http://localhost:9000/api/review/total-rating-by-category)

6. To call all the above APIs from third party tool, you need to set the headers for authentication. Two variable needs to be set
    1. username - admin
    2. password - admin
    
7. Test cases are written for all the success cases and not for any failure cases.
