import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const jwt = new JWT({
  email: process.env.client_email,
  key: process.env.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const doc = new GoogleSpreadsheet(process.env.sheet_id || '', jwt);
