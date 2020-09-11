var express = require("express");
var router = express.Router();

var request = require("request");
var logger = require("morgan");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express Hello World App " });
});

router.post("/linkApiData", function (req, res, next) {
  const { xclientData, xAuthToken, storeHash, merchant } = req.body;

  request.get(
    {
      headers: {
        "X-Auth-Client": xclientData,
        "X-Auth-Token": xAuthToken,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      url: `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products`
    },
    function (error, response, body) {
      var jsonResponse = JSON.parse(body);

      if (jsonResponse.status === 401) {
        res.render("failure", {});
      } else {
        res.render("success", {
          merchant,
          storeHash
        });
      }
    }
  );
});

module.exports = router;
