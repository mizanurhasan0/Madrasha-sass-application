const groups = [
  ["New to Islam", "Donate Now", "Arabic School"],
  ["Ask the Imam", "New to Islam", "Arabic School"],
  ["Ask the Imam", "Donate Now", "Arabic School"],
  ["Ask the Imam", "New to Islam", "Arabic School"],
  ["Ask the Imam", "Donate Now", "Arabic School"],
  ["Ask the Imam", "New to Islam", "Arabic School"],
];

export function MarqueeSection() {
  return (
    <section className="is-marquee">
      <div className="is-marquee-inner">
        {groups.map((group, gi) => (
          <div key={gi} className="is-marquee-group" aria-hidden={gi > 0 ? true : undefined}>
            {group.map((text) => (
              <div key={text} className="is-marquee-text">
                {text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
