import Logo from "@/assets/logo"
import { GAME_VERSION } from "@/lib/constants"

export default function About() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-4 text-center">
      <Logo height={200} className="absolute top-[calc(2rem_+_var(--header-height))]" />
      <h1 className="text-5xl">About <strong>Math! Yay!</strong></h1>

      <p className="text-lg">
        You can access the source code in the{" "}
        <a className="underline text-primary" href="https://github.com/bruno-borges-2001/math-yay" target="_blank">GitHub Repository</a>
      </p>

      <p>Version: v{GAME_VERSION}</p>
    </div>
  )
}