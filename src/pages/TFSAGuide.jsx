import { Link } from 'react-router-dom'
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  BookOpen,
  Briefcase,
  PieChart,
  ArrowRight
} from 'lucide-react'

export default function TFSAGuide() {
  const investmentStrategies = [
    {
      name: "Conservative Income Strategy",
      riskLevel: "Low",
      targetYield: "4-5%",
      allocation: {
        "Canadian Big Banks": 40,
        "Utilities & Infrastructure": 30,
        "Telecom & Consumer Staples": 20,
        "REITs": 10
      },
      examples: ["RY.TO", "TD.TO", "FTS.TO", "ENB.TO", "BCE.TO"],
      bestFor: "Investors 10+ years from retirement seeking steady income"
    },
    {
      name: "Growth-Focused Strategy",
      riskLevel: "Moderate",
      targetYield: "3-4%",
      allocation: {
        "Canadian Growth Dividend Stocks": 30,
        "Technology & Innovation": 25,
        "US Dividend Aristocrats (ETFs)": 25,
        "Emerging Dividend Growers": 20
      },
      examples: ["SHOP.TO", "CSU.TO", "VTI", "SCHD", "VYM"],
      bestFor: "Investors 20+ years from retirement seeking growth"
    },
    {
      name: "Monthly Income Strategy",
      riskLevel: "Moderate",
      targetYield: "5-7%",
      allocation: {
        "Monthly Dividend Stocks": 50,
        "REITs": 30,
        "High-Yield ETFs": 20
      },
      examples: ["EIF.TO", "CSH.UN", "CAR.UN", "HR.UN", "KEY.TO"],
      bestFor: "Investors wanting frequent dividend payments for DRIP"
    }
  ]

  const canadianDividendStocks = [
    {
      symbol: "RY.TO",
      name: "Royal Bank of Canada",
      sector: "Financial",
      yield: "3.5-3.9%",
      growth: "Strong track record",
      description: "Canada's largest bank with consistent dividend growth"
    },
    {
      symbol: "ENB.TO", 
      name: "Enbridge Inc.",
      sector: "Energy Infrastructure",
      yield: "6.1%",
      growth: "28 years of increases",
      description: "North America's largest pipeline company"
    },
    {
      symbol: "FTS.TO",
      name: "Fortis Inc.",
      sector: "Utilities",
      yield: "3.8%",
      growth: "49 years consecutive",
      description: "Utility with longest dividend growth streak in Canada"
    },
    {
      symbol: "T.TO",
      name: "Telus Corporation", 
      sector: "Telecommunications",
      yield: "4.8%",
      growth: "18+ years of increases",
      description: "Leading Canadian telecom with strong dividend policy"
    },
    {
      symbol: "EIF.TO",
      name: "Exchange Income Corp",
      sector: "Aviation/Manufacturing",
      yield: "4.6%",
      growth: "Monthly payments",
      description: "Monthly dividend payer ideal for DRIP strategies"
    },
    {
      symbol: "CSH.UN",
      name: "Chartwell Retirement",
      sector: "Real Estate",
      yield: "3.4%",
      growth: "Growing with aging population",
      description: "Senior housing REIT with monthly distributions"
    }
  ]

  const tfsaRules = [
    {
      title: "Contribution Limits",
      description: "2025 limit is $7,000. Total lifetime room is $102,000 if eligible since 2009.",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Over-Contribution Penalties",
      description: "1% per month penalty on excess contributions. Check your available room first.",
      icon: AlertTriangle,
      color: "text-red-400"
    },
    {
      title: "Withdrawal Rules",
      description: "Withdraw anytime tax-free. Room is restored January 1st following withdrawal year.",
      icon: Calendar,
      color: "text-blue-400"
    },
    {
      title: "Investment Income",
      description: "All investment growth, dividends, and capital gains are tax-free forever.",
      icon: TrendingUp,
      color: "text-purple-400"
    },
    {
      title: "Day Trading Restrictions",
      description: "Frequent trading may be considered business income. Keep it long-term focused.",
      icon: Shield,
      color: "text-orange-400"
    },
    {
      title: "Foreign Withholding Tax",
      description: "US stocks subject to 15% withholding tax. Canadian stocks have no withholding.",
      icon: Target,
      color: "text-yellow-400"
    }
  ]

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Complete TFSA Investment Guide 2025
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Master Canadian Tax-Free Savings Account strategies to build sustainable retirement income. 
            Learn proven investment approaches, DRIP techniques, and avoid costly mistakes.
          </p>
        </div>

        {/* 2025 TFSA Updates */}
        <section className="bg-gradient-to-r from-primary-600/20 to-blue-600/20 border border-primary-500/30 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">2025 TFSA Updates & Contribution Limits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-6 text-center">
              <DollarSign className="w-8 h-8 text-primary-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary-400 mb-2">$7,000</div>
              <div className="text-sm text-slate-300">2025 Annual Contribution Limit</div>
              <div className="text-xs text-slate-400 mt-1">Same as 2024</div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-6 text-center">
              <Calculator className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-400 mb-2">$102,000</div>
              <div className="text-sm text-slate-300">Total Lifetime Contribution Room</div>
              <div className="text-xs text-slate-400 mt-1">If eligible since 2009</div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-400 mb-2">0%</div>
              <div className="text-sm text-slate-300">Tax on Growth & Withdrawals</div>
              <div className="text-xs text-slate-400 mt-1">Forever tax-free</div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-300 mb-4">
              The TFSA contribution limit remains at $7,000 for 2025. Use your full contribution room to maximize tax-free growth potential.
            </p>
            <Link to="/tfsa/drip-calculator" className="btn-primary">
              Calculate Your 2025 Strategy
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>

        {/* TFSA Rules & Regulations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Essential TFSA Rules Every Canadian Must Know</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tfsaRules.map((rule, index) => (
              <div key={index} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <rule.icon className={`w-6 h-6 ${rule.color}`} />
                  <h3 className="text-lg font-semibold text-white">{rule.title}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Important CRA Warning</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  The CRA closely monitors TFSA accounts for business income activities. Frequent trading, day trading, 
                  or operating an investment business within your TFSA can result in all gains being taxed as business income. 
                  Keep your TFSA focused on long-term investing and DRIP strategies to maintain tax-free status.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Strategies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Proven TFSA Investment Strategies for 2025</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {investmentStrategies.map((strategy, index) => (
              <div key={index} className="card">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{strategy.name}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      strategy.riskLevel === 'Low' ? 'bg-green-500/20 text-green-400' :
                      strategy.riskLevel === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {strategy.riskLevel} Risk
                    </span>
                    <span className="text-sm text-slate-400">Target: {strategy.targetYield}</span>
                  </div>
                  <p className="text-sm text-slate-300 italic">{strategy.bestFor}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Portfolio Allocation:</h4>
                  <div className="space-y-2">
                    {Object.entries(strategy.allocation).map(([asset, percentage]) => (
                      <div key={asset} className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">{asset}</span>
                        <span className="text-sm font-medium text-white">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Example Holdings:</h4>
                  <div className="flex flex-wrap gap-2">
                    {strategy.examples.map((stock, stockIndex) => (
                      <span key={stockIndex} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
                        {stock}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to="/tfsa/drip-calculator" className="w-full btn-secondary text-center">
                  Model This Strategy
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Canadian Dividend Stocks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Top Canadian Dividend Stocks for TFSA</h2>
          <p className="text-center text-slate-300 mb-8 max-w-3xl mx-auto">
            These established Canadian companies offer reliable dividends with growth potential, 
            perfect for DRIP strategies in your TFSA. No foreign withholding taxes apply.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {canadianDividendStocks.map((stock, index) => (
              <div key={index} className="card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{stock.symbol}</h3>
                    <p className="text-sm text-slate-400">{stock.name}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                    {stock.sector}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-400">Current Yield</div>
                    <div className="text-lg font-semibold text-green-400">{stock.yield}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Dividend Growth</div>
                    <div className="text-sm font-medium text-blue-400">{stock.growth}</div>
                  </div>
                </div>
                
                <p className="text-sm text-slate-300 leading-relaxed">{stock.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm mb-4">
              * Yields and data are approximate and subject to market changes. Always research current financials before investing.
            </p>
            <Link to="/tfsa/drip-calculator" className="btn-primary">
              Calculate Returns for These Stocks
            </Link>
          </div>
        </section>

        {/* Action Steps */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Your 2025 TFSA Action Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-400 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Check Your Room</h3>
              <p className="text-slate-300 text-sm">
                Log into CRA MyAccount to verify your available TFSA contribution room. 
                Don't exceed your limit to avoid penalties.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Choose Your Strategy</h3>
              <p className="text-slate-300 text-sm">
                Pick an investment approach based on your risk tolerance and timeline. 
                Conservative, growth-focused, or monthly income strategies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-400 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Setup DRIP</h3>
              <p className="text-slate-300 text-sm">
                Enable dividend reinvestment with your broker. 
                Focus on Canadian dividend aristocrats with strong growth records.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-400 font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Track & Optimize</h3>
              <p className="text-slate-300 text-sm">
                Monitor your progress monthly. Rebalance annually and add your 
                $7,000 contribution each January for maximum growth.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-primary-600/20 to-blue-600/20 border border-primary-500/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Build Your TFSA Income Strategy?
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Use our advanced DRIP calculator to model different investment scenarios and 
            see how your $7,000 2025 contribution can grow into substantial retirement income.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tfsa/drip-calculator" className="btn-primary">
              Start Calculating Your Strategy
              <Calculator className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/register" className="btn-secondary">
              Create Account to Save Progress
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}