import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    path: string;
    title: string;
}

export default function NavLink({path, title}: Props) {
    const router = useRouter();
  return (
    <Link href={path}>
        <a className={router.pathname == path ? 'active' : ''}>{title}</a>
    </Link>
  )
}
