import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        router.push("/authentication/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default AuthWrapper;
