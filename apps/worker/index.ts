import { createVerificationWorker } from './processors/verification.processor';
import { createSearchWorker } from './processors/search.processor';

console.log('🚀 Chequealo AI Worker starting...');

const verificationWorker = createVerificationWorker();
const searchWorker = createSearchWorker();

verificationWorker.on('completed', (job) => {
  console.log(`✅ Verification job ${job.id} completed`);
});

verificationWorker.on('failed', (job, err) => {
  console.error(`❌ Verification job ${job?.id} failed:`, err.message);
});

searchWorker.on('completed', (job) => {
  console.log(`✅ Search job ${job.id} completed`);
});

searchWorker.on('failed', (job, err) => {
  console.error(`❌ Search job ${job?.id} failed:`, err.message);
});

async function shutdown(): Promise<void> {
  console.log('Shutting down workers gracefully...');
  await Promise.all([verificationWorker.close(), searchWorker.close()]);
  process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
