import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

export default function Home() {
  return (
    <main className="h-full flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]  from-sky-200 to-blue-600">
      <div className="space-y-6 min-w-10 bg-blue-800/55 p-4 rounded-lg">
        <h2 className={cn('font-semibold text-2xl text-white drop-shadow-md text-center', poppins.className)}>
          🔐 Auth
        </h2>
        <p className="text-white text-sm">a simple authentication service</p>
        <Button size='sm' variant='secondary' className='w-full'>Sign in</Button>
      </div>
    </main>
  );
}
