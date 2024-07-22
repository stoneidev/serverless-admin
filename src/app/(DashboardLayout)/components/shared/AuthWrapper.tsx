// components/AuthWrapper.tsx
import { useAuth } from "@/utils/hooks/useAuth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(
        `/authentication/login?redirect=${pathname}${
          searchParams ? `?${searchParams.toString()}` : ""
        }`
      );
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{isAuthenticated ? children : null}</>;
};

export default AuthWrapper;
