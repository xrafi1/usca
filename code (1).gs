function doGet(e) {
  if (e.parameter.action == 'getContact') {
    return getContactInfo();
  }
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  if (data.formType == 'join') {
    return handleJoinForm(data);
  }
  return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Invalid request' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getContactInfo() {
  var contacts = [
    { name: 'John Doe', role: 'President', email: 'john.doe@example.com', phone: '+911234567890' },
    { name: 'Jane Smith', role: 'Secretary', email: 'jane.smith@example.com', phone: '+919876543210' }
  ];
  return ContentService.createTextOutput(JSON.stringify({ success: true, contacts: contacts }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleJoinForm(formData) {
  var sheetName = 'JoinApplications';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(['Timestamp', 'Full Name', 'Email', 'Phone Number', 'College/University']);
  }

  sheet.appendRow([
    new Date(),
    formData.name,
    formData.email,
    formData.phone,
    formData.college
  ]);

  return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Application submitted successfully!' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function include(filename) {
  return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
}

