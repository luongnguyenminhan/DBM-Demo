import AuthLayout from '@/components/layouts/AuthLayout';

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
