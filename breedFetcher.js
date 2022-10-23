

const request = require('request');
const apiRequestURL = 'https://api.thecatapi.com/v1/breeds/search?q=';

//main request logic
const fetchBreedDescription = (breedName, cb) => {
  if (breedName !== null) {
    return;
  }

  //make request
  request((apiRequestURL + breedName), function(error, response, body) {
    console.log(typeof body);

    //parse JSON string to object
    const data = JSON.parse(body);
    console.log(data);
    console.log(typeof data);
    let err = error;
    let desc = null;

    //check if it is empty
    if (data.length === 0) {
      err = 'cat breed not found';
      cb(err, desc);
      return;
    }

    //get the description
    desc = data[0].description;
    console.log(data[0].description);

    //call callback:
    cb(err, desc);
  });
};

module.exports = { fetchBreedDescription };