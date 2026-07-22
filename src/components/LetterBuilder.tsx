import { useMemo, useState } from "preact/hooks";
import { letterTemplates, type LetterTemplate } from "../data/letterTemplates";
import { destinations } from "../data/destinations";

// Invariant 2: everything in this component stays in the browser. No fetch,
// no storage, no analytics — letter text may concern pending legal matters.

interface SenderInfo {
  name: string;
  addressLines: string;
  subjectName: string;
  mdocNumber: string;
}

function todayLong(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildLetterText(
  template: LetterTemplate,
  sender: SenderInfo,
  destinationAddress: string,
  sectionText: Record<string, string>,
  included: Record<string, boolean>,
): string {
  const parts: string[] = [];
  if (sender.addressLines.trim()) parts.push(sender.addressLines.trim());
  parts.push(todayLong());
  if (destinationAddress.trim()) parts.push(destinationAddress.trim());
  if (sender.subjectName.trim()) {
    const re = sender.mdocNumber.trim()
      ? `RE: ${sender.subjectName.trim()} (MDOC #${sender.mdocNumber.trim()})`
      : `RE: ${sender.subjectName.trim()}`;
    parts.push(re);
  }
  const body = template.sections
    .filter((s) => included[s.id] && sectionText[s.id]?.trim())
    .map((s) => sectionText[s.id].trim())
    .join("\n\n");
  if (body) parts.push(body);
  if (sender.name.trim()) parts.push(`Sincerely,\n\n${sender.name.trim()}`);
  return parts.join("\n\n");
}

export default function LetterBuilder() {
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [destinationId, setDestinationId] = useState(destinations[0].id);
  const [customAddress, setCustomAddress] = useState("");
  const [sender, setSender] = useState<SenderInfo>({
    name: "",
    addressLines: "",
    subjectName: "",
    mdocNumber: "",
  });
  const [sectionText, setSectionText] = useState<Record<string, string>>({});
  const [included, setIncluded] = useState<Record<string, boolean>>({});
  const [generating, setGenerating] = useState(false);

  const template = letterTemplates.find((t) => t.id === templateId) ?? null;
  const destination = destinations.find((d) => d.id === destinationId)!;
  const destinationAddress =
    destination.addressLines.length > 0 ? destination.addressLines.join("\n") : customAddress;

  const letterText = useMemo(
    () =>
      template
        ? buildLetterText(template, sender, destinationAddress, sectionText, included)
        : "",
    [template, sender, destinationAddress, sectionText, included],
  );

  const missingRequired =
    template?.sections.filter((s) => s.required && !sectionText[s.id]?.trim()) ?? [];
  const ready = template && sender.name.trim() && missingRequired.length === 0;

  function chooseTemplate(t: LetterTemplate) {
    setTemplateId(t.id);
    const on: Record<string, boolean> = {};
    for (const s of t.sections) on[s.id] = true;
    setIncluded(on);
    setSectionText({});
  }

  async function downloadPdf() {
    if (!template || !ready) return;
    setGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const margin = 72;
      const width = doc.internal.pageSize.getWidth() - margin * 2;
      const height = doc.internal.pageSize.getHeight();
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(letterText, width);
      let y = margin;
      for (const line of lines) {
        if (y > height - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += 16;
      }
      doc.save("letter-of-support.pdf");
    } finally {
      setGenerating(false);
    }
  }

  function printLetter() {
    if (!ready) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(
      `<html><head><title>Letter of Support</title><style>body{font-family:Georgia,serif;font-size:12pt;line-height:1.5;max-width:6.5in;margin:1in auto;white-space:pre-wrap;}</style></head><body>${letterText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</body></html>`,
    );
    win.document.close();
    win.print();
  }

  // Step 1: choose a template
  if (!template) {
    return (
      <div class="grid gap-4 md:grid-cols-2">
        {letterTemplates.map((t) => (
          <button
            type="button"
            onClick={() => chooseTemplate(t)}
            class="rounded-lg border-2 border-stone-200 bg-white p-6 text-left hover:border-emerald-700"
          >
            <span class="block text-lg font-bold text-emerald-950">{t.name}</span>
            <span class="mt-1 block text-sm font-medium text-stone-500">{t.audience}</span>
            <span class="mt-3 block text-sm leading-relaxed text-stone-700">{t.intro}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div class="space-y-8">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-2xl font-bold text-emerald-950">{template.name}</h2>
        <button
          type="button"
          onClick={() => setTemplateId(null)}
          class="text-sm font-semibold text-emerald-800 underline underline-offset-2"
        >
          Choose a different letter type
        </button>
      </div>

      <div class="rounded-lg bg-stone-50 p-5">
        <p class="font-semibold text-emerald-950">Before you write</p>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-stone-700">
          {template.guidance.map((g) => (
            <li>{g}</li>
          ))}
        </ul>
      </div>

      <fieldset class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="text-sm font-semibold text-stone-800">Your full name</span>
          <input
            type="text"
            value={sender.name}
            onInput={(e) => setSender({ ...sender, name: (e.target as HTMLInputElement).value })}
            class="mt-1 w-full rounded-md border border-stone-300 p-2.5"
          />
        </label>
        <label class="block">
          <span class="text-sm font-semibold text-stone-800">Who this letter is about</span>
          <input
            type="text"
            value={sender.subjectName}
            placeholder="Their full name"
            onInput={(e) =>
              setSender({ ...sender, subjectName: (e.target as HTMLInputElement).value })
            }
            class="mt-1 w-full rounded-md border border-stone-300 p-2.5"
          />
        </label>
        <label class="block">
          <span class="text-sm font-semibold text-stone-800">Your address (optional)</span>
          <textarea
            value={sender.addressLines}
            rows={2}
            placeholder={"Street\nCity, State ZIP"}
            onInput={(e) =>
              setSender({ ...sender, addressLines: (e.target as HTMLTextAreaElement).value })
            }
            class="mt-1 w-full rounded-md border border-stone-300 p-2.5"
          />
        </label>
        <label class="block">
          <span class="text-sm font-semibold text-stone-800">MDOC number (if applicable)</span>
          <input
            type="text"
            value={sender.mdocNumber}
            onInput={(e) =>
              setSender({ ...sender, mdocNumber: (e.target as HTMLInputElement).value })
            }
            class="mt-1 w-full rounded-md border border-stone-300 p-2.5"
          />
        </label>
      </fieldset>

      <fieldset>
        <span class="text-sm font-semibold text-stone-800">Where is this letter going?</span>
        <select
          value={destinationId}
          onChange={(e) => setDestinationId((e.target as HTMLSelectElement).value)}
          class="mt-1 w-full rounded-md border border-stone-300 bg-white p-2.5"
        >
          {destinations.map((d) => (
            <option value={d.id}>{d.name}</option>
          ))}
        </select>
        <p class="mt-2 text-sm leading-relaxed text-stone-600">{destination.guidance}</p>
        {destination.addressLines.length === 0 && (
          <textarea
            value={customAddress}
            rows={3}
            placeholder={"Recipient / Office\nStreet or P.O. Box\nCity, State ZIP"}
            onInput={(e) => setCustomAddress((e.target as HTMLTextAreaElement).value)}
            class="mt-2 w-full rounded-md border border-stone-300 p-2.5"
          />
        )}
      </fieldset>

      <div class="space-y-5">
        <p class="text-sm text-stone-600">
          Write each section in your own words — the prompts tell you what makes it persuasive.
          Uncheck any optional section you want to leave out.
        </p>
        {template.sections.map((section) => (
          <div class="rounded-lg border border-stone-200 p-5">
            <div class="flex items-start justify-between gap-3">
              <label class="font-bold text-emerald-950">
                {section.heading}
                {section.required && <span class="ml-2 text-xs font-semibold text-amber-700">required</span>}
              </label>
              {!section.required && (
                <label class="flex items-center gap-2 text-sm text-stone-600">
                  <input
                    type="checkbox"
                    checked={included[section.id] ?? true}
                    onChange={(e) =>
                      setIncluded({
                        ...included,
                        [section.id]: (e.target as HTMLInputElement).checked,
                      })
                    }
                  />
                  Include
                </label>
              )}
            </div>
            <p class="mt-1 text-sm leading-relaxed text-stone-600">{section.prompt}</p>
            {(included[section.id] ?? true) && (
              <textarea
                value={sectionText[section.id] ?? ""}
                rows={4}
                onInput={(e) =>
                  setSectionText({
                    ...sectionText,
                    [section.id]: (e.target as HTMLTextAreaElement).value,
                  })
                }
                class="mt-3 w-full rounded-md border border-stone-300 p-2.5"
              />
            )}
          </div>
        ))}
      </div>

      <div class="rounded-lg bg-stone-50 p-5">
        <p class="font-semibold text-emerald-950">Preview</p>
        <pre class="mt-3 max-h-96 overflow-auto whitespace-pre-wrap font-serif text-sm leading-relaxed text-stone-800">
          {letterText || "Your letter will appear here as you write."}
        </pre>
      </div>

      {!ready && (
        <p class="text-sm font-semibold text-amber-800">
          {!sender.name.trim()
            ? "Add your name to finish the letter."
            : `Still needed: ${missingRequired.map((s) => s.heading).join(", ")}`}
        </p>
      )}

      <div class="flex flex-wrap gap-4">
        <button
          type="button"
          disabled={!ready || generating}
          onClick={downloadPdf}
          class="rounded-md bg-emerald-800 px-6 py-3 font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          {generating ? "Preparing PDF…" : "Download PDF"}
        </button>
        <button
          type="button"
          disabled={!ready}
          onClick={printLetter}
          class="rounded-md border-2 border-emerald-800 px-6 py-3 font-bold text-emerald-900 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400"
        >
          Print
        </button>
      </div>
      <p class="text-xs text-stone-500">
        Nothing you type here is sent or saved anywhere — the letter exists only in your browser
        until you download or print it.
      </p>
    </div>
  );
}
