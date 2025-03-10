import AuthLayout from '@/components/layouts/AuthLayout';

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
