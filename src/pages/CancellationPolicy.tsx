import LegalPageLayout from '@/components/LegalPageLayout';
import { cancellationDoc } from '@/data/legal/cancellation';

export default function CancellationPolicy() {
  return (
    <LegalPageLayout
      doc={cancellationDoc}
      breadcrumbLabel="Cancellation & Rescheduling"
    />
  );
}
