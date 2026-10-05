import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const ev = db.getEventById(params.id) || db.getEventByCode(params.id);
  if (!ev) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  const proofs = db.getEventProofs(ev.id);
  return NextResponse.json({ success: true, data: proofs });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const ev = db.getEventById(params.id) || db.getEventByCode(params.id);
  if (!ev) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  try {
    const body = await req.json();
    const proof = db.addProof({
      event_id: ev.id,
      uploaded_by: user.id,
      proof_type: body.proof_type || 'event_photo',
      file_path: body.file_path || `event-proofs/upload-${Date.now()}.png`,
      file_name: body.file_name || 'evidence.png',
      mime_type: body.mime_type || 'image/png',
      file_size: body.file_size || 1024000,
      description: body.description || 'Uploaded proof documentation'
    });

    return NextResponse.json({ success: true, data: proof }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
