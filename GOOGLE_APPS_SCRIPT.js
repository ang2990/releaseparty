/**
 * GOOGLE APPS SCRIPT FOR RELEASE PARTY JOIN FORM
 * 
 * 1. Create a Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete any code there and paste this block.
 * 4. Click 'Deploy' > 'New Deployment'.
 * 5. Select type 'Web App'.
 * 6. Set 'Who has access' to 'Anyone'.
 * 7. Deploy and copy the provided URL.
 * 8. Paste that URL into src/routes/join/+page.server.ts
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    
    // Parse JSON payload
    var data = JSON.parse(e.postData.contents);
    
    // Append row: Timestamp, Role, Name, Email, Link, Streams
    sheet.appendRow([
      data.timestamp,
      data.role,
      data.name,
      data.email,
      data.link,
      data.streams
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": err.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Release Party API Active.");
}
