import { useState, useEffect } from "react";
import { Brain, TrendingUp, TrendingDown, Target, AlertTriangle, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PredictionData {
  symbol: string;
  currentPrice: number;
  predictions: {
    oneDay: { price: number; confidence: number; direction: 'up' | 'down' };
    oneWeek: { price: number; confidence: number; direction: 'up' | 'down' };
    oneMonth: { price: number; confidence: number; direction: 'up' | 'down' };
  };
  indicators: {
    rsi: number;
    macd: number;
    movingAverage: number;
    support: number;
    resistance: number;
  };
  sentiment: {
    score: number;
    label: 'Bullish' | 'Bearish' | 'Neutral';
  };
}

interface PredictionPanelProps {
  symbol: string;
}

export const PredictionPanel = ({ symbol }: PredictionPanelProps) => {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI prediction analysis
    const generatePredictions = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const currentPrice = Math.random() * 500 + 50;
      
      const mockData: PredictionData = {
        symbol,
        currentPrice,
        predictions: {
          oneDay: {
            price: currentPrice * (1 + (Math.random() - 0.5) * 0.05),
            confidence: Math.random() * 40 + 60,
            direction: Math.random() > 0.5 ? 'up' : 'down'
          },
          oneWeek: {
            price: currentPrice * (1 + (Math.random() - 0.5) * 0.15),
            confidence: Math.random() * 30 + 50,
            direction: Math.random() > 0.5 ? 'up' : 'down'
          },
          oneMonth: {
            price: currentPrice * (1 + (Math.random() - 0.5) * 0.3),
            confidence: Math.random() * 20 + 40,
            direction: Math.random() > 0.5 ? 'up' : 'down'
          }
        },
        indicators: {
          rsi: Math.random() * 100,
          macd: (Math.random() - 0.5) * 10,
          movingAverage: currentPrice * (1 + (Math.random() - 0.5) * 0.1),
          support: currentPrice * (0.9 + Math.random() * 0.1),
          resistance: currentPrice * (1.1 + Math.random() * 0.1)
        },
        sentiment: {
          score: Math.random() * 200 - 100,
          label: Math.random() > 0.6 ? 'Bullish' : Math.random() > 0.3 ? 'Neutral' : 'Bearish'
        }
      };
      
      setPredictionData(mockData);
      setLoading(false);
    };

    generatePredictions();
  }, [symbol]);

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
            <div className="h-32 bg-muted rounded animate-pulse"></div>
            <div className="h-24 bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!predictionData) return null;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Bullish': return 'text-success';
      case 'Bearish': return 'text-destructive';
      default: return 'text-warning';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Bullish': return <TrendingUp className="w-4 h-4" />;
      case 'Bearish': return <TrendingDown className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-border animate-fade-in">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary animate-pulse-glow" />
          <CardTitle>AI Predictions for {predictionData.symbol}</CardTitle>
        </div>
        <CardDescription>Advanced technical analysis and forecasting</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="predictions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="predictions" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {Object.entries(predictionData.predictions).map(([period, prediction]) => {
                const change = ((prediction.price - predictionData.currentPrice) / predictionData.currentPrice) * 100;
                const isPositive = change >= 0;
                
                return (
                  <div key={period} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="font-medium capitalize">
                          {period.replace('one', '1 ').replace('Day', ' Day').replace('Week', ' Week').replace('Month', ' Month')}
                        </span>
                      </div>
                      <Badge variant={isPositive ? "default" : "destructive"}>
                        {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {isPositive ? "+" : ""}{change.toFixed(2)}%
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold">${prediction.price.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Predicted Price</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{prediction.confidence.toFixed(0)}%</div>
                        <div className="text-sm text-muted-foreground">Confidence</div>
                        <Progress value={prediction.confidence} className="w-20 mt-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="indicators" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="font-medium">RSI</span>
                </div>
                <div className="text-2xl font-bold">{predictionData.indicators.rsi.toFixed(1)}</div>
                <Progress value={predictionData.indicators.rsi} className="mt-2" />
                <div className="text-sm text-muted-foreground mt-1">
                  {predictionData.indicators.rsi > 70 ? 'Overbought' : predictionData.indicators.rsi < 30 ? 'Oversold' : 'Neutral'}
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="font-medium">MACD</span>
                </div>
                <div className="text-2xl font-bold">{predictionData.indicators.macd.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {predictionData.indicators.macd > 0 ? 'Bullish Signal' : 'Bearish Signal'}
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                  <span className="font-medium">Support</span>
                </div>
                <div className="text-2xl font-bold">${predictionData.indicators.support.toFixed(2)}</div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="font-medium">Resistance</span>
                </div>
                <div className="text-2xl font-bold">${predictionData.indicators.resistance.toFixed(2)}</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sentiment" className="space-y-4 mt-6">
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className={getSentimentColor(predictionData.sentiment.label)}>
                  {getSentimentIcon(predictionData.sentiment.label)}
                </div>
                <span className={`text-2xl font-bold ${getSentimentColor(predictionData.sentiment.label)}`}>
                  {predictionData.sentiment.label}
                </span>
              </div>
              
              <div className="text-4xl font-bold mb-2">
                {predictionData.sentiment.score.toFixed(0)}
              </div>
              <div className="text-muted-foreground">Market Sentiment Score</div>
              
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                <span>Based on news analysis and social sentiment</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};