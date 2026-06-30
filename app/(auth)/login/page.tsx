import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const login = async () => {
    "use server";

    redirect("/app");
  };

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <Button
        asChild
        variant="ghost"
        className="absolute left-4 top-4 rounded-none md:left-6 md:top-6"
      >
        <Link href="/">
          <ArrowLeft />
          Back
        </Link>
      </Button>
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm action={login} />
      </div>
    </div>
  );
};

export default LoginPage;
