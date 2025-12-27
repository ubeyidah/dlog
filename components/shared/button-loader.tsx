import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type ButtonLoaderProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean
}

function ButtonLoader({
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonLoaderProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ?
        <Spinner />
        : children}

    </Button>
  )
}

export { ButtonLoader }
