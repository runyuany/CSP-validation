# CSP Validation Test

This project tests Content Security Policy (CSP) behavior, particularly focusing on how Edge's PwaMiniCanvas or MiniCanvas environments handle CSS loading from different origins when the CSP doesn't explicitly define `style-src` or `default-src`.

## Files

- `index.html`: The main test page with a CSP meta tag that only defines script-src
- `styles/main.css`: CSS file that will be loaded from a different origin

## Setup Instructions

### 1. Setting up on GitHub Pages

1. Create a new public GitHub repository (or use an existing one).
2. Add the generated `index.html` to the root of the repository.
3. Create a `styles` directory in your repository and add the `main.css` file into this directory.
4. Commit and push these files to GitHub.
5. Enable GitHub Pages for your repository:
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select the `main` or `master` branch and `/root` folder
   - Click "Save"
   - Wait for GitHub to build your site (usually takes a minute or two)

### 2. Updating CSS Path

1. Once `main.css` is pushed to GitHub, navigate to it in the GitHub UI.
2. Click the 'Raw' button. This will show you the raw content of the file and its URL (e.g., `https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPOSITORY/main/styles/main.css`).
3. Copy this raw URL.
4. Open `index.html` in your local editor (or directly on GitHub) and replace the placeholder href for the stylesheet with the actual raw URL you just copied:
   ```html
   <link rel="stylesheet" href="https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPOSITORY/main/styles/main.css">
   ```
5. Commit and push this change to `index.html`.

## Testing Instructions

1. Access your `index.html` via its GitHub Pages URL (e.g., `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/` or `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/index.html`).
2. Open the browser's Developer Tools (usually by pressing F12) and check the 'Console' tab for any Content Security Policy violation messages related to `main.css`.
3. Visually inspect the 'Testing CSP for CSS' div:
   - If its background is green, the CSS loaded successfully.
   - If not, and there's a CSP error in the console, the CSS was likely blocked by the Content Security Policy.

## Expected Observation

The test aims to see if the browser blocks the CSS loaded from `raw.githubusercontent.com` due to the CSP in `index.html` lacking `style-src` or `default-src`, which might imply a default of `'none'` or stricter rules in the target Edge environments.

## Testing Edge MiniCanvas

To specifically test in Edge's MiniCanvas environments:

1. Open Edge
2. Access your GitHub Pages URL
3. Note if the user agent string contains any of these indicators:
   - `(PwaMiniCanvas) (Discover, Search)`
   - `(MiniCanvas)`

The test page will display the user agent string automatically.