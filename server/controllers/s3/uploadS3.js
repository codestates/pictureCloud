module.exports = (req, res) => {
    const { email } = req.body;
    console.log("email", email);

    // const Img = req.file;
    // console.log("s3 이미지 경로 :", Img.location);
    // return res.status(201).send({
    //   data: Img.location,
    // });
};
