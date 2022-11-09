import clsx from 'clsx'

export type ButtonIntent = 'primary'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent: ButtonIntent
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  intent,
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        {
          'bg-primary text-white': intent === 'primary',
        },
        'p-2 select-none w-full rounded-full focus:outline-none',
        className,
      )}
    >
      {children}
    </button>
  )
}
