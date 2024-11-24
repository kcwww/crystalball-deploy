import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/constants/routes';

const ErrorPage = () => {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center text-white">
      <Image src="/images/404.png" alt="404" width={300} height={300} />
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <Button variant="outline" className="mt-4 text-black" asChild>
        <Link href={ROUTES.LANDING}>Go Home</Link>
      </Button>
    </main>
  );
};

export default ErrorPage;
