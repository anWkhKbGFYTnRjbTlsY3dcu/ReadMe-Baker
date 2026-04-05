# <div align="center"> 📦 ➔ 📥 Readme Builder</div>

<div align="center">

![Status](https://img.shields.io/badge/status-active-success) ![License](https://img.shields.io/badge/license-GPL-blue) ![Version](https://img.shields.io/badge/version-1.0.0-informational)
<br>

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Lucide](https://img.shields.io/badge/lucide-%235E6AD2.svg?style=for-the-badge&logo=lucide&logoColor=white) ![Mermaid](https://img.shields.io/badge/mermaid-%23FF69B4.svg?style=for-the-badge&logo=mermaid&logoColor=white)

</div>

Finished the project and you want a great Readme file?<br>
Find here the ultimate tool for creating professional, high-quality documentation for your GitHub projects. No more wrestling with raw markdown syntax—just drag, drop, and export.<br>
Check [project wiki](../../wiki) for more details! Or scroll.

![App Banner](src/lib/img/home.gif)


---

## 🤝 Contributing

We welcome contributions to this project. Please follow these steps to contribute:

1. **Fork the repository.**
2. **Create a new branch** (`git checkout -b feature/your-feature-name`).
3. **Make your changes** and commit them (`git commit -m 'Add some feature'`).
4. **Push to the branch** (`git push origin feature/your-feature-name`).
5. **Open a pull request**.

Please make sure to update tests as appropriate.

## 🐛 Issues

If you encounter any issues while using or setting up the project, please check the [Issues]() section to see if it has already been reported. If not, feel free to open a new issue detailing the problem.

When reporting an issue, please include:

- A clear and descriptive title.
- A detailed description of the problem.
- Steps to reproduce the issue.
- Any relevant logs or screenshots.
- The environment in which the issue occurs (OS, browser, Node.js version, etc.).

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Core | Vanilla JavaScript, HTML5 |
| Styling | Tailwind CSS + Typography plugin |
| Icons | Lucide Icons |
| Markdown | Marked.js + GFM Heading IDs |
| Diagrams | Mermaid.js (Flowchart, Sequence, Class, State, ER, Journey) |
| Math | KaTeX |
| Drag & Drop | SortableJS |
| Export | JSZip |
| Build (dev) | Vite + TypeScript |

## 📦 Installation

### Option A — Just open it (no install needed)
The app is a single self-contained HTML file. Download `index.html` and open it in any browser.

### Option B — Run locally without CDN/update something in TS
```
# 1. Clone the repository
git clone https://github.com/your-username/zareadme.git
cd zareadme

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production
```
npm run build
```
Output is in the `dist/` folder.

---

# Features and Examples

- [Features and Examples](#features-and-examples)
  - [Import/Export from Readme](#import-export-from-readme)
  - [Table](#table)
  - [Math](#math)
  - [Badges](#badges)
  - [Changelog](#changelog)
  - [Steps/ToDos](#steps-todos)
  - [Diagrams: FlowCharts](#diagrams-flowcharts)
  - [Diagrams: Sequence](#diagrams-sequence)
  - [Diagrams: Class (OOP)](#diagrams-class-oop-)
  - [Diagrams: State Diagram](#diagrams-state-diagram)
  - [Diagrams: Entity relationship](#diagrams-steps)
  - [User Journey](#user-journey)
  - [Code blocks, paragrapsh, bullet list, images, link](#code-blocks-paragrapsh-bullet-list-images-link)

## Import/Export from Readme
![App Banner](src/lib/img/import.gif)

## Table

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

## Math

$$ e = mc^2 $$
$$ y^2 + y^2 = 2y^2 $$

## Badges

<div align="center">

![status](https://img.shields.io/badge/status-active-success) ![Discord](https://img.shields.io/badge/Discord-join-7289da) ![Version](https://img.shields.io/badge/Version-1.0.0-informational) ![Build](https://img.shields.io/badge/Build-failing-critical) ![Build](https://img.shields.io/badge/Build-passing-success) ![License](https://img.shields.io/badge/License-MIT-blue)

</div>

## Changelog

### [1.0.0] - 2023-10-27

#### Added

- New feature A
- New feature B

#### Fixed

- Bug fix C

## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

## Diagrams: FlowCharts

```mermaid
graph TD
  A[Start] --> B{Is it working?}
  B -- Yes --> C[Great!]
  B -- No --> D[Debug]
```

## Diagrams: Sequence

```mermaid
sequenceDiagram
  Alice->>John: Hello John, how are you?
  John-->>Alice: Great!
  Alice-)John: See you later!
```

## Diagrams: Class (OOP)

```mermaid
classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck{
    +String beakColor
    +swim()
    +quack()
  }
```

## Diagrams: State Diagram

```mermaid
stateDiagram-v2
  [*] --> Still
  Still --> [*]
  Still --> Moving
  Moving --> Still
  Moving --> Crash
  Crash --> [*]
```

## Diagrams: Steps

```mermaid
erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

## User Journey

```mermaid
journey
  title My working day
  section Go to work
    Make tea: 5: Me
    Go upstairs: 3: Me
    Do work: 1: Me, Cat
  section Go home
    Go downstairs: 5: Me
    Sit down: 5: Me
```

## Code blocks, paragrapsh, bullet list, images, link

```javascript
console.log("Hello World");
```

[Visit Website](https://example.com)

- Item 1
- Item 2
- Item 3