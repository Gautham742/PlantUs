import Image from "next/image";
import Link from "next/link";
type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  href?: string;
}

const Button = ({ type, title, icon, variant, full,href }: ButtonProps) => {
  console.log("href prop:", href);
  return (
    <>
      {href && (
    <Link href={href}>
    <button
    className={`flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'}`}
      type={type}
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
    </button>
    </Link>
    )}
    </>
  )
}

export default Button