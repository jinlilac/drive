import { useLocation, useSearchParams } from 'react-router-dom';
import { useOAuth } from '@/apis/OAuth';
import { useEffect } from 'react';

export default function OAuth() {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const social = pathname.split('/')[2];
  const { oauth } = useOAuth(social);
  useEffect(() => {
    oauth({ code: searchParams.get('code') as string });
  }, []);
  return <div>hello</div>;
}
