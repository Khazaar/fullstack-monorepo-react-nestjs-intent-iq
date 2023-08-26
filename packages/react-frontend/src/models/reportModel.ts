import { IReport } from '@shared';
import { makeAutoObservable } from 'mobx';

export class ReportModel implements IReport {
  id: string;
  clientId: string;
  countryId: string;
  category: string;
  creationDate: Date;

  constructor(
    id: string,
    clientId: string,
    countryId: string,
    category: string,
    creationDate: Date
  ) {
    this.id = id;
    this.clientId = clientId;
    this.countryId = countryId;
    this.category = category;
    this.creationDate = creationDate;
    makeAutoObservable(this);
  }
}
