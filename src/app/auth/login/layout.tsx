import AuthTemplate from '@/components/template/authTemplate';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthTemplate>{children}</AuthTemplate>;
}
