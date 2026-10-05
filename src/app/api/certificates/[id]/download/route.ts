import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { certifyHackerRankClient } from '@/lib/certificates/certify-hackerrank';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const allCerts = db.getEventCertificates();
  const cert = allCerts.find((c) => c.id === params.id || params.id.includes(c.id));

  const recipientName = cert?.recipient_name || 'Participant';
  const eventTitle = cert?.event_title || 'Campus Coding Contest';
  const certType = (cert?.certificate_type || 'participation') as 'participation' | 'winner';

  try {
    const pdfBytes = await certifyHackerRankClient.renderPdfDocument({
      certificateId: params.id,
      participantName: recipientName,
      testTitle: eventTitle,
      certificateType: certType,
      issueDate: cert?.generated_at || new Date().toISOString(),
      verificationUrl: `https://certify-hackerrank.vercel.app/verify/${params.id}`,
    });

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificate-${params.id}.pdf"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
