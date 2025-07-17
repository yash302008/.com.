import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { StockCard } from "@/components/StockCard";
import { TrendingStocks } from "@/components/TrendingStocks";
import { MarketOverview } from "@/components/MarketOverview";
import { WatchList } from "@/components/WatchList";
import { PredictionPanel } from "@/components/PredictionPanel";
import { WelcomeTransition } from "@/components/WelcomeTransition";

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [watchList, setWatchList] = useState<string[]>(['AAPL', 'GOOGL', 'MSFT', 'TSLA']);

  return (
    <div className="min-h-screen bg-background">
      <WelcomeTransition />
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                StockPredict Pro
              </h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Live Market Data</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <SearchBar onStockSelect={setSelectedStock} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Market Overview */}
        <div className="mb-8 animate-fade-in">
          <MarketOverview />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {selectedStock ? (
              <div className="animate-slide-up">
                <StockCard symbol={selectedStock} />
                <div className="mt-6">
                  <PredictionPanel symbol={selectedStock} />
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <TrendingStocks onStockSelect={setSelectedStock} />
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <WatchList 
              stocks={watchList} 
              onStockSelect={setSelectedStock}
              onUpdateWatchList={setWatchList}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm text-muted-foreground">
            Created by <span className="text-primary font-medium">Yash Kabadwal</span> - Junior Developer
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
