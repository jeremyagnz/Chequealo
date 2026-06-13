import { SettingsForm } from '@/features/settings/components/SettingsForm';
export default function SettingsPage() {
    return (<div className="space-y-7">
      <div>
        <h1 className="text-[1.625rem] font-bold tracking-tight text-text">Settings</h1>
        <p className="mt-1 text-sm text-muted">Configure AI providers, search engines, and preferences.</p>
      </div>
      <SettingsForm />
    </div>);
}
