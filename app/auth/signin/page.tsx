'use client';

import { useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

function SignInContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  useEffect(() => {
    if (status === 'loading') return;
    
    if (session) {
      // User is already signed in, redirect to callback URL
      window.location.href = callbackUrl;
    } else {
      // User is not signed in, redirect to Spotify OAuth
      signIn('spotify', { callbackUrl });
    }
  }, [session, status, callbackUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
