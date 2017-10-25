var express = require('express');
var router = express.Router();
var request = require('request');
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
        "text": '',
        "mediaType": "text/html",
        "placementAdvice": {
          "presentationDocumentTarget": "embed"
        }
      }]
    }
  }

  res.render('selectFeature', {
    contentItems: JSON.stringify(settings.content_items),
    returnUrl: req.session.lti.params.content_item_return_url,
    courseNumber: (req.session.lti.params.content_item_return_url).split('/')[4]
  })
})

module.exports = router;
