const axios = require("axios");

module.exports = {
  imageList: (email) => {
    axios
      .post("http://localhost:4000/imageurl", {
        email: email,
      })
      .then((data) => {
        console.log(data.data);
        console.log(`image: ${data.data.length}`);
      });
  },
};
