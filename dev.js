var bootStrap = document.createElement('script');
bootStrap.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js';
document.body.appendChild(bootStrap);
var courseNumber = document.location.pathname.split('/')[2]

$(document).ready(function () {
  $('div.accordion').accordion({
    heightStyle: 'content',
    collapsible: true,
    active: false
  });
  $('#styleguide-tabs-demo-minimal').tabs()
  if (document.querySelector('.byui-custom') !== null) {
    document.querySelector('.byui-custom').insertAdjacentHTML('beforeend', '<link type="text/css" rel="stylesheet" href="https://byui.instructure.com/courses/' + courseNumber + '/file_contents/course%20files/Web%20Files/course-min.css" >')
  }
  
  if($('#navigation .steps').length !== 0){
    var start = $('#start')
    var instructor = $('#instructor')
    var syllabus = $('#syllabus')
    var resources = $('#resources')
    $.get("/api/v1/courses/" + courseNumber + "/modules", function(modules){
      var resourcesId;
      modules.forEach(function(module){
        if(module.name == "Student Resources"){
          resourcesId = module.id;
        }
      })
      start.prop('href', "/courses/" + courseNumber + "/modules#module_" + modules[0].id);
      syllabus.prop('href', "/courses/" + courseNumber + "/assignments/syllabus");
      resources.prop('href', "/courses/" + courseNumber + "/modules#module_" + resourcesId);
    })
    $.get("https://byui.instructure.com/api/v1/courses/773/enrollments", function(people){
      people.forEach(function(person){
        if(person.type === "TeacherEnrollment"){
          instructor.prop('href', "/courses/" + courseNumber + "/users/" + person.user_id)
        }
      })
    })
  }
});

var h5pScript = document.createElement('script');
h5pScript.setAttribute('charset', 'UTF-8');
h5pScript.setAttribute('src', 'https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js');
document.body.appendChild(h5pScript);

var videos = document.getElementsByClassName('byui-video')
for (var i = 0; i < videos.length; i++) {
  if (videos[i].dataset.source == 'youtube') {
    videos[i].innerHTML = '<iframe width="' + videos[i].dataset.width + 'px" height="' + videos[i].dataset.height + 'px" src="https://www.youtube.com/embed/' + videos[i].dataset.vidid + '" frameborder="0" allowfullscreen></iframe>';
  } else if (videos[i].dataset.source == 'kaltura') {
    videos[i].innerHTML = '<iframe width="' + videos[i].dataset.width + 'px" height="' + videos[i].dataset.height + 'px"  src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/29018071/partner_id/1157612?iframeembed=true&amp;playerId=kaltura_player_1485805514&amp;entry_id=' + videos[i].dataset.vidid + '&amp;flashvars[streamerType]=auto" frameborder="0" allowfullscreen></iframe>';
  }
}
