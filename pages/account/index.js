import Dashboard from './dashboard'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
export default function IndexAccountLayout() {
  let user;
  const router = useRouter();
  useEffect(() => {
    user = JSON.parse(localStorage.getItem('user'));
  }, [])
  return (
    <>
      <Dashboard />
    </>
  );
}
