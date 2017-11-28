/* eslint-env node */
var express = require('express');
var router = express.Router();
var templates = "<p class='error'>There was an error loading the templates<?p>";
var canvas = require('../modules/canvasApi');
var generation = require('../modules/generation');
var ejs = require('ejs');
var fs = require('fs');

require.extensions['.ejs'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var activityTemplates = require('../views/templates.ejs')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/* Handle LTI launch */
router.post('/', function (req, res, next) {
  var ltiParams = req.session.lti.params
  var courseClass = ltiParams.context_label.toLowerCase().replace(" ", "") //PSYCH 342T
  var courseNumber = (ltiParams.content_item_return_url).split('/')[4];
  console.log(ltiParams)
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

  res.render('selectFeature', {
    contentItems: JSON.stringify(content_items),
    returnUrl: req.session.lti.params.content_item_return_url,
    courseNumber: courseNumber,
    courseClass: courseClass,
    templates: ejs.render(activityTemplates, {courseClass: courseClass})
  })
})

router.get('/templates', function (req, res, next) {
  if (!req.session.lti || process.env.IsHeroku) {
    res.status(400).send({
      error: "Canvas Authentication currently disabled"
    })
  } else {
    var ltiParams = req.session.lti.params
    var courseNumber = (ltiParams.content_item_return_url).split('/')[4];

    canvas.getTemplateFolderId(courseNumber).then(canvas.getFilesByFolder).then(function (response) {
      res.json({
        templates: response
      })
    })
  }
})

router.get('/home_page', function(req, res, next){
  if(!req.session.lti || process.env.IsHeroku) {
    res.status(400).send({
      error: "Canvas Authentication currently disabled"
    })
  } else {
    var ltiParams = req.session.lti.params;
    var courseName = ltiParams.context_title;
    var courseNumber = (ltiParams.content_item_return_url).split('/')[4];
    var courseClass = ltiParams.context_label.toLowerCase().replace(" ", "") //PSYCH 342T
    canvas.getModules(courseNumber).then(generation.renderHomePage.bind(null, courseName, courseNumber, courseClass)).then(function(response){
      res.json({
        homePage: response
      })
    })
  }
})

router.get('/preview', function (req, res, next) {
  var url = req.query.url;
  canvas.getFile(url).then(function (file) {
    res.send(file)
  })
})

module.exports = router;
