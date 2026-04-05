import Sortable from 'sortablejs';
import { createIcons, icons } from 'lucide';
import { READMEComponent, COMPONENT_DEFS, ComponentType } from './types';
import { renderMarkdown, renderMermaid } from './renderer';

class ZaReadme {
  private components: READMEComponent[] = [];
  private sidebarList: HTMLElement;
  private editorCanvas: HTMLElement;
  private previewContainer: HTMLElement;

  constructor() {
    this.sidebarList = document.getElementById('sidebar-list')!;
    this.editorCanvas = document.getElementById('editor-canvas')!;
    this.previewContainer = document.getElementById('preview-container')!;

    this.init();
  }

  private init() {
    this.renderSidebar();
    this.initSortable();
    this.initButtons();
    this.updatePreview();
    createIcons({ icons });
  }

  private renderSidebar() {
    Object.entries(COMPONENT_DEFS).forEach(([type, def]) => {
      const item = document.createElement('div');
      item.className = 'flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all cursor-grab active:cursor-grabbing hover:border-blue-400 dark:hover:border-blue-500 group';
      item.dataset.type = type;
      item.innerHTML = `
        <div class="p-2 bg-slate-100 dark:bg-slate-700 rounded-md group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
          <i data-lucide="${def.icon}" class="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-blue-500"></i>
        </div>
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">${def.label}</span>
      `;
      this.sidebarList.appendChild(item);
    });
  }

  private initSortable() {
    // Sidebar to Canvas
    new Sortable(this.sidebarList, {
      group: {
        name: 'shared',
        pull: 'clone',
        put: false
      },
      sort: false,
      animation: 150,
    });

    // Canvas reordering and receiving
    new Sortable(this.editorCanvas, {
      group: 'shared',
      animation: 150,
      handle: '.drag-handle',
      ghostClass: 'bg-blue-50',
      onAdd: (evt) => {
        const type = evt.item.dataset.type as ComponentType;
        const id = `comp-${Date.now()}`;
        const newComp: READMEComponent = {
          id,
          type,
          content: COMPONENT_DEFS[type].defaultContent,
        };
        
        // Replace the cloned item with our actual editor component
        const index = evt.newIndex!;
        this.components.splice(index, 0, newComp);
        this.renderCanvas();
        this.updatePreview();
      },
      onUpdate: (evt) => {
        const oldIndex = evt.oldIndex!;
        const newIndex = evt.newIndex!;
        const [moved] = this.components.splice(oldIndex, 1);
        this.components.splice(newIndex, 0, moved);
        this.updatePreview();
      }
    });
  }

  private renderCanvas() {
    this.editorCanvas.innerHTML = '';
    this.components.forEach((comp, index) => {
      const el = this.createComponentElement(comp);
      this.editorCanvas.appendChild(el);
    });
    createIcons({ icons });
  }

  private createComponentElement(comp: READMEComponent): HTMLElement {
    const div = document.createElement('div');
    div.className = 'group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all p-4';
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
            ${this.getEditorHTML(comp)}
          </div>
        </div>
      </div>
    `;

    // Event Listeners
    div.querySelector('.btn-delete')?.addEventListener('click', () => {
      this.components = this.components.filter(c => c.id !== comp.id);
      this.renderCanvas();
      this.updatePreview();
    });

    const textarea = div.querySelector('textarea');
    if (textarea) {
      textarea.addEventListener('input', (e) => {
        comp.content = (e.target as HTMLTextAreaElement).value;
        this.updatePreview();
      });
    }

    // Special handlers for Badge and Table
    if (comp.type === 'badge') {
      this.initBadgeEditor(div, comp);
    } else if (comp.type === 'table') {
      this.initTableEditor(div, comp);
    }

    return div;
  }

  private getEditorHTML(comp: READMEComponent): string {
    if (comp.type === 'badge') {
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

    if (comp.type === 'table') {
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
              <tbody class="table-body">
                <!-- Table rows will be injected here -->
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    return `
      <textarea class="w-full min-h-[100px] p-3 text-sm font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y">${comp.content}</textarea>
    `;
  }

  private initBadgeEditor(el: HTMLElement, comp: READMEComponent) {
    const inputs = el.querySelectorAll('input, select');
    const preview = el.querySelector('.badge-preview') as HTMLElement;

    const updateBadge = () => {
      const label = (el.querySelector('.badge-label') as HTMLInputElement).value;
      const message = (el.querySelector('.badge-message') as HTMLInputElement).value;
      const color = (el.querySelector('.badge-color') as HTMLSelectElement).value;
      const style = (el.querySelector('.badge-style') as HTMLSelectElement).value;
      
      const url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}?style=${style}`;
      comp.content = `![${label}](${url})`;
      
      if (preview) {
        preview.innerHTML = `<img src="${url}" alt="Badge Preview" class="h-5">`;
      }
      this.updatePreview();
    };

    inputs.forEach(input => input.addEventListener('input', updateBadge));
    updateBadge(); // Initial render
  }

  private initTableEditor(el: HTMLElement, comp: READMEComponent) {
    // Parse current content into a 2D array
    const rows = comp.content.split('\n').filter(r => r.includes('|') && !r.includes('---'));
    let data = rows.map(r => r.split('|').filter((_, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim()));
    
    if (data.length === 0) data = [['Header 1', 'Header 2'], ['Cell 1', 'Cell 2']];

    const renderTable = () => {
      const tbody = el.querySelector('.table-body')!;
      tbody.innerHTML = '';
      data.forEach((row, rIdx) => {
        const tr = document.createElement('tr');
        row.forEach((cell, cIdx) => {
          const td = document.createElement('td');
          td.className = 'border border-slate-200 dark:border-slate-700 p-0';
          td.innerHTML = `<input type="text" class="w-full p-2 bg-transparent outline-none focus:bg-blue-50 dark:focus:bg-blue-900/20 transition-colors" value="${cell}">`;
          const input = td.querySelector('input')!;
          input.addEventListener('input', (e) => {
            data[rIdx][cIdx] = (e.target as HTMLInputElement).value;
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
      this.updatePreview();
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

  private async updatePreview() {
    const html = await renderMarkdown(this.components);
    this.previewContainer.innerHTML = html;
    await renderMermaid();
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white text-sm font-medium transition-all transform translate-y-20 opacity-0 z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.classList.remove('translate-y-20', 'opacity-0');
    });

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('translate-y-20', 'opacity-0');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  private initButtons() {
    const btnCopy = document.getElementById('btn-copy');
    const btnDownload = document.getElementById('btn-download');

    btnCopy?.addEventListener('click', () => {
      const markdown = this.components.map(c => c.content).join('\n\n');
      navigator.clipboard.writeText(markdown);
      this.showNotification('Copied to clipboard!');
    });

    btnDownload?.addEventListener('click', () => {
      const markdown = this.components.map(c => c.content).join('\n\n');
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'README.md';
      a.click();
      URL.revokeObjectURL(url);
      this.showNotification('Download started!');
    });
  }
}

new ZaReadme();
