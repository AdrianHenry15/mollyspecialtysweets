"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { FaqCategory } from "@/sanity.types"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { Button } from "../../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command"

interface FaqCategorySelectorProps {
  faqCategories: FaqCategory[]
}

const FaqsCategorySelectorComponent = ({
  faqCategories,
}: FaqCategorySelectorProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>("")
  const router = useRouter()

  const commandInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const selectedCategory = faqCategories.find((c) =>
        c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )

      if (selectedCategory?.slug?.current) {
        setValue(selectedCategory._id)
        router.push(`/faqs/${selectedCategory.slug.current}`)
        setOpen(false)
      }
    }
  }

  const onCommandItemSelect = (category: FaqCategory) => {
    setValue(value === category._id ? "" : category._id)
    router.push(`/faqs/${category.slug?.current}`)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-full relative flex justify-center 
                    sm:justify-start sm:flex-none items-center 
                    space-x-2 bg-black hover:bg-zinc-800 hover:text-white
                    text-white font-bold py-2 px-4 rounded">
          {value
            ? faqCategories.find((category) => category._id === value)?.title
            : "Filter Faq by Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search category..."
            className="h-9"
            onKeyDown={commandInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {faqCategories.map((category) => (
                <CommandItem
                  className="cursor-pointer"
                  key={category._id}
                  value={category.title}
                  onSelect={() => onCommandItemSelect(category)}>
                  {category.title}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FaqsCategorySelectorComponent
