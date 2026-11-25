export type ServiceId =
  | 'ugc-creative'
  | 'paid-social'
  | 'whatsapp-automation'
  | 'growth-systems';

export interface ServiceDetail {
  id: ServiceId;
  index: string;
  shortTitle: string;
  title: string;
  headline: string;
  summary: string;
  description: string;
  includes: string[];
  problemSolved: string;
  ctaLabel: string;
}

export const HERO_STAGES = [
  {
    id: 'attention',
    step: '01',
    label: 'ATTENTION',
    channel: 'UGC & Creative',
    title: 'Earn the first three seconds.',
    detail:
      'Relatable, product-led video built for how people actually scroll on Meta and TikTok. No stiff studio scripts.',
    handoff: 'Scroll stops -> Qualified click',
  },
  {
    id: 'interest',
    step: '02',
    label: 'INTEREST',
    channel: 'Paid Social',
    title: 'Put the offer in front of buyers.',
    detail:
      'Disciplined campaign testing across hooks, formats, and audiences so your ad spend follows real buying intent.',
    handoff: 'Ad click -> Direct inquiry',
  },
  {
    id: 'conversion',
    step: '03',
    label: 'CONVERSION',
    channel: 'WhatsApp Automation',
    title: 'Respond before interest cools.',
    detail:
      'Instant WhatsApp replies, guided product questions, automated follow-ups, and cart recovery without manual bottlenecks.',
    handoff: 'Conversation -> Completed order',
  },
  {
    id: 'growth',
    step: '04',
    label: 'GROWTH',
    channel: 'Conversion Systems',
    title: 'Compound what works.',
    detail:
      'Creative insights sharpen ad buying; real buyer questions shape new scripts. Marketing and sales run as one loop.',
    handoff: 'Order insight -> Next creative batch',
  },
] as const;

export const APPROACH_PILLARS = [
  {
    step: '01',
    name: 'Attract',
    title: 'Get the right people to notice.',
    body: 'Strong creative earns attention without begging for it. We build UGC-style video ads and paid social campaigns shaped for real buyers, not passive views.',
  },
  {
    step: '02',
    name: 'Convert',
    title: 'Turn curiosity into conversations and sales.',
    body: 'Clicks mean very little if nobody answers the customer. Automated WhatsApp workflows greet leads immediately, answer common questions, and guide hesitant buyers to checkout.',
  },
  {
    step: '03',
    name: 'Grow',
    title: 'Build systems that hold up over time.',
    body: 'Instead of treating ads and sales as separate chores, we link them into one repeatable loop—feeding customer objections and buying patterns back into your campaigns.',
  },
] as const;

export const JOURNEY_CHAIN = [
  {
    phase: '01. The Click',
    title: 'A prospect taps your video ad.',
    note: 'Most brands send that paid click into a slow webpage or an inbox nobody checks until hours later.',
  },
  {
    phase: '02. The Thread',
    title: 'WhatsApp opens with context.',
    note: 'RUVEN routes the buyer directly into an automated, natural conversation tailored to the exact product they clicked.',
  },
  {
    phase: '03. The Follow-Through',
    title: 'Questions answered. Carts recovered.',
    note: 'Pricing, sizing, delivery timelines, and payment links are handled cleanly. Unfinished orders receive timely, polite nudges.',
  },
  {
    phase: '04. The Loop',
    title: 'Every interaction sharpens the next ad.',
    note: 'Patterns from real customer conversations guide your next round of scripts, angles, and media buying.',
  },
] as const;

export const PROCESS_STEPS = [
  {
    code: '01',
    name: 'DISCOVER',
    summary:
      'We audit your current ad performance, customer questions, drop-off points, and sales workflow to see where revenue is leaking.',
  },
  {
    code: '02',
    name: 'CREATE',
    summary:
      'We script, produce, and cut modular UGC-style creatives alongside clear WhatsApp conversation flows built around how your buyers decide.',
  },
  {
    code: '03',
    name: 'ATTRACT',
    summary:
      'We launch structured Meta and TikTok acquisition campaigns built to test hooks cleanly and direct qualified traffic forward.',
  },
  {
    code: '04',
    name: 'CONVERT',
    summary:
      'Automated lead capture, instant replies, product guidance, and abandoned-cart follow-ups turn incoming attention into paid orders.',
  },
  {
    code: '05',
    name: 'OPTIMISE',
    summary:
      'We watch creative fatigue, reply drop-offs, and conversion efficiency—refining both the ads and the automation every cycle.',
  },
] as const;

export const TARGET_BUSINESSES = [
  {
    label: 'Ecommerce Brands',
    description:
      'Direct-to-consumer stores ready to move past erratic ad spikes and build steady daily order flow.',
  },
  {
    label: 'Ambitious Consumer Brands',
    description:
      'Product businesses launching new collections or expanding into new regions that need sharp creative and fast market feedback.',
  },
  {
    label: 'Online Retailers',
    description:
      'Merchants handling high inquiry volume in DMs and WhatsApp who lose sales to slow replies and abandoned carts.',
  },
  {
    label: 'Growth-Focused Businesses',
    description:
      'Teams in Nigeria and international markets looking to connect marketing spend directly to measurable revenue.',
  },
] as const;

