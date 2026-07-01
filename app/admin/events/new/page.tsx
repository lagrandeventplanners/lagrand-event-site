import { getAllTags } from "@/lib/events-store";
import NewEventForm from "./NewEventForm";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  const existingTags = await getAllTags();
  return <NewEventForm suggestedTags={existingTags} />;
}
