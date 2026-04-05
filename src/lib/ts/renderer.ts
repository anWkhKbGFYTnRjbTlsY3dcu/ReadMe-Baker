import { marked } from 'marked';
import type { Tokens } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedSmartypants } from 'marked-smartypants';
import mermaid from 'mermaid';
import katex from 'katex';
import { READMEComponent } from './types';

// Configure marked
marked.use(gfmHeadingId());
marked.use(markedSmartypants());

export async function renderMarkdown(components: READMEComponent[]): Promise<string> {
  const rawMarkdown = components.map(c => c.content).join('\n\n');

  let html = await marked.parse(rawMarkdown);

  // Post-processing for Math (KaTeX)
  html = html.replace(/\$\$(.*?)\$\$/gs, (_, tex) => {
    try {
      return katex.renderToString(tex, { displayMode: true, throwOnError: false });
    } catch (e) {
      return `<span class="text-red-500 text-xs">Math Error: ${e instanceof Error ? e.message : String(e)}</span>`;
    }
  });

  html = html.replace(/\$(.*?)\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex, { displayMode: false, throwOnError: false });
    } catch (e) {
      return `<span class="text-red-500 text-xs">Math Error: ${e instanceof Error ? e.message : String(e)}</span>`;
    }
  });

  return html;
}

export async function renderMermaid() {
  await mermaid.run({
    querySelector: '.mermaid',
  });
}

// Extension for Mermaid in Marked
marked.use({
  renderer: {
    code(token: Tokens.Code) {
      if (token.lang === 'mermaid') {
        return `<div class="mermaid">${token.text}</div>`;
      }
      return false;
    }
  }
});
