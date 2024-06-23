'use server'

import { doc } from '../services/google-spreadsheet';

export default async function logInput(value: string) {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({ date: new Date(Date.now()).toUTCString(), value });
  } catch (error) {
    console.error(error);
  }
}
