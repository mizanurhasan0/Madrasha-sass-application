export type NoticeCategory =
  | "general"
  | "academic"
  | "exam"
  | "holiday"
  | "fee"
  | "admission";

export type NoticeAudience =
  | "everyone"
  | "teachers"
  | "guardians"
  | "class";

export type Notice = {
  id: string;
  title: string;
  titleBn?: string;
  category: NoticeCategory;
  description: string;
  descriptionBn?: string;
  publishDate: string;
  audience: NoticeAudience;
  targetClassId?: string;
  published: boolean;
  madrasaId: string;
};

export type Event = {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  status: "upcoming" | "completed" | "cancelled";
  madrasaId: string;
};
