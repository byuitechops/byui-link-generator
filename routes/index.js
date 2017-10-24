var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body)
  console.log(req.session)
  var settings = {
    lti_message_type: "ContentItemSelection",
    lti_version: req.session.lti.params.lti_version,
    content_items: {
      "@context": "http://purl.imsglobal.org/ctx/lti/v1/ContentItem",
      "@graph": [{
        "@type": "ContentItem",
        "text": "",
        "mediaType": "text/html",
        "placementAdvice": {
          "presentationDocumentTarget": "embed"
        }
      }]
    }
  }

  res.render('selectFeature', {
    settings: JSON.stringify(settings),
    returnUrl: req.session.lti.params.content_item_return_url
  })
})

module.exports = router;
