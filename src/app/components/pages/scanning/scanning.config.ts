export const validationMessages = [
  {type: 'required', message: 'Please enter your email.'},
  {type: 'pattern', message: 'Please enter a valid email.'},
  {type: 'fail', message: ''},
];

export enum ToolId {
  WEB_SERVER_SCAN = 170,
  XSS_SCAN = 360,
  SQLI_SCAN = 370,
}

export enum ScanType {
  LIGHT = 'light',
  QUICK = 'quick',
}
