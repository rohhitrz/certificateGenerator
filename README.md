# Certificate Generator

A responsive, front-end only Certificate Generator Web App built with React, TypeScript, and SCSS.

## Features

- 📝 **Certificate Form**: Input student details, course information, and mentor details
- 🎨 **Multiple Certificate Templates**: Choose between classic and modern certificate designs
- 📦 **QR Code Integration**: Automatic QR code generation for each certificate
- 🌙 **Dark Mode / Light Mode**: Toggle between dark and light themes
- 🌍 **Multilingual Support**: Switch between English and Hindi
- ✍️ **Signature & Logo Upload**: Dynamically add mentor signature and organization logo
- 📥 **Download Certificate**: Export as PDF or PNG

## Tech Stack

- React with TypeScript
- SCSS for styling (no CSS libraries)
- jsPDF for PDF generation
- html2canvas for image export
- QRCode.react for QR code generation
- i18next for internationalization

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/certificate-generator.git
   cd certificate-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Fill in the certificate form with student and course details
2. Upload optional mentor signature and organization logo
3. Select a certificate template
4. Click "Generate Certificate" to see the preview
5. Download the certificate as PDF or PNG

## Project Structure

```
src/
│
├── components/
│   ├── Form/
│   │   ├── Form.tsx
│   │   └── Form.module.scss
│   ├── Certificate/
│   │   ├── Template1.tsx
│   │   ├── Template2.tsx
│   │   ├── Certificate.module.scss
│   │   └── QRCodeWrapper.tsx
│   ├── ThemeToggle/
│   ├── LanguageSwitcher/
│
├── utils/
│   └── exportUtils.ts
│
├── assets/
│   └── logo-placeholder.svg
│
├── i18n/
│   ├── index.ts
│   └── translations.json
│
├── styles/
│   └── global.scss
│
├── App.tsx
└── main.tsx
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspiration from various certificate designs
- React and TypeScript community for excellent documentation
# certificateGenerator
