import ModeToggle from "@/components/ui/modeToggle";

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-[100vw] h-[100vh] grid place-items-center'>


      <div className='fixed top-8 right-8'>
        <ModeToggle />
      </div>

      {children}
    </div>
  )
}