import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  high52Week: number;
  low52Week: number;
}

interface StockCardProps {
  symbol: string;
}

export const StockCard = ({ symbol }: StockCardProps) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call with mock data
    const fetchStockData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demonstration
      const mockData: StockData = {
        symbol: symbol,
        price: Math.random() * 500 + 50,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
        volume: Math.floor(Math.random() * 1000000) + 100000,
        marketCap: `${(Math.random() * 2000 + 100).toFixed(0)}B`,
        high52Week: Math.random() * 600 + 100,
        low52Week: Math.random() * 100 + 20,
      };
      
      mockData.changePercent = (mockData.change / (mockData.price - mockData.change)) * 100;
      
      setStockData(mockData);
      setLoading(false);
    };

    fetchStockData();
  }, [symbol]);

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/50 border-border animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-20"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-24"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stockData) return null;

  const isPositive = stockData.change >= 0;

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">{stockData.symbol}</CardTitle>
            <CardDescription>Real-time stock data</CardDescription>
          </div>
          <Badge variant={isPositive ? "default" : "destructive"} className="px-3 py-1">
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {isPositive ? "+" : ""}{stockData.changePercent.toFixed(2)}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Price */}
        <div className="flex items-center space-x-2">
          <DollarSign className="w-6 h-6 text-primary" />
          <span className="text-3xl font-bold text-foreground">${stockData.price.toFixed(2)}</span>
          <span className={`text-lg font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? "+" : ""}{stockData.change.toFixed(2)}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Volume</span>
            </div>
            <span className="text-lg font-semibold text-foreground">
              {stockData.volume.toLocaleString()}
            </span>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Market Cap</span>
            </div>
            <span className="text-lg font-semibold text-foreground">
              ${stockData.marketCap}
            </span>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">52W High</span>
            </div>
            <span className="text-lg font-semibold text-foreground">
              ${stockData.high52Week.toFixed(2)}
            </span>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-4 h-4 text-destructive" />
              <span className="text-sm text-muted-foreground">52W Low</span>
            </div>
            <span className="text-lg font-semibold text-foreground">
              ${stockData.low52Week.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};