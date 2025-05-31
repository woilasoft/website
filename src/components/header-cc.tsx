import { useState } from "react"
import { ChevronDown, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { FlagIcon } from "@/components/flag-icon"
import { ThemeSwitcher } from "@/components/theme-switcher-cc"

type Language = {
  code: string
  name: string
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "fr",
    name: "Français",
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])
  const [isSearchOpen, setIsSearchOpen] = useState(false)


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language)
    // Here you would implement actual language switching logic
  }

  const navItems = [
    { name: "Accueil", href: "/" },
    { name: "Projets", href: "/projets" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "À propos", href: "/a-propos" },
  ]

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-4 sticky top-0 z-50">
      <header className="mx-auto max-w-7xl rounded-full border bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 shadow-sm">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold">
                W
              </div>
              <span className="text-xl font-bold hidden sm:inline-block">Flowbite</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm text-muted-foreground font-medium transition-colors hover:text-primary"
                )}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-full">
                  <FlagIcon country={currentLanguage.code} className="mr-1" />
                  <span className="hidden sm:inline-block">{currentLanguage.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => changeLanguage(language)}
                    className={cn(
                      "flex items-center gap-2 cursor-pointer",
                      currentLanguage.code === language.code && "font-medium bg-accent",
                    )}
                  >
                    <FlagIcon country={language.code} className="mr-2" />
                    <span>{language.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Contact Button */}
            <Button className="rounded-full">Nous Contactez</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Theme Switcher */}
            <ThemeSwitcher />

            {/* Mobile Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <FlagIcon country={currentLanguage.code} />
                  <span className="sr-only">{currentLanguage.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => changeLanguage(language)}
                    className={cn(
                      "flex items-center gap-2 cursor-pointer",
                      currentLanguage.code === language.code && "font-medium bg-accent",
                    )}
                  >
                    <FlagIcon country={language.code} className="mr-2" />
                    <span>{language.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle Menu" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar - Overlay instead of pushing content */}
      
      {/* Mobile Menu - Overlay instead of pushing content */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[calc(4rem+1rem)] px-4 z-40">
          <div className="mx-auto max-w-7xl rounded-xl border bg-background/95 backdrop-blur-md shadow-lg">
            <div className="py-4 px-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                      // pathname === item.href ? "bg-accent text-foreground" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Button className="mt-2 w-full rounded-full">Nous Contactez</Button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
