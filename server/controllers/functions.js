const AWS = require("aws-sdk");
AWS.config.loadFromPath("./awsconfig.json");
const s3 = new AWS.S3();

function test1(str) {
  return str.replace(/_[a-z]/g, (match) => {
    return match[1].toUpperCase();
  });
}
module.exports = {
  snakeToCamal: function snakeToCamal(obj) {
    if (typeof obj !== "object") return test1(obj);
    if (Array.isArray(obj)) {
      if (obj[0] !== Object) return obj;
      return obj.map((el) => {
        return snakeToCamal(el);
      });
    } else {
      if (obj === null) return null;
      const a = Object.entries(obj);
      if (!a.length) {
        return obj;
      }
      return a.reduce((acc, cur) => {
        let b;
        if (typeof cur[1] === "object") {
          b = snakeToCamal(cur[1]);
        } else {
          b = cur[1];
        }

        return Object.assign(acc, { [test1(cur[0])]: b });
      }, {});
    }
  },
  DeleteImageinTable: (image) => {
    const imageArr = image.split("/");
    const imageKey = imageArr[imageArr.length - 1];
    const params = {
      Bucket: "haveit",
      Key: imageKey,
    };
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log();
    });
  },
  DBERROR: (res, err) => {
    res.status(500).json({ message: `Error occured in database: ${err}` });
  },
};
