import AuthTemplate from '@/components/template/authTemplate';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthTemplate>{children}</AuthTemplate>;
}
