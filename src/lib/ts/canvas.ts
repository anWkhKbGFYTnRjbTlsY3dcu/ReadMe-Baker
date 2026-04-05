import { createIcons, icons } from 'lucide';
import { READMEComponent, COMPONENT_DEFS } from './types';
import { getBadgeEditorHTML, initBadgeEditor } from './editors/badge-editor';
import { getTableEditorHTML, initTableEditor } from './editors/table-editor';

function getEditorHTML(comp: READMEComponent): string {
  switch (comp.type) {
    case 'badge':
      return getBadgeEditorHTML();
    case 'table':
      return getTableEditorHTML();
    default:
      return `<textarea class="w-full min-h-[100px] p-3 text-sm font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y">${comp.content}</textarea>`;
  }
}

export function createComponentElement(
  comp: READMEComponent,
  onUpdate: () => void,
  onDelete: (id: string) => void,
): HTMLElement {
  const div = document.createElement('div');
  div.className =
    'group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all p-4';
  div.dataset.id = comp.id;

  const def = COMPONENT_DEFS[comp.type];

  div.innerHTML = `
    <div class="flex items-start gap-4">
      <div class="drag-handle mt-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-grab active:cursor-grabbing">
        <i data-lucide="grip-vertical" class="w-5 h-5"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
            ${def.label}
          </span>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="btn-delete p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
        <div class="editor-container">
          ${getEditorHTML(comp)}
        </div>
      </div>
    </div>
  `;

  div.querySelector('.btn-delete')?.addEventListener('click', () => {
    onDelete(comp.id);
  });

  const textarea = div.querySelector<HTMLTextAreaElement>('textarea');
  if (textarea) {
    textarea.addEventListener('input', () => {
      comp.content = textarea.value;
      onUpdate();
    });
  }

  if (comp.type === 'badge') {
    initBadgeEditor(div, comp, onUpdate);
  } else if (comp.type === 'table') {
    initTableEditor(div, comp, onUpdate);
  }

  return div;
}

export function renderCanvas(
  canvas: HTMLElement,
  components: READMEComponent[],
  onUpdate: () => void,
  onDelete: (id: string) => void,
): void {
  canvas.innerHTML = '';
  components.forEach(comp => {
    canvas.appendChild(createComponentElement(comp, onUpdate, onDelete));
  });
  createIcons({ icons });
}
