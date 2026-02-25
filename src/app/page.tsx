import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to login page as the home of the system
  redirect('/login');
}
