import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type AuthFormProps = React.ComponentProps<"div"> & {
  action?: (formData: FormData) => void | Promise<void>;
  variant?: "login" | "signup";
  error?: string;
};

const copy = {
  login: {
    title: "Welcome back",
    description: "Login to your Fabrical account",
    submit: "Login",
    passwordAutoComplete: "current-password",
    footerPrompt: "Don't have an account?",
    footerLinkLabel: "Sign up",
    footerHref: routes.auth.signup,
  },
  signup: {
    title: "Create your account",
    description: "Sign up for a Fabrical account",
    submit: "Sign up",
    passwordAutoComplete: "new-password",
    footerPrompt: "Already have an account?",
    footerLinkLabel: "Login",
    footerHref: routes.auth.login,
  },
} as const;

export function AuthForm({
  action,
  variant = "login",
  error,
  className,
  ...props
}: AuthFormProps) {
  const text = copy[variant];

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-none border-[#cdbb85] shadow-none ring-0 overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={action} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{text.title}</h1>
                <p className="text-balance text-muted-foreground">
                  {text.description}
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className="rounded-none"
                  autoComplete="email"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {variant === "login" ? (
                    <a
                      href={routes.auth.login}
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  ) : null}
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="rounded-none"
                  autoComplete={text.passwordAutoComplete}
                  minLength={variant === "signup" ? 6 : undefined}
                  required
                />
              </Field>
              {error ? <FieldError>{error}</FieldError> : null}
              <Field>
                <Button
                  type="submit"
                  className="rounded-none bg-[#fbbf24] text-black hover:bg-[#e6b94f]"
                >
                  {text.submit}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="rounded-none border-[#bca765] shadow-none hover:bg-[#fff1bf]"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.4 11.4H1V1h10.4z" fill="currentColor" />
                    <path d="M23 11.4H12.6V1H23z" fill="currentColor" />
                    <path d="M11.4 23H1V12.6h10.4z" fill="currentColor" />
                    <path d="M23 23H12.6V12.6H23z" fill="currentColor" />
                  </svg>
                  <span className="sr-only">Continue with Microsoft</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="rounded-none border-[#bca765] shadow-none hover:bg-[#fff1bf]"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Continue with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                {text.footerPrompt}{" "}
                <Link href={text.footerHref}>{text.footerLinkLabel}</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/hero-datacenter.webp"
              alt="Electrical construction site"
              fill
              loading="eager"
              sizes="50vw"
              className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 sepia"
            />
            <div className="pointer-events-none absolute inset-0 bg-amber-400/55 mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-0 bg-[#fbbf24]/20" />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href={routes.legal.terms}>Terms of Service</a> and{" "}
        <a href={routes.legal.privacy}>Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
