# Missing information and assumptions

## Required before public launch

- Public business hours, if the company chooses to publish them.
- Confirmed countries or geographic markets served.
- Legal pages and approved privacy wording, including the data-retention policy for enquiries.
- MongoDB connection settings, hosting access, and monitoring/backup services.
- Named admin user email and a securely generated password hash.
- Any verified registrations, certifications, partner brands, statistics, dates, team details, and customer testimonials the company wants to publish.

## Content assumptions

- The approved public identity is ARSOS, with ARSOS TECH reserved for the IT division, and the full company name ARSOS Trading Company Private Limited for Storage. The approved sales email, address, location, and three public phone numbers are centralized in `client/src/company.js`.
- The client-approved public sector labels are Cleaning Items, Chemical, IT Services, and Hotel Supplies. The internal Chemical route remains `/services/chemical-business` for backward compatibility. An earlier introductory paragraph in the supplied RTF mentions textiles and food services; those appear to be superseded and are not presented as current sectors.
- “Vision” was required by the project brief but not explicitly supplied in the RTF. The website uses a modest, non-factual vision statement derived only from the supplied positioning: making procurement and support simpler, reliable, and efficient. It requires company approval.
- No products, prices, geographic claims, founding dates, staff counts, client names, accreditations, or delivery promises have been invented.
- “Global standards” is retained from the supplied “Why Choose Us” copy as an aspiration/commitment, not presented as a certification.
- The contact form records consent only for responding to an enquiry; legal counsel should approve the final notice and retention process.
- In-memory database mode is deliberately volatile and intended only for local development and automated tests.

## Development-only placeholders

Reserved domains such as `example.invalid` remain only in automated tests and clearly labelled seed examples. Environment template values must still be reviewed before each deployment.
