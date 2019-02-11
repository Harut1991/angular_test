
export const priorityOptions = [
  {
    label: 'Low',
    value: '1'
  },
  {
    label: 'Medium',
    value: '2'
  },
  {
    label: 'High',
    value: '3'
  },
  {
    label: 'Critical',
    value: '4'
  }
];

const DEFAULT_DROPDOWN_CONFIG: any = {
  highlight: false,
  create: false,
  persist: true,
  plugins: ['dropdown_direction'],
};

export const selectConfig = Object.assign({}, DEFAULT_DROPDOWN_CONFIG, {
  labelField: 'label',
  valueField: 'value',
  searchField: ['label'],
});

export const validationMessages = {
  'description': [
    {type: 'required', message: 'Please enter description'},
    {type: 'maxlength', message: 'Description should not exceed 2000 symbols'},
  ],
  'file': [
    {type: 'required', message: 'Please select your files'},
  ],
  'sampleName': [
    {type: 'required', message: 'Please enter sample name'},
    {type: 'maxlength', message: 'Sample Name should not exceed 20 characters'},
    {type: 'unique', message: 'Sample with this name already exist'},
  ],
  'repoLink': [
    {type: 'required', message: 'Please enter repo link'},
    {type: 'pattern', message: 'Please enter valid repo link'},
  ],
  'selectedDueDate': [
    {type: 'matDatepickerParse', message: 'Please enter valid date'},
    {type: 'matDatepickerMin', message: 'You can\'t enter past date'},
    {type: 'matDatepickerMax', message: 'You can\'t enter future date'}
  ],
  'priority': [
    {type: 'required', message: 'Please enter or select priority'},
  ]
};
export let urlRegexp: RegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

