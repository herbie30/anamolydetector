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

 onTopsFileChange(event: Event): void {
  // 1. Tell TypeScript this is an HTML file input
  const input = event.target as HTMLInputElement;

  // 2. If no files were chosen, exit early
  if (!input.files) {
    return;
  }

  // 3. Turn FileList → File[]
  const filesArray: File[] = Array.from(input.files);

  // 4. Enforce your maxFiles limit
  if (filesArray.length + this.topsFiles.length <= this.maxFiles) {
    this.topsFiles = [...this.topsFiles, ...filesArray];
  } else {
    alert(`You can only upload up to ${this.maxFiles} TOPS files`);
  }
}


  
  oncymanFileChange(event: Event): void {
  // 1. Tell TypeScript this is an HTML file input
  const input = event.target as HTMLInputElement;

  // 2. If no files were chosen, exit early
  if (!input.files) {
    return;
  }

  // 3. Turn FileList → File[]
  const filesArray: File[] = Array.from(input.files);

  // 4. Enforce your maxFiles limit
  if (filesArray.length + this.cymanFiles.length <= this.maxFiles) {
    this.topsFiles = [...this.cymanFiles, ...filesArray];
  } else {
    alert(`You can only upload up to ${this.maxFiles} cymanFiles files`);
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
