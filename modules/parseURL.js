function parseURL(urlString, ltiParams) {
    console.log(urlString, ltiParams);
    var fname = ltiParams.lis_person_name_given
    var lname = ltiParams.lis_person_name_family
    var email = ltiParams.lis_person_contact_email_primary
    var fullName = ltiParams.lis_person_name_full
    var username = ltiParams.custom_canvas_user_login_id;
    
    var element = urlString.split('{')[1].split('}')[0];
    var newElement;
    
    if (element == 'fname') {
        newElement = fname;
    } else if (element == 'lname') {
        newElement = lname;
    } else if (element == 'email') {
        newElement = email;
    } else if (element == 'fullName') {
        newElement = fullName;
    } else if (element == 'username') {
        newElement = username;
    } else {
        console.error('Element not recognized');
    }
    
    var newUrl = urlString.replace(element, newElement);
    
    return newUrl;
}

module.exports = parseURL;
