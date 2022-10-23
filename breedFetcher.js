const request = require("request");
const apiRequestURL = "https://api.thecatapi.com/v1/breeds/search?q=";

const callback = (err, desc) => {
  if (err) {
    throw Error(err);
  } else {
    return console.log(desc);
  }
};

//main request logic
const fetchBreedDescription = (breedName, cb) => {
  console.log('string');
  if (!breedName) {
    return console.log('Please provide breed name');
  }

  //make request
  request(apiRequestURL + breedName, function(error, response, body) {
  
    let desc = null;
    let err = error;
    if (error) {
      cb(err, desc);
    }

    //parse JSON string to object
    const data = JSON.parse(body);
    //check if it is empty
    if (data.length === 0) {
      err = "cat breed not found";
      cb(err, desc);
      return;
    }

    //get the description
    desc = data[0].description;

    //call callback:
    cb(err, desc);
  });
};

fetchBreedDescription('Siberian', callback);

module.exports = { fetchBreedDescription };
