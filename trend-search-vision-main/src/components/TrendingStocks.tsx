import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Flame } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TrendingStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

interface TrendingStocksProps {
  onStockSelect: (symbol: string) => void;
}

export const TrendingStocks = ({ onStockSelect }: TrendingStocksProps) => {
  const [trendingStocks, setTrendingStocks] = useState<TrendingStock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchTrendingStocks = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockStocks: TrendingStock[] = [
        { symbol: "NVDA", name: "NVIDIA Corporation", price: 875.43, change: 23.45, changePercent: 2.75, volume: 45123000 },
        { symbol: "TSLA", name: "Tesla, Inc.", price: 248.67, change: -5.23, changePercent: -2.06, volume: 38456000 },
        { symbol: "AAPL", name: "Apple Inc.", price: 189.95, change: 2.14, changePercent: 1.14, volume: 52789000 },
        { symbol: "MSFT", name: "Microsoft Corporation", price: 423.18, change: 8.92, changePercent: 2.15, volume: 28934000 },
        { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.87, change: -1.45, changePercent: -1.00, volume: 31245000 },
        { symbol: "META", name: "Meta Platforms, Inc.", price: 508.34, change: 12.67, changePercent: 2.56, volume: 23567000 },
      ];
      
      setTrendingStocks(mockStocks);
      setLoading(false);
    };

    fetchTrendingStocks();
  }, []);

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/50 border-border">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-muted rounded animate-pulse"></div>
            <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-border animate-fade-in">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <CardTitle>Trending Stocks</CardTitle>
        </div>
        <CardDescription>Most active stocks today</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {trendingStocks.map((stock, index) => {
            const isPositive = stock.change >= 0;
            
            return (
              <Button
                key={stock.symbol}
                variant="ghost"
                className="w-full h-auto p-4 justify-between hover:bg-accent/50 transition-all duration-200"
                onClick={() => onStockSelect(stock.symbol)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[150px]">
                      {stock.name}
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="font-semibold text-foreground">${stock.price.toFixed(2)}</div>
                  <div className="flex items-center space-x-1">
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 text-success" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-destructive" />
                    )}
                    <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                      {isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};