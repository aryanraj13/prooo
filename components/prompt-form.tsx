import * as React from "react";
import Textarea from "react-textarea-autosize";
import { useActions, useUIState } from "ai/rsc";
import { Button } from "@/components/ui/button";
import { IconArrowDown, IconPlus, IconMicrophone, IconMicrophoneOff } from "@/components/ui/icons";  // Import the microphone-off icon
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useSpeechToText } from "@/lib/hooks/use-speech-to-text";  // Import the hook
import { useLocalStorage } from "usehooks-ts";  // Add this import
import { BackgroundGradient } from "./ui/bggradient";
import { caveat, gilroy, gloock, nyght, spectral } from '@/lib/fonts'

export function PromptForm({
  input,
  setInput,
}: {
  input: string;
  setInput: (value: string) => void;
}) {
  const router = useRouter();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState();
  const [apiKey, setApiKey] = useLocalStorage("groqKey", "");

  const { transcript, isListening, toggleListening } = useSpeechToText(); // Use the speech-to-text hook

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    if (transcript !== '') {
      setInput(transcript); // Update input with the speech-to-text result
    }
  }, [transcript, setInput]);

  return (
    
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault();
        const value = input.trim();
        setInput("");
        if (!value) return;

        setMessages((currentMessages: Array<{ id: string; display: JSX.Element }>) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <div>{value}</div>, // Use the appropriate user message component here
          },
        ]);

        const responseMessage = await submitUserMessage(value, apiKey);
        setMessages((currentMessages: Array<{ id: string; display: JSX.Element }>) => [
          ...currentMessages,
          responseMessage,
        ]);
      }}
    >
      <BackgroundGradient>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:border sm:px-12 rounded-md">
        {/* Microphone Button */}
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4 ${isListening ? 'bg-green-500' : 'bg-gray-600'}`} // Change color when listening
          onClick={toggleListening}
        >
          {isListening ? <IconMicrophone /> : <IconMicrophone />} {/* Toggle between microphone icons */}
        </Button>

        {/* Textarea for input */}
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Type or speak a message"
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="absolute right-0 top-[13px] sm:right-4">
          <Button type="submit" size="icon" disabled={input === ""}>
            <div className="rotate-180">
              <IconArrowDown />
            </div>
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
      </BackgroundGradient>
      {/* Optional: Display visual feedback when listening */}
      {isListening && (
        <div className={`absolute text-xs bottom-0 left-0 w-full text-center text-green-600 mb-1 ${gilroy}`}>Listening...</div>
      )}
    </form>
  );
}
