export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqCategories = [
  'Automotive Tinting',
  'Residential Tinting',
  'Commercial Tinting',
  'PPF',
  'Vehicle Wrapping',
  'Booking',
  'Aftercare',
  'Warranty',
];

export const faqs: FAQItem[] = [
  // Automotive
  {
    id: 'a1',
    category: 'Automotive Tinting',
    question: 'How long does window tinting take?',
    answer:
      'Most automotive window tinting jobs take between 2 to 4 hours depending on the vehicle and the number of windows. We recommend allowing a full morning or afternoon for the best result.',
  },
  {
    id: 'a2',
    category: 'Automotive Tinting',
    question: 'How long does window tint last?',
    answer:
      'Premium window films, when professionally installed and properly cared for, can last many years. The exact lifespan depends on the film type, sun exposure and how well the tint is maintained.',
  },
  {
    id: 'a3',
    category: 'Automotive Tinting',
    question: 'What tint percentages are available?',
    answer:
      'We offer a range of VLT (Visible Light Transmission) options — from very dark privacy tints to lighter, legal-friendly films. We can advise on the best option for your needs and legal requirements.',
  },
  {
    id: 'a4',
    category: 'Automotive Tinting',
    question: 'Is window tint legal in Tasmania?',
    answer:
      'Yes, window tinting is legal in Tasmania with restrictions on how dark certain windows can be. Front side windows generally require a higher light transmission than rear windows. We will advise you on legal VLT limits for your vehicle.',
  },
  {
    id: 'a5',
    category: 'Automotive Tinting',
    question: 'Does tint reduce heat?',
    answer:
      'Yes. Premium films — especially ceramic — significantly reduce heat entering the vehicle by blocking infrared radiation. This keeps the cabin cooler and reduces air conditioning load.',
  },
  {
    id: 'a6',
    category: 'Automotive Tinting',
    question: 'Can you remove old tint?',
    answer:
      'Yes, we offer tint removal services. Old, bubbling or faded film can be carefully removed and replaced with new premium film.',
  },
  // Residential
  {
    id: 'r1',
    category: 'Residential Tinting',
    question: 'Can you tint residential windows?',
    answer:
      'Absolutely. We install solar control, privacy and security films on residential windows of all sizes. Home window tinting reduces heat, glare and UV while maintaining your view.',
  },
  {
    id: 'r2',
    category: 'Residential Tinting',
    question: 'Will home window tint make my rooms dark?',
    answer:
      'No. Modern residential films are designed to reduce heat and glare while allowing natural light to enter. We offer a range of tints from very light to darker privacy options.',
  },
  {
    id: 'r3',
    category: 'Residential Tinting',
    question: 'Do you offer security film for homes?',
    answer:
      'Yes. Security film helps hold broken glass together in the event of impact, improving safety and deterring break-ins. Ask us about the options suitable for your home.',
  },
  // Commercial
  {
    id: 'c1',
    category: 'Commercial Tinting',
    question: 'Can you tint office and shopfront windows?',
    answer:
      'Yes. We provide commercial window tinting for offices, retail stores, shopfronts and commercial buildings. Solutions include solar control, privacy, anti-graffiti and branded films.',
  },
  {
    id: 'c2',
    category: 'Commercial Tinting',
    question: 'Do you offer anti-graffiti film?',
    answer:
      'Yes. Anti-graffiti film protects glass surfaces from vandalism and can be replaced at a fraction of the cost of replacing the glass itself.',
  },
  // PPF
  {
    id: 'p1',
    category: 'PPF',
    question: 'Do you offer Paint Protection Film?',
    answer:
      'Yes. We install premium PPF on full vehicles or targeted high-impact areas such as the bonnet, bumper, mirrors and door edges. The film is self-healing and virtually invisible.',
  },
  {
    id: 'p2',
    category: 'PPF',
    question: 'Is PPF visible on the car?',
    answer:
      'PPF is designed to be virtually invisible once properly installed. It maintains the gloss and clarity of your paintwork while providing durable protection.',
  },
  {
    id: 'p3',
    category: 'PPF',
    question: 'Can PPF be removed?',
    answer:
      'Yes. PPF can be professionally removed without damaging the underlying paint, making it a flexible and reversible protection option.',
  },
  // Wrapping
  {
    id: 'w1',
    category: 'Vehicle Wrapping',
    question: 'What finishes are available for vehicle wraps?',
    answer:
      'We offer matte, gloss, satin and custom finishes in a wide range of colours. We can also create custom designs and commercial fleet branding.',
  },
  {
    id: 'w2',
    category: 'Vehicle Wrapping',
    question: 'Does a wrap damage the original paint?',
    answer:
      'No. A professionally applied and removed wrap should not damage factory paint. In fact, the vinyl protects the paint underneath from minor scratches and stone chips.',
  },
  // Booking
  {
    id: 'b1',
    category: 'Booking',
    question: 'How do I book an appointment?',
    answer:
      'You can request a booking through our Book Now page. Select your service, preferred date and time, and provide your details. We will confirm your appointment with you directly.',
  },
  {
    id: 'b2',
    category: 'Booking',
    question: 'Is a booking request a confirmed appointment?',
    answer:
      'A booking request is not a confirmed appointment until we contact you to confirm the date and time. We aim to confirm all requests as quickly as possible.',
  },
  // Aftercare
  {
    id: 'af1',
    category: 'Aftercare',
    question: 'How soon can I roll down my windows after tinting?',
    answer:
      'We recommend waiting at least 3 to 5 days before rolling down tinted windows to allow the film to fully cure. Curing times may vary with weather conditions.',
  },
  {
    id: 'af2',
    category: 'Aftercare',
    question: 'How do I clean tinted windows?',
    answer:
      'Use a soft microfibre cloth and a mild, ammonia-free glass cleaner. Avoid abrasive materials and ammonia-based products which can damage the film.',
  },
  {
    id: 'af3',
    category: 'Aftercare',
    question: 'What should I avoid after tinting?',
    answer:
      'Avoid rolling down windows during the curing period, do not use ammonia-based cleaners, and avoid applying stickers or suction mounts directly to the film.',
  },
  // Warranty
  {
    id: 'wa1',
    category: 'Warranty',
    question: 'Is there a warranty on window tinting?',
    answer:
      'Warranty coverage depends on the film and service selected. We will provide specific warranty information for your chosen product at the time of quoting. Please contact us for full warranty details.',
  },
  {
    id: 'wa2',
    category: 'Warranty',
    question: 'What is covered under warranty?',
    answer:
      'Typical warranty coverage includes peeling, bubbling, delamination and fading under normal use. Exclusions and conditions apply — full warranty terms are provided with your quote.',
  },
];
