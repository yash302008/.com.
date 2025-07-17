import { useState, useEffect } from "react";
import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchBarProps {
  onStockSelect: (symbol: string) => void;
}

const POPULAR_STOCKS = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "TSLA", name: "Tesla, Inc." },
  { symbol: "AMZN", name: "Amazon.com, Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "META", name: "Meta Platforms, Inc." },
  { symbol: "NFLX", name: "Netflix, Inc." },
];

export const SearchBar = ({ onStockSelect }: SearchBarProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStocks = POPULAR_STOCKS.filter((stock) =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (symbol: string) => {
    setValue(symbol);
    setOpen(false);
    onStockSelect(symbol);
  };

  return (
    <div className="relative w-full max-w-md">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {value ? value : "Search stocks..."}
              </span>
            </div>
            <TrendingUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 bg-card/95 backdrop-blur-sm border-border">
          <Command>
            <CommandInput 
              placeholder="Search stocks..." 
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList>
              <CommandEmpty>No stocks found.</CommandEmpty>
              <CommandGroup heading="Popular Stocks">
                {filteredStocks.map((stock) => (
                  <CommandItem
                    key={stock.symbol}
                    value={stock.symbol}
                    onSelect={() => handleSelect(stock.symbol)}
                    className="cursor-pointer hover:bg-accent/50"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="font-semibold text-foreground">{stock.symbol}</span>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                      </div>
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};