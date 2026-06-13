'use client';
import { useEffect, useState } from 'react';
const AI_PROVIDERS = [
    { value: 'openai', label: 'OpenAI GPT-4o' },
    { value: 'anthropic', label: 'Anthropic Claude 3.5' },
    { value: 'gemini', label: 'Google Gemini 1.5 Pro' },
    { value: 'groq', label: 'Groq Llama 3.1' },
];
const SEARCH_PROVIDERS = [
    { value: 'serper', label: 'Serper (Google)' },
    { value: 'brave', label: 'Brave Search' },
    { value: 'tavily', label: 'Tavily AI Search' },
];
const LANGUAGES = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'es', label: '🇪🇸 Español' },
    { value: 'pt', label: '🇧🇷 Português' },
    { value: 'fr', label: '🇫🇷 Français' },
    { value: 'de', label: '🇩🇪 Deutsch' },
];
function SelectField({ id, label, description, value, options, onChange }) {
    return (<div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13.5px] font-medium text-text">
        {label}
      </label>
      {description && (<p className="text-[12px] text-faint">{description}</p>)}
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="input-dark">
        {options.map((opt) => (<option key={opt.value} value={opt.value}>
            {opt.label}
          </option>))}
      </select>
    </div>);
}
export function SettingsForm() {
    var _a, _b, _c;
    const [form, setForm] = useState({
        preferredAIProvider: 'openai',
        preferredSearchProvider: 'serper',
        language: 'en',
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api/settings')
            .then((r) => r.json())
            .then((data) => {
            setForm((prev) => (Object.assign(Object.assign({}, prev), data)));
            setLoading(false);
        })
            .catch(() => setLoading(false));
    }, []);
    async function handleSave(e) {
        e.preventDefault();
        setSaving(true);
        setSaved(false);
        await fetch('/api/settings', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }
    return (<form onSubmit={handleSave} className="space-y-6 max-w-lg">
      {/* AI Provider card */}
      <section className="animate-fade-up rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h2 className="mb-1 text-[14px] font-semibold text-text">AI Configuration</h2>
        <p className="mb-5 text-[12.5px] text-faint">
          Choose which AI model runs your verifications by default.
        </p>

        {loading ? (<div className="skeleton h-10 rounded-xl"/>) : (<SelectField id="ai-provider" label="Preferred AI Provider" description="All providers produce equivalent results; some are faster or cheaper." value={(_a = form.preferredAIProvider) !== null && _a !== void 0 ? _a : 'openai'} options={AI_PROVIDERS} onChange={(v) => setForm((f) => (Object.assign(Object.assign({}, f), { preferredAIProvider: v })))}/>)}
      </section>

      {/* Search Provider card */}
      <section className="animate-fade-up delay-100 rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h2 className="mb-1 text-[14px] font-semibold text-text">Search Configuration</h2>
        <p className="mb-5 text-[12.5px] text-faint">
          Live search results provide real-time evidence for every verification.
        </p>

        {loading ? (<div className="skeleton h-10 rounded-xl"/>) : (<SelectField id="search-provider" label="Preferred Search Provider" value={(_b = form.preferredSearchProvider) !== null && _b !== void 0 ? _b : 'serper'} options={SEARCH_PROVIDERS} onChange={(v) => setForm((f) => (Object.assign(Object.assign({}, f), { preferredSearchProvider: v })))}/>)}
      </section>

      {/* Language card */}
      <section className="animate-fade-up delay-200 rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h2 className="mb-1 text-[14px] font-semibold text-text">Language</h2>
        <p className="mb-5 text-[12.5px] text-faint">
          AI responses and evidence summaries will be in this language.
        </p>

        {loading ? (<div className="skeleton h-10 rounded-xl"/>) : (<SelectField id="language" label="Preferred Language" value={(_c = form.language) !== null && _c !== void 0 ? _c : 'en'} options={LANGUAGES} onChange={(v) => setForm((f) => (Object.assign(Object.assign({}, f), { language: v })))}/>)}
      </section>

      {/* Save button */}
      <div className="animate-fade-up delay-300 flex items-center gap-3">
        <button type="submit" disabled={saving || loading} className="rounded-xl bg-primary px-6 py-2.5 text-sm text-white font-semibold hover:bg-primary/90 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-100 shadow-glow-primary">
          {saving ? (<span className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
              </svg>
              Saving…
            </span>) : ('Save Settings')}
        </button>

        {saved && (<span className="flex items-center gap-1.5 text-[13px] text-verdict-true animate-fade-in">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"/>
            </svg>
            Saved
          </span>)}
      </div>
    </form>);
}
