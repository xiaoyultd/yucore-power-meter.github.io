# Guangzhou Xiaoyu Import and Export Co., Ltd. — Website

A professional static website for industrial components trading, deployable on GitHub Pages.

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `xiaoyu-industrial` or your preferred name)
2. Upload all files in this folder to the repository root
3. Go to **Settings → Pages**
4. Under **Source**, select `Deploy from a branch`
5. Choose branch: `main`, folder: `/ (root)`
6. Click **Save** — your site will be live at `https://yourusername.github.io/repo-name/`

## File Structure

```
/
├── index.html        Home page
├── products.html     Product catalog with filter
├── about.html        About Us page
├── contact.html      Contact & quotation request
├── css/
│   └── style.css     All page styles
├── js/
│   └── main.js       Navigation & filter logic
└── README.md
```

## Contact Form

The quote form uses `mailto:` to open the visitor's email client pre-filled with their inquiry. No server required.

To upgrade to a server-side form (so submissions work even without an email client), sign up at [Formspree](https://formspree.io) and replace the form `action` attribute with your Formspree endpoint.
