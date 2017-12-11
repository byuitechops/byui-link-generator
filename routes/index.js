/* eslint-env node */
var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var fs = require('fs');

require.extensions['.ejs'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/* Handle LTI launch */
router.post('/', function (req, res, next) {
  var ltiParams = req.session.lti.params
  var username = ltiParams.custom_canvas_user_login_id;
  var content_items = {
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

  res.render('selectFeature')
})

/* Build URL with parameters */
router.post('/return', function (req, res, next) {
  console.log("PARAMS", req.query)
  var url = req.query.url
  var ltiParams = req.session.lti.params
  var fname = ltiParams.lis_person_name_given
  var lname = ltiParams.lis_person_name_family
  var email = ltiParams.lis_person_contact_email_primary
  var fullName = ltiParams.lis_person_name_full
  var username = ltiParams.custom_canvas_user_login_id;
  var content_items = {
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

  res.redirect(url)
})

module.exports = router;
