const steps = [
  { num: '01', title: 'Enquire', desc: 'Reach out via our quote form, phone or Book Now page with the details of your vehicle or property.' },
  { num: '02', title: 'Consultation', desc: 'We discuss your needs, preferences and options to recommend the best film or service for you.' },
  { num: '03', title: 'Choose Your Solution', desc: 'Select your preferred film type, finish and coverage based on our expert recommendation.' },
  { num: '04', title: 'Professional Preparation', desc: 'Your vehicle or windows are meticulously cleaned and prepared for a flawless installation.' },
  { num: '05', title: 'Expert Installation', desc: 'Our experienced technicians apply the film with precision for a clean, bubble-free finish.' },
  { num: '06', title: 'Final Inspection', desc: 'We inspect every detail to ensure the highest standard before handing your keys back.' },
];

export default function ProcessTimeline() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step) => (
        <div
          key={step.num}
          className="relative rounded-2xl border border-ink-100 bg-white p-6 transition-shadow hover:shadow-lg"
        >
          <span className="font-display text-3xl font-bold text-accent-500">{step.num}</span>
          <h3 className="mt-3 text-lg font-bold text-ink-950">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}
