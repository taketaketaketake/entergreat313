import { useEffect, useMemo, useState } from "preact/hooks";
import {
  resumeSections,
  disclosureOptions,
  buildPrompt,
  type DisclosureChoice,
} from "../data/resumeSections";

// Like the letter builder, nothing here is transmitted: no fetch, no analytics.
// Unlike the letter builder, this one saves a draft to localStorage so a phone
// call doesn't wipe twenty minutes of typing. That is a real tradeoff on a shared
// or library computer, so the draft is opt-out and "Clear everything" is loud and
// always visible. See docs/decisions/adr-003-resume-builder.md.

const STORAGE_KEY = "eg313-resume-draft";

interface Draft {
  text: Record<string, string>;
  included: Record<string, boolean>;
  disclosure: DisclosureChoice;
}

function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

export default function ResumeBuilder() {
  const [text, setText] = useState<Record<string, string>>({});
  const [included, setIncluded] = useState<Record<string, boolean>>(() => {
    const on: Record<string, boolean> = {};
    for (const s of resumeSections) on[s.id] = true;
    return on;
  });
  const [disclosure, setDisclosure] = useState<DisclosureChoice>("omit");
  const [saveDraft, setSaveDraft] = useState(true);
  const [restored, setRestored] = useState(false);
  const [copied, setCopied] = useState(false);

  // Restore once on mount.
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setText(draft.text ?? {});
      setIncluded((prev) => ({ ...prev, ...(draft.included ?? {}) }));
      setDisclosure(draft.disclosure ?? "omit");
      setRestored(true);
    }
  }, []);

  useEffect(() => {
    if (!saveDraft) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ text, included, disclosure }));
    } catch {
      /* storage full or blocked — the page still works, the draft just isn't kept */
    }
  }, [text, included, disclosure, saveDraft]);

  const filled = resumeSections
    .filter((s) => included[s.id] && text[s.id]?.trim())
    .map((s) => ({ heading: s.heading, text: text[s.id] }));

  const prompt = useMemo(() => buildPrompt(filled, disclosure), [filled, disclosure]);

  const missingRequired = resumeSections.filter((s) => s.required && !text[s.id]?.trim());
  const ready = missingRequired.length === 0 && filled.length > 0;

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Older mobile browsers block the clipboard API — select the text instead
      // so the user can copy it with a long-press.
      const box = document.getElementById("resume-prompt") as HTMLTextAreaElement | null;
      box?.focus();
      box?.select();
    }
  }

  function clearAll() {
    if (!confirm("Erase everything you've typed on this page? This can't be undone.")) return;
    setText({});
    setDisclosure("omit");
    setRestored(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nothing to clear */
    }
  }

  return (
    <div class="space-y-8">
      {restored && (
        <p class="rounded-md bg-amber-50 p-4 text-sm font-medium text-amber-900">
          We brought back the draft you started on this device. Use “Erase everything” below if
          this isn't your computer.
        </p>
      )}

      <div class="space-y-5">
        {resumeSections.map((section) => (
          <div class="rounded-lg border border-stone-200 p-5">
            <div class="flex items-start justify-between gap-3">
              <label class="font-bold text-emerald-950" for={`s-${section.id}`}>
                {section.heading}
                {section.required && (
                  <span class="ml-2 text-xs font-semibold text-amber-700">required</span>
                )}
              </label>
              {!section.required && (
                <label class="flex shrink-0 items-center gap-2 text-sm text-stone-600">
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
                id={`s-${section.id}`}
                value={text[section.id] ?? ""}
                rows={4}
                placeholder={section.placeholder}
                onInput={(e) =>
                  setText({ ...text, [section.id]: (e.target as HTMLTextAreaElement).value })
                }
                class="mt-3 w-full rounded-md border border-stone-300 p-2.5"
              />
            )}
          </div>
        ))}
      </div>

      <fieldset class="rounded-lg border border-stone-200 p-5">
        <legend class="px-1 font-bold text-emerald-950">Your record on the resume</legend>
        <p class="text-sm leading-relaxed text-stone-600">
          This is your call, and it changes the instructions the AI gets.
        </p>
        <div class="mt-4 space-y-3">
          {disclosureOptions.map((option) => (
            <label class="flex gap-3">
              <input
                type="radio"
                name="disclosure"
                class="mt-1.5 shrink-0"
                checked={disclosure === option.id}
                onChange={() => setDisclosure(option.id)}
              />
              <span>
                <span class="font-semibold text-emerald-950">{option.label}</span>
                <span class="mt-0.5 block text-sm leading-relaxed text-stone-600">
                  {option.help}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div class="rounded-lg bg-stone-50 p-5">
        <p class="font-semibold text-emerald-950">Everything together, ready to copy</p>
        <p class="mt-1 text-sm leading-relaxed text-stone-700">
          This includes the instructions that tell the AI not to make anything up. Leave them in —
          they're the part that keeps the resume honest.
        </p>
        <textarea
          id="resume-prompt"
          readonly
          rows={12}
          value={ready ? prompt : "Fill in the sections above and your text will appear here."}
          class="mt-3 w-full rounded-md border border-stone-300 bg-white p-3 font-mono text-xs leading-relaxed"
        />
        <div class="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            disabled={!ready}
            onClick={copyAll}
            class="rounded-md bg-emerald-800 px-6 py-3 font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {copied ? "Copied ✓" : "Copy everything"}
          </button>
          <button
            type="button"
            onClick={clearAll}
            class="rounded-md border-2 border-stone-400 px-6 py-3 font-bold text-stone-700 hover:bg-stone-100"
          >
            Erase everything
          </button>
        </div>
        {!ready && missingRequired.length > 0 && (
          <p class="mt-3 text-sm font-semibold text-amber-800">
            Still needed: {missingRequired.map((s) => s.heading).join(", ")}
          </p>
        )}
      </div>

      <label class="flex items-start gap-3 text-sm text-stone-600">
        <input
          type="checkbox"
          class="mt-1 shrink-0"
          checked={saveDraft}
          onChange={(e) => {
            const on = (e.target as HTMLInputElement).checked;
            setSaveDraft(on);
            if (!on) {
              try {
                localStorage.removeItem(STORAGE_KEY);
              } catch {
                /* nothing to clear */
              }
            }
          }}
        />
        <span>
          Keep a draft on this device so I don't lose my work. Turn this off if you're on a shared
          or library computer.
        </span>
      </label>

      <p class="text-xs leading-relaxed text-stone-500">
        Nothing you type here is sent to Enter-Great 313 or anyone else. It stays in your browser
        until you copy it yourself.
      </p>
    </div>
  );
}
