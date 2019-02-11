import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {urlRegexp, validationMessages} from './submit-form.config';
import {UploadComponent} from '../../../../shared/upload/upload.component';
import * as moment from 'moment';
import {SubmitSampleService} from '../submit-sample-service/submit-sample.service';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Attachment} from '../dashboard/attachment.model';
import {RoutingState} from '../../../../services/routing-state';

declare const st;

@Component({
  selector: 'app-submit-sample, [app-submit-sample]',
  templateUrl: './submit-sample.component.html',
  preserveWhitespaces: false,
  providers: [SubmitSampleService, UploadComponent]
})
export class SubmitSampleComponent implements OnInit {
  sample: Attachment;
  priorityOptions: Array<{ id: any, name: string }> = [];
  sampleForm: FormGroup;
  validationMessages = validationMessages;
  dueDate: Date = null;
  min: Date;
  max: Date;
  priority: any;
  isSubmitted = false;
  attachedFiles = [];
  private sampleName: string;
  private editMode: boolean;
  private id: any;
  private validTypes = [
    'application/zip',
    'application/x-zip-compressed',
    'application/gzip',
    'application/x-rar',
    'application/vnd.rar',
    'application/x-7z-compressed',
    'application/x-tarz',
    'application/x-compress'
  ];

  constructor(private formBuilder: FormBuilder,
              private cd: ChangeDetectorRef,
              private router: Router,
              private routingState: RoutingState,
              private activatedRoute: ActivatedRoute,
              private submitSampleService: SubmitSampleService,
              private uploadComponent: UploadComponent,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.createForm();
    this.activatedRoute.data
      .subscribe((data: { sample: { attachment: Array<Attachment>, priorities: any } }) => {
        if (data.sample) {
          this.editMode = true;
          this.initPriorities(data.sample.priorities);
          this.initAttachment(data.sample.attachment);
        } else {
          this.editMode = false;
          this.getPriorities();
          this.initMinAndMaxDate();
        }
      }).unsubscribe();
  }

  private createForm(): void {
    this.sampleForm = this.formBuilder.group({
        description: [null, {
          validators: Validators.compose([Validators.required, Validators.maxLength(2000)])
        }],
        file_set: [this.attachedFiles],
        name: [null, {
          validators: Validators.compose([Validators.required, Validators.maxLength(20)])
        }],
        mention: [null],
        link: [null, {
          validators: Validators.compose([Validators.pattern(urlRegexp)])
        }],
        priority: [null, Validators.compose([Validators.required])],
        due_date: [this.dueDate],
      }
      , {
        updateOn: 'submit',
        validator: [SubmitSampleComponent.repoLinkValidator, SubmitSampleComponent.fileValidator]
      }
    );
  }

  private getPriorities(): void {
    this.submitSampleService.getPriorities().subscribe(data => {
      this.initPrioritiesSelect(data.body);
    }, error1 => {
      if (error1.status === 401) {
        this.authService.logOut();
        return;
      }
    });
  }

  private initPriorities(data): void {
    if (data) {
      data.subscribe(res => {
        this.initPrioritiesSelect(res.body);
      }).unsubscribe();
    } else {
      this.priorityOptions = [];
      return;
    }
  }

  private initPrioritiesSelect(data): void {
    const priorityOptions = [];
    data.forEach(data1 => {
      if (data1.hasOwnProperty('PRIORITY_CHOICES')) {
        data1.PRIORITY_CHOICES.forEach((pr) => {
          Object.keys(pr).forEach(key => {
            priorityOptions.push({
              name: pr[key],
              id: +key
            });
          });
        });
      }
    });
    this.priorityOptions = [...priorityOptions];
  }

  initAttachment(data): void {
    if (data) {
      data.subscribe(res => {
        const sample: Attachment = res.body;
       this.sample = res.body;
        this.id = sample.id;
        this.sampleForm.patchValue({
          file_set: sample.file_set,
          description: sample.description,
          name: sample.name,
          link: sample.link,
          mention: sample.mention
        });
        res.body.file_set.forEach(set => {
          this.attachedFiles.push({fileSize: null, filename: set.file_name, value: set.file, id: set.id});
        });
        this.initMinAndMaxDate();
        if (!(!sample.due_date)) {
          this.dueDate = moment(sample.due_date).toDate();
        }
        setTimeout(() => {
          this.sampleForm.get('priority').setValue(+sample.priority);
        }, 100);
      }).unsubscribe();
    }
  }

  initMinAndMaxDate(): void {
    // this.min = new Date();
    this.min = moment(st).toDate();
    this.max = moment(st).toDate();
    this.min.setDate(this.min.getDate() + 1);
    this.max.setMonth(this.min.getMonth() + 6);
  }

