import { describe, expect, it } from 'vitest';
import { conversions, isAllowed, outputFileName } from './conversion';

describe('quy tắc chuyển đổi', () => {
  it('chỉ nhận phần mở rộng tương ứng', () => {
    const pdfToWord = conversions.find(item => item.id === 'pdf-word')!;
    expect(isAllowed(new File(['x'], 'ban-ve.PDF', { type: 'application/pdf' }), pdfToWord)).toBe(true);
    expect(isAllowed(new File(['x'], 'anh.jpg', { type: 'image/jpeg' }), pdfToWord)).toBe(false);
  });
  it('đặt tên tệp đầu ra có thể dự đoán', () => expect(outputFileName('bao-cao.v1.pdf', 'DOCX')).toBe('bao-cao.v1-chuyen-doi.docx'));
});
