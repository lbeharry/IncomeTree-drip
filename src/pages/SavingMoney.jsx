import { useState } from 'react'
import { PiggyBank, DollarSign, Home, Car, Utensils, Coffee, Phone, Zap, Calculator, TrendingDown, Target, AlertCircle } from 'lucide-react'

export default function SavingMoney() {
  const [monthlyIncome, setMonthlyIncome] = useState(5000)
  const [expenses, setExpenses] = useState({
    housing: 1500,
    transportation: 400,
    food: 600,
    utilities: 200,
    phone: 80,
    entertainment: 300,
    other: 500
  })

  const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0)
  const remainingIncome = monthlyIncome - totalExpenses
  const savingsRate = (remainingIncome / monthlyIncome * 100).toFixed(1)

  const savingTips = [
    {
      category: "Housing",
      icon: Home,
      color: "text-blue-400",
      tips: [
        "Consider house hacking - rent out basement/rooms",
        "Refinance mortgage if rates have dropped",
        "Property tax appeals can reduce annual costs",
        "Bundle home/auto insurance for discounts"
      ],
      potentialSavings: "$200-500/month"
    },
    {
      category: "Transportation", 
      icon: Car,
      color: "text-green-400",
      tips: [
        "Use public transit or carpool when possible",
        "Consider car-sharing services vs ownership",
        "Shop around for auto insurance annually",
        "Walk/bike for trips under 2km"
      ],
      potentialSavings: "$150-400/month"
    },
    {
      category: "Food & Dining",
      icon: Utensils,
      color: "text-orange-400", 
      tips: [
        "Meal prep on weekends to avoid takeout",
        "Use grocery store apps for cashback",
        "Buy generic brands for staples",
        "Cook at home 5+ nights per week"
      ],
      potentialSavings: "$200-400/month"
    },
    {
      category: "Subscriptions & Bills",
      icon: Phone,
      color: "text-purple-400",
      tips: [
        "Cancel unused streaming services",
        "Negotiate phone/internet bills annually",
        "Use energy-efficient appliances",
        "Switch to no-fee banking"
      ],
      potentialSavings: "$50-200/month"
    }
  ]

  const canadianCostOfLiving = [
    { city: "Toronto", housing: 2200, food: 800, transport: 150, total: 3150 },
    { city: "Vancouver", housing: 2500, food: 750, transport: 140, total: 3390 },
    { city: "Montreal", housing: 1200, food: 650, transport: 90, total: 1940 },
    { city: "Calgary", housing: 1400, food: 700, transport: 120, total: 2220 },
    { city: "Ottawa", housing: 1500, food: 700, transport: 110, total: 2310 },
    { city: "Edmonton", housing: 1100, food: 650, transport: 100, total: 1850 }
  ]

  const handleExpenseChange = (category, value) => {
    setExpenses(prev => ({
      ...prev,
      [category]: Number(value)
    }))
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Smart Money Saving Strategies for Canadians
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover proven techniques to reduce expenses, optimize your budget, and find more money 
            to invest in your TFSA. Every dollar saved is a dollar that can grow tax-free.
          </p>
        </div>

        {/* Budget Calculator */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Input Panel */}
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary-400" />
                Monthly Budget Calculator
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Monthly After-Tax Income (CAD)
                  </label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Housing/Rent
                    </label>
                    <input
                      type="number"
                      value={expenses.housing}
                      onChange={(e) => handleExpenseChange('housing', e.target.value)}
                      className="input-field"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Transportation
                    </label>
                    <input
                      type="number"
                      value={expenses.transportation}
                      onChange={(e) => handleExpenseChange('transportation', e.target.value)}
                      className="input-field"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Food & Groceries
                    </label>
                    <input
                      type="number"
                      value={expenses.food}
                      onChange={(e) => handleExpenseChange('food', e.target.value)}
                      className="input-field"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Utilities
                    </label>
                    <input
                      type="number"
                      value={expenses.utilities}
                      onChange={(e) => handleExpenseChange('utilities', e.target.value)}
                      className="input-field"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Phone/Internet
                    </label>
                    <input
                      type="number"
                      value={expenses.phone}
                      onChange={(e) => handleExpenseChange('phone', e.target.value)}
                      className="input-field"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Entertainment
                    </label>
                    <input
                      type="number"
                      value={expenses.entertainment}
                      onChange={(e) => handleExpenseChange('entertainment', e.target.value)}
                      className="input-field"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Other Expenses
                  </label>
                  <input
                    type="number"
                    value={expenses.other}
                    onChange={(e) => handleExpenseChange('other', e.target.value)}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Budget Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Monthly Income</span>
                    <span className="text-white font-semibold">${monthlyIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Expenses</span>
                    <span className="text-red-400 font-semibold">${totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-slate-600 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Available for Savings/Investing</span>
                      <span className={`font-semibold ${remainingIncome >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${remainingIncome.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">Savings Rate</span>
                    <span className={`text-lg font-bold ${
                      Number(savingsRate) >= 20 ? 'text-green-400' :
                      Number(savingsRate) >= 10 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {savingsRate}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Target: 20%+ for strong financial health
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">TFSA Investment Potential</h3>
                <p className="text-slate-300 text-sm mb-4">
                  If you invest your available savings in TFSA dividend stocks:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-3">
                    <div className="text-sm text-slate-400">Monthly Investment Capacity</div>
                    <div className="text-xl font-bold text-primary-400">
                      ${Math.max(0, remainingIncome).toLocaleString()}
                    </div>
                  </div>
                  
                  {remainingIncome > 0 && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <div className="text-sm text-slate-400">Potential Annual TFSA Growth (4.5% dividend)</div>
                      <div className="text-lg font-semibold text-blue-400">
                        ${Math.round(remainingIncome * 12 * 0.045).toLocaleString()} in dividends
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Saving Tips by Category */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Proven Money-Saving Strategies by Category
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {savingTips.map((category, index) => (
              <div key={index} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                  <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                  <span className="ml-auto text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    {category.potentialSavings}
                  </span>
                </div>
                
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Canadian Cost of Living Comparison */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Canadian Cost of Living Comparison
          </h2>
          <p className="text-center text-slate-300 mb-8 max-w-3xl mx-auto">
            Compare average monthly living costs across major Canadian cities. 
            Consider relocating to lower-cost areas to increase your savings rate and TFSA contributions.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-800/50 rounded-xl overflow-hidden">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">City</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Housing</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Food</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Transport</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Total</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Savings Potential*</th>
                </tr>
              </thead>
              <tbody>
                {canadianCostOfLiving.map((city, index) => (
                  <tr key={index} className="border-t border-slate-600">
                    <td className="px-6 py-4 text-white font-medium">{city.city}</td>
                    <td className="px-6 py-4 text-center text-slate-300">${city.housing}</td>
                    <td className="px-6 py-4 text-center text-slate-300">${city.food}</td>
                    <td className="px-6 py-4 text-center text-slate-300">${city.transport}</td>
                    <td className="px-6 py-4 text-center font-semibold text-white">${city.total}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-semibold ${
                        city.total < 2500 ? 'text-green-400' : 
                        city.total < 3000 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        ${5000 - city.total > 0 ? (5000 - city.total) : 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            * Savings potential based on $5,000 monthly after-tax income. Actual costs vary by lifestyle and specific location.
          </p>
        </section>

        {/* Emergency Fund Strategy */}
        <section className="mb-12">
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
              Emergency Fund Before Investing
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Build Your Safety Net First</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Before maximizing TFSA contributions, ensure you have 3-6 months of expenses 
                  in a high-interest savings account. This prevents you from having to withdraw 
                  TFSA investments during emergencies.
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">3 Months Emergency Fund</span>
                    <span className="text-yellow-400 font-semibold">
                      ${(totalExpenses * 3).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">6 Months Emergency Fund</span>
                    <span className="text-green-400 font-semibold">
                      ${(totalExpenses * 6).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">High-Interest Savings Options</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="font-medium text-white">High-Interest Savings Accounts</div>
                    <div className="text-sm text-slate-300">2.5-4.5% APY, instant access</div>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="font-medium text-white">GICs (1-year)</div>
                    <div className="text-sm text-slate-300">4-5.5% APY, locked for term</div>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="font-medium text-white">Money Market Funds</div>
                    <div className="text-sm text-slate-300">3-4.5% APY, some liquidity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Wins Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Quick Wins: Start Saving This Week
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Coffee,
                title: "Cancel Unused Subscriptions", 
                savings: "$50-200/month",
                description: "Review all recurring charges. Cancel streaming services, gym memberships, and apps you don't use.",
                difficulty: "Easy"
              },
              {
                icon: Phone,
                title: "Negotiate Bills",
                savings: "$30-100/month", 
                description: "Call phone, internet, and insurance providers. Ask for better rates or threaten to switch.",
                difficulty: "Medium"
              },
              {
                icon: DollarSign,
                title: "Switch to No-Fee Banking",
                savings: "$15-30/month",
                description: "Many banks offer no-fee accounts. Move to one and stop paying monthly banking fees.",
                difficulty: "Easy"
              },
              {
                icon: Zap,
                title: "Reduce Energy Costs",
                savings: "$20-80/month",
                description: "Use programmable thermostat, LED bulbs, and unplug electronics when not in use.",
                difficulty: "Easy"
              },
              {
                icon: Car,
                title: "Optimize Transportation",
                savings: "$100-300/month",
                description: "Use public transit, carpool, or bike more often. Consider selling a second vehicle.",
                difficulty: "Medium"
              },
              {
                icon: PiggyBank,
                title: "Automate Savings",
                savings: "Behavioral boost",
                description: "Set up automatic transfers to savings the day after payday. Pay yourself first.",
                difficulty: "Easy"
              }
            ].map((tip, index) => (
              <div key={index} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <tip.icon className="w-6 h-6 text-primary-400" />
                  <span className={`text-xs px-2 py-1 rounded ${
                    tip.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {tip.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{tip.title}</h3>
                <div className="text-primary-400 font-semibold mb-3">{tip.savings}</div>
                <p className="text-slate-300 text-sm leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-primary-600/20 to-blue-600/20 border border-primary-500/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Turn Your Savings Into Investment Growth
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Every dollar you save can be invested in your TFSA for tax-free growth. 
            Use our DRIP calculator to see how much your optimized budget could grow over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/tfsa/drip-calculator" className="btn-primary">
              Calculate Investment Potential
              <TrendingDown className="w-5 h-5 ml-2" />
            </a>
            <a href="/register" className="btn-secondary">
              Track Your Progress
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}