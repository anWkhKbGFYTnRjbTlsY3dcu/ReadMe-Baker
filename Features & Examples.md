# Features and Examples

- [Features and Examples](#features-and-examples)
  - [Table](#table)
  - [Math](#math)
  - [Badges](#badges)
  - [Changelog](#changelog)
  - [Steps/ToDos](#steps-todos)
  - [Diagrams: FlowCharts](#diagrams-flowcharts)
  - [Diagrams: Sequence](#diagrams-sequence)
  - [Diagrams: Class (OOP)](#diagrams-class-oop-)
  - [Diagrams: State Diagram](#diagrams-state-diagram)
  - [Diagrams: Steps](#diagrams-steps)
  - [User Journey](#user-journey)
  - [Import/Export from Readme](#import-export-from-readme)
  - [Code blocks, paragrapsh, bullet list, images, link](#code-blocks-paragrapsh-bullet-list-images-link)

## Table

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

## Math

$$ e = mc^2 $$
$$ \gdef\foo#1{#1^2} \foo{y} + \foo{y} $$

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

## Import/Export from Readme

## Code blocks, paragrapsh, bullet list, images, link

```javascript
console.log("Hello World");
```

[Visit Website](https://example.com)

- Item 1
- Item 2
- Item 3