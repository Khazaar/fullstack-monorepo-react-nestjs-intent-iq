import { makeAutoObservable } from 'mobx';
import { ReportModel } from './reportModel';
import { ILineChartData } from '../app/ui-components/charts/LineChart';
import { Categories } from '@shared';

export enum Days {
  Sunday = 'S',
  Monday = 'M',
  Tuesday = 'T',
  Wednesday = 'W',
  Thursday = 'R',
  Friday = 'F',
  Saturday = 'A',
}

export class AppStateModel {
  reports: ReportModel[] = [];
  isReportsLoading: boolean = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  setStartDate(date: Date | null) {
    this.startDate = date;
  }

  setEndDate(date: Date | null) {
    this.endDate = date;
  }
  setReports(reports: ReportModel[]) {
    this.reports = reports;

    // Check if there are any reports
    if (reports.length > 0) {
      // Initialize with the first report's creation date
      let earliestDate = new Date(reports[0].creationDate);
      let latestDate = new Date(reports[0].creationDate);

      for (let report of reports) {
        const reportDate = new Date(report.creationDate);
        if (reportDate < earliestDate) {
          earliestDate = reportDate;
        }
        if (reportDate > latestDate) {
          latestDate = reportDate;
        }
      }

      this.startDate = earliestDate;
      this.endDate = latestDate;
    } else {
      // If there are no reports, set startDate and endDate to null or any default value you prefer
      this.startDate = null;
      this.endDate = null;
    }
  }

  setIsReportsLoading(isLoading: boolean) {
    this.isReportsLoading = isLoading;
  }
  getReportsCount() {
    return this.reports.length;
  }
  getFilteredReports(): ReportModel[] {
    return this.reports.filter((report) => {
      const reportDate = new Date(report.creationDate);
      if (!this.startDate && !this.endDate) {
        return true;
      }
      if (this.startDate && !this.endDate) {
        return reportDate >= this.startDate;
      }
      if (!this.startDate && this.endDate) {
        return reportDate <= this.endDate;
      }
      if (this.startDate && this.endDate) {
        return reportDate >= this.startDate && reportDate <= this.endDate;
      }
      return false;
    });
  }

  getCountriesCount() {
    let countriesSet = new Set();
    for (let report of this.getFilteredReports()) {
      countriesSet.add(report.countryId);
    }
    return countriesSet.size;
  }
  getClientsCount() {
    let clientsSet = new Set();
    for (let report of this.getFilteredReports()) {
      clientsSet.add(report.clientId);
    }
    return clientsSet.size;
  }
  getAverageReportsPerDay() {
    if (this.getFilteredReports().length === 0) {
      return 0;
    }

    let earliestDate = new Date(this.getFilteredReports()[0].creationDate);
    let latestDate = new Date(this.getFilteredReports()[0].creationDate);

    for (let report of this.getFilteredReports()) {
      const reportDate = new Date(report.creationDate);
      if (reportDate < earliestDate) {
        earliestDate = reportDate;
      }
      if (reportDate > latestDate) {
        latestDate = reportDate;
      }
    }

    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    const daysSpan =
      (latestDate.getTime() - earliestDate.getTime()) / dayInMilliseconds + 1; // +1 to include both the start and end date

    return (
      Math.round((this.getFilteredReports().length / daysSpan) * 100) / 100
    );
  }

  getReportsPerDayOfWeek(): ILineChartData[] {
    // Initialize an array with zeros for each day of the week
    const reportsCount: { [key: string]: number } = {
      S: 0,
      M: 0,
      T: 0,
      W: 0,
      R: 0,
      F: 0,
      A: 0,
    };

    for (let report of this.getFilteredReports()) {
      const dayOfWeek = new Date(report.creationDate).getDay();
      const dayLetter = Object.values(Days)[dayOfWeek];
      reportsCount[dayLetter]++;
    }

    // Convert the counts into the desired DataEntry format
    const result: ILineChartData[] = [];
    for (let day in reportsCount) {
      result.push({
        entity: day,
        value: reportsCount[day],
      });
    }

    return result;
  }
  getReportsBreakdownByCategories(): ILineChartData[] {
    // Initialize a count for each category
    const reportsCount: { [cat: string]: number } = {
      Finance: 0,
      Health: 0,
      Technology: 0,
      Education: 0,
      Entertainment: 0,
    };

    for (let report of this.getFilteredReports()) {
      if (reportsCount[report.category] !== undefined) {
        reportsCount[report.category]++;
      }
    }

    // Convert the counts into the desired ILineChartData format
    const result: ILineChartData[] = [];
    for (let category in reportsCount) {
      result.push({
        entity: category,
        value: Math.round(reportsCount[category]),
      });
    }

    return result;
  }
  getReportsBreakdownByCountries(): ILineChartData[] {
    // Initialize a count for each country
    const reportsCount: { [country: string]: number } = {
      US: 0,
      CA: 0,
      GB: 0,
      FR: 0,
      DE: 0,
      JP: 0,
      CN: 0,
      BR: 0,
      AU: 0,
      IN: 0,
    };

    for (let report of this.getFilteredReports()) {
      if (reportsCount[report.countryId] !== undefined) {
        reportsCount[report.countryId]++;
      }
    }

    // Convert the counts into the desired ILineChartData format
    const result: ILineChartData[] = [];
    for (let country in reportsCount) {
      result.push({
        entity: country,
        value: reportsCount[country],
      });
    }

    return result;
  }
}
