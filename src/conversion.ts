export type ConversionId = 'pdf-word' | 'word-pdf' | 'pdf-excel' | 'excel-pdf' | 'pdf-dxf' | 'dxf-pdf' | 'sor-report' | 'pdf-sor';
export type Conversion = { id: ConversionId; label: string; accept: string; output: string; detail: string; requiresOriginalSor?: boolean };

export const conversions: Conversion[] = [
  { id: 'pdf-word', label: 'PDF → Word', accept: '.pdf', output: 'DOCX', detail: 'Chuyển bố cục PDF sang Word.' },
  { id: 'word-pdf', label: 'Word → PDF', accept: '.doc,.docx', output: 'PDF', detail: 'Xuất Word thành PDF.' },
  { id: 'pdf-excel', label: 'PDF → Excel', accept: '.pdf', output: 'XLSX', detail: 'Trích xuất bảng PDF sang Excel.' },
  { id: 'excel-pdf', label: 'Excel → PDF', accept: '.xls,.xlsx,.csv', output: 'PDF', detail: 'Xuất bảng tính thành PDF.' },
  { id: 'pdf-dxf', label: 'PDF → AutoCAD', accept: '.pdf', output: 'DXF', detail: 'Chỉ PDF vector; DWG chưa được hỗ trợ.' },
  { id: 'dxf-pdf', label: 'AutoCAD → PDF', accept: '.dxf', output: 'PDF', detail: 'Xuất bản vẽ DXF thành PDF.' },
  { id: 'sor-report', label: 'SOR → Báo cáo', accept: '.sor', output: 'PDF và DOCX', detail: 'Tạo báo cáo từ phép đo OTDR gốc.' },
  { id: 'pdf-sor', label: 'PDF → SOR', accept: '.pdf', output: 'SOR', detail: 'Chỉ khôi phục SOR gốc đính kèm, đã xác minh.', requiresOriginalSor: true }
];

export function isAllowed(file: File, conversion: Conversion): boolean {
  const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;
  return conversion.accept.split(',').includes(extension);
}

export function outputFileName(input: string, output: string): string {
  return `${input.replace(/\.[^.]+$/, '')}-chuyen-doi.${output.toLowerCase()}`;
}

export function hasEmbeddedSor(file: File): boolean {
  // A PDF alone is not measurement data. The backend must verify an attached original SOR.
  return file.name.toLowerCase().endsWith('.pdf');
}
