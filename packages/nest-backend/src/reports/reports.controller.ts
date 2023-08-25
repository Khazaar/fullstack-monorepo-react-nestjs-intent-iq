import { Controller, Get, Post, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('reports')
@ApiTags('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getReportsList() {
    return this.reportsService.getAllReports();
  }
  @Post('seed')
  @ApiQuery({
    name: 'count',
    required: false,
    type: Number,
    description: 'Number of reports to seed',
  })
  seedReportsList(@Query('count') count: number = 10) {
    return this.reportsService.seedReports(+count);
  }
}
