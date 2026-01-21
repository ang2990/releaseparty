/**
 * UPDATED GOOGLE APPS SCRIPT FOR RELEASE PARTY (With Subscription Columns)
 * 
 * 1. Copy this code.
 * 2. Paste into your Google Apps Script editor.
 * 3. Deploy > New Deployment > Web App > Anyone.
 * 4. Copy the new URL and update your project if the URL changes (it might not if you just update).
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    
    // Order: Timestamp, Role, Name, Email, Link, Streams, Subscription, Monthly Amount
    // Ensure your Google Sheet has headers for these new columns!
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.role,
      data.name,
      data.email,
      data.link,
      data.streams,
      data.subscription || "",
      data.monthly_amount || ""
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
    
    if (rows.length < 2) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // We assume headers are in the first row. We map based on index to be safe.
    // 0: Timestamp, 1: Role, 2: Name, 3: Email, 4: Link, 5: Streams, 6: Subscription, 7: Monthly Amount
    var data = [];
    
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var obj = {
        "timestamp": row[0],
        "role": row[1],
        "name": row[2],
        "email": row[3],
        "link": row[4],
        "streams": row[5],
        "subscription": row[6],
        "monthly_amount": row[7]
      };
      data.push(obj);
    }
    
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
