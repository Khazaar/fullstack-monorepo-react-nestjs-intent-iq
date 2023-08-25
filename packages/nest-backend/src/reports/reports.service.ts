import { Injectable } from '@nestjs/common';
import { IReport } from '@shared';
import { v4 as uuidv4 } from 'uuid';
import { DynamoService } from '../dynamo/dynamo.service';
import { DynamoTableNames } from '../assets/enums';

@Injectable()
export class ReportsService {
  constructor(private readonly dynamoService: DynamoService) {}
  seedReports = async (n: number) => {
    const reports: IReport[] = [];

    for (let i = 0; i < n; i++) {
      const id = uuidv4();
      const clientId = uuidv4();
      const countryId = generateRandomValue(COUNTRIES);
      const category = generateRandomValue(CATEGORIES);
      const creationDate = generateRandomDate(new Date(2020, 0, 1), new Date());
      const report: IReport = {
        id,
        clientId,
        countryId,
        category,
        creationDate,
      };
      // Add report to DynamoDB
      try {
        await this.dynamoService.putItem(DynamoTableNames.Reports, report);
        console.log(`Report with ID ${id} added successfully`);
      } catch (error) {
        console.error(`Error adding report with ID ${id}:`, error);
      }

      reports.push(report);
    }

    return reports;
  };
  getAllReports = async () => {
    const reports = await this.dynamoService.getAllItems(
      DynamoTableNames.Reports
    );
    return reports;
  };
}

const COUNTRIES = ['US', 'CA', 'GB', 'FR', 'DE', 'JP', 'CN', 'BR', 'AU', 'IN'];
const CATEGORIES = [
  'Finance',
  'Health',
  'Technology',
  'Education',
  'Entertainment',
];

const generateRandomValue = (values: string[]) => {
  return values[Math.floor(Math.random() * values.length)];
};

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
