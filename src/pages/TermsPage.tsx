import LegalPageLayout from '@/components/LegalPageLayout';
import { termsDoc } from '@/data/legal/terms';

export default function TermsPage() {
  return <LegalPageLayout doc={termsDoc} breadcrumbLabel="Terms & Conditions" />;
}
