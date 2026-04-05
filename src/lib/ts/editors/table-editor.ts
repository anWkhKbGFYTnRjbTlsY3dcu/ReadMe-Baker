import { READMEComponent } from '../types';

export function getTableEditorHTML(): string {
  return `
    <div class="table-editor-container space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
      <div class="flex gap-2 mb-2">
        <button class="add-row px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1">
          <i data-lucide="plus" class="w-3 h-3"></i> Row
        </button>
        <button class="add-col px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1">
          <i data-lucide="plus" class="w-3 h-3"></i> Col
        </button>
        <button class="remove-row px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-red-50 text-red-500 transition-colors flex items-center gap-1">
          <i data-lucide="minus" class="w-3 h-3"></i> Row
        </button>
        <button class="remove-col px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-red-50 text-red-500 transition-colors flex items-center gap-1">
          <i data-lucide="minus" class="w-3 h-3"></i> Col
        </button>
      </div>
      <div class="overflow-x-auto rounded-md border border-slate-200 dark:border-slate-700">
        <table class="w-full border-collapse text-sm bg-white dark:bg-slate-800">
          <tbody class="table-body"></tbody>
        </table>
      </div>
    </div>
  `;
}

export function initTableEditor(
  el: HTMLElement,
  comp: READMEComponent,
  onUpdate: () => void,
): void {
  const rows = comp.content.split('\n').filter(r => r.includes('|') && !r.includes('---'));
  let data = rows.map(r =>
    r.split('|')
      .filter((_, i, arr) => i > 0 && i < arr.length - 1)
      .map(c => c.trim()),
  );

  if (data.length === 0) data = [['Header 1', 'Header 2'], ['Cell 1', 'Cell 2']];

  const renderTable = () => {
    const tbody = el.querySelector<HTMLElement>('.table-body')!;
    tbody.innerHTML = '';
    data.forEach((row, rIdx) => {
      const tr = document.createElement('tr');
      row.forEach((cell, cIdx) => {
        const td = document.createElement('td');
        td.className = 'border border-slate-200 dark:border-slate-700 p-0';
        td.innerHTML = `<input type="text" class="w-full p-2 bg-transparent outline-none focus:bg-blue-50 dark:focus:bg-blue-900/20 transition-colors" value="${cell}">`;
        const input = td.querySelector<HTMLInputElement>('input')!;
        input.addEventListener('input', () => {
          data[rIdx][cIdx] = input.value;
          updateContent();
        });
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  };

  const updateContent = () => {
    const header = `| ${data[0].join(' | ')} |`;
    const separator = `| ${data[0].map(() => '---').join(' | ')} |`;
    const body = data.slice(1).map(r => `| ${r.join(' | ')} |`).join('\n');
    comp.content = `${header}\n${separator}\n${body}`;
    onUpdate();
  };

  el.querySelector('.add-row')?.addEventListener('click', () => {
    data.push(new Array(data[0].length).fill('New Cell'));
    renderTable();
    updateContent();
  });

  el.querySelector('.add-col')?.addEventListener('click', () => {
    data.forEach(r => r.push('New Col'));
    renderTable();
    updateContent();
  });

  el.querySelector('.remove-row')?.addEventListener('click', () => {
    if (data.length > 1) {
      data.pop();
      renderTable();
      updateContent();
    }
  });

  el.querySelector('.remove-col')?.addEventListener('click', () => {
    if (data[0].length > 1) {
      data.forEach(r => r.pop());
      renderTable();
      updateContent();
    }
  });

  renderTable();
}
