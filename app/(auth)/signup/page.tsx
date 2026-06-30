import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { createClient } from "@/utils/supabase/server";

const SignupPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) => {
  const { error } = await searchParams;

  const signup = async (formData: FormData) => {
    "use server";

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signUp({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });

    if (error) {
      redirect(
        `${routes.auth.signup}?error=${encodeURIComponent(error.message)}`,
      );
    }

    if (!data.session) {
      redirect(
        `${routes.auth.login}?error=${encodeURIComponent(
          "Check your email to confirm your account.",
        )}`,
      );
    }

    redirect(routes.app.home);
  };

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
        <AuthForm variant="signup" action={signup} error={error} />
      </div>
    </div>
  );
};

export default SignupPage;
