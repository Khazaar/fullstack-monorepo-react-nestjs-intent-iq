import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { DynamoModule } from '../dynamo/dynamo.module';
import { DynamoService } from '../dynamo/dynamo.service';

@Module({
  imports: [DynamoModule],
  controllers: [ReportsController],
  providers: [ReportsService, DynamoService],
})
export class ReportsModule {}
