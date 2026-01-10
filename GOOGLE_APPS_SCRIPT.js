/**
 * UPDATED GOOGLE APPS SCRIPT FOR RELEASE PARTY
 * 
 * 1. Replace your existing Apps Script with this code.
 * 2. Click 'Deploy' > 'New Deployment' (ensure it's a new version).
 * 3. Ensure 'Who has access' is 'Anyone'.
 * 4. This script now handles both adding data (POST) and reading data (GET).
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    
    // Order: Timestamp, Role, Name, Email, Link, Streams
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.role,
      data.name,
      data.email,
      data.link,
      data.streams
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var rows = sheet.getDataRange().getValues();
    var headers = rows[0];
    var data = [];
    
    for (var i = 1; i < rows.length; i++) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        var key = headers[j].toString().toLowerCase();
        obj[key] = rows[i][j];
      }
      data.push(obj);
    }
    
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}