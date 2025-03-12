import AuthTemplate from '@/components/template/authTemplate';

export default function OtpConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthTemplate>{children}</AuthTemplate>;
}
