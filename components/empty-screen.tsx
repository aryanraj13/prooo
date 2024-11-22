import { UseChatHelpers } from 'ai/react'
import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { Vortex } from './ui/vortex'
import { caveat, gilroy, gloock, nyght, spectral } from '@/lib/fonts'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-20">
      <div className="flex flex-col gap-2 border bg-white 
                    hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-950 p-8 rounded-md">
        <h1 className={`text-xl font-semibold ${spectral}`}>
          The MarketMentor powered by Groq!
        </h1>
        <p className={`leading-normal text-sm ${gilroy}`}>
        An open-source AI chatbot leveraging function calling to display TradingView stock market widgets. Built with the TradingView Widgets, and powered by Llama3-70b on Groq.
        </p>
      </div>
    </div>
  )
}
