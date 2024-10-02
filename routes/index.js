var express = require('express');
var router = express.Router();
const axios = require("axios");


router.get('/', async function(req, res, next) {
  
  try {
    const { search = '' , lang = 'en' ,  country = 'us' ,  max = '10', page = 1 } = req.query ;
    
    const response = await axios.get('https://gnews.io/api/v4/search',{
        params: {
          q: search ,
          lang: lang ,
          country: country ,
          max: max,
          page : page , 
          apikey: process.env.GNEWS_API_KEY
},
      });
    res.json(response.data);

  } catch (error) {
    // console.log( "Error feching news" , error);
    // res.status(500).json({error : "Failed to fatch news from api"});
    if (error.response) {
      console.log("Error fetching news:", error.response.data);
      res.status(500).json({ error: error.response.data.message || "Failed to fetch news from API" });
    } else if (error.request) {
      console.log("No response received from API:", error.request);
      res.status(500).json({ error: "No response from API" });
    } else {
      console.log("Error setting up request:", error.message);
      res.status(500).json({ error: "Error setting up request to API" });
    }
  }
});

router.get('/top-headlines', async function(req, res, next) {
  
  try {
    const { category = 'general' , lang = 'en' ,  country = 'us' ,  max = '10' } = req.query ;
    
    const response = await axios.get('https://gnews.io/api/v4/top-headlines',{
        params: {
          category: category,
          lang: lang ,
          country: country ,
          max: max ,
          apikey: process.env.GNEWS_API_KEY
},
      });
    res.json(response.data);

  } catch (error) {
    if (error.response) {
      console.log("Error fetching news:", error.response.data);
      res.status(500).json({ error: error.response.data.message || "Failed to fetch news from API" });
    } else if (error.request) {
      console.log("No response received from API:", error.request);
      res.status(500).json({ error: "No response from API" });
    } else {
      console.log("Error setting up request:", error.message);
      res.status(500).json({ error: "Error setting up request to API" });
    }
  }
});

module.exports = router;
