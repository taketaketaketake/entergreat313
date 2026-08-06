// Section definitions for the resume builder. These are deliberately built around
// what actually blocks a long-term-serving returning citizen — the gap, work done
// inside, and certifications earned inside — not the generic
// Experience/Education/Skills boxes every free resume tool already has.

export interface ResumeSection {
  id: string;
  heading: string;
  prompt: string;
  placeholder: string;
  required: boolean;
}

export const resumeSections: ResumeSection[] = [
  {
    id: "contact",
    heading: "How an employer reaches you",
    prompt:
      "Your name, phone number, email, and the city you live in. You do not need to put your street address on a resume — city and state is enough, and it keeps your home address off a document that gets passed around.",
    placeholder: "James Carter\n313-555-0100\njcarter@email.com\nDetroit, MI",
    required: true,
  },
  {
    id: "target",
    heading: "The kind of work you're going after",
    prompt:
      "What job or field are you applying for? If you're open to a few things, say so. This tells the AI what to put at the top and what to emphasize.",
    placeholder:
      "Warehouse or forklift work. Open to general labor and maintenance. Willing to work seconds or thirds.",
    required: true,
  },
  {
    id: "inside-work",
    heading: "Work you did while you were away",
    prompt:
      "This is real work experience and it belongs on your resume. Kitchen, laundry, porter, maintenance, grounds, print shop, welding shop, farm, tutor, clerk, hospice aide — whatever you did. Write what the job was, roughly how long, and what you were responsible for. You do not have to name the facility.",
    placeholder:
      "Kitchen — about 6 years. Cooked for 800+ men, three meals a day. Ran the serving line, trained new workers, handled food safety and inventory counts.",
    required: false,
  },
  {
    id: "training",
    heading: "Training, trades, and certificates",
    prompt:
      "Anything you earned, inside or out: GED, vocational programs, apprenticeships, ServSafe, OSHA 10, forklift, CDL, welding, HVAC, barbering, building trades, college courses. Include the year if you remember it. If you don't have the paperwork anymore, still list it and note that.",
    placeholder:
      "GED, 2011\nServSafe food handler certificate, 2019\nWelding program — completed, certificate lost",
    required: false,
  },
  {
    id: "work-history",
    heading: "Jobs before and since",
    prompt:
      "Any work from before, and anything since you've been home — including under-the-table, temp, day labor, or family business work. Employer, what you did, city, and rough years. Approximate is fine. Do not guess at exact dates.",
    placeholder:
      "Riverside Auto Body, Detroit — helper and prep, about 2001 to 2004\nSince release: day labor through a temp agency, summer 2024",
    required: false,
  },
  {
    id: "skills",
    heading: "What you can actually do",
    prompt:
      "Tools, machines, and skills. Think concrete: forklift, pallet jack, hand tools, MIG welding, commercial kitchen equipment, floor buffer, basic computer, phones, driving, inventory, training other people, Spanish.",
    placeholder:
      "Forklift and pallet jack. Hand and power tools. Commercial kitchen equipment. Can train new people. Valid Michigan driver's license.",
    required: false,
  },
  {
    id: "gap",
    heading: "The time away, in your words",
    prompt:
      "Employers will see a gap in the dates. It is better for you to frame it than to let them guess. One or two honest sentences is plenty — what years, and what you did with the time. You do not owe anyone the details of your case.",
    placeholder:
      "2005 to 2023 — incarcerated. Used the time to earn my GED, finish a welding program, and work six years in the kitchen.",
    required: false,
  },
  {
    id: "references",
    heading: "People who will speak for you",
    prompt:
      "Optional. Name, how they know you, and a phone number — a mentor, former supervisor, case manager, or someone from the Tuesday group. Ask them first.",
    placeholder: "Brian McArn — Executive Director, Enter-Great 313 — 313-444-9671",
    required: false,
  },
];

export type DisclosureChoice = "omit" | "brief" | "direct";

export const disclosureOptions: {
  id: DisclosureChoice;
  label: string;
  help: string;
  instruction: string;
}[] = [
  {
    id: "omit",
    label: "Leave my record off the resume",
    help: "Most common. A resume is not the place it usually comes up — the application or the interview is. The date gap still gets explained.",
    instruction:
      "Do NOT mention a criminal record, conviction, incarceration, or prison anywhere in the resume. If work was done while incarcerated, describe the work and skills plainly without naming a facility or referring to incarceration. Account for the date gap neutrally if the applicant supplied wording for it.",
  },
  {
    id: "brief",
    label: "Mention it briefly, in my own framing",
    help: "One neutral line, usually near the dates. Useful when you'd rather get ahead of the question.",
    instruction:
      "Mention the incarceration only once, briefly and neutrally, using the applicant's own wording from the section about the time away. Do not add detail they did not give you. Do not apologize or editorialize.",
  },
  {
    id: "direct",
    label: "I'm applying to a second-chance employer — be direct",
    help: "For employers and programs that specifically hire people with records.",
    instruction:
      "The applicant is applying to a second-chance employer that hires people with records. Reference the reentry background directly but professionally, and treat work and training completed while incarcerated as ordinary experience, listed the same way as any other job.",
  },
];

// The prompt that goes to the LLM. The anti-fabrication rules are the most
// important thing on this page: a made-up job title or date on the resume of
// someone already under scrutiny is a serious problem, not a formatting bug.
export function buildPrompt(
  sections: { heading: string; text: string }[],
  disclosure: DisclosureChoice,
): string {
  const rule = disclosureOptions.find((d) => d.id === disclosure)!;

  const header = `I need help turning my notes into a clean, one-page resume. I am a returning citizen in Detroit.

READ THESE RULES BEFORE YOU WRITE ANYTHING:

1. Use ONLY the information I give you below. Do not invent employers, job titles, dates, duties, certifications, or skills. Not even to fill a gap or make it look better.
2. If something important is missing, do NOT guess. Put a clear placeholder like [ADD DATES] or [ADD EMPLOYER] and list your questions at the end.
3. Do not sharpen approximate dates into exact ones. If I wrote "about 2004," keep it approximate.
4. Everything on this resume has to be something I can defend in an interview. Accuracy matters more than polish.
5. ${rule.instruction}
6. Plain language. No corporate filler, no "results-driven professional," no invented metrics.
7. Format: one page, plain text I can copy, reverse chronological, with clear section headings.

After the resume, list: (a) anything you had to leave blank, and (b) questions you need answered to finish it.

HERE ARE MY NOTES:`;

  const body = sections
    .map((s) => `## ${s.heading}\n${s.text.trim()}`)
    .join("\n\n");

  return `${header}\n\n${body}`;
}
