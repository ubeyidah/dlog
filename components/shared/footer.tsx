"use client";
import { Github, Twitter } from "@hugeicons/core-free-icons";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import Wrapper from "./wrapper";

type FooterLink = {
  title: string;
  href: string;
  icon?: IconSvgElement;
};

type FooterSection = {
  label: string;
  links: FooterLink[];
};

const footerLinks: FooterSection[] = [
  {
    label: "Product",
    links: [
      { title: "Features", href: "#" },
      { title: "Pricing", href: "#" },
      { title: "Testimonials", href: "#" },
      { title: "Integration", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "FAQs", href: "#" },
      { title: "About Us", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Services", href: "#" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "#" },
      { title: "Changelog", href: "#" },
      { title: "Brand", href: "#" },
      { title: "Help", href: "#" },
    ],
  },
  {
    label: "Social Links",
    links: [
      { title: "Github", href: "https://github.com/ubeyidah", icon: Github },
      { title: "x.com", href: "https://x.com/ubeyidah", icon: Twitter },
    ],
  },
];

export function Footer() {
  return (
    <Wrapper as="footer" className="relative flex w-full flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-4 py-6 md:rounded-t-6xl md:px-6">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 right-1/2 left-1/2 h-px w-1/3 rounded-full bg-foreground/20 blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <div className="w-fit">
            <Image src={"/logo.svg"} width={20} height={10} alt='dlog logo' className='h-8 w-full' />
          </div>
          <p className="mt-8 text-muted-foreground text-sm md:mt-0">
            &copy; {new Date().getFullYear()} DLOG, All rights reserved
          </p>
          <p className="text-muted-foreground">Built by <a href="https://github.com/ubeyidah" className="text-primary hover:underline">Ubeyidah</a></p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer delay={0.1 + index * 0.1} key={section.label}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs">{section.label}</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        className="inline-flex items-center transition-all duration-300 hover:text-foreground"
                        href={link.href}
                        key={`${section.label}-${link.title}`}
                      >
                        {link.icon && <HugeiconsIcon icon={link.icon} className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
