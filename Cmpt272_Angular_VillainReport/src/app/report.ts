import { Location } from "./location";
var count = 0
export class Report {
  constructor(
  public witnessName: string,
  public witnessPhoneNumber: string,
  public villainName: string,
  public locationName: string,
  public extraInfo: string,
  public dateTime: number,
  public status: 'OPEN' | 'RESOLVED' = 'OPEN',
  public pictureLink?: string,
  ){}
}