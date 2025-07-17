import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
}

export const MarketOverview = () => {
  const [marketData, setMarketData] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchMarketData = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockData: MarketIndex[] = [
        { name: "S&P 500", symbol: "SPX", value: 4567.89, change: 23.45, changePercent: 0.52 },
        { name: "NASDAQ", symbol: "IXIC", value: 14234.56, change: -45.67, changePercent: -0.32 },
        { name: "DOW JONES", symbol: "DJI", value: 34567.12, change: 156.78, changePercent: 0.46 },
        { name: "VIX", symbol: "VIX", value: 18.45, change: -0.67, changePercent: -3.51 },
      ];
      
      setMarketData(mockData);
      setLoading(false);
    };

    fetchMarketData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-gradient-to-br from-card to-card/50 border-border animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-24"></div>
                <div className="h-4 bg-muted rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {marketData.map((index, i) => {
        const isPositive = index.change >= 0;
        
        return (
          <Card 
            key={index.symbol} 
            className="bg-gradient-to-br from-card to-card/50 border-border hover:shadow-lg transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{index.name}</span>
                </div>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">
                  {index.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                    {isPositive ? "+" : ""}{index.change.toFixed(2)}
                  </span>
                  <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                    ({isPositive ? "+" : ""}{index.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};