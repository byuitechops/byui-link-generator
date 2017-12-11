    $('#link').change(function(){
      var root = "https://byui.instructure.com/courses/142/external_content/success/external_tool_dialog?return_type=lti_launch_url&url=https%3A%2F%2Flocalhost%3A1810%2Freturn%2F%3Furl="
      var url = escape($('#link').val())
      $('#return').attr("href", root + encodeURIComponent(url))
    })