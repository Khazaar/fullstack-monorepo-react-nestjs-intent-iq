import { Injectable } from '@nestjs/common';
import { IReport } from '@shared';
import { Countries, Categories } from '@shared';
import { v4 as uuidv4 } from 'uuid';
import { DynamoService } from '../dynamo/dynamo.service';
import { DynamoTableNames } from '../assets/enums';

@Injectable()
export class ReportsService {
  constructor(private readonly dynamoService: DynamoService) {}
  seedReports = async (n: number) => {
    const m = Math.floor(Math.random() * 8);
    const clientIdsPool: string[] = Array.from({ length: m }, () => uuidv4());
    const reports: IReport[] = [];
    for (let i = 0; i < n; i++) {
      const id = uuidv4();
      // Randomly select a clientId from the pool
      const randomIndex = Math.floor(Math.random() * m);
      const clientId = clientIdsPool[randomIndex];
      const countryId = generateRandomValue(Object.values(Countries));
      const category = generateRandomValue(Object.values(Categories));
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
    const allReports = await this.dynamoService.getAllItems(
      DynamoTableNames.Reports
    );

    const randomCount = Math.floor(Math.random() * allReports.length);
    const shuffled = allReports.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, randomCount);

    return allReports;
  };

  async modifyReport(
    id: string,
    updatedReport: Partial<IReport>
  ): Promise<IReport> {
    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: DynamoTableNames.Reports,
      Key: { id },
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      UpdateExpression: 'SET',
      ReturnValues: 'ALL_NEW',
    };

    Object.entries(updatedReport).forEach(([key, value]) => {
      if (key !== 'id') {
        // Don't update the ID
        params.UpdateExpression += ` #${key} = :${key},`;
        params.ExpressionAttributeNames[`#${key}`] = key;
        params.ExpressionAttributeValues[`:${key}`] = value;
      }
    });

    params.UpdateExpression = params.UpdateExpression.slice(0, -1); // Remove trailing comma

    try {
      const result = await this.dynamoService.updateItem(params);
      return result.Attributes as IReport;
    } catch (error) {
      console.error(`Error updating report with ID ${id}:`, error);
      throw new Error(`Failed to update report with ID ${id}`);
    }
  }
}

const generateRandomValue = (values: string[]) => {
  return values[Math.floor(Math.random() * values.length)];
};

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
