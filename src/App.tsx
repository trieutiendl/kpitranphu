import { useMemo, useRef, useState } from 'react';
import { conversions, hasEmbeddedSor, isAllowed, outputFileName, type Conversion } from './conversion';
import { apiUrl, saveAndShare } from './platform';

type Status = 'idle' | 'working' | 'done' | 'error';
export default function App() {
  const [conversion, setConversion] = useState<Conversion>(conversions[0]);
  const [file, setFile] = useState<File>();
  const [originalSor, setOriginalSor] = useState<File>();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('Chọn loại chuyển đổi và tệp nguồn.');
  const input = useRef<HTMLInputElement>(null);
  const accept = useMemo(() => conversion.accept, [conversion]);

  function choose(next: Conversion) { setConversion(next); setFile(undefined); setOriginalSor(undefined); setStatus('idle'); setMessage(next.detail); }
  function pick(candidate?: File) {
    if (!candidate) return;
    if (!isAllowed(candidate, conversion)) { setFile(undefined); setStatus('error'); setMessage(`Loại tệp không hợp lệ. Chỉ nhận: ${conversion.accept}.`); return; }
    setFile(candidate); setStatus('idle'); setMessage(`${candidate.name} đã sẵn sàng.`);
  }
  async function convert() {
    if (!file) return;
    if (conversion.requiresOriginalSor && (!originalSor || !originalSor.name.toLowerCase().endsWith('.sor') || !hasEmbeddedSor(file))) { setStatus('error'); setMessage('Cần chọn cả PDF và tệp SOR gốc đính kèm để xác minh.'); return; }
    if (!apiUrl()) { setStatus('error'); setMessage('Chưa cấu hình dịch vụ chuyển đổi. Ứng dụng không tạo tệp kết quả giả.'); return; }
    setStatus('working'); setMessage('Đang gửi tệp để chuyển đổi…');
    try {
      const data = new FormData(); data.append('file', file); data.append('conversion', conversion.id); if (originalSor) data.append('originalSor', originalSor);
      const response = await fetch(`${apiUrl()}/convert`, { method: 'POST', body: data });
      if (!response.ok) throw new Error((await response.json().catch(() => null))?.message ?? 'Dịch vụ không thể chuyển đổi tệp này.');
      const result = await response.json() as { base64: string; mimeType: string; fileName?: string };
      await saveAndShare(result.fileName ?? outputFileName(file.name, conversion.output.split(' ')[0]), result.base64, result.mimeType);
      setStatus('done'); setMessage('Đã tạo kết quả. Hộp lưu/chia sẻ đã được mở.');
    } catch (error) { setStatus('error'); setMessage(error instanceof Error ? error.message : 'Lỗi chuyển đổi không xác định.'); }
  }
  return <main><header><span className="mark">⇄</span><div><h1>Chuyển Tệp</h1><p>Chuyển đổi an toàn trên điện thoại</p></div></header>
    <section><h2>Chọn chuyển đổi</h2><div className="grid">{conversions.map(item => <button className={item.id === conversion.id ? 'active' : ''} onClick={() => choose(item)} key={item.id}><strong>{item.label}</strong><small>{item.detail}</small></button>)}</div></section>
    <section><h2>Tệp nguồn</h2><input ref={input} type="file" accept={accept} onChange={e => pick(e.target.files?.[0])} hidden />
      <button className="drop" onClick={() => input.current?.click()}><span>＋</span>{file ? <><strong>{file.name}</strong><small>{(file.size / 1024 / 1024).toFixed(2)} MB · chạm để thay tệp</small></> : <><strong>Chọn tệp từ điện thoại</strong><small>Hỗ trợ: {conversion.accept}</small></>}</button>
      {conversion.id === 'sor-report' && <aside>Chỉ dùng tệp SOR gốc. Không suy tạo số liệu OTDR từ ảnh/đồ thị.</aside>}
      {conversion.requiresOriginalSor && <><input id="sor" type="file" accept=".sor" onChange={e => setOriginalSor(e.target.files?.[0])} hidden/><label className="companion" htmlFor="sor">{originalSor ? `SOR gốc: ${originalSor.name}` : 'Chọn tệp SOR gốc đính kèm để xác minh'}</label><aside>Không thể tạo dữ liệu đo SOR từ PDF, ảnh hay đồ thị. Dịch vụ chỉ trả lại SOR gốc nếu xác minh được liên kết với PDF.</aside></>}
    </section>
    <button className="convert" disabled={!file || status === 'working'} onClick={convert}>{status === 'working' ? 'Đang chuyển đổi…' : `Chuyển sang ${conversion.output}`}</button>
    <p role="status" className={`status ${status}`}>{message}</p>
    <footer><strong>Giới hạn hiện tại</strong><p>DWG và OCR chưa tích hợp. PDF quét/ảnh sẽ không được tuyên bố chuyển đổi chính xác. Các tác vụ chuyển đổi cần dịch vụ máy chủ tương thích được cấu hình qua VITE_CONVERTER_API_URL.</p></footer>
  </main>;
}
