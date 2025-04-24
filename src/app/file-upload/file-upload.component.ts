import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  topsFiles: File[] = [];
  cymanFiles: File[] = [];
  maxFiles = 4;

  onTopsFileChange(event: any) {
    const files = event.target.files;
    if (files.length + this.topsFiles.length <= this.maxFiles) {
      this.topsFiles = [...this.topsFiles, ...Array.from(files)];
    } else {
      alert(`You can only upload up to ${this.maxFiles} TOPS files`);
    }
  }

  onCymanFileChange(event: any) {
    const files = event.target.files;
    if (files.length + this.cymanFiles.length <= this.maxFiles) {
      this.cymanFiles = [...this.cymanFiles, ...Array.from(files)];
    } else {
      alert(`You can only upload up to ${this.maxFiles} CYMAN files`);
    }
  }

  removeTopsFile(index: number) {
    this.topsFiles = this.topsFiles.filter((_, i) => i !== index);
  }

  removeCymanFile(index: number) {
    this.cymanFiles = this.cymanFiles.filter((_, i) => i !== index);
  }

  uploadFiles() {
    // Here you would implement the actual file upload logic
    console.log('TOPS Files:', this.topsFiles);
    console.log('CYMAN Files:', this.cymanFiles);
    alert('Files ready for upload!');
  }
}