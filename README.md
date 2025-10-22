<<<<<<< HEAD
# Web Development Project 2 - *FlashCards*

Submitted by: **Nahili Ansha**

This web app: **Study Quiz**

Time spent: **3** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x ] **  Discover random cat images and breed metadata**
  - [x ]Single-result view with consistent attributes: breed, origin, temperament
- [x ] **Click a breed to add/remove it from the ban list (right panel)**
  - [x ] Banned attribute values are excluded from subsequent Discover results
  - [ x] Responsive layout with a centered overlay and a ban-list panel

 
 
 


Responsive layout with a centered overlay and a ban-list panel


The following **optional** features are implemented:

- [x ] Buttons or links to a related resources are on each card component
  - [x ] All cards have buttons or links in addition to text
- [x ] The site is responsive for both desktop and mobile formats
  - [ x] Web app is shown in a mobile format
  - [x ] **Video Walkthrough Special Instructions**: To ease the grading process, please use Chrome Developer Tools' "Toggle Device" button to demonstrate that your web application's responsiveness in both a desktop *and* a mobile format. Detailed instructions can be found below this stretch feature on the project page. 

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://github.com/nahili-ansha/FlashCards/blob/main/flashcards2.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

## Describe any challenges encountered while building the app.
- Managing component state and prop flow: I kept the cards state in App.jsx and passed onAdd / card array down to components to keep data flow simple.
- Implementing the study flip animation: CSS 3D transforms (rotateY) and backface-visibility required careful layering to make the flip smooth and accessible.
- Responsive layout: balancing panel sizes and spacing so the left (form/list) and right (study) panels look good on desktop and stack nicely on mobile.
- Background image handling: opted to use a static image path (you can put images in public/ for easy referencing) and added a subtle overlay so the study card remains readable.

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
=======
<<<<<<< HEAD
# FlashCards
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 6aec4e4 (Add .gitattributes and normalize line endings)
>>>>>>> 7cbfa69 (Added guessing feature)
