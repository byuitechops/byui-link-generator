var ejs = require('ejs');

function renderHomePage(courseName, courseId, courseClass) {
  return new Promise(function (resolve, reject) {
    var homePageTemplate = require('../views/homePage.ejs')
    var homePage = ejs.render(homePageTemplate, {
      courseName: courseName,
      courseId: courseId,
      courseClass: courseClass
    })
    resolve(homePage)
  })
}

module.exports = {
  renderHomePage: renderHomePage
}