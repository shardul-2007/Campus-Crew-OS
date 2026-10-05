import { redirect } from 'next/navigation';

export default function SubTabRedirect({
  params,
}: {
  params: { eventCode: string; tab: string };
}) {
  // Gracefully redirect to the main Event Command Center
  redirect(`/events/${params.eventCode}`);
}
