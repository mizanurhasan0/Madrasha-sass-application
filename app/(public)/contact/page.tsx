import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = { title: "Contact | Islamus" };

export default function ContactPage() {
  return <ContactContent />;
}
