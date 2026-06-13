'use client';

import { useEffect, useState } from 'react';

interface SettingsData {
  preferredAIProvider?: string;
  preferredSearchProvider?: string;
  language?: string;
}

export function SettingsForm() {
  const [form, setForm] = useState<SettingsData>({
    preferredAIProvider: 'openai',
    preferredSearchProvider: 'serper',
    language: 'en',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json() as Promise<SettingsData>)
      .then((data) => setForm((prev) => ({ ...prev, ...data })))
      .catch(console.error);
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
  }

  return (
    <form onSubmit={handleSave} className="max-w-md space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Preferred AI Provider</label>
        <select
          value={form.preferredAIProvider}
          onChange={(e) => setForm((f) => ({ ...f, preferredAIProvider: e.target.value }))}
          className="w-full rounded-lg border p-2 text-sm"
        >
          {['openai', 'anthropic', 'gemini', 'groq'].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Preferred Search Provider</label>
        <select
          value={form.preferredSearchProvider}
          onChange={(e) => setForm((f) => ({ ...f, preferredSearchProvider: e.target.value }))}
          className="w-full rounded-lg border p-2 text-sm"
        >
          {['serper', 'brave', 'tavily'].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Language</label>
        <select
          value={form.language}
          onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))}
          className="w-full rounded-lg border p-2 text-sm"
        >
          {[['en', 'English'], ['es', 'Español'], ['pt', 'Português']].map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-primary px-6 py-2 text-white disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}
