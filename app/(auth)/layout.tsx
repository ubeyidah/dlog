import Link from "next/link";
import Image from "next/image";
import { FloatingPaths } from "@/components/shared/floating-paths";
import { HugeiconsIcon } from "@hugeicons/react";
import { Back } from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col border-r bg-secondary p-10 lg:flex dark:bg-secondary/20">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
        <div className="w-fit z-20">
          <Link
            href="/"
            className="flex items-center">
            <Image src={"/logo.svg"} width={20} height={10} alt='dlog logo' className='h-8 w-full' />
          </Link>
        </div>
        <div className="z-10 mt-auto">
          <blockquote className="space-y-2 text-center">
            <p className="text-lg">
              &ldquo;Before <Link href="/" className="text-primary hover:underline">DLOG</Link>, my days blurred together. Now, I capture daily snippets like a photo album for my mind. Looking back, I see how far I’ve come.&rdquo;
            </p>
            <footer className="font-mono font-semibold text-sm">
              ~ Ubeyidah, Creator
            </footer>
          </blockquote>
        </div>
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>
      <div className="relative flex min-h-screen flex-col justify-center p-4">
        <div
          aria-hidden
          className="-z-10 absolute inset-0 isolate opacity-60 contain-strict"
        >
          <div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-140 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
          <div className="absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
        </div>
        <Link href={'/'} className={buttonVariants({ variant: "ghost", className: "absolute top-7 left-5 items-center" })}>
          <HugeiconsIcon icon={Back} strokeWidth={2} className="size-5" /> Home
        </Link>
        {children}
      </div>
    </main>
  );
}
