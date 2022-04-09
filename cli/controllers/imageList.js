const axios = require("axios");

module.exports = {
  imageList: (email) => {
    axios
      .post(
        "http://ec2-52-78-182-60.ap-northeast-2.compute.amazonaws.com/imageurl",
        {
          email: email,
        }
      )
      .then((data) => {
        console.log(data.data);
        console.log(`image: ${data.data.length}`);
      });
  },
};
