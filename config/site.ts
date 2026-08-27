export const siteConfig = {
  name: "Madrasa Management System",
  shortName: "MadrasaMS",
  description:
    "Everything your madrasa needs to manage students, teachers, attendance, fees, results and communication — all in one platform.",
  tagline: "Empowering Islamic Education Through Better Management",
  url: "https://madrasams.com",
  madrasaName: "Al-Noor Islamic Academy",
  contact: {
    address: "House 12, Road 5, Mirpur DOHS, Dhaka 1216",
    phone: "01712345678",
    email: "info@alnoor-madrasa.edu.bd",
    officeHours: "Sat–Thu: 9:00 AM – 5:00 PM",
  },
  social: {
    facebook: "#",
    youtube: "#",
    whatsapp: "#",
  },
};

export const demoAccounts = [
  {
    role: "Super Admin",
    email: "admin@example.com",
    password: "password123",
  },
  {
    role: "Madrasa Admin",
    email: "madrasa@example.com",
    password: "password123",
  },
  {
    role: "Teacher",
    email: "teacher@example.com",
    password: "password123",
  },
  {
    role: "Accountant",
    email: "accountant@example.com",
    password: "password123",
  },
  {
    role: "Guardian",
    email: "guardian@example.com",
    password: "password123",
  },
] as const;

export const stats = {
  studentsManaged: "10,000+",
  teachers: "500+",
  institutions: "100+",
  availability: "99.9%",
};
