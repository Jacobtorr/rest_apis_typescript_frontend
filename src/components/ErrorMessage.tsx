import { PropsWithChildren } from "react"

export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div className="bg-red-600 text-white p-3 w-full rounded text-center font-bold uppercase text-sm my-4">
        {children}
    </div>
  )
}
