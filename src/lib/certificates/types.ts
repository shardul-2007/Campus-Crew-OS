export type CertificateType = 'participation' | 'winner';

export type CertificateStatus = 'generated' | 'distributed' | 'revoked';

export interface GenerateCertificateOptions {
  eventId: string;
  eventName: string;
  eventDate: string;
  collegeName?: string;
  participantId?: string;
  recipientName: string;
  recipientEmail?: string;
  certificateType: CertificateType;
  rank?: number;
  score?: number;
  forceRegenerate?: boolean;
}

export interface GeneratedCertificateResult {
  certificateId: string;
  recipientName: string;
  recipientEmail?: string;
  certificateType: CertificateType;
  certificateUrl: string;
  verificationUrl: string;
  pdfDataUri?: string;
  generatedAt: string;
  distributedAt?: string;
  status: CertificateStatus;
}

export interface CertificateEligibilityStats {
  participationEligible: number;
  participationGenerated: number;
  participationDistributed: number;
  winnersEligible: number;
  winnersGenerated: number;
  winnersDistributed: number;
}
