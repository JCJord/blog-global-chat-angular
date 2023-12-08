import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent {
  @Output() fileData = new EventEmitter<any>();

  changeListener(event: Event) {
    this.fileData.emit(event);
  }
}
