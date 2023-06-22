export interface TemplateBlockInterface {
  id?: number;
  identifier: TemplateIdentifier;
  content: string;
}

export enum TemplateIdentifier {
  ACTUAL = 'actual',
  COMPANY = 'company'
}
