import AuthTemplate from '@/components/template/authTemplate';

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthTemplate>{children}</AuthTemplate>;
}
