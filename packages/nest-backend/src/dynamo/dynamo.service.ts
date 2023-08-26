import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { DynamoTableNames } from '../assets/enums';

@Injectable()
export class DynamoService {
  private dynamoDbClient: AWS.DynamoDB.DocumentClient;
  private dynamoDb: AWS.DynamoDB;

  constructor() {
    AWS.config.update({
      region: 'localhost',
      accessKeyId: 'fakeMyKeyId',
      secretAccessKey: 'fakeSecretAccessKey',
    });
    this.dynamoDbClient = new AWS.DynamoDB.DocumentClient({
      endpoint: 'http://localhost:8000',
    });
    this.dynamoDb = new AWS.DynamoDB({
      endpoint: 'http://localhost:8000',
    });
  }

  async onModuleInit() {
    const tableExists = await this.checkIfTableExists(DynamoTableNames.Reports);

    if (!tableExists) {
      await this.createTable(
        DynamoTableNames.Reports,
        [{ AttributeName: 'id', AttributeType: 'S' }],
        [{ AttributeName: 'id', KeyType: 'HASH' }]
      );
    }
  }

  async checkIfTableExists(tableName: string): Promise<boolean> {
    try {
      await this.dynamoDb.describeTable({ TableName: tableName }).promise();
      return true;
    } catch (error) {
      if (error.code === 'ResourceNotFoundException') {
        return false;
      }
      throw error; // rethrow other unknown errors
    }
  }

  async createTable(
    tableName: DynamoTableNames,
    attributeDefinitions: AWS.DynamoDB.AttributeDefinitions,
    keySchema: AWS.DynamoDB.KeySchema
  ): Promise<void> {
    const dynamoDb = new AWS.DynamoDB({ endpoint: 'http://localhost:8000' });

    const params: AWS.DynamoDB.CreateTableInput = {
      TableName: tableName,
      KeySchema: keySchema,
      AttributeDefinitions: attributeDefinitions,
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

    try {
      const data = await dynamoDb.createTable(params).promise();
      console.log(
        'Created table. Table description JSON:',
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      console.error(
        'Unable to create table. Error JSON:',
        JSON.stringify(error, null, 2)
      );
    }
  }

  async putItem(tableName: DynamoTableNames, item: any): Promise<void> {
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      await this.dynamoDbClient.put(params).promise();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  async getItem(tableName: DynamoTableNames, key: object) {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: key,
    };

    try {
      const result = await this.dynamoDbClient.get(params).promise();
      return result.Item;
    } catch (error) {
      console.error(
        'There was an error fetching the data from DynamoDB',
        error
      );
      return null;
    }
  }
  async getAllItems(tableName: DynamoTableNames): Promise<any[]> {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
    };

    try {
      const result = await this.dynamoDbClient.scan(params).promise();
      return result.Items as any[];
    } catch (error) {
      console.error(
        'There was an error fetching all data from DynamoDB',
        error
      );
      return [];
    }
  }

  async updateItem(
    params: AWS.DynamoDB.DocumentClient.UpdateItemInput
  ): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    return this.dynamoDbClient.update(params).promise();
  }
}
