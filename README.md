# Atelier: marketing talent studio

A complete, multi-page, light-theme website. Plain HTML, CSS and JavaScript, so there is nothing to install.

## Run it

1. Open this folder in VS Code.
2. Install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.
   (Double-clicking `index.html` also works.)

## Folder structure

```
atelier/
  index.html        page shell, SEO and Open Graph tags
  css/style.css     all styling; colours and fonts are the tokens at the top
  js/data.js        ALL content: skills, talent, portfolios, settings  <-- edit this
  js/art.js         generates placeholder artwork and avatars as SVG
  js/app.js         router, pages, forms, shortlist, compare, search
  assets/           put your own images here
```

## Pages

Home, one page per skill (9), Find talent (search and filters), Talent profile, Our work,
Case study (problem, approach, result, before and after), Hire brief (5 steps with validation),
Join as talent, About, Contact, Saved talent, Compare (up to 3).

## First things to change (in js/data.js, `config`)

- `whatsapp`: your number with country code, digits only (e.g. `923001234567`)
- `email`, `hours`, `location`
- `formEndpoint`: see "Make the forms send" below

## Add a new skill category

In `data.js`, add an object to `categories`:

```js
{
  slug: "podcasting", name: "Podcast Production", icon: "film",
  color: "#E6DFF7", deep: "#8B73D9",
  short: "One line for the card.",
  intro: "Two sentences for the page header.",
  delivers: ["Editing", "Show notes", "Clips", "Launch"],
  pricing: [["Starter", "$80+", "One episode"], ["Growth", "$400+", "Monthly"], ["Studio", "$1,200+", "Full production"]],
  faqs: [["Question?", "Answer."], ["Question?", "Answer."]]
}
```

`icon` can be: film, pen, code, share, target, search, quill, sparkle, camera.
The skill appears automatically in the menu, home grid, search, footer and hire form.
Artwork for a new slug falls back to the graphic-design scene; to add a custom one, add an entry to `scenes` in `art.js`.

## Add a new talent profile

Add an object to `talents` (set `cat` to a category slug):

```js
{
  id: "jane-doe", name: "Jane Doe", cat: "video-editing",
  title: "Motion designer", tier: 2, from: "From $50 per hour",
  rating: 4.9, jobs: 40, avail: "now", availText: "Available now",
  loc: "London", resp: "Replies in about 3 hours",
  bio: "Two or three sentences.",
  skills: ["Motion", "Titles"], tools: ["After Effects"],
  review: { by: "Client Name", role: "Role, Company", text: "Quote." },
  projects: [
    { title: "Project title", client: "Client", kind: "visual", year: 2025, tags: ["Motion"],
      summary: "One sentence.", metrics: [["+40%", "Watch time"]],
      problem: "...", approach: "...", result: "..." },
    { title: "Another", client: "Client", kind: "case", year: 2025, tags: ["Ads"],
      summary: "...", metrics: [["3x", "ROAS"], ["-30%", "CPA"], ["6 weeks", "Timeline"]],
      problem: "...", approach: "...", result: "..." }
  ]
}
```

- `kind: "visual"` shows in the masonry gallery; `kind: "case"` shows as a results card.
- `avail`: `now`, `soon` or `limited`. `tier`: 1 = budget, 2 = mid, 3 = premium (used by the budget filter).

## Use real photos and videos instead of the placeholder art

- Talent photo: add `photo: "assets/jane.jpg"` to the talent.
- Project image: add `img: "assets/project.jpg"` to the project.
- YouTube video in the viewer: add `video: "YOUTUBE_VIDEO_ID"` to the project.
- Live website button: add `link: "https://example.com"` to the project.

## Make the forms send

By default the forms validate, show the success screen and store the last submission in the browser only.
To receive them, create a free form at formspree.io (or Netlify Forms, Getform, etc.) and paste its URL into `formEndpoint` in `data.js`.
The hire-brief success screen also has a "Send this on WhatsApp" button that works with no setup.

## Re-theme

Edit the `:root` variables at the top of `css/style.css` (background, ink, accent, tints, fonts).
Skill tints are set per category with `color` and `deep` in `data.js`.

## Deploy

Drag the whole folder onto Netlify Drop, or push it to GitHub and enable GitHub Pages or Vercel.
Replace `assets/og-image.png` with a 1200x630 image for social sharing previews.