  submitSample(): void {
    this.isSubmitted = true;
    const controls = this.sampleForm.controls;
    if (!this.sampleForm.get('link').hasError('required')
      && this.sampleForm.get('file_set').hasError('fileSize')
      && !this.sampleForm.get('file_set').hasError('required')) {
      this.sampleForm.get('file_set').setErrors({fileSize: false});
    }
    if (this.sampleForm.valid) {
      this.isSubmitted = false;
      const formValue = this.sampleForm.value;
      this.getFileToFormForUpload(formValue);
      if (this.dueDate !== null) {
        const due_date = this.sampleForm.get('due_date').value;
        formValue.due_date = moment(due_date).format('YYYY-MM-DD');
      }
      if (!formValue.link && formValue.file_set) {
        delete formValue.link;
      }
      this.uploadComponent.upload(formValue, this.editMode, this.id);
      if (this.editMode) {
        const prevUrl = this.routingState.getPreviousUrlAndQueryParams();
        this.router.navigate([prevUrl.url], prevUrl.queryParams);
      } else {
        this.resetForm();
      }
    } else {
      Object.keys(controls)
        .forEach(controlName => {
          controls[controlName].markAsTouched();
          controls[controlName].markAsDirty();
        });
      return;
    }
  }

  private getFileToFormForUpload(formValue): void {
    if (this.attachedFiles.length !== 0) {
      if (this.attachedFiles[0].hasOwnProperty('id')) {
        delete formValue.file_set;
      } else {
        formValue.file_set = [{file_name: this.attachedFiles[0].filename, file: this.attachedFiles[0].value}];
      }
    } else {
      delete formValue.file_set;
    }
  }

  onFileChange(event): void {
    this.sampleForm.get('file_set').setErrors(null);
    const files = event.target.files;
    this.changeAttachments(files);
  }

  isSampleNameUnique(): void {
    const sampleNameControl = this.sampleForm.get('name');
    const samples = UploadComponent.samples.find(sample => sampleNameControl.value === sample.sampleName);
    if (!!sampleNameControl.value && sampleNameControl.valid && this.sampleName !== sampleNameControl.value && !samples) {
      this.sampleName = sampleNameControl.value;
      this.submitSampleService.checkSampleNameUniqness({name: sampleNameControl.value}).subscribe(() => {
      }, error1 => {
        sampleNameControl.setErrors({unique: true});
      });
    } else {
      sampleNameControl.setErrors({unique: true});
    }
  }

  validateFile(type): boolean {
    let isValid = false;
    this.validTypes.forEach(valType => {
      if (type.indexOf(valType) !== -1) {
        isValid = true;
      }
    });
    return isValid;
  }

  onDragFiles(files): void {
    this.sampleForm.get('file_set').setErrors(null);
    this.changeAttachments(files);
  }

  changeAttachments(files): void {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 10485760) {
        this.sampleForm.get('file_set').setErrors({fileSize: true});
        return;
      } else if (!this.validateFile(file.type)) {
        this.sampleForm.get('file_set').setErrors({fileType: true});
        return;
      } else {
        const reader = new FileReader();
        let base64File;
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          base64File = reader.result.split(',')[1];
          this.attachedFiles[0] = {
            fileSize: (file.size / 1000024).toFixed(3),
            filename: file.name,
            value: base64File
          };
          this.cd.markForCheck();
        };
      }
      this.cd.markForCheck();
    }
  }

  deleteFromFilesList(index: number): void {
    this.attachedFiles.splice(index, 1);
    if (this.attachedFiles.length === 0) {
      this.sampleForm.get('file_set').setValue(this.attachedFiles);
    }
  }

  resetForm(): void {
    this.attachedFiles = [];
    this.sampleForm.reset({
      file_set: this.attachedFiles,
      description: null,
      name: null,
      link: null,
      mention: null,
      due_date: null,
      priority: null
    });
    document.dispatchEvent(new Event('formSubmitted', {bubbles: true}));
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  onCloseHandler(): void {
    this.sampleForm.get('priority').markAsTouched();
  }

  private static repoLinkValidator(g: FormGroup): null | void {
    if (g.get('file_set').value.length === 0 && !g.get('link').value) {
      g.get('link').setErrors({required: true});
    } else if (g.get('file_set').value.length !== 0 && !g.get('link').hasError('pattern')) {
      g.get('link').setErrors(null);
    }
  }

  private static fileValidator(g: FormGroup): null | void {
    if (g.get('file_set').value.length === 0 && !g.get('link').value) {
      g.get('file_set').setErrors({required: true});
    } else if (g.get('link').value !== 0) {
      g.get('file_set').setErrors(null);
    }
  }
}
