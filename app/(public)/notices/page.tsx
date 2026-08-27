import { notices } from "@/data/notices";
import { NoticesContent } from "./notices-content";

export default function NoticesPage() {
  return <NoticesContent notices={notices} />;
}
