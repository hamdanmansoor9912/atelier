/* ============================================================
   ATELIER — data.js
   Everything on the site lives in this file: skills, talent,
   portfolios, testimonials, contact details. Edit or add entries
   here and the pages update automatically — no layout code needed.
   ============================================================ */
window.ATELIER = {
  /* ---------- Basic settings ---------- */
  config: {
    brand: "Atelier",
    tagline: "Marketing talent, hand-picked and ready to ship.",
    whatsapp: "1234567890",        // country code + number, digits only (e.g. 923001234567)
    email: "hello@atelier.studio",
    location: "Remote-first studio",
    hours: "Mon to Sat, 10am to 7pm",
    formEndpoint: ""               // optional: "https://formspree.io/f/xxxxxxx" — see README
  },

  /* ---------- Options used in the hire form ---------- */
  hire: {
    budgets: ["Under $500", "$500 to $2,000", "$2,000 to $5,000", "$5,000 to $15,000", "$15,000 and up", "Not sure yet"],
    timelines: ["As soon as possible", "Within 2 weeks", "Within a month", "Flexible or ongoing"]
  },

  /* ---------- How it works ---------- */
  steps: [
    { t: "Brief", d: "Tell us what you need, your budget and your timeline. It takes about three minutes." },
    { t: "Match", d: "We shortlist specialists whose portfolios fit your project, usually within 48 hours." },
    { t: "Kickoff", d: "Meet your maker, lock scope and dates, and get a shared workspace for feedback." },
    { t: "Deliver", d: "Review work in rounds, approve it, and own every file once the final invoice is paid." }
  ],

  clients: ["Lumé", "Northwind", "Kōbo", "Fable & Co", "Halcyon", "Terrace Pay", "Orbit Labs", "Marlow"],

  testimonials: [
    { text: "We briefed on Monday, had three portfolios by Wednesday and a first cut by Friday. It felt like an in-house team without the overhead.", by: "Areeba S.", role: "Founder, Lumé Skincare" },
    { text: "The portfolios made the decision easy. I could see the exact kind of work I would get, and the results beat the samples.", by: "Daniel R.", role: "Head of Growth, Orbit Labs" },
    { text: "Our ad buyer paid for herself in the first month. Honest reporting, zero fluff, and she flagged problems before we noticed them.", by: "Mei L.", role: "COO, Kōbo Home" }
  ],

  /* ---------- Skill categories ----------
     color = soft tint, deep = stronger shade used inside artwork.
     icon must be one of: film, pen, code, share, target, search, quill, sparkle, camera */
  categories: [
    {
      slug: "video-editing", name: "Video Editing", icon: "film", color: "#FFD9C7", deep: "#F08A5D",
      short: "Reels, ads, YouTube and brand films that hold attention past second three.",
      intro: "Great footage dies in a bad edit. Our editors cut for retention: tight pacing, sound design, captions people actually read, and hooks that stop the scroll.",
      delivers: ["Short-form reels and TikToks", "YouTube long-form", "Ad creatives and UGC cuts", "Motion graphics and captions"],
      pricing: [["Starter", "$45+", "One short-form edit"], ["Growth", "$450+", "A monthly pack of 8 to 12 edits"], ["Studio", "$1,500+", "A brand film or full campaign"]],
      faqs: [
        ["What do I need to send you?", "Raw footage, a rough brief and any reference videos you like. Brand fonts, colours and music preferences help. We handle the rest."],
        ["How many revisions are included?", "Two rounds on every edit. Most clients only need one."],
        ["Can you cut for every platform?", "Yes. We deliver 9:16, 1:1 and 16:9 versions with captions placed inside each platform's safe zone."]
      ]
    },
    {
      slug: "graphic-design", name: "Graphic Design", icon: "pen", color: "#CDEBD9", deep: "#4FB07E",
      short: "Identities, packaging, decks and campaign visuals with a point of view.",
      intro: "Design that makes a small brand look inevitable. From logo systems to launch campaigns, our designers build a visual world that stays consistent everywhere you show up.",
      delivers: ["Brand identity and logo systems", "Packaging and print", "Social and ad creatives", "Pitch decks and brand guidelines"],
      pricing: [["Starter", "$120+", "A logo or a single asset"], ["Growth", "$600+", "A compact identity system"], ["Studio", "$2,500+", "Full brand with guidelines"]],
      faqs: [
        ["Do I own the final files?", "Yes. You get full ownership and all source files once the final invoice is paid."],
        ["Can you work with our existing brand?", "Absolutely. Send your guidelines or old files and we will extend the look instead of reinventing it."],
        ["How long does an identity take?", "Usually two to four weeks, depending on how many rounds of feedback you need."]
      ]
    },
    {
      slug: "web-development", name: "Web Development", icon: "code", color: "#DCD3F5", deep: "#8B73D9",
      short: "Fast, conversion-minded websites, stores and web apps.",
      intro: "A website should load fast, read clearly and turn visitors into customers. Our developers build sites your team can actually maintain, from landing pages to full stores.",
      delivers: ["Marketing websites", "Landing pages and CRO tests", "Shopify and e-commerce", "Custom web apps"],
      pricing: [["Starter", "$400+", "A single landing page"], ["Growth", "$1,800+", "A 5 to 8 page marketing site"], ["Studio", "$6,000+", "A custom app or full store"]],
      faqs: [
        ["Which tools do you build with?", "Next.js, Webflow, Shopify and WordPress. We pick whatever your team will find easiest to maintain."],
        ["Can I edit the site myself?", "Yes. Every build ships with a CMS or editable blocks, plus a short video walkthrough."],
        ["Do you handle hosting and launch?", "We can. We set up hosting, analytics, redirects and a launch checklist so nothing breaks on go-live day."]
      ]
    },
    {
      slug: "social-media", name: "Social Media", icon: "share", color: "#FBEBA8", deep: "#E0B72E",
      short: "Strategy, content calendars, community and creator partnerships.",
      intro: "Social works when it feels like a real person is behind it. Our managers plan, publish and talk to your audience so your brand shows up consistently and sounds human.",
      delivers: ["Content strategy and calendars", "Posting and community management", "Creator and influencer outreach", "Monthly reporting"],
      pricing: [["Starter", "$400+ / mo", "Two platforms, 12 posts"], ["Growth", "$900+ / mo", "Three platforms with community care"], ["Studio", "$2,200+ / mo", "Full content, creators and reporting"]],
      faqs: [
        ["Do you create the content too?", "Yes. Managers work with our designers and editors, or with your own team if you prefer."],
        ["Will you reply to comments and DMs?", "Yes, in your voice. We agree a tone guide and escalation rules during kickoff."],
        ["How do you report results?", "A plain monthly summary: what worked, what did not, and what we are changing next."]
      ]
    },
    {
      slug: "performance-ads", name: "Performance Ads", icon: "target", color: "#CBE4F7", deep: "#4C9BD6",
      short: "Meta and Google campaigns built around profit, not vanity metrics.",
      intro: "Ad spend should be an investment you can measure. Our buyers build account structures, test creative and report on the numbers that matter: cost per customer and return on spend.",
      delivers: ["Meta and Instagram ads", "Google Search, Shopping and PMax", "Creative testing", "Weekly reporting and optimisation"],
      pricing: [["Audit", "$500+", "Account audit and a setup plan"], ["Growth", "$1,200+ / mo", "Managed spend up to $10k"], ["Studio", "$3,000+ / mo", "Full-funnel, multi-channel"]],
      faqs: [
        ["Is ad spend included?", "No. Your ad budget goes straight to the platforms from your own account. You pay us only for management."],
        ["How soon will I see results?", "Early signals show within two weeks. Stable, scalable results usually take six to eight weeks."],
        ["Do you make the ad creatives as well?", "We can. Our editors, designers and AI creators are on the same roster and plug straight into your campaigns."]
      ]
    },
    {
      slug: "seo", name: "SEO", icon: "search", color: "#DDE7C7", deep: "#7FA044",
      short: "Technical audits, content strategy and link earning that compounds.",
      intro: "Search traffic is the one channel that gets cheaper over time. Our specialists fix what is holding your site back, then build content that keeps earning rankings.",
      delivers: ["Technical SEO audits", "Keyword and topic strategy", "Content briefs and optimisation", "Link building and digital PR"],
      pricing: [["Audit", "$350+", "A full technical audit"], ["Growth", "$800+ / mo", "Content and on-page optimisation"], ["Studio", "$2,500+ / mo", "Technical, content and links"]],
      faqs: [
        ["How long until SEO works?", "Technical fixes can move the needle in weeks. Content-led growth typically shows in three to six months."],
        ["Do you guarantee rankings?", "No one honest can. We commit to the work, the reporting and the strategy, and we show you the traffic and revenue it drives."],
        ["Can you work with our developers?", "Yes. We write clear tickets your developers can pick up, and check the fixes once they ship."]
      ]
    },
    {
      slug: "copywriting", name: "Copywriting", icon: "quill", color: "#F9D0DC", deep: "#E0648A",
      short: "Website copy, ads, emails and a brand voice that sounds like a person.",
      intro: "Clear words sell. Our writers turn what you do into messages people understand in five seconds, then keep that voice consistent across your site, ads and inbox.",
      delivers: ["Website and landing page copy", "Ad copy and scripts", "Email sequences", "Brand voice and messaging"],
      pricing: [["Starter", "$120+", "A page or an ad set"], ["Growth", "$450+", "A landing page and an email sequence"], ["Studio", "$1,800+", "Brand voice and a full website"]],
      faqs: [
        ["Do you research our industry first?", "Always. Writers start with customer interviews, reviews and competitor pages before they write a word."],
        ["Can you match our tone?", "Yes. Share three pieces you like and we will write a short voice guide for your approval before drafting."],
        ["Do you write in other languages?", "Several of our writers work in Spanish, Hindi, Urdu and Arabic. Ask us when you brief."]
      ]
    },
    {
      slug: "ai-content", name: "AI Content & Ads", icon: "sparkle", color: "#C9EDEA", deep: "#3AA6A0",
      short: "AI-made ads, avatars and product visuals, art-directed by humans.",
      intro: "AI lets small teams test more ideas for less money, but only when someone with taste is in charge. Our creators direct, retouch and edit every output so it looks like your brand.",
      delivers: ["AI ad creatives", "AI spokesperson and avatar videos", "Product and lifestyle visuals", "Localisation into new languages"],
      pricing: [["Starter", "$100+", "One AI ad or video"], ["Growth", "$600+ / mo", "A monthly content pack"], ["Studio", "$2,000+", "A full AI-driven campaign"]],
      faqs: [
        ["Will it look obviously AI-generated?", "Not when it is directed well. Every output is art-directed, retouched and edited so it feels on-brand."],
        ["Can you show my product accurately?", "Yes. We build from your real product photos so shapes, labels and colours stay correct."],
        ["Who owns the assets?", "You do. We only use tools whose licences allow commercial use, and we tell you which ones."]
      ]
    },
    {
      slug: "photography", name: "Photography", icon: "camera", color: "#EAD9C0", deep: "#B98A4E",
      short: "Product, lifestyle and brand photography that sells the feeling.",
      intro: "Photos are often the first thing a customer judges you on. Our photographers plan, style and shoot images that make products look worth buying and brands look worth trusting.",
      delivers: ["Product and e-commerce shots", "Lifestyle and campaign shoots", "Team and brand portraits", "Retouching and colour grading"],
      pricing: [["Starter", "$150+", "A half-day product shoot"], ["Growth", "$500+", "A full-day lifestyle shoot"], ["Studio", "$1,800+", "A campaign with styling and retouching"]],
      faqs: [
        ["Where do the shoots happen?", "In our partner studios, at your location, or remotely, where you ship products to the photographer."],
        ["What do we receive?", "Edited, web-ready files plus print-resolution versions, usually within five working days."],
        ["Can you handle styling and props?", "Yes. Tell us the mood and we will bring a stylist and props, or work with what you have."]
      ]
    }
  ],

  /* ---------- Talent (each with their own portfolio) ----------
     avail: "now" | "soon" | "limited"     tier: 1 (budget) 2 (mid) 3 (premium)
     projects[].kind: "visual" shows in the masonry gallery, "case" shows as a results card.
     Optional fields: project.img / talent.photo (image path), project.video (YouTube id), project.link (live site) */
  talents: [
    /* ---------- Video Editing ---------- */
    {
      id: "zain-malik", name: "Zain Malik", cat: "video-editing", title: "Short-form and ad video editor", tier: 2, from: "From $45 per edit",
      rating: 4.9, jobs: 128, avail: "now", availText: "Available now", loc: "Lahore", resp: "Replies in about 2 hours",
      bio: "Zain has cut over 1,500 short-form videos for beauty, fashion and food brands. He starts every edit with the first three seconds and works backwards, so the hook is never an afterthought.",
      skills: ["Reels and Shorts", "Ad creatives", "Captions", "Sound design"], tools: ["Premiere Pro", "After Effects", "CapCut"],
      review: { by: "Areeba S.", role: "Founder, Lumé Skincare", text: "Zain understood the brief in one call. Every reel felt native to the platform and our watch time doubled." },
      projects: [
        { title: "Glow Serum Launch Reels", client: "Lumé Skincare", kind: "visual", year: 2025, tags: ["Reels", "Beauty"], summary: "Twelve vertical edits for a serum launch with hook-first pacing, texture close-ups and native captions.", metrics: [["4.1M", "Views in 30 days"], ["+312%", "Average watch time"]], problem: "The brand's launch videos looked polished but lost viewers in the first two seconds.", approach: "We rebuilt every cut around a three-second hook, tightened pacing to one beat per shot and designed captions for sound-off viewing.", result: "Watch time more than tripled and the first batch of the serum sold out in nine days." },
        { title: "UGC Ad Pack That Halved CPA", client: "Northwind Apparel", kind: "case", year: 2025, tags: ["Ad creatives", "UGC"], summary: "Twenty-six UGC-style ad variants cut from creator footage and tested in weekly batches.", metrics: [["-48%", "Cost per purchase"], ["3.9x", "Return on ad spend"], ["26", "Ad variants shipped"]], problem: "Static ads were fatiguing fast and cost per purchase kept climbing.", approach: "We edited 26 UGC-style variants from creator footage, testing hooks, offers and pacing in weekly batches.", result: "Cost per purchase dropped by nearly half and two variants became the account's best performers." }
      ]
    },
    {
      id: "sofia-marino", name: "Sofia Marino", cat: "video-editing", title: "Long-form and documentary editor", tier: 3, from: "From $90 per hour",
      rating: 4.8, jobs: 74, avail: "soon", availText: "Free from next week", loc: "Milan", resp: "Replies in about 5 hours",
      bio: "A former broadcast editor, Sofia shapes interviews, b-roll and music into stories people watch to the end. She is the person you want for brand films, founder stories and YouTube series.",
      skills: ["Brand films", "YouTube long-form", "Colour grading", "Storytelling"], tools: ["DaVinci Resolve", "Premiere Pro", "Frame.io"],
      review: { by: "Daniel R.", role: "Head of Growth, Orbit Labs", text: "Sofia found the story in six hours of interviews. The final film is the best thing we have published." },
      projects: [
        { title: "Roots, a Coffee Documentary", client: "Halcyon Roasters", kind: "visual", year: 2025, tags: ["Brand film", "Documentary"], summary: "A twelve-minute film following one coffee from a highland farm to the cup.", metrics: [["12 min", "Runtime"], ["1.2M", "YouTube views"]], problem: "The roaster had beautiful footage but no narrative connecting farmers to customers.", approach: "We built the story around one farmer's harvest, using her own words as the narration and letting the footage breathe.", result: "The film became the brand's most-watched video and is now used in every wholesale pitch." },
        { title: "YouTube Channel Rebuild", client: "Orbit Labs", kind: "case", year: 2024, tags: ["YouTube", "Long-form"], summary: "A new editing style, thumbnails and pacing system for a software company's channel.", metrics: [["+210%", "Average view duration"], ["58K", "New subscribers"], ["6 months", "Timeline"]], problem: "Videos were informative but slow, and viewers dropped off before the first demo.", approach: "We restructured every episode to open with the outcome, cut dead air and added chapter markers and pattern interrupts.", result: "Average view duration tripled and the channel became a steady source of demo requests." }
      ]
    },

    /* ---------- Graphic Design ---------- */
    {
      id: "aisha-rahman", name: "Aisha Rahman", cat: "graphic-design", title: "Brand identity designer", tier: 3, from: "From $600 per identity",
      rating: 5.0, jobs: 63, avail: "limited", availText: "One slot open in October", loc: "Dubai", resp: "Replies in about 4 hours",
      bio: "Aisha designs identity systems that survive contact with the real world: logos that work at favicon size, palettes that print properly and guidelines your team will actually follow.",
      skills: ["Logo systems", "Packaging", "Brand guidelines", "Typography"], tools: ["Illustrator", "Figma", "InDesign"],
      review: { by: "Kenji T.", role: "Founder, Marlow Tea Co.", text: "Aisha made our tea look like it had been around for a hundred years. Customers ask who designed the tins." },
      projects: [
        { title: "Marlow Tea Identity", client: "Marlow Tea Co.", kind: "visual", year: 2025, tags: ["Identity", "Packaging"], summary: "A complete identity and packaging range for a small-batch tea company.", metrics: [["14", "Packaging designs"], ["1", "Full identity system"]], problem: "The founder's tea was excellent but the packaging looked like every other supermarket tin.", approach: "We drew a set of botanical illustrations, paired them with a confident serif wordmark and a colour code for each blend.", result: "Marlow won a shelf in two national retailers within four months of the relaunch." },
        { title: "Rebrand for a Fintech Startup", client: "Terrace Pay", kind: "case", year: 2025, tags: ["Rebrand", "Guidelines"], summary: "A new visual identity, product illustration style and brand guidelines.", metrics: [["+38%", "Brand recall"], ["2.4x", "Demo requests"], ["5 weeks", "Timeline"]], problem: "Terrace looked like every other payments company and struggled to be remembered after sales calls.", approach: "We moved away from blue gradients toward a warm, editorial identity and wrote guidelines that product and marketing could both use.", result: "Brand recall climbed by more than a third and demo requests rose by 2.4x the following quarter." }
      ]
    },
    {
      id: "diego-alvarez", name: "Diego Alvarez", cat: "graphic-design", title: "Social and campaign designer", tier: 2, from: "From $35 per hour",
      rating: 4.8, jobs: 152, avail: "now", availText: "Available now", loc: "Mexico City", resp: "Replies in about 2 hours",
      bio: "Diego builds flexible template systems so your team can publish on-brand posts every day without opening a design tool. He is fast, tidy and very good at carousels.",
      skills: ["Social templates", "Carousels", "Ad creatives", "Motion posters"], tools: ["Figma", "Photoshop", "Canva"],
      review: { by: "Lucia F.", role: "Marketing Lead, Fable & Co", text: "Diego handed us forty templates and a one-page guide. Our own team now ships posts in ten minutes." },
      projects: [
        { title: "Summer Drop Campaign Kit", client: "Northwind Apparel", kind: "visual", year: 2025, tags: ["Social", "Campaign"], summary: "A full campaign kit: posts, stories, ads, email headers and in-store posters.", metrics: [["60", "Assets delivered"], ["9 days", "Turnaround"]], problem: "The team needed a summer campaign across eight channels with only two weeks to prepare.", approach: "We designed one flexible grid and colour system, then produced every format from the same master files.", result: "The campaign launched on time and looked coherent from Instagram to the shop window." },
        { title: "Carousels That Doubled Saves", client: "Fable & Co", kind: "case", year: 2025, tags: ["Social", "Carousels"], summary: "A carousel template system built around one idea per slide.", metrics: [["2.1x", "Saves per post"], ["+64%", "Profile visits"], ["40", "Templates built"]], problem: "Posts were pretty but did not give people a reason to save or share them.", approach: "We restructured content into a clear hook, three steps and a summary slide, and designed 40 templates around that flow.", result: "Saves per post more than doubled and profile visits rose by 64%." }
      ]
    },

    /* ---------- Web Development ---------- */
    {
      id: "omar-farouk", name: "Omar Farouk", cat: "web-development", title: "Full-stack developer, Next.js and Shopify", tier: 3, from: "From $60 per hour",
      rating: 4.9, jobs: 91, avail: "soon", availText: "Free in two weeks", loc: "Cairo", resp: "Replies in about 3 hours",
      bio: "Omar builds fast, well-tested sites and stores and documents everything so your team is never locked in. He cares about page speed the way other people care about coffee.",
      skills: ["Next.js", "Shopify", "Performance", "APIs"], tools: ["React", "TypeScript", "Vercel", "Liquid"],
      review: { by: "Mei L.", role: "COO, Kōbo Home", text: "Omar rebuilt our store without a single hour of downtime. Pages load in under a second." },
      projects: [
        { title: "Orbit Labs Marketing Site", client: "Orbit Labs", kind: "visual", year: 2025, tags: ["Next.js", "SaaS"], summary: "A fast, animated marketing site with a documentation hub and a blog.", metrics: [["98", "Lighthouse score"], ["24", "Pages built"]], problem: "The old site was slow and every content change needed a developer.", approach: "We rebuilt it in Next.js with a headless CMS so marketers can publish pages without help.", result: "The site scores 98 on Lighthouse and marketing now ships new pages without waiting on engineering.", link: "https://example.com" },
        { title: "Headless Store Rebuild", client: "Kōbo Home", kind: "case", year: 2024, tags: ["Shopify", "Performance"], summary: "A headless Shopify storefront tuned for speed and mobile checkout.", metrics: [["+27%", "Conversion rate"], ["0.9 s", "Load time"], ["-41%", "Bounce rate"]], problem: "A heavy theme made the store slow, especially on mobile where most orders came from.", approach: "We moved to a headless storefront, trimmed scripts, optimised images and simplified the checkout path.", result: "Load time dropped to under a second and conversion rose by 27%." }
      ]
    },
    {
      id: "priya-nair", name: "Priya Nair", cat: "web-development", title: "Webflow and landing page designer-developer", tier: 2, from: "From $900 per site",
      rating: 4.9, jobs: 110, avail: "now", availText: "Available now", loc: "Bengaluru", resp: "Replies in about 2 hours",
      bio: "Priya designs and builds in Webflow, so what you approve is exactly what launches. She is at her best on landing pages, conversion tests and small business sites.",
      skills: ["Webflow", "Landing pages", "A/B testing", "Animations"], tools: ["Webflow", "Figma", "Lottie"],
      review: { by: "Sam K.", role: "Owner, Halcyon Roasters", text: "Priya turned a rough sketch into a storefront in nine days. Online orders are up by a third." },
      projects: [
        { title: "Halcyon Roasters Storefront", client: "Halcyon Roasters", kind: "visual", year: 2025, tags: ["Webflow", "E-commerce"], summary: "A warm, image-led storefront with subscriptions and a wholesale enquiry flow.", metrics: [["+33%", "Online orders"], ["9 days", "Design to launch"]], problem: "The roaster sold through marketplaces and had no branded place to sell directly.", approach: "We designed a storefront around the roasting story, with a simple subscription flow and a separate wholesale route.", result: "Direct orders grew by a third and subscriptions now make up half of revenue.", link: "https://example.com" },
        { title: "Landing Page Sprint", client: "Terrace Pay", kind: "case", year: 2025, tags: ["Landing page", "CRO"], summary: "A landing page and three rounds of A/B tests in two weeks.", metrics: [["+52%", "Sign-ups"], ["9 days", "Design to launch"], ["3", "A/B tests run"]], problem: "Paid traffic was landing on the homepage and most visitors left without signing up.", approach: "We built a focused landing page, then tested the headline, proof section and form length in successive rounds.", result: "Sign-ups rose by 52% and the winning layout became the template for later campaigns." }
      ]
    },

    /* ---------- Social Media ---------- */
    {
      id: "hannah-cole", name: "Hannah Cole", cat: "social-media", title: "Social media manager and content strategist", tier: 2, from: "From $700 per month",
      rating: 4.9, jobs: 58, avail: "limited", availText: "Two client slots left", loc: "Manchester", resp: "Replies in about 3 hours",
      bio: "Hannah plans, writes and publishes for founder-led brands. She keeps a tight content calendar, replies to comments like a real person and reports on what actually moved the business.",
      skills: ["Content calendars", "Community care", "Instagram", "LinkedIn"], tools: ["Notion", "Later", "Meta Business Suite"],
      review: { by: "Areeba S.", role: "Founder, Lumé Skincare", text: "Hannah sounds like us on our best day. Our comments section is now a community, not a graveyard." },
      projects: [
        { title: "A Year of Instagram", client: "Fable & Co", kind: "visual", year: 2025, tags: ["Instagram", "Content calendar"], summary: "Twelve months of planned content across feed, stories and reels.", metrics: [["365", "Days of content"], ["6.4%", "Engagement rate"]], problem: "Posting was sporadic and there was no shared idea of what the account was for.", approach: "We defined four content pillars, built a monthly calendar and batch-produced content in weekly sessions.", result: "Engagement rose steadily and the team now spends about a third of the time they used to." },
        { title: "Zero to 100K in Nine Months", client: "Lumé Skincare", kind: "case", year: 2025, tags: ["Growth", "Instagram"], summary: "Organic growth built on education, creator collaborations and daily community replies.", metrics: [["100K", "Followers"], ["6.8%", "Engagement rate"], ["9 months", "Timeline"]], problem: "The brand had good products and almost no organic presence.", approach: "We shifted to educational content, partnered with skin experts and replied to every comment in the first hour.", result: "The account passed 100K followers with an engagement rate more than three times the category average." }
      ]
    },
    {
      id: "kabir-mehta", name: "Kabir Mehta", cat: "social-media", title: "Community and creator partnerships lead", tier: 1, from: "From $400 per month",
      rating: 4.7, jobs: 39, avail: "now", availText: "Available now", loc: "Mumbai", resp: "Replies in about 4 hours",
      bio: "Kabir finds the right creators, negotiates fair deals and builds communities that stick around. He is a good pick when you want reach without paying celebrity rates.",
      skills: ["Creator outreach", "Community building", "UGC programmes", "Discord"], tools: ["Airtable", "Discord", "Notion"],
      review: { by: "Mei L.", role: "COO, Kōbo Home", text: "Kabir sourced 30 creators in two weeks and negotiated deals we could not have done ourselves." },
      projects: [
        { title: "Creator Seeding Programme", client: "Kōbo Home", kind: "visual", year: 2025, tags: ["Creators", "UGC"], summary: "A gifting and affiliate programme with 30 home and lifestyle creators.", metrics: [["30", "Creators onboarded"], ["120", "Posts generated"]], problem: "The brand had no creator presence and no clear way to work with them.", approach: "We built a simple shortlist, briefing template and tracking sheet, then onboarded creators in waves.", result: "Thirty creators published 120 posts in the first two months, all of which became reusable ad content." },
        { title: "Community Launch on Discord", client: "Orbit Labs", kind: "case", year: 2024, tags: ["Community", "Launch"], summary: "A Discord community for software users, launched with 12 creator partners.", metrics: [["4,200", "Members in 60 days"], ["71%", "Weekly active"], ["12", "Creator partners"]], problem: "Users had questions but nowhere to ask them, and support tickets were piling up.", approach: "We designed channels around real jobs, invited early adopters as moderators and seeded discussions with creators.", result: "The community reached 4,200 members in two months and cut support tickets noticeably." }
      ]
    },

    /* ---------- Performance Ads ---------- */
    {
      id: "liam-oconnor", name: "Liam O'Connor", cat: "performance-ads", title: "Meta Ads strategist", tier: 3, from: "From $1,000 per month",
      rating: 4.9, jobs: 84, avail: "soon", availText: "Free from October", loc: "Dublin", resp: "Replies in about 3 hours",
      bio: "Liam has managed over $6M in Meta spend for direct-to-consumer brands. He builds simple account structures, tests creative hard and tells you plainly when something is not working.",
      skills: ["Meta Ads", "Creative testing", "Attribution", "Scaling"], tools: ["Meta Ads Manager", "Triple Whale", "Looker Studio"],
      review: { by: "Areeba S.", role: "Founder, Lumé Skincare", text: "Liam took us from break-even to 5x return in a quarter. His weekly notes are the clearest reporting we get." },
      projects: [
        { title: "Always-On Creative Library", client: "Northwind Apparel", kind: "visual", year: 2025, tags: ["Meta Ads", "Creative"], summary: "A tested library of 80 ad concepts organised by angle, audience and result.", metrics: [["80", "Concepts tested"], ["9", "Winning angles"]], problem: "The team kept running one or two ads until they burned out.", approach: "We built a testing calendar, tagged every ad by angle and retired losers quickly.", result: "Nine winning angles emerged and the account no longer depends on any single ad." },
        { title: "Scaling a DTC Brand to 5.2x ROAS", client: "Lumé Skincare", kind: "case", year: 2025, tags: ["Meta Ads", "DTC"], summary: "A restructured account with a clear testing framework and weekly scaling rules.", metrics: [["5.2x", "Blended ROAS"], ["-34%", "Customer acquisition cost"], ["$180K", "Monthly ad spend"]], problem: "Spend was growing but returns were flat and the account had over 60 overlapping ad sets.", approach: "We consolidated to five campaigns, moved to broad targeting and put creative testing on a weekly rhythm.", result: "Return on ad spend reached 5.2x while monthly spend tripled." }
      ]
    },
    {
      id: "sara-khan", name: "Sara Khan", cat: "performance-ads", title: "Google Ads and Performance Max specialist", tier: 3, from: "From $900 per month",
      rating: 4.8, jobs: 67, avail: "now", availText: "Available now", loc: "Toronto", resp: "Replies in about 4 hours",
      bio: "Sara turns search intent into revenue. She is strong on lead generation for B2B firms and on shopping feeds for e-commerce, and she reports in the language of finance teams.",
      skills: ["Google Search", "Performance Max", "Shopping feeds", "Lead gen"], tools: ["Google Ads", "GA4", "Tag Manager"],
      review: { by: "Daniel R.", role: "Head of Growth, Orbit Labs", text: "Sara halved our cost per lead in one quarter and explained every change she made. Easy decision to renew." },
      projects: [
        { title: "Performance Max Asset Suite", client: "Kōbo Home", kind: "visual", year: 2025, tags: ["Google Ads", "PMax"], summary: "Feed clean-up and a full creative asset set for Performance Max campaigns.", metrics: [["4.4x", "ROAS"], ["600", "Products optimised"]], problem: "Performance Max was spending on the wrong products because the feed was messy.", approach: "We rewrote titles, fixed categories and built asset groups by product family with tailored creative.", result: "Return on ad spend rose to 4.4x and the budget flowed to the best-selling ranges." },
        { title: "Lead Gen for a B2B Software Firm", client: "Orbit Labs", kind: "case", year: 2025, tags: ["Google Ads", "B2B"], summary: "A rebuilt search account focused on high-intent keywords and offline conversion tracking.", metrics: [["-52%", "Cost per lead"], ["3.1x", "Qualified leads"], ["90 days", "Timeline"]], problem: "Leads were cheap but low quality, and sales had stopped trusting the numbers.", approach: "We tracked closed deals back into Google Ads, cut broad keywords and wrote ads for buyers rather than browsers.", result: "Cost per lead halved and qualified leads tripled within a quarter." }
      ]
    },

    /* ---------- SEO ---------- */
    {
      id: "elena-petrova", name: "Elena Petrova", cat: "seo", title: "Technical SEO consultant", tier: 3, from: "From $80 per hour",
      rating: 4.9, jobs: 71, avail: "soon", availText: "Free in three weeks", loc: "Berlin", resp: "Replies in about 6 hours",
      bio: "Elena finds the crawl, speed and structure issues that quietly hold large sites back. She writes tickets developers love and checks that each fix actually shipped.",
      skills: ["Technical audits", "Site architecture", "Migrations", "Core Web Vitals"], tools: ["Screaming Frog", "Search Console", "Ahrefs"],
      review: { by: "Mei L.", role: "COO, Kōbo Home", text: "Elena's audit was the most useful document our developers have received. Traffic followed within weeks." },
      projects: [
        { title: "Technical Audit Report", client: "Terrace Pay", kind: "visual", year: 2025, tags: ["Technical SEO", "Audit"], summary: "A 60-page audit with a prioritised fix list and a redirect map.", metrics: [["112", "Issues found"], ["18", "High-impact fixes"]], problem: "The site had grown fast and no one knew which technical issues actually mattered.", approach: "We crawled the site, ranked every issue by traffic impact and effort, and wrote developer-ready tickets.", result: "The team cleared the top 18 fixes in six weeks and organic sign-ups began to climb." },
        { title: "From Page 4 to Page 1", client: "Kōbo Home", kind: "case", year: 2024, tags: ["Technical SEO", "E-commerce"], summary: "Faceted navigation, internal linking and category page rewrites for an online store.", metrics: [["+186%", "Organic traffic"], ["47", "Keywords on page 1"], ["8 months", "Timeline"]], problem: "Thousands of duplicate filter pages diluted rankings and category pages sat on page four.", approach: "We controlled faceted URLs, rebuilt internal linking and rewrote category pages around real search demand.", result: "Organic traffic nearly tripled and 47 target keywords reached the first page." }
      ]
    },
    {
      id: "jamal-brooks", name: "Jamal Brooks", cat: "seo", title: "Content SEO strategist", tier: 2, from: "From $600 per month",
      rating: 4.7, jobs: 52, avail: "now", availText: "Available now", loc: "Chicago", resp: "Replies in about 4 hours",
      bio: "Jamal maps what your customers search for, then plans and edits content that answers it better than anyone else. He works closely with writers and keeps everything tied to revenue.",
      skills: ["Keyword research", "Topic clusters", "Content briefs", "Link earning"], tools: ["Ahrefs", "Surfer", "Google Sheets"],
      review: { by: "Sam K.", role: "Owner, Halcyon Roasters", text: "Our blog went from a hobby to our third-biggest source of orders. Jamal made it simple to follow." },
      projects: [
        { title: "Topic Cluster Blueprint", client: "Fable & Co", kind: "visual", year: 2025, tags: ["Content SEO", "Strategy"], summary: "A visual map of 12 topic clusters and 90 planned articles.", metrics: [["12", "Topic clusters"], ["90", "Articles planned"]], problem: "The blog covered random topics and no article supported another.", approach: "We built a cluster map from search data and sequenced publishing so each article strengthened the last.", result: "The team now has a twelve-month plan and every article has a clear job." },
        { title: "A Blog That Pays for Itself", client: "Halcyon Roasters", kind: "case", year: 2024, tags: ["Content SEO", "Blog"], summary: "A content programme built around brewing guides and buying questions.", metrics: [["+240%", "Organic sessions"], ["18%", "Blog-to-sale rate"], ["12 months", "Timeline"]], problem: "The blog was updated occasionally and did not connect to anything people could buy.", approach: "We wrote for the questions coffee buyers ask, added product recommendations and refreshed old posts.", result: "Organic sessions more than tripled and the blog became a reliable source of orders." }
      ]
    },

    /* ---------- Copywriting ---------- */
    {
      id: "maya-fernandez", name: "Maya Fernandez", cat: "copywriting", title: "Conversion copywriter", tier: 2, from: "From $250 per page",
      rating: 4.9, jobs: 96, avail: "now", availText: "Available now", loc: "Madrid", resp: "Replies in about 3 hours",
      bio: "Maya rewrites websites and landing pages so visitors understand the offer in five seconds. She interviews your customers first and writes second.",
      skills: ["Landing pages", "Website copy", "Brand voice", "Messaging"], tools: ["Notion", "Google Docs", "Hotjar"],
      review: { by: "Areeba S.", role: "Founder, Lumé Skincare", text: "Maya read every review we had before writing a word. Our conversion rate jumped by 41%." },
      projects: [
        { title: "Homepage Rewrite", client: "Terrace Pay", kind: "visual", year: 2025, tags: ["Website copy", "Brand voice"], summary: "A full homepage rewrite in a warmer, plainer voice.", metrics: [["6", "Sections rewritten"], ["+29%", "Time on page"]], problem: "The homepage was full of jargon and visitors could not say what the product did.", approach: "We interviewed customers, borrowed their words and rewrote each section to answer one question.", result: "Visitors stayed longer and sales calls started with better questions." },
        { title: "Landing Page Copy That Lifted Conversions", client: "Lumé Skincare", kind: "case", year: 2025, tags: ["Landing page", "CRO"], summary: "Research-led copy for a paid-traffic landing page.", metrics: [["+41%", "Conversion rate"], ["2.3x", "Add-to-cart rate"], ["14 days", "Turnaround"]], problem: "Ads were driving traffic, but the landing page repeated the brand story instead of answering doubts.", approach: "We mined reviews for objections, led with proof and rewrote the page around the three biggest worries.", result: "Conversion rose by 41% and the copy became the template for other products." }
      ]
    },
    {
      id: "noah-whitfield", name: "Noah Whitfield", cat: "copywriting", title: "Email and lifecycle writer", tier: 2, from: "From $300 per sequence",
      rating: 4.8, jobs: 81, avail: "soon", availText: "Free from next week", loc: "Austin", resp: "Replies in about 5 hours",
      bio: "Noah writes the emails your customers actually read: welcome series, abandoned carts, win-backs and launches. He is dry, funny and obsessed with subject lines.",
      skills: ["Welcome series", "Abandoned cart flows", "Newsletters", "Subject lines"], tools: ["Klaviyo", "Mailchimp", "Google Docs"],
      review: { by: "Mei L.", role: "COO, Kōbo Home", text: "Noah rewrote our cart emails and revenue from the flow went up by two thirds. Clear, funny, effective." },
      projects: [
        { title: "Welcome Series Email Suite", client: "Northwind Apparel", kind: "visual", year: 2025, tags: ["Email", "Lifecycle"], summary: "A seven-email welcome series in a friendly, self-aware voice.", metrics: [["7", "Emails written"], ["52%", "Open rate"]], problem: "New subscribers received a discount code and then nothing for weeks.", approach: "We wrote a series that introduced the brand, showed the bestsellers and answered common questions.", result: "Open rates held above 50% and first-order revenue from new subscribers increased." },
        { title: "Abandoned Cart Flow Rewrite", client: "Kōbo Home", kind: "case", year: 2025, tags: ["Email", "E-commerce"], summary: "A five-email abandoned cart flow with reviews, FAQs and a gentle nudge.", metrics: [["+68%", "Flow revenue"], ["4.2x", "Click-through rate"], ["5", "Emails rewritten"]], problem: "Cart emails were generic and sent a discount straight away, which trained customers to wait.", approach: "We rewrote each email to address a specific hesitation and moved the incentive to the final message.", result: "Revenue from the flow rose by 68% and discount usage fell." }
      ]
    },

    /* ---------- AI Content & Ads ---------- */
    {
      id: "ravi-shankar", name: "Ravi Shankar", cat: "ai-content", title: "AI ad creative director", tier: 2, from: "From $200 per campaign",
      rating: 4.8, jobs: 47, avail: "now", availText: "Available now", loc: "Hyderabad", resp: "Replies in about 2 hours",
      bio: "Ravi combines image models, retouching and real ad instincts to produce dozens of ad concepts in days rather than weeks. He is a good fit for brands that want to test a lot of ideas cheaply.",
      skills: ["AI ad concepts", "Product visuals", "Creative testing", "Retouching"], tools: ["Midjourney", "Photoshop", "Runway"],
      review: { by: "Areeba S.", role: "Founder, Lumé Skincare", text: "Ravi produced 120 ad variants in three weeks and three of them beat our best studio shoot." },
      projects: [
        { title: "AI Fashion Lookbook", client: "Northwind Apparel", kind: "visual", year: 2025, tags: ["AI ads", "Fashion"], summary: "A digital lookbook with garments placed in imagined locations, built from real product photos.", metrics: [["48", "Looks created"], ["5 days", "Turnaround"]], problem: "The brand wanted location shoots for a new range but had no budget for travel.", approach: "We used real garment photos as the base, generated locations and retouched every image for realistic fabric and light.", result: "The lookbook launched with the collection at a fraction of the cost of a location shoot." },
        { title: "AI Ad Testing at Scale", client: "Lumé Skincare", kind: "case", year: 2025, tags: ["AI ads", "Creative testing"], summary: "A structured programme of 120 AI-assisted ad concepts tested over three weeks.", metrics: [["120", "Variants tested"], ["-44%", "Cost per click"], ["3 weeks", "Timeline"]], problem: "Creative production was the bottleneck; the ad account needed far more ideas than the team could shoot.", approach: "We designed concept families, produced variants with AI tools and killed weak ideas within 48 hours.", result: "Cost per click fell by 44% and the best concepts moved into full production." }
      ]
    },
    {
      id: "chloe-tan", name: "Chloe Tan", cat: "ai-content", title: "AI video and avatar producer", tier: 2, from: "From $150 per video",
      rating: 4.7, jobs: 35, avail: "limited", availText: "Two slots open this month", loc: "Singapore", resp: "Replies in about 4 hours",
      bio: "Chloe produces spokesperson videos, product explainers and multilingual versions using AI avatars and voice tools, with a human editor's eye for pacing and polish.",
      skills: ["AI avatars", "Voice cloning", "Localisation", "Explainers"], tools: ["HeyGen", "ElevenLabs", "Premiere Pro"],
      review: { by: "Daniel R.", role: "Head of Growth, Orbit Labs", text: "Chloe gave us our product demo in seven languages in a week. Our sales team uses it every day." },
      projects: [
        { title: "Spokesperson Avatar Series", client: "Orbit Labs", kind: "visual", year: 2025, tags: ["AI video", "Avatars"], summary: "A weekly video series fronted by a consistent AI spokesperson.", metrics: [["24", "Episodes produced"], ["2 hrs", "Time per episode"]], problem: "Filming a weekly update with the founders was eating hours no one had.", approach: "We built a brand-safe avatar and script template so each episode could be produced from a written update.", result: "The series has run for 24 weeks without a missed release." },
        { title: "Multilingual Product Videos", client: "Kōbo Home", kind: "case", year: 2025, tags: ["AI video", "Localisation"], summary: "Product videos localised into eight languages with natural voices and captions.", metrics: [["8", "Languages"], ["-85%", "Production cost"], ["+33%", "International sales"]], problem: "International customers watched English-only videos and conversion in new markets was weak.", approach: "We adapted scripts for each market, generated native-sounding voice-overs and timed captions carefully.", result: "Production cost fell by 85% and international sales grew by a third." }
      ]
    },

    /* ---------- Photography ---------- */
    {
      id: "yusuf-demir", name: "Yusuf Demir", cat: "photography", title: "Product and e-commerce photographer", tier: 2, from: "From $250 per shoot",
      rating: 4.9, jobs: 143, avail: "now", availText: "Available now", loc: "Istanbul", resp: "Replies in about 3 hours",
      bio: "Yusuf shoots hundreds of products a month with a calm, efficient process. Clean whites, honest colour and lifestyle set-ups that give scale and context.",
      skills: ["Product shots", "Still life", "360 spins", "Retouching"], tools: ["Capture One", "Photoshop", "Profoto"],
      review: { by: "Kenji T.", role: "Founder, Marlow Tea Co.", text: "Yusuf shot our whole range in two days, and the colours matched the real tea perfectly." },
      projects: [
        { title: "Ceramics Product Range", client: "Kōbo Home", kind: "visual", year: 2025, tags: ["Product", "Still life"], summary: "Studio and styled shots of a ceramics collection with soft directional light.", metrics: [["90", "Final images"], ["2 days", "Studio time"]], problem: "Glazed ceramics reflect everything, and the earlier photos showed the room instead of the product.", approach: "We used large diffused light sources and flags to sculpt the reflections, then styled each piece on a simple surface.", result: "The images became the hero of the new catalogue and the homepage." },
        { title: "E-commerce Photo Refresh", client: "Marlow Tea Co.", kind: "case", year: 2025, tags: ["E-commerce", "Product"], summary: "A new photography standard for 120 product listings.", metrics: [["+29%", "Conversion rate"], ["-18%", "Return rate"], ["120", "Products shot"]], problem: "Photos were inconsistent, colours were off and customers were returning items that did not match.", approach: "We set a shot list, calibrated colour and added scale and lifestyle images to every listing.", result: "Conversion rose by 29% and returns fell by 18%." }
      ]
    },
    {
      id: "amara-okafor", name: "Amara Okafor", cat: "photography", title: "Lifestyle and brand photographer", tier: 3, from: "From $500 per shoot",
      rating: 5.0, jobs: 59, avail: "soon", availText: "Free from October", loc: "Lagos", resp: "Replies in about 5 hours",
      bio: "Amara shoots real people in real places with warm, unforced light. She is the person to hire when you need campaign imagery that does not look like stock photography.",
      skills: ["Lifestyle", "Campaigns", "Editorial portraits", "Art direction"], tools: ["Sony Alpha", "Lightroom", "Capture One"],
      review: { by: "Lucia F.", role: "Marketing Lead, Fable & Co", text: "Amara made our team feel at ease and the photos look candid and premium. We use them everywhere." },
      projects: [
        { title: "Slow Mornings Lifestyle Series", client: "Halcyon Roasters", kind: "visual", year: 2025, tags: ["Lifestyle", "Editorial"], summary: "An editorial series shot in real kitchens on quiet weekend mornings.", metrics: [["60", "Final images"], ["1 day", "On location"]], problem: "The brand's photos were technically fine but felt staged and cold.", approach: "We shot in the homes of real customers with natural window light and minimal styling.", result: "The series lifted social engagement and is now the visual anchor of the brand." },
        { title: "Brand Campaign Shoot", client: "Fable & Co", kind: "case", year: 2025, tags: ["Campaign", "Brand"], summary: "A two-day campaign shoot for a new product line with a cast of real customers.", metrics: [["+45%", "Ad click-through rate"], ["60", "Final images"], ["2 days", "On set"]], problem: "Stock imagery made the new range look generic and ads were underperforming.", approach: "We cast real customers, planned a shot list around the ad formats and shot both stills and social crops.", result: "Ad click-through rose by 45% compared with the previous campaign." }
      ]
    }
  ]
};
