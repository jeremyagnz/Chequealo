export class Verification {
    constructor(id, tenantId, userId, claim, status, credibilityScore, verdict, evidence, aiResponses, createdAt, updatedAt) {
        this.id = id;
        this.tenantId = tenantId;
        this.userId = userId;
        this.claim = claim;
        this.status = status;
        this.credibilityScore = credibilityScore;
        this.verdict = verdict;
        this.evidence = evidence;
        this.aiResponses = aiResponses;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    markAsProcessing() {
        this.status = 'processing';
        this.updatedAt = new Date();
    }
    complete(score, verdict, evidence, aiResponses) {
        this.status = 'completed';
        this.credibilityScore = score;
        this.verdict = verdict;
        this.evidence = evidence;
        this.aiResponses = aiResponses;
        this.updatedAt = new Date();
    }
    fail() {
        this.status = 'failed';
        this.updatedAt = new Date();
    }
    isPending() {
        return this.status === 'pending';
    }
    isCompleted() {
        return this.status === 'completed';
    }
}
