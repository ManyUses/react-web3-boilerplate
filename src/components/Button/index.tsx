import React from 'react'
import { classNames } from '../../functions'

const SIZE = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-4 py-2 text-base',
  default: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-base',
}

const FILLED = {
  default: 'bg-transparent',
  red: 'bg-red bg-opacity-80 w-full rounded text-high-emphesis hover:bg-opacity-100 disabled:bg-opacity-80 focus:outline-none',
  black:
    'bg-black bg-opacity-80 w-full rounded text-high-emphesis hover:bg-opacity-100 disabled:bg-opacity-80 focus:outline-none',
  gray: 'bg-dark-700 bg-opacity-80 w-full rounded text-high-emphesis hover:bg-opacity-100 disabled:bg-opacity-80 focus:outline-none',
  green:
    'bg-green bg-opacity-80 w-full rounded text-high-emphesis hover:bg-opacity-100 disabled:bg-opacity-80 focus:outline-none',
  gradient:
    'w-full text-high-emphesis bg-gradient-to-r from-white to-grey opacity-80 hover:opacity-100 disabled:bg-opacity-80 focus:outline-none',
}

const OUTLINED = {
  default: 'bg-transparent',
  red: 'border border-red rounded text-red hover:bg-opacity-40 disabled:bg-opacity-20 focus:outline-none',
  black: 'border border-black rounded text-black hover:bg-opacity-40 disabled:bg-opacity-20 focus:outline-none',
  gray: 'border border-gray rounded text-gray hover:bg-opacity-40 disabled:bg-opacity-20 focus:outline-none',
  green: 'border border border-green rounded text-green hover:bg-opacity-40 disabled:bg-opacity-20 focus:outline-none',
  gradient:
    'bg-gradient-to-r from-white to-grey opacity-80 hover:opacity-100 disabled:bg-opacity-20 focus:outline-none',
}

const EMPTY = {
  default:
    'flex bg-transparent justify-center items-center disabled:opacity-50 disabled:cursor-auto bg-opacity-80 hover:bg-opacity-100',
}

const LINK = {
  default: 'p-2 text-baseline text-primary hover:text-gray-400 focus:text-high-emphesis md:p-3 whitespace-nowrap',
}

const VARIANT = {
  outlined: OUTLINED,
  filled: FILLED,
  empty: EMPTY,
  link: LINK,
}

export type ButtonColor = 'black' | 'gradient' | 'gray' | 'default' | 'red' | 'green'

export type ButtonSize = 'xs' | 'sm' | 'lg' | 'default'

export type ButtonVariant = 'outlined' | 'filled' | 'empty' | 'link'

export type ButtonProps = {
  color?: ButtonColor
  size?: ButtonSize
  variant?: ButtonVariant
} & {
  ref?: React.Ref<HTMLButtonElement>
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({
  children,
  className = undefined,
  color = 'default',
  size = 'default',
  variant = 'filled',
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      className={classNames(
        VARIANT[variant][color],
        variant !== 'empty' && SIZE[size],
        'rounded focus:outline-none focus:ring disabled:opacity-50 disabled:cursor-not-allowed font-medium',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button

export function ButtonConfirmed({
  confirmed,
  disabled,
  ...rest
}: { confirmed?: boolean; disabled?: boolean } & ButtonProps) {
  if (confirmed) {
    return (
      <Button
        variant="outlined"
        color="green"
        size="lg"
        className={classNames(disabled && 'cursor-not-allowed', 'border opacity-50')}
        disabled={disabled}
        {...rest}
      />
    )
  } else {
    return <Button color={disabled ? 'gray' : 'gradient'} size="lg" disabled={disabled} {...rest} />
  }
}

export function ButtonError({
  error,
  disabled,
  ...rest
}: {
  error?: boolean
  disabled?: boolean
} & ButtonProps) {
  if (error) {
    return <Button color="red" size="lg" {...rest} />
  } else {
    return <Button color={disabled ? 'gray' : 'gradient'} disabled={disabled} size="lg" {...rest} />
  }
}