export const SERVICES: ServiceDetail[] = [
  {
    id: 'ugc-creative',
    index: '01',
    shortTitle: 'Creative & UGC Advertising',
    title: 'UGC & Creative Advertising',
    headline: 'Video ads people actually finish watching.',
    summary:
      'Relatable, native video creatives built to stop the scroll and earn buyer trust before the click.',
    description:
      'Modern feeds filter out anything that looks like a stiff commercial. We develop conversion-focused UGC-style video ads grounded in real customer desires, clear product demonstrations, and deliberate pacing—structured from the first frame to drive action.',
    includes: [
      'Customer research and angle development',
      'Direct-response scripting and hook writing',
      'Creator sourcing and UGC-style video production',
      'Modular hook, body, and CTA variations for testing',
      'Performance editing built for Meta Reels, Stories, and TikTok',
    ],
    problemSolved:
      'Solves rising ad costs and creative fatigue caused by polished brand videos that look tidy in a deck but get skipped in the feed.',
    ctaLabel: 'Plan Your Creative Pipeline',
  },
  {
    id: 'paid-social',
    index: '02',
    shortTitle: 'Paid Social & Customer Acquisition',
    title: 'Paid Social & Customer Acquisition',
    headline: 'Media buying built around creative testing and buyer intent.',
    summary:
      'Disciplined Meta and TikTok acquisition strategies focused on profitable demand generation.',
    description:
      'Running ads without a testing structure is expensive guesswork. We organise Meta and TikTok campaigns so winning concepts surface early, budgets consolidate behind real performance, and traffic routes cleanly into your conversion channels.',
    includes: [
      'Meta (Instagram & Facebook) and TikTok campaign architecture',
      'Structured creative testing frameworks',
      'Audience signal refinement and retargeting layers',
      'Click-to-WhatsApp and store conversion funnel alignment',
      'Ongoing campaign monitoring, pacing, and optimisation',
    ],
    problemSolved:
      'Eliminates wasted ad spend from boosting posts blindly or running isolated campaigns with no clear path to purchase.',
    ctaLabel: 'Discuss Paid Acquisition',
  },
  {
    id: 'whatsapp-automation',
    index: '03',
    shortTitle: 'WhatsApp Automation',
    title: 'WhatsApp Automation',
    headline: 'Every inquiry answered. Every abandoned cart followed up.',
    summary:
      'Automated WhatsApp Business workflows that capture leads, handle questions, and close orders around the clock.',
    description:
      'In Nigeria and across high-touch ecommerce markets globally, buyers want reassurance before they pay. If a prospect messages your brand and waits three hours for a reply, the sale moves on. We build structured WhatsApp Business workflows that feel responsive, clear, and fast.',
    includes: [
      'Instant automated greeting and lead capture from ads',
      'Guided product discovery and FAQ routing',
      'Structured follow-up sequences for undecided prospects',
      'Automated abandoned-cart recovery messages',
      'Order confirmation updates and sales team handoff rules',
    ],
    problemSolved:
      'Fixes slow manual replies, overwhelmed sales reps, lost DM leads, and revenue left behind in abandoned carts.',
    ctaLabel: 'Automate Your WhatsApp Sales',
  },
  {
    id: 'growth-systems',
    index: '04',
    shortTitle: 'Growth Strategy & Conversion Systems',
    title: 'Growth Strategy & Conversion Systems',
    headline: 'One connected architecture from impression to purchase.',
    summary:
      'End-to-end systems linking creative production, paid traffic, automated messaging, and checkout.',
    description:
      'Most brands hire one person for videos, another for ads, and leave customer replies to chance. RUVEN designs the full acquisition loop—making sure your creative hook, targeting, landing experience, and WhatsApp follow-up speak the same language.',
    includes: [
      'Full-funnel acquisition and conversion audit',
      'Offer positioning and customer journey mapping',
      'Integration between paid ads, landing pages, and WhatsApp flows',
      'Lead tracking and attribution discipline',
      'Continuous testing roadmap across creative and messaging',
    ],
    problemSolved:
      'Bridges the gap between getting attention at the top of the funnel and reliably turning that attention into collected revenue.',
    ctaLabel: 'Build Your Growth System',
  },
];

export const PHILOSOPHY_PILLARS = [
  {
    index: '01',
    title: 'Creativity should have commercial purpose.',
    body: 'An ad is not successful because it looks clever. It succeeds when the right buyer sees themselves in it and takes the next step.',
  },
  {
    index: '02',
    title: 'Technology should simplify business.',
    body: 'Automation is only useful when it removes friction for the customer and manual repetition for your team. Complexity for its own sake slows everyone down.',
  },
  {
    index: '03',
    title: 'Marketing should connect with sales.',
    body: 'Generating clicks while ignoring what happens inside the inbox is half a job. Advertising and customer conversion belong in the same system.',
  },
  {
    index: '04',
    title: 'Growth should be measurable and intentional.',
    body: 'Every creative test, ad set, and follow-up sequence exists to answer a clear commercial question and improve the economics of acquiring a customer.',
  },
] as const;

export const PAGE_META = {
  home: {
    title: 'RUVEN — Attract. Convert. Grow.',
    description:
      'RUVEN is a marketing technology and customer acquisition company uniting creative advertising, paid social, and WhatsApp automation.',
  },
  about: {
    title: 'About RUVEN — Growth Should Connect',
    description:
      'Why RUVEN exists: closing the gap between attracting customer attention and converting it into measurable revenue.',
  },
  services: {
    title: 'Services — RUVEN Customer Acquisition & Automation',
    description:
      'Explore RUVEN services: UGC & creative advertising, Meta & TikTok paid social, WhatsApp Business automation, and connected growth systems.',
  },
  contact: {
    title: 'Contact RUVEN — Start a Conversation',
    description:
      'Get in touch with RUVEN to build connected creative advertising, customer acquisition, and WhatsApp automation systems.',
  },
} as const;
