import * as XLSX from 'xlsx';
// …

export class SearchComponent {
  releasedResults: { container: string; comments: string }[] = [];

  onExcelFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target!.result as string;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const data: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = data[0] as string[];
      const ci = headers.findIndex(h => h.toLowerCase() === 'comments');
      const ti = headers.findIndex(h => h.toLowerCase() === 'container');
      if (ci < 0 || ti < 0) { this.releasedResults = []; return; }

      this.releasedResults = data.slice(1)
        .filter(r => r[ci]?.toString().toLowerCase().includes('released'))
        .map(r => ({ container: r[ti], comments: r[ci] }));
    };
    reader.readAsBinaryString(input.files[0]);
  }
}
