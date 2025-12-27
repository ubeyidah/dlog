import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function HeroSection() {
  return (
    <section>
      <div className="relative py-36">
        <div className="relative z-10 mx-auto w-full px-6">
          <div className="md:w-1/2">
            <div>
              <h1 className="max-w-md text-balance text-5xl font-medium md:text-6xl">Capture Your Day, Effortlessly</h1>
              <p className="text-muted-foreground my-8 max-w-2xl text-balance text-xl">DLOG is your minimalist journal for daily reflections, thoughts, and progress no distractions, just focus.</p>

              <div className="flex items-center gap-3">
                <Button size="lg" className="pr-4.5" render={<Link href="/sign-in" />} nativeButton={false}><span className="text-nowrap">Start Journaling</span></Button>
                <Button key={2} size="lg" variant="outline" className="pl-5" render={<Link href="#how-it-works" />} nativeButton={false}><span className="text-nowrap">See How It Works</span></Button>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-muted-foreground">Used by 1,000+ journalers</p>
              <div className="*:data-[slot=avatar]:ring-background py-3 flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/159727076?v=4" alt="@ubeyidah" />
                  <AvatarFallback>UB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        <div className="perspective-near mt-24 translate-x-12 md:absolute md:-right-6 md:bottom-16 md:left-1/2 md:top-40 md:mt-0 md:translate-x-0">
          <div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:bottom-7 before:top-0 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:border">
            <div className="bg-background rounded-(--radius) shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
              <Image
                src="/dashboard-light.png"
                alt="app screen"
                width="2880"
                height="1842"
                className="object-top-left size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
