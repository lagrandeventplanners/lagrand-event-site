import { getEventById } from "@/lib/events-store";
import { notFound } from "next/navigation";
import EditEventForm from "./EditEventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();
  return <EditEventForm event={event} />;
}
