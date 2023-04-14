const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '690053929167-9m5irr1jpjrp2lgk2uauo06l28ir4pt2.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04K_veZsoM3kWCgYIARAAGAQSNwF-L9IrNEVl3ruHLZlGlbquPyP3eh5iTNC0PcTGKkICBwmQjkIHlaVsvc9kGKNJxoGQ_AxF22s';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

const filePath = path.join(__dirname, 'reactimage.png');

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: 'reactimage.png', //This can be name of your choice
        mimeType: 'image/png',
      },
      media: {
        mimeType: 'image/png',
        body: fs.createReadStream(filePath),
      },
    });
    alert("File uploaded successfully !");
    console.log(response.data);
  } catch (error) {
    alert("File was not uploaded successfully...");
    console.log(error.message);
  }
}
uploadFile();

// async function deleteFile() {
//   try {
//     const response = await drive.files.delete({
//       fileId: 'YOUR FILE ID',
//     });
//     console.log(response.data, response.status);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// deleteFile();

// async function generatePublicUrl() {
//   try {
//     const fileId = 'YOUR FILE ID';
//     await drive.permissions.create({
//       fileId: fileId,
//       requestBody: {
//         role: 'reader',
//         type: 'anyone',
//       },
//     });

    /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
//     const result = await drive.files.get({
//       fileId: fileId,
//       fields: 'webViewLink, webContentLink',
//     });
//     console.log(result.data);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// generatePublicUrl();