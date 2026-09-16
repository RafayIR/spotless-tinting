import LegalPageLayout from '@/components/LegalPageLayout';
import { privacyDoc } from '@/data/legal/privacy';

export default function PrivacyPolicy() {
  return <LegalPageLayout doc={privacyDoc} breadcrumbLabel="Privacy Policy" />;
}
