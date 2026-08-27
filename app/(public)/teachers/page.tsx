import { teachers } from "@/data/teachers";
import { TeachersContent } from "./teachers-content";

export default function TeachersPage() {
  return <TeachersContent teachers={teachers} />;
}
