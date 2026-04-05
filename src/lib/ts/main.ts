import Sortable from 'sortablejs';
import { createIcons, icons } from 'lucide';
import { READMEComponent, COMPONENT_DEFS, ComponentType } from './types';
import { renderMarkdown, renderMermaid } from './renderer';
import { renderCanvas } from './canvas';

const MAX_COMPONENTS = 100;

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
      item.className =
        'flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all cursor-grab active:cursor-grabbing hover:border-blue-400 dark:hover:border-blue-500 group';
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
    new Sortable(this.sidebarList, {
      group: { name: 'shared', pull: 'clone', put: false },
      sort: false,
      animation: 150,
    });

    new Sortable(this.editorCanvas, {
      group: 'shared',
      animation: 150,
      handle: '.drag-handle',
      ghostClass: 'bg-blue-50',
      onAdd: (evt) => {
        if (this.components.length >= MAX_COMPONENTS) {
          evt.item.remove();
          this.showNotification(`Max ${MAX_COMPONENTS} components reached`);
          return;
        }
        const type = evt.item.dataset.type as ComponentType;
        const id = `comp-${Date.now()}`;
        const newComp: READMEComponent = {
          id,
          type,
          content: COMPONENT_DEFS[type].defaultContent,
        };
        const index = evt.newIndex!;
        this.components.splice(index, 0, newComp);
        this.refreshCanvas();
        this.updatePreview();
      },
      onUpdate: (evt) => {
        const [moved] = this.components.splice(evt.oldIndex!, 1);
        this.components.splice(evt.newIndex!, 0, moved);
        this.updatePreview();
      },
    });
  }

  private refreshCanvas() {
    renderCanvas(
      this.editorCanvas,
      this.components,
      () => this.updatePreview(),
      (id) => {
        this.components = this.components.filter(c => c.id !== id);
        this.refreshCanvas();
        this.updatePreview();
      },
    );
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

    requestAnimationFrame(() => {
      notification.classList.remove('translate-y-20', 'opacity-0');
    });

    setTimeout(() => {
      notification.classList.add('translate-y-20', 'opacity-0');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  private initButtons() {
    document.getElementById('btn-copy')?.addEventListener('click', () => {
      const markdown = this.components.map(c => c.content).join('\n\n');
      navigator.clipboard.writeText(markdown);
      this.showNotification('Copied to clipboard!');
    });

    document.getElementById('btn-download')?.addEventListener('click', () => {
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
