import { READMEComponent } from '../types';

export function getBadgeEditorHTML(): string {
  return `
    <div class="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-[10px] uppercase font-bold text-slate-400">Label</label>
          <input type="text" class="badge-label w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded" value="status">
        </div>
        <div>
          <label class="text-[10px] uppercase font-bold text-slate-400">Message</label>
          <input type="text" class="badge-message w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded" value="active">
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-[10px] uppercase font-bold text-slate-400">Color</label>
          <select class="badge-color w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded">
            <option value="success">Green</option>
            <option value="important">Red</option>
            <option value="informational">Blue</option>
            <option value="warning">Yellow</option>
            <option value="brightgreen">Bright Green</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
          </select>
        </div>
        <div>
          <label class="text-[10px] uppercase font-bold text-slate-400">Style</label>
          <select class="badge-style w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded">
            <option value="flat">Flat</option>
            <option value="flat-square">Flat Square</option>
            <option value="for-the-badge">For the Badge</option>
            <option value="plastic">Plastic</option>
            <option value="social">Social</option>
          </select>
        </div>
      </div>
      <div class="pt-2 border-t border-slate-200 dark:border-slate-800">
        <label class="text-[10px] uppercase font-bold text-slate-400">Live Preview</label>
        <div class="badge-preview mt-1"></div>
      </div>
    </div>
  `;
}

export function initBadgeEditor(
  el: HTMLElement,
  comp: READMEComponent,
  onUpdate: () => void,
): void {
  const inputs = el.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select');
  const preview = el.querySelector<HTMLElement>('.badge-preview');

  const updateBadge = () => {
    const label = (el.querySelector<HTMLInputElement>('.badge-label'))!.value;
    const message = (el.querySelector<HTMLInputElement>('.badge-message'))!.value;
    const color = (el.querySelector<HTMLSelectElement>('.badge-color'))!.value;
    const style = (el.querySelector<HTMLSelectElement>('.badge-style'))!.value;

    const url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}?style=${style}`;
    comp.content = `![${label}](${url})`;

    if (preview) {
      preview.innerHTML = `<img src="${url}" alt="Badge Preview" class="h-5">`;
    }
    onUpdate();
  };

  inputs.forEach(input => input.addEventListener('input', updateBadge));
  updateBadge();
}
