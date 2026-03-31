'use server';

import { google } from 'googleapis';

const headers = [
    'Timestamp',
    'Purpose',
    'Name',
    'Email',
    'Phone',
    'Preferred Date and Time',
    'Subject',
    'Consent',
    'City',
    'Message',
    'Destination',
    'Tour Name',
    'Trip Type',
    'From (Flight)',
    'To (Flight)',
    'Departure Date',
    'Return Date',
    'Adults',
    'Children',
    'Infants',
    'Travel Class',
    'Pax (People)',
    'Ideal Travel Dates',
    'Visa Type',
    'Travel Date (Visa)',
    'Submission Location'
];

type SheetRowData = {
    [key in typeof headers[number]]?: string | boolean | undefined;
};

export async function appendToSheet(data: SheetRowData, tabName?: string) {
  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error('Google Sheets API credentials are not set in environment variables.');
    throw new Error('Server configuration error: Google Sheets credentials are not set.');
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });
    
    const now = new Date();
    const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const rowData: SheetRowData = {
      Timestamp: timestamp,
      ...data
    };

    const row = headers.map(header => {
      const value = rowData[header];
      if (typeof value === 'boolean') {
          return value ? 'Yes' : 'No';
      }
      return value === undefined || value === null ? '' : String(value);
    });
    
    const sheetName = tabName || process.env.GOOGLE_SHEET_TAB_NAME || 'Leads';
    
    // Ensure the sheet name is quoted to handle spaces
    const safeSheetName = `'${sheetName}'`;
    
    // First, try to get the first row to see if headers exist.
    try {
        const getHeader = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: `${safeSheetName}!A1:Z1`,
        });

        if (!getHeader.data.values || getHeader.data.values.length === 0) {
            await sheets.spreadsheets.values.update({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: `${safeSheetName}!A1`,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [headers],
                },
            });
        }
    } catch (e: any) {
        // If the sheet doesn't exist, this will throw. 
        // We provide a clearer error for the user.
        if (e.message?.includes('Unable to parse range')) {
            throw new Error(`The tab "${sheetName}" was not found in your spreadsheet. Please create it and try again.`);
        }
        throw e;
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${safeSheetName}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

  } catch (error: any) {
    console.error('Error writing to Google Sheets:', error);
    throw new Error(error.message || 'Failed to save to sheets.');
  }
}
