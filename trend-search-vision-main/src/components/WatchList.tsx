import { useState, useEffect } from "react";
import { Eye, TrendingUp, TrendingDown, X, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface WatchListStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface WatchListProps {
  stocks: string[];
  onStockSelect: (symbol: string) => void;
  onUpdateWatchList: (stocks: string[]) => void;
}

export const WatchList = ({ stocks, onStockSelect, onUpdateWatchList }: WatchListProps) => {
  const [watchListData, setWatchListData] = useState<WatchListStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [newStock, setNewStock] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchWatchListData = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockData: WatchListStock[] = stocks.map(symbol => ({
        symbol,
        name: getStockName(symbol),
        price: Math.random() * 500 + 50,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
      }));
      
      setWatchListData(mockData);
      setLoading(false);
    };

    fetchWatchListData();
  }, [stocks]);

  const getStockName = (symbol: string) => {
    const names: { [key: string]: string } = {
      'AAPL': 'Apple Inc.',
      'GOOGL': 'Alphabet Inc.',
      'MSFT': 'Microsoft Corp.',
      'TSLA': 'Tesla, Inc.',
      'AMZN': 'Amazon.com Inc.',
      'NVDA': 'NVIDIA Corp.',
      'META': 'Meta Platforms',
      'NFLX': 'Netflix Inc.',
    };
    return names[symbol] || `${symbol} Corp.`;
  };

  const removeFromWatchList = (symbol: string) => {
    const updatedStocks = stocks.filter(s => s !== symbol);
    onUpdateWatchList(updatedStocks);
  };

  const addToWatchList = () => {
    if (newStock && !stocks.includes(newStock.toUpperCase())) {
      const updatedStocks = [...stocks, newStock.toUpperCase()];
      onUpdateWatchList(updatedStocks);
      setNewStock("");
      setShowAddInput(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-border animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-primary" />
            <CardTitle>Watch List</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAddInput(!showAddInput)}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>Your tracked stocks</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {showAddInput && (
          <div className="flex space-x-2">
            <Input
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              placeholder="Enter symbol..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addToWatchList()}
            />
            <Button onClick={addToWatchList} size="sm">
              Add
            </Button>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {watchListData.map((stock) => {
              const isPositive = stock.change >= 0;
              
              return (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
                  onClick={() => onStockSelect(stock.symbol)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{stock.symbol}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWatchList(stock.symbol);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {stock.name}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-medium text-foreground">${stock.price.toFixed(2)}</span>
                      <div className="flex items-center space-x-1">
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3 text-success" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-destructive" />
                        )}
                        <span className={`text-xs font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                          {isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};