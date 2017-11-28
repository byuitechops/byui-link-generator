var ejs = require('ejs');

function renderHomePage(courseName, courseId, modules) {
  return new Promise(function (resolve, reject) {
    var homePageTemplate = require('../views/homePage.ejs')
    var firstModuleId = modules[0].id;
    var resourcesId = modules[modules.length - 1].id;
    var homePage = ejs.render(homePageTemplate, {
      courseName: courseName,
      courseId: courseId,
      firstModuleId: firstModuleId,
      resourcesId: resourcesId
    })
    resolve(homePage)
  })
}

module.exports = {
  renderHomePage: renderHomePage
}