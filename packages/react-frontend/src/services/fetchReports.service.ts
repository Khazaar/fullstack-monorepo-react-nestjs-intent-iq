import { ReportModel } from '../models/reportModel';
import { BACKEND_URL } from './constants';
import { IReport } from '@shared';

export const fetchReports = async () => {
  // Randomly generating a number for n (for example, between 10 and 100, but you can adjust this range)
  const n = Math.floor(Math.random() * 51) + 10; // Random number between 10 and 100

  const response = await fetch(`${BACKEND_URL}/reports/seed?count=${n}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed fetching reports');
  }

  const data: IReport[] = await response.json();
  const reports = data.map((report) => {
    return new ReportModel(
      report.id,
      report.clientId,
      report.countryId,
      report.category,
      new Date(report.creationDate)
    );
  });

  return reports;
};
