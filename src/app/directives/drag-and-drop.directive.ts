import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[fileDnd]'
})
export class FileDragAndDropDirective {
  @Output()
  private filesChanged: EventEmitter<FileList> = new EventEmitter();

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.filesChanged.emit(files);
    }
  }

  @HostListener('dragover', ['$event']) public onDragOver(evt) {
    evt.preventDefault();
  }
}
