# SJDS Explorer

A real-time guide to San Juan del Sur, Nicaragua.

## 🚀 How to Host on GitHub Pages

This project is already configured for **GitHub Pages** using GitHub Actions.

### 1. Upload to GitHub
1. Create a new repository on GitHub.
2. Push your code to the `main` branch.
   * If you downloaded the ZIP, unzip it, initialize a git repo (`git init`), and push it.
   * If you used the "Export to GitHub" feature in AI Studio, it's already there!

### 2. Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The site will automatically build and deploy within a few minutes.

### 3. Local Development
To run the app locally:
```bash
npm install
npm run dev
```

### 4. Building for Production
To manually build the static files:
```bash
npm run build
```
The output will be in the `dist/` folder.
