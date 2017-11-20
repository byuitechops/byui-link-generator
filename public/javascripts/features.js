/*eslint-env browser, jquery*/
/*global contentItems courseNumber*/

function respond(featureName) {
  contentItems['@graph'][0].text = $('#' + featureName + "Out").html().toString().trim();
  $('#contentItems').val(JSON.stringify(contentItems))
  document.getElementById('editor_button').submit()
}

// Button generator
function updateButton() {
  var text = $('#button input:nth-of-type(1)').val() || 'Button Text'
  var href = $('#button input:nth-of-type(2)').val()
  if ($('#button input:checkbox').is(':checked')) {
    $('#buttonOut a').addClass("Button--primary")
  } else {
    $('#buttonOut a').removeClass("Button--primary")
  }
  $('#buttonOut a').text(text)
  $('#buttonOut a').attr("href", href)
}

$('#button input:checkbox').change(updateButton)


// Change pages
function changeFocus(id) {
  if (!$("#" + id).hasClass('visible')) {
    $('.page').toggleClass('visible')
    if (id === 'pageTwo' && $.trim($('#templates').html()) === "") {
      loadTemplates();
    }
  }
}

// Accordion generator
function updateAccordion() {
  var heading = $('#accordion input').val();
  var content = $('#accordion textarea').val();
  $('.accordion h3').text(heading);
  $('.accordion div').html(content);
}

//init templates
function loadTemplates() {
  $('#templateOut').html('<h4>Loading Templates...</h4>')
  if ($.trim($('#templates').html()) === '') {
    $.get('/templates').done(function (response) {
      if (response.templates.errors) {
        $('#templateOut').html('<h4>No template files found</h4>')
      } else {
        response.templates.forEach(function (template) {
          var out = '<a href="#" onclick="preview(' + "'" + template.url + "'" + ')" class="Button margin">' + template.display_name + '</a>'
          $('#templates').append(out)
        })
        $('#templateOut').html('<h4>Select a template to the Left</h4>')
      }
    }).fail(function () {
      $('#templateOut').html('<h4>Templating currently not supported on prod</h4>')
    })
  }
}

// Preview templates
function preview(url) {
  $.get("/preview?url=" + encodeURIComponent(url)).done(function (response) {
    if (response != "") {
      $('#templateOut').html(response)
      $('#submitTemplate').removeAttr('disabled')
    }
  })
}

//  Activity Banner Builder
var selected = document.getElementById("activitySelected"),
  category = document.getElementById("activityCategory"),
  bannerDiv = document.getElementById("bannerOut")

function changeBanner(e) {
  var classNames = selected.value,
    bannerText = selected.options[selected.selectedIndex].label,
    h1Code

  if (bannerText === "Other") {
    category.style.display = "inline";
    bannerText = "Activity Name";
    classNames = category.value + " other";
  } else {
    category.style.display = "none";
    var heading = category.value.split(' ')[0];
    var newHeading = heading.charAt(0).toUpperCase() + heading.substr(1);
    bannerText = newHeading + " - " + bannerText;
  }
  h1Code = '<h2 class="activityBanner ' + classNames.split(' ')[1] + '">' + bannerText + '</h2>';
  bannerDiv.innerHTML = h1Code;
}

selected.onchange = changeBanner;
category.onchange = changeBanner;

//  Accordion init
$(document).ready(function () {
  $('div.accordion').accordion({
    heightStyle: 'content',
    collapsible: true,
    active: false
  });

  if (document.querySelector('.byui-custom') !== null) {
    document.querySelector('.byui-custom').insertAdjacentHTML('beforeend', '<link type="text/css" rel="stylesheet" href="https://byui.instructure.com/courses/' + courseNumber + '/file_contents/course%20files/Web%20Files/course-min.css" >')
  }
});

//Activity Template Selector
$('#selectTemplate').on("change", function () {
  $('#orgTemplateOut').html($('#template_' + this.value).html())
})
