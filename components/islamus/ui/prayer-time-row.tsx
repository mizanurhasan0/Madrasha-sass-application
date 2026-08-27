import Image from "next/image";

interface PrayerTimeRowProps {
  name: string;
  time: string;
  iqamah: string;
  icon: string;
}

export function PrayerTimeRow({ name, time, iqamah, icon }: PrayerTimeRowProps) {
  return (
    <div className="is-time-block">
      <Image src={icon} alt={name} width={48} height={48} className="mx-auto" />
      <h4 className="is-prayer-name">{name}</h4>
      <p className="mt-2 text-sm font-semibold text-[var(--headings-color)]">{time}</p>
      <p className="text-xs text-[var(--text-color)]">Iqamah: {iqamah}</p>
    </div>
  );
}
