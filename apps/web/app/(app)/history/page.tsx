import { HistoryList } from '@/features/history/components/HistoryList';

export default function HistoryPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Verification History</h1>
      <HistoryList />
    </div>
  );
}
