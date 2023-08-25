import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IReport } from '@shared';
import { ReportDto } from './reports.dto';

@Controller('reports')
@ApiTags('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getReportsList() {
    return this.reportsService.getAllReports();
  }

  @Put(':id')
  @ApiBody({ type: ReportDto })
  modifyReportById(
    @Param('id') id: string,
    @Body() updatedReport: Partial<IReport>
  ) {
    return this.reportsService.modifyReport(id, updatedReport);
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
