export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  title: string;
  path: string;
  description: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
};

export const termsDoc: LegalDoc = {
  title: 'Terms & Conditions',
  path: '/terms',
  description:
    'Terms & Conditions for Spotless Tinting Pty Ltd website use, quotations, bookings and services in Hobart.',
  lastUpdated: 'September 2026',
  intro:
    'These Terms & Conditions (“Terms”) apply to the use of the Spotless Tinting website and to quotations, bookings and services provided by Spotless Tinting Pty Ltd (“Spotless Tinting”, “we”, “us” or “our”).',
  sections: [
    {
      id: 'about-these-terms',
      title: '1. About These Terms',
      blocks: [
        {
          type: 'p',
          text: 'These Terms & Conditions (“Terms”) apply to the use of the Spotless Tinting website and to quotations, bookings and services provided by Spotless Tinting Pty Ltd (“Spotless Tinting”, “we”, “us” or “our”).',
        },
        {
          type: 'p',
          text: 'By using our website, requesting a quotation, making a booking or engaging us to provide services, you agree to these Terms.',
        },
        {
          type: 'p',
          text: 'If specific terms are included in a quotation, invoice, booking confirmation, warranty document or service agreement, those terms should be read together with these Terms.',
        },
      ],
    },
    {
      id: 'our-services',
      title: '2. Our Services',
      blocks: [
        { type: 'p', text: 'Spotless Tinting provides services including:' },
        {
          type: 'ul',
          items: [
            'automotive window tinting',
            'residential window tinting',
            'commercial window tinting',
            'Paint Protection Film (PPF)',
            'vehicle wrapping',
            'Smart Tint and switchable film',
            'privacy, decorative, safety and security films',
            'film removal and replacement',
            'other related vehicle and glass protection services',
          ],
        },
        {
          type: 'p',
          text: 'The availability and suitability of particular products or services may depend on the vehicle, glass type, property, project specifications and customer requirements.',
        },
      ],
    },
    {
      id: 'website-information',
      title: '3. Website Information',
      blocks: [
        {
          type: 'p',
          text: 'We aim to ensure that information displayed on our website is accurate and current.',
        },
        {
          type: 'p',
          text: 'However, website content is provided for general information and may change from time to time without notice.',
        },
        {
          type: 'p',
          text: 'Images, illustrations, vehicle renders, film examples and project photographs are intended to provide a general indication of appearance.',
        },
        { type: 'p', text: 'Actual results may vary depending on factors including:' },
        {
          type: 'ul',
          items: [
            'lighting conditions',
            'glass type',
            'existing glass colour',
            'vehicle interior',
            'viewing angle',
            'film selected',
            'vehicle paint colour',
            'surface condition',
            'environmental conditions',
          ],
        },
        {
          type: 'p',
          text: 'Customers should not rely solely on website photographs when selecting a product or finish.',
        },
        {
          type: 'p',
          text: 'Our team can provide advice about appropriate options before installation.',
        },
      ],
    },
    {
      id: 'quotations',
      title: '4. Quotations',
      blocks: [
        {
          type: 'p',
          text: 'Unless otherwise stated, quotations are based on the information available to us at the time they are prepared.',
        },
        {
          type: 'p',
          text: 'This may include information provided by the customer such as:',
        },
        {
          type: 'ul',
          items: [
            'vehicle make and model',
            'photographs',
            'measurements',
            'window quantities',
            'glass type',
            'plans',
            'project descriptions',
            'requested products or services',
          ],
        },
        {
          type: 'p',
          text: 'A quotation may need to be revised if the information supplied is incomplete or inaccurate, or if circumstances identified during inspection differ materially from those originally provided.',
        },
        {
          type: 'p',
          text: 'We will advise you where reasonably possible before carrying out additional work that would result in a material change to the quoted price.',
        },
      ],
    },
    {
      id: 'quote-validity',
      title: '5. Quote Validity',
      blocks: [
        { type: 'p', text: 'A quotation is valid for 21 days.' },
        {
          type: 'p',
          text: 'If no validity period is stated, pricing may be subject to change before a booking is confirmed due to factors including:',
        },
        {
          type: 'ul',
          items: [
            'product costs',
            'supplier pricing',
            'availability',
            'project requirements',
            'changes requested by the customer',
          ],
        },
        {
          type: 'p',
          text: 'A quotation does not guarantee availability of a particular appointment time or product until the booking has been confirmed.',
        },
      ],
    },
    {
      id: 'pricing',
      title: '6. Pricing',
      blocks: [
        { type: 'p', text: 'Unless otherwise stated:' },
        {
          type: 'ul',
          items: [
            'prices are quoted in Australian dollars',
            'GST will be included or identified where applicable',
            'pricing applies only to the services and products described in the quotation',
          ],
        },
        {
          type: 'p',
          text: 'Additional work requested by the customer may result in additional charges.',
        },
        { type: 'p', text: 'Examples may include:' },
        {
          type: 'ul',
          items: [
            'removal of existing tint or film',
            'removal of adhesive',
            'additional surface preparation',
            'unexpected access requirements',
            'additional glass or vehicle panels',
            'design changes',
            'additional materials',
            'work outside the original scope',
          ],
        },
        {
          type: 'p',
          text: 'Any significant additional charges will generally be discussed before the additional work proceeds.',
        },
      ],
    },
    {
      id: 'bookings',
      title: '7. Bookings',
      blocks: [
        { type: 'p', text: 'Bookings are subject to availability.' },
        {
          type: 'p',
          text: 'A booking is considered confirmed once Spotless Tinting has accepted the booking and provided confirmation to the customer.',
        },
        { type: 'p', text: 'We may require information such as:' },
        {
          type: 'ul',
          items: [
            'customer name',
            'contact details',
            'vehicle details',
            'property address',
            'service required',
            'film or product selection',
            'preferred appointment date',
          ],
        },
        {
          type: 'p',
          text: 'Where a deposit is required, the deposit amount and applicable conditions will be communicated before or when the booking is confirmed.',
        },
      ],
    },
    {
      id: 'deposits',
      title: '8. Deposits',
      blocks: [
        { type: 'p', text: 'Certain projects may require a deposit before:' },
        {
          type: 'ul',
          items: [
            'materials are ordered',
            'custom film is produced',
            'artwork or design work begins',
            'an installation date is reserved',
            'work commences',
          ],
        },
        {
          type: 'p',
          text: 'The amount and applicable deposit conditions will be stated in the quotation, invoice or booking confirmation.',
        },
        {
          type: 'p',
          text: "Where products, printed graphics, custom materials or specially ordered items have already been purchased or produced specifically for a customer's project, amounts relating to those costs may not be refundable to the extent permitted by law.",
        },
        {
          type: 'p',
          text: 'Nothing in this section limits rights available under the Australian Consumer Law.',
        },
      ],
    },
    {
      id: 'changes-and-cancellations',
      title: '9. Changes and Cancellations',
      blocks: [
        {
          type: 'p',
          text: 'If you need to change or cancel a booking, please contact Spotless Tinting as early as possible.',
        },
        {
          type: 'p',
          text: 'Any applicable cancellation, rescheduling or deposit conditions will be communicated when the booking is made or included in the relevant quotation.',
        },
        {
          type: 'p',
          text: 'For customised projects, cancellation after materials have been ordered, artwork approved or production has commenced may result in reasonable charges for costs already incurred.',
        },
        {
          type: 'p',
          text: 'We will not impose a cancellation term in a way that removes any rights you may have under applicable consumer law.',
        },
      ],
    },
    {
      id: 'customer-responsibilities',
      title: '10. Customer Responsibilities',
      blocks: [
        {
          type: 'p',
          text: 'Customers are responsible for providing accurate information relevant to the work being performed.',
        },
        {
          type: 'p',
          text: 'Depending on the project, this may include:',
        },
        {
          type: 'ul',
          items: [
            'correct vehicle make, model and year',
            'details of existing tint or film',
            'relevant modifications',
            'glass dimensions',
            'glass specifications',
            'building access information',
            'photographs',
            'site restrictions',
            'any known defects or damage',
          ],
        },
        {
          type: 'p',
          text: 'Customers should advise us of anything that may affect installation before work begins.',
        },
      ],
    },
    {
      id: 'vehicle-condition',
      title: '11. Vehicle Condition',
      blocks: [
        {
          type: 'p',
          text: 'Before automotive work begins, customers should advise Spotless Tinting of any known:',
        },
        {
          type: 'ul',
          items: [
            'damaged glass',
            'scratches',
            'paint defects',
            'chips',
            'cracks',
            'aftermarket accessories',
            'damaged trims',
            'electronic issues',
            'previous repairs',
            'repainting',
            'previous wraps',
            'previous PPF',
            'existing window film',
          ],
        },
        {
          type: 'p',
          text: "Where reasonably appropriate, our team may inspect and record the vehicle's condition before commencing work.",
        },
        {
          type: 'p',
          text: 'Spotless Tinting is not responsible for pre-existing damage that was present before our work commenced.',
        },
        {
          type: 'p',
          text: 'This does not limit our responsibility for damage caused by a failure to exercise appropriate care and skill.',
        },
      ],
    },
    {
      id: 'property-and-glass-condition',
      title: '12. Property and Glass Condition',
      blocks: [
        {
          type: 'p',
          text: 'For residential and commercial installations, customers should disclose any known concerns regarding:',
        },
        {
          type: 'ul',
          items: [
            'damaged glass',
            'cracked glass',
            'scratched glass',
            'seals',
            'frames',
            'previous film',
            'glazing defects',
            'access restrictions',
            'other conditions that may affect installation',
          ],
        },
        {
          type: 'p',
          text: 'The suitability of window film can depend on the type and condition of the glass.',
        },
        {
          type: 'p',
          text: 'Where appropriate, we may recommend an alternative product or decline an installation where we reasonably believe the proposed application is unsuitable.',
        },
      ],
    },
    {
      id: 'existing-tint-and-film-removal',
      title: '13. Existing Tint and Film Removal',
      blocks: [
        {
          type: 'p',
          text: 'Removing existing tint, vinyl, PPF or other films may reveal pre-existing:',
        },
        {
          type: 'ul',
          items: [
            'scratches',
            'adhesive residue',
            'paint imperfections',
            'glass damage',
            'fading',
            'colour differences',
            'surface defects',
          ],
        },
        {
          type: 'p',
          text: 'Spotless Tinting is not responsible for defects that existed before removal and were concealed by the previous product.',
        },
        {
          type: 'p',
          text: 'If additional work is required after removal, we will discuss the available options with the customer.',
        },
      ],
    },
    {
      id: 'window-tint-appearance',
      title: '14. Window Tint Appearance',
      blocks: [
        {
          type: 'p',
          text: 'Window film appearance varies according to the product selected and the glass or vehicle on which it is installed.',
        },
        { type: 'p', text: 'Factors such as:' },
        {
          type: 'ul',
          items: [
            'lighting',
            'viewing angle',
            'interior colour',
            'existing factory glass',
            'sunlight',
            'glass thickness',
            'surrounding reflections',
          ],
        },
        {
          type: 'p',
          text: 'can affect perceived darkness, reflectivity and colour.',
        },
        {
          type: 'p',
          text: 'Samples and photographs should therefore be treated as indicative rather than an exact representation of the finished appearance.',
        },
      ],
    },
    {
      id: 'automotive-tint-and-legal-requirements',
      title: '15. Automotive Tint and Legal Requirements',
      blocks: [
        {
          type: 'p',
          text: 'Automotive window tint must comply with applicable vehicle laws and regulations.',
        },
        {
          type: 'p',
          text: 'Spotless Tinting can assist customers in selecting suitable legal tinting options for normal road use.',
        },
        {
          type: 'p',
          text: 'If a customer requests a product or application that would not comply with applicable road-use requirements, Spotless Tinting may decline to perform the work.',
        },
        {
          type: 'p',
          text: 'The customer remains responsible for the lawful operation and use of their vehicle following installation.',
        },
      ],
    },
    {
      id: 'paint-protection-film',
      title: '16. Paint Protection Film',
      blocks: [
        {
          type: 'p',
          text: 'PPF is designed to help protect vehicle paintwork from certain everyday impacts and environmental exposure.',
        },
        { type: 'p', text: 'It does not make vehicle paint indestructible.' },
        {
          type: 'p',
          text: 'PPF cannot guarantee protection against every:',
        },
        {
          type: 'ul',
          items: [
            'stone chip',
            'scratch',
            'collision',
            'abrasion',
            'impact',
            'stain',
            'environmental contaminant',
          ],
        },
        {
          type: 'p',
          text: 'Existing paint defects may remain visible after installation.',
        },
        {
          type: 'p',
          text: 'Results may also vary depending on the condition and history of the paint surface.',
        },
      ],
    },
    {
      id: 'vehicle-wraps',
      title: '17. Vehicle Wraps',
      blocks: [
        {
          type: 'p',
          text: 'Vehicle wraps are applied over the existing vehicle surface.',
        },
        {
          type: 'p',
          text: 'Customers must advise us if the vehicle has:',
        },
        {
          type: 'ul',
          items: [
            'been repainted',
            'undergone body repairs',
            'damaged or peeling clear coat',
            'rust',
            'poorly bonded paint',
            'other surface defects',
          ],
        },
        {
          type: 'p',
          text: 'Wrap installation or eventual removal may present additional risks on previously repaired, repainted or deteriorated surfaces.',
        },
        {
          type: 'p',
          text: 'We may recommend against wrapping particular surfaces where their condition appears unsuitable.',
        },
      ],
    },
    {
      id: 'artwork-and-vehicle-graphics',
      title: '18. Artwork and Vehicle Graphics',
      blocks: [
        {
          type: 'p',
          text: 'For custom vehicle wraps, signage or graphics, customers are responsible for carefully reviewing artwork before approval.',
        },
        {
          type: 'p',
          text: 'Approval confirms acceptance of matters including:',
        },
        {
          type: 'ul',
          items: [
            'spelling',
            'names',
            'contact details',
            'phone numbers',
            'website addresses',
            'colours',
            'logos',
            'layout',
            'wording',
            'general design',
          ],
        },
        {
          type: 'p',
          text: 'Production will normally commence after artwork approval.',
        },
        {
          type: 'p',
          text: 'Once approved artwork has entered production, changes may result in additional design, printing, material and installation costs.',
        },
        {
          type: 'p',
          text: 'Screen colours and printed colours may vary slightly because screens and printing systems reproduce colour differently.',
        },
      ],
    },
    {
      id: 'smart-tint',
      title: '19. Smart Tint',
      blocks: [
        {
          type: 'p',
          text: 'Smart Tint or switchable film performance depends on:',
        },
        {
          type: 'ul',
          items: [
            'the glass',
            'electrical installation',
            'installation environment',
            'film selected',
            'project configuration',
          ],
        },
        {
          type: 'p',
          text: 'The change between transparent and privacy states may not necessarily create completely opaque glass in all lighting conditions.',
        },
        {
          type: 'p',
          text: 'Our team can explain the expected appearance and performance for the selected application before installation.',
        },
      ],
    },
    {
      id: 'installation-and-completion',
      title: '20. Installation and Completion',
      blocks: [
        {
          type: 'p',
          text: 'We aim to complete all work within the estimated timeframe provided.',
        },
        {
          type: 'p',
          text: 'Completion times are estimates unless specifically agreed otherwise.',
        },
        {
          type: 'p',
          text: 'Timing may be affected by matters including:',
        },
        {
          type: 'ul',
          items: [
            'project complexity',
            'weather',
            'supplier delays',
            'product availability',
            'vehicle or glass condition',
            'access',
            'drying or curing requirements',
            'circumstances outside our reasonable control',
          ],
        },
        {
          type: 'p',
          text: 'Where a significant delay occurs, we will aim to keep the customer informed.',
        },
      ],
    },
    {
      id: 'curing-and-settling-periods',
      title: '21. Curing and Settling Periods',
      blocks: [
        {
          type: 'p',
          text: 'Some installed films require time to cure, dry or settle after installation.',
        },
        {
          type: 'p',
          text: 'During this period, temporary characteristics such as slight:',
        },
        {
          type: 'ul',
          items: [
            'haze',
            'moisture',
            'cloudiness',
            'small water pockets',
            'visual variations',
          ],
        },
        {
          type: 'p',
          text: 'may be visible.',
        },
        {
          type: 'p',
          text: 'These do not necessarily indicate an installation defect.',
        },
        {
          type: 'p',
          text: 'Customers should follow the aftercare instructions provided by Spotless Tinting.',
        },
      ],
    },
    {
      id: 'aftercare',
      title: '22. Aftercare',
      blocks: [
        {
          type: 'p',
          text: 'Proper aftercare can affect the performance and longevity of installed products.',
        },
        {
          type: 'p',
          text: 'Customers are responsible for following any aftercare instructions provided by Spotless Tinting or the relevant product manufacturer.',
        },
        {
          type: 'p',
          text: 'Instructions may relate to matters such as:',
        },
        {
          type: 'ul',
          items: [
            'cleaning',
            'washing',
            'window operation',
            'curing periods',
            'chemicals',
            'pressure washing',
            'polishing',
            'maintenance',
          ],
        },
        {
          type: 'p',
          text: 'If you are unsure how to care for an installed product, please contact us before using a product or cleaning method that may affect it.',
        },
      ],
    },
    {
      id: 'product-and-workmanship-warranties',
      title: '23. Product and Workmanship Warranties',
      blocks: [
        {
          type: 'p',
          text: 'Warranties vary depending on:',
        },
        {
          type: 'ul',
          items: [
            'product',
            'film manufacturer',
            'type of installation',
            'application',
            'service',
            'project',
          ],
        },
        {
          type: 'p',
          text: 'The applicable warranty, where provided, will be explained in the quotation, invoice, warranty documentation or other information supplied for the particular product.',
        },
        {
          type: 'p',
          text: "A manufacturer's warranty may be subject to its own terms and conditions.",
        },
        {
          type: 'p',
          text: 'Any warranty offered by Spotless Tinting or a manufacturer is in addition to, and does not replace, rights available under the Australian Consumer Law. ACCC guidance confirms that warranties cannot remove automatic consumer guarantees.',
        },
      ],
    },
    {
      id: 'australian-consumer-law',
      title: '24. Australian Consumer Law',
      blocks: [
        {
          type: 'p',
          text: 'Nothing in these Terms excludes, restricts or modifies any guarantee, right or remedy that cannot lawfully be excluded under the Australian Consumer Law or other applicable legislation.',
        },
        {
          type: 'p',
          text: 'Australian Consumer Law provides automatic guarantees for eligible goods and services, including requirements relating to acceptable quality and services being provided with due care and skill.',
        },
        {
          type: 'p',
          text: 'Where we are legally entitled to limit a liability, any limitation will apply only to the extent permitted by law.',
        },
      ],
    },
    {
      id: 'complaints-and-problems-with-work',
      title: '25. Complaints and Problems With Work',
      blocks: [
        {
          type: 'p',
          text: 'If you have concerns about an installation or service, please contact Spotless Tinting as soon as reasonably possible.',
        },
        {
          type: 'p',
          text: 'Providing photographs and details of the issue may help us assess the concern.',
        },
        {
          type: 'p',
          text: 'Where appropriate, we may ask to inspect the vehicle, glass or installed product before determining the appropriate response.',
        },
        {
          type: 'p',
          text: 'We aim to resolve legitimate workmanship or product concerns fairly and reasonably.',
        },
      ],
    },
    {
      id: 'photography-and-marketing',
      title: '26. Photography and Marketing',
      blocks: [
        {
          type: 'p',
          text: 'We may photograph completed projects for:',
        },
        {
          type: 'ul',
          items: [
            'internal records',
            'quality assurance',
            'staff reference',
            'project documentation',
          ],
        },
        {
          type: 'p',
          text: 'Where photographs contain identifiable personal information, their handling is subject to our Privacy Policy.',
        },
        {
          type: 'p',
          text: 'Where appropriate, permission will be obtained before identifiable customer information is used for promotional purposes.',
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: '27. Intellectual Property',
      blocks: [
        {
          type: 'p',
          text: 'Unless otherwise stated, content on the Spotless Tinting website, including:',
        },
        {
          type: 'ul',
          items: [
            'text',
            'graphics',
            'logos',
            'photographs',
            'designs',
            'icons',
            'artwork',
            'videos',
            'website content',
          ],
        },
        {
          type: 'p',
          text: 'is owned by or licensed to Spotless Tinting.',
        },
        {
          type: 'p',
          text: 'Website content must not be copied, reproduced, distributed, modified or commercially used without permission, except where permitted by law.',
        },
      ],
    },
    {
      id: 'customer-supplied-content',
      title: '28. Customer-Supplied Content',
      blocks: [
        {
          type: 'p',
          text: 'Where a customer provides:',
        },
        {
          type: 'ul',
          items: [
            'logos',
            'photographs',
            'artwork',
            'trademarks',
            'designs',
            'text',
            'other materials',
          ],
        },
        {
          type: 'p',
          text: 'for use in a project, the customer confirms that they have the necessary permission or rights for Spotless Tinting to use those materials for the requested work.',
        },
      ],
    },
    {
      id: 'third-party-links',
      title: '29. Third-Party Links',
      blocks: [
        {
          type: 'p',
          text: 'Our website may contain links to external websites or services.',
        },
        {
          type: 'p',
          text: 'Spotless Tinting does not control those websites and is not responsible for their:',
        },
        {
          type: 'ul',
          items: ['content', 'availability', 'security', 'terms', 'privacy practices'],
        },
        {
          type: 'p',
          text: "Access to third-party websites is at the user's discretion.",
        },
      ],
    },
    {
      id: 'limitation-of-liability',
      title: '30. Limitation of Liability',
      blocks: [
        {
          type: 'p',
          text: 'To the maximum extent permitted by law, Spotless Tinting is not responsible for indirect or consequential loss arising from use of our website or circumstances outside our reasonable control.',
        },
        {
          type: 'p',
          text: 'Nothing in this section limits liability that cannot legally be excluded or restricted, including applicable rights under the Australian Consumer Law.',
        },
      ],
    },
    {
      id: 'events-outside-our-control',
      title: '31. Events Outside Our Control',
      blocks: [
        {
          type: 'p',
          text: 'We will not be responsible for delays caused by circumstances outside our reasonable control, which may include:',
        },
        {
          type: 'ul',
          items: [
            'extreme weather',
            'power outages',
            'supplier delays',
            'shipping disruption',
            'equipment failure',
            'product shortages',
            'natural disasters',
            'government restrictions',
            'other unexpected events',
          ],
        },
        {
          type: 'p',
          text: 'Where possible, we will communicate with affected customers and arrange an appropriate alternative.',
        },
      ],
    },
    {
      id: 'privacy',
      title: '32. Privacy',
      blocks: [
        {
          type: 'p',
          text: 'Personal information collected through our website or in connection with our services is handled in accordance with the Spotless Tinting Privacy Policy.',
        },
        {
          type: 'p',
          text: 'A link to the Privacy Policy is available in the website footer.',
        },
      ],
    },
    {
      id: 'changes-to-these-terms',
      title: '33. Changes to These Terms',
      blocks: [
        {
          type: 'p',
          text: 'We may update these Terms & Conditions from time to time to reflect changes to:',
        },
        {
          type: 'ul',
          items: [
            'our services',
            'business practices',
            'website',
            'products',
            'legal requirements',
          ],
        },
        {
          type: 'p',
          text: 'The latest version will be published on our website and will display the date it was last updated.',
        },
        {
          type: 'p',
          text: 'Changes will not retrospectively remove rights that a customer already has under applicable law.',
        },
      ],
    },
    {
      id: 'governing-law',
      title: '34. Governing Law',
      blocks: [
        {
          type: 'p',
          text: 'These Terms are governed by the laws applicable in Tasmania, Australia.',
        },
        {
          type: 'p',
          text: 'Any dispute relating to these Terms will be subject to the jurisdiction of the courts and tribunals applicable in Tasmania, subject to any rights available under applicable Australian law.',
        },
      ],
    },
    {
      id: 'contact-us',
      title: '35. Contact Us',
      blocks: [
        {
          type: 'p',
          text: 'Questions regarding these Terms & Conditions can be directed to Spotless Tinting Pty Ltd using the contact details listed below.',
        },
      ],
    },
  ],
};
