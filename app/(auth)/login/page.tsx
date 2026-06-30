import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { createClient } from "@/utils/supabase/server";

const getSafeRedirect = (path: string | undefined) => {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return routes.app.home;
  }

  return path;
};

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirect?: string }>;
}) => {
  const { error, redirect: redirectPath } = await searchParams;

  const login = async (redirectPath: string, formData: FormData) => {
    "use server";

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });

    if (error) {
      const params = new URLSearchParams({
        error: error.message,
        redirect: redirectPath,
      });
      redirect(`${routes.auth.login}?${params.toString()}`);
    }

    redirect(redirectPath);
  };

  const safeRedirect = getSafeRedirect(redirectPath);

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <Button
        asChild
        variant="ghost"
        className="absolute left-4 top-4 rounded-none md:left-6 md:top-6"
      >
        <Link href={routes.home}>
          <ArrowLeft />
          Back
        </Link>
      </Button>
      <div className="w-full max-w-sm md:max-w-4xl">
        <AuthForm
          variant="login"
          action={login.bind(null, safeRedirect)}
          error={error}
        />
      </div>
    </div>
  );
};

export default LoginPage;
