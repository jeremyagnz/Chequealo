import { HistoryList } from '@/features/history/components/HistoryList';

export default function HistoryPage() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-[1.625rem] font-bold tracking-tight text-text">History</h1>
        <p className="mt-1 text-sm text-muted">All your past verifications, searchable and sortable.</p>
      </div>
      <HistoryList />
    </div>
  );
}
