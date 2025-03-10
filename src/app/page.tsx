import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect from root to default locale
  redirect('/en');
}
