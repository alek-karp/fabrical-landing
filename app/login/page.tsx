import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
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
        <LoginForm />
      </div>
    </div>
  );
}
