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

/**
 * FIXED doGet to handle headers correctly
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var rows = sheet.getDataRange().getValues();
    
    // Check if we have data
    if (rows.length < 2) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // We assume the first row is always the headers
    var headers = ["timestamp", "role", "name", "email", "link", "streams"];
    var data = [];
    
    // If your sheet has different column orders, adjust the indices below
    // Current assumption based on doPost:
    // 0: Timestamp
    // 1: Role
    // 2: Name
    // 3: Email
    // 4: Link
    // 5: Streams
    
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var obj = {
        "timestamp": row[0],
        "role": row[1],
        "name": row[2],
        "email": row[3],
        "link": row[4],
        "streams": row[5]
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