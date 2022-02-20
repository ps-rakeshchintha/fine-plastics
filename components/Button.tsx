import Link from 'next/link'

export interface ButtonProps {
  onClick?: Function
  variant?: 'primary' | 'secondary' | 'success' | 'light' | 'dark'
  type?: 'solid' | 'outline'
  size?: 'small' | 'large' | 'default'
  disabled?: boolean
  children: any
  className?: string
  href?: string
}

const Button = (props: ButtonProps) => {
  const variant = props.variant || 'primary'
  const type = props.type || 'solid'
  const disabled = props.disabled || false
  const size = props.size || 'default'
  const onClick = props.onClick || function () {}
  let classNames = `${props.className || ''} rounded font-semibold px-4`
  switch (size) {
    case 'small':
      classNames = classNames + ' h-8'
      break

    case 'large':
      classNames = classNames + ' h-12'
      break

    default:
      classNames = classNames + ' h-10'
      break
  }
  switch (variant) {
    case 'primary':
      classNames =
        classNames +
        ' bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700'
      break

    case 'light':
      classNames =
        classNames +
        ' bg-slate-100 text-black hover:bg-slate-200 active:bg-slate-300'
      break

    default:
      break
  }
  return props.href ? (
    <Link href={props.href}>
      <a className={classNames + ' flex items-center justify-center'}>
        {props.children}
      </a>
    </Link>
  ) : (
    <button
      disabled={disabled}
      onClick={() => onClick()}
      className={classNames}
    >
      {props.children}
    </button>
  )
}
export default Button
