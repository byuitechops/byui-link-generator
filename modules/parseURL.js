function parseURL(urlString, ltiParams) {
    console.log(urlString, ltiParams);
    var fname = ltiParams.lis_person_name_given
    var lname = ltiParams.lis_person_name_family
    var email = ltiParams.lis_person_contact_email_primary
    var fullName = ltiParams.lis_person_name_full
    var username = ltiParams.custom_canvas_user_login_id;
}

module.exports = parseURL;
