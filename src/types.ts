export type ComponentType =
  | 'heading'
  | 'paragraph'
  | 'code'
  | 'list'
  | 'image'
  | 'link'
  | 'math'
  | 'mermaid'
  | 'badge'
  | 'table';

export interface READMEComponent {
  id: string;
  type: ComponentType;
  content: string;
  metadata?: any;
}

export const COMPONENT_DEFS: Record<ComponentType, { label: string; icon: string; defaultContent: string }> = {
  heading: {
    label: 'Heading',
    icon: 'type',
    defaultContent: '# Project Title',
  },
  paragraph: {
    label: 'Paragraph',
    icon: 'align-left',
    defaultContent: 'A brief description of your project.',
  },
  code: {
    label: 'Code Block',
    icon: 'code',
    defaultContent: '```javascript\nconsole.log("Hello, World!");\n```',
  },
  list: {
    label: 'Bullet List',
    icon: 'list',
    defaultContent: '- Item 1\n- Item 2\n- Item 3',
  },
  image: {
    label: 'Image',
    icon: 'image',
    defaultContent: '![Alt Text](https://picsum.photos/seed/readme/800/400)',
  },
  link: {
    label: 'Link',
    icon: 'link',
    defaultContent: '[Visit Website](https://example.com)',
  },
  math: {
    label: 'KaTeX Math',
    icon: 'sigma',
    defaultContent: '$$ e = mc^2 $$',
  },
  mermaid: {
    label: 'Mermaid Diagram',
    icon: 'git-branch',
    defaultContent: 'graph TD\n  A[Start] --> B{Is it working?}\n  B -- Yes --> C[Great!]\n  B -- No --> D[Debug]',
  },
  badge: {
    label: 'Shields Badge',
    icon: 'shield',
    defaultContent: '![Static Badge](https://img.shields.io/badge/status-active-success)',
  },
  table: {
    label: 'Table',
    icon: 'table',
    defaultContent: '| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |',
  },
};
