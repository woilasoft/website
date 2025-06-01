"use client";
import "../styles/global.css"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { FlagIcon } from "@/components/flag-icon";
import { cn } from "@/lib/utils";
import { getLocalePaths, LOCALES } from "@/i18n";
import { useEffect, useState } from "react";

type Props = {
  currentLocale: string;
  currentUrl: URL;
};

export default function LanguageSwitcher({ currentLocale, currentUrl }: Props) {
  const locales = getLocalePaths(currentUrl);
  const handleSelect = (lang: string, path: string) => {
    localStorage.selectedLang = lang;
    window.location.href = path;
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full px-3 py-2 max-sm:py-5  flex items-center gap-2 border-gray-300 shadow-sm"
        >
          <FlagIcon country={currentLocale} className="w-10 h-10" />
          <span className="hidden sm:inline-block text-sm font-medium text-foreground">
            {LOCALES[currentLocale].label}
          </span>
          <ChevronDown className="w-4 h-4 hidden sm:inline-block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white border-gray-300">
        {locales.map(({ path, lang }) => (
          <DropdownMenuItem
            key={lang}
            onSelect={() => handleSelect(lang, path)}
            className={cn(
              "flex items-center gap-2 cursor-pointer rounded-md px-2 py-2 text-sm hover:!bg-gray-50",
              lang === currentLocale && "bg-gray-100 font-semibold"
            )}
          >
            <FlagIcon country={lang} className="w-5 h-5" />
            <span>{LOCALES[lang].label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
