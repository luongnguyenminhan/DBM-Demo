// filepath: /Users/anlnm/Desktop/Project/dbm-demo/src/app/getting-started/layout.tsx
import AuthTemplate from '@/components/template/authTemplate';

export default function GettingStartedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthTemplate>{children}</AuthTemplate>;
}
