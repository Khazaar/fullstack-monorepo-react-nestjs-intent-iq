import { ApiProperty } from '@nestjs/swagger';
import { IReport } from '@shared';

export class ReportDto implements IReport {
  id: string;
  @ApiProperty({ description: 'Client ID', type: String })
  clientId: string;
  @ApiProperty({ description: 'Country ID', type: String })
  countryId: string;
  @ApiProperty({ description: 'Category', type: String })
  category: string;
  @ApiProperty({ description: 'creation date', type: String })
  creationDate: Date;
}
