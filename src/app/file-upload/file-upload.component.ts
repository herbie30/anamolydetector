import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  topsFiles: File[] = [];
  cymanFiles: File[] = [];
  maxFiles = 4;
  differences: string[] = [];

  onTopsFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) { return; }
    const filesArray: File[] = Array.from(input.files);
    if (filesArray.length + this.topsFiles.length <= this.maxFiles) {
      this.topsFiles = [...this.topsFiles, ...filesArray];
    } else {
      alert(`You can only upload up to ${this.maxFiles} TOPS files`);
    }
  }

  onCymanFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) { return; }
    const filesArray: File[] = Array.from(input.files);
    if (filesArray.length + this.cymanFiles.length <= this.maxFiles) {
      this.cymanFiles = [...this.cymanFiles, ...filesArray];
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

  async uploadFiles(): Promise<void> {
    if (!this.topsFiles.length || !this.cymanFiles.length) {
      alert('Please select at least one file for both TOPS and CYMAN');
      return;
    }
    try {
      const [topsData, cymanData] = await Promise.all([
        this.readSheet(this.topsFiles[0]),
        this.readSheet(this.cymanFiles[0])
      ]);
      this.differences = this.compareSheets(topsData, cymanData);
      console.log('Differences:', this.differences);
      alert('Comparison complete! Check the console for differences.');
    } catch (err) {
      console.error('Error reading files:', err);
      alert('Failed to read one or more files.');
    }
  }

  private readSheet(file: File): Promise<any[][]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        resolve(json as any[][]);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  }

  private compareSheets(a: any[][], b: any[][]): string[] {
    const diffs: string[] = [];
    const maxRows = Math.max(a.length, b.length);
    const maxCols = Math.max(
      ...a.map(r => r.length),
      ...b.map(r => r.length)
    );
    for (let i = 0; i < maxRows; i++) {
      for (let j = 0; j < maxCols; j++) {
        const aVal = a[i]?.[j] ?? '';
        const bVal = b[i]?.[j] ?? '';
        if (aVal !== bVal) {
          diffs.push(`Row ${i+1} Col ${j+1}: TOPS="${aVal}" vs CYMAN="${bVal}"`);
        }
      }
    }
    return diffs;
  }
}
