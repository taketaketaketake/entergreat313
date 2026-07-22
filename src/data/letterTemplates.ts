export interface LetterSection {
  id: string;
  heading: string;
  prompt: string;
  required: boolean;
  placeholder?: string;
}

export interface LetterTemplate {
  id: string;
  name: string;
  audience: string;
  intro: string;
  guidance: string[];
  sections: LetterSection[];
}

export const letterTemplates: LetterTemplate[] = [
  {
    id: "parole-support",
    name: "Parole Support Letter",
    audience: "The Michigan Parole Board, ahead of a parole hearing or review",
    intro:
      "Tells the parole board who this person is to you, what has changed, and what support is waiting for them outside. Personal, specific letters carry real weight — identical form letters do not.",
    guidance: [
      "Include the person's full name and MDOC number on every page.",
      "Be honest — don't minimize the offense or argue the case. Focus on change and support.",
      "Specific beats general: one real example of change is worth a page of praise.",
      "Mail well before the hearing date. Verify the current parole board address before sending.",
    ],
    sections: [
      {
        id: "who-i-am",
        heading: "Who I Am",
        prompt:
          "Introduce yourself: your name, your work or role in the community, and anything that gives your words credibility (employer, pastor, family member, mentor).",
        required: true,
      },
      {
        id: "how-i-know",
        heading: "How I Know This Person",
        prompt:
          "How long have you known them, and in what capacity? Before incarceration, during, or both?",
        required: true,
      },
      {
        id: "changes-witnessed",
        heading: "The Change I've Seen",
        prompt:
          "Describe specific growth you've personally witnessed — classes completed, mentoring others, changed outlook, repaired relationships. One concrete story is best.",
        required: false,
      },
      {
        id: "support-provided",
        heading: "The Support I Will Provide",
        prompt:
          "What will you concretely do when they come home? Housing, a job or job leads, transportation, weekly check-ins, a place at your dinner table. Commitments, not sentiments.",
        required: false,
      },
      {
        id: "community-plan",
        heading: "Community & Reentry Plan",
        prompt:
          "What community will surround them? Mention support groups (like Enter-Great 313's Tuesday meetings), church, family, or programs they'll join.",
        required: false,
      },
      {
        id: "closing",
        heading: "Closing Statement",
        prompt:
          "A short, direct closing: your belief in their readiness and your willingness to be contacted with questions.",
        required: true,
      },
    ],
  },
  {
    id: "character-sentencing",
    name: "Character Letter for Court",
    audience:
      "A judge before sentencing — always submitted through the defense attorney, never sent directly",
    intro:
      "Helps a judge see the whole person before sentencing. Judges read these carefully when they are honest, specific, and personal.",
    guidance: [
      "Give the finished letter to the defense attorney — do not mail it to the judge or courthouse yourself.",
      "Address it \"Dear Honorable Judge [Name]\" — the attorney can confirm the correct name.",
      "Acknowledge the seriousness of the situation; never argue the facts of the case or criticize the court.",
      "Say what you know firsthand, not what you were told.",
    ],
    sections: [
      {
        id: "who-i-am",
        heading: "Who I Am",
        prompt:
          "Your name, occupation, and standing in the community. If you've never written a court letter before, say so — sincerity matters more than polish.",
        required: true,
      },
      {
        id: "how-i-know",
        heading: "How I Know This Person",
        prompt:
          "The length and nature of your relationship. Be concrete: neighbor for 15 years, employer for 2, brother, mentor.",
        required: true,
      },
      {
        id: "character-examples",
        heading: "Their Character, With Examples",
        prompt:
          "One or two firsthand stories that show who they are — helping family, showing up for others, work ethic. Specific incidents, not adjectives.",
        required: true,
      },
      {
        id: "acknowledgment",
        heading: "Acknowledging the Situation",
        prompt:
          "Show you understand the seriousness of the charges without excusing or re-arguing them. This makes the rest of your letter credible.",
        required: false,
      },
      {
        id: "support-provided",
        heading: "The Support I Will Provide",
        prompt:
          "What role will you play going forward — employment, housing, accountability, mentorship?",
        required: false,
      },
      {
        id: "closing",
        heading: "Closing Statement",
        prompt:
          "A respectful close: thank the judge for their time and offer to be contacted.",
        required: true,
      },
    ],
  },
  {
    id: "reentry-commitment",
    name: "Reentry Support Commitment",
    audience:
      "Parole boards, reentry programs, or housing providers — documents the support network waiting outside",
    intro:
      "A written commitment of the specific support you will provide when someone comes home. Used in parole files, program applications, and housing paperwork.",
    guidance: [
      "Be specific about what you're committing to — vague promises don't help.",
      "Only commit to what you can actually sustain.",
      "Include your contact information so the commitment can be verified.",
    ],
    sections: [
      {
        id: "who-i-am",
        heading: "Who I Am",
        prompt: "Your name, relationship to the person, and your situation (job, home, community ties).",
        required: true,
      },
      {
        id: "housing",
        heading: "Housing",
        prompt:
          "If you're offering housing: the address, who lives there, and how long the offer stands. If not housing, skip this section.",
        required: false,
      },
      {
        id: "employment",
        heading: "Employment & Income",
        prompt:
          "A job offer, job leads, or help with the search — be as concrete as you can.",
        required: false,
      },
      {
        id: "daily-support",
        heading: "Day-to-Day Support",
        prompt:
          "Transportation, meals, phone, clothing, help with IDs and paperwork, rides to appointments and meetings.",
        required: false,
      },
      {
        id: "accountability",
        heading: "Accountability & Encouragement",
        prompt:
          "Regular check-ins, attending support meetings together, being a person they can call.",
        required: false,
      },
      {
        id: "closing",
        heading: "Closing & Contact",
        prompt: "Restate your commitment and provide your phone or email for verification.",
        required: true,
      },
    ],
  },
  {
    id: "letter-inside",
    name: "Letter to Someone Inside",
    audience: "A person currently incarcerated — family member, friend, or someone you're encouraging",
    intro:
      "Mail call matters more than most people outside ever realize. A letter says someone remembers you. This template helps when you don't know what to say.",
    guidance: [
      "Address mail exactly as the facility requires: full name and MDOC number. Look up the facility's mail rules first.",
      "Most facilities: plain paper, no staples, no stickers or glitter, nothing attached.",
      "Write about normal life — it's a gift, not an imposition. Ask questions they can answer back.",
    ],
    sections: [
      {
        id: "opening",
        heading: "Opening",
        prompt: "Greet them and say why you're writing. Simple is fine: you were thinking of them.",
        required: true,
      },
      {
        id: "life-update",
        heading: "News From Home",
        prompt:
          "Everyday life: family news, the neighborhood, sports, what you've been cooking, what's changed and what hasn't.",
        required: false,
      },
      {
        id: "encouragement",
        heading: "Encouragement",
        prompt:
          "What you believe about them and their future. If they're in classes or programs, acknowledge the work.",
        required: false,
      },
      {
        id: "questions",
        heading: "Questions For Them",
        prompt: "Ask about their days, what they're reading, what they'd want to hear more about — questions make it easy to write back.",
        required: false,
      },
      {
        id: "closing",
        heading: "Closing",
        prompt: "Sign off warmly and say you'll write again — then do.",
        required: true,
      },
    ],
  },
];
