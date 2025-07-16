import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Calculator, TrendingUp, DollarSign, PieChart, Save, Brain, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

export default function DRIPCalculator() {
  const { user, savePortfolio } = useAuth()
  
  const [inputs, setInputs] = useState({
    initialInvestment: 10000,
    monthlyContribution: 500,
    annualDividendYield: 4.5,
    dividendGrowthRate: 3,
    yearsToProject: 25,
    stockAppreciationRate: 6,
    dividendFrequency: 4,
    contributionFrequency: 12
  })

  // Calculate DRIP projections
  const projectionData = useMemo(() => {
    const data = []
    const { 
      initialInvestment, 
      monthlyContribution, 
      annualDividendYield, 
      dividendGrowthRate, 
      yearsToProject, 
      stockAppreciationRate, 
      dividendFrequency, 
      contributionFrequency 
    } = inputs
    
    let sharePrice = 100
    let sharesOwned = initialInvestment / sharePrice
    let totalContributions = initialInvestment
    let totalDividendsReceived = 0
    let annualDividendPerShare = sharePrice * (annualDividendYield / 100)
    
    const annualContribution = monthlyContribution * 12
    const contributionPerPeriod = annualContribution / contributionFrequency
    
    // Year 0
    data.push({
      year: 0,
      portfolioValue: Math.round(sharesOwned * sharePrice),
      totalContributions: Math.round(totalContributions),
      totalDividends: 0,
      monthlyIncome: Math.round((sharesOwned * annualDividendPerShare) / 12),
      dividendYield: annualDividendYield.toFixed(2),
      sharePrice: Math.round(sharePrice * 100) / 100,
      sharesOwned: Math.round(sharesOwned * 100) / 100
    })
    
    for (let year = 1; year <= yearsToProject; year++) {
      let yearStartDividendPerShare = annualDividendPerShare
      
      const periodsPerYear = Math.max(dividendFrequency, contributionFrequency)
      const appreciationPerPeriod = Math.pow(1 + stockAppreciationRate / 100, 1 / periodsPerYear) - 1
      
      for (let period = 1; period <= periodsPerYear; period++) {
        // Add contributions
        if (period % (periodsPerYear / contributionFrequency) === 1 || contributionFrequency === periodsPerYear) {
          if (contributionPerPeriod > 0) {
            totalContributions += contributionPerPeriod
            const newSharesFromContributions = contributionPerPeriod / sharePrice
            sharesOwned += newSharesFromContributions
          }
        }
        
        // Pay dividends
        if (period % (periodsPerYear / dividendFrequency) === 1 || dividendFrequency === periodsPerYear) {
          const dividendThisPeriod = sharesOwned * (yearStartDividendPerShare / dividendFrequency)
          totalDividendsReceived += dividendThisPeriod
          
          const newSharesFromDividend = dividendThisPeriod / sharePrice
          sharesOwned += newSharesFromDividend
        }
        
        sharePrice *= (1 + appreciationPerPeriod)
      }
      
      annualDividendPerShare *= (1 + dividendGrowthRate / 100)
      
      const portfolioValue = sharesOwned * sharePrice
      const currentDividendYield = (annualDividendPerShare / sharePrice) * 100
      const projectedAnnualIncome = sharesOwned * annualDividendPerShare
      const monthlyIncome = projectedAnnualIncome / 12
      
      data.push({
        year,
        portfolioValue: Math.round(portfolioValue),
        totalContributions: Math.round(totalContributions),
        totalDividends: Math.round(totalDividendsReceived),
        monthlyIncome: Math.round(monthlyIncome),
        dividendYield: currentDividendYield.toFixed(2),
        sharePrice: Math.round(sharePrice * 100) / 100,
        sharesOwned: Math.round(sharesOwned * 100) / 100
      })
    }
    
    return data
  }, [inputs])

  // Analysis calculations
  const analysis = useMemo(() => {
    const finalYear = projectionData[projectionData.length - 1]
    const initialInvestmentOnly = inputs.initialInvestment
    const totalReturnPercent = ((finalYear.portfolioValue - finalYear.totalContributions) / finalYear.totalContributions) * 100
    const averageAnnualReturn = Math.pow(finalYear.portfolioValue / finalYear.totalContributions, 1 / inputs.yearsToProject) - 1
    const yieldOnCost = (finalYear.monthlyIncome * 12 / initialInvestmentOnly) * 100
    
    let riskLevel = 'Moderate'
    let recommendation = ''
    
    if (inputs.annualDividendYield > 6) {
      riskLevel = 'High'
      recommendation = 'High dividend yields may indicate higher risk. Consider diversifying with lower-yield, higher-growth stocks.'
    } else if (inputs.annualDividendYield < 3) {
      riskLevel = 'Low'
      recommendation = 'Conservative approach with growth potential. Consider increasing dividend allocation for more income.'
    } else {
      recommendation = 'Balanced approach with good growth and income potential. Well-suited for long-term TFSA growth.'
    }
    
    return {
      riskLevel,
      recommendation,
      totalReturnPercent: totalReturnPercent.toFixed(2),
      averageAnnualReturn: (averageAnnualReturn * 100).toFixed(2),
      yieldOnCost: yieldOnCost.toFixed(2),
      annualDividendIncome: finalYear.monthlyIncome * 12,
      totalDividendPayments: finalYear.totalDividends,
      endingBalance: finalYear.portfolioValue,
      tfsaEfficiency: inputs.yearsToProject >= 20 ? 'Excellent' : 'Good'
    }
  }, [projectionData, inputs])

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: Number(value)
    }))
  }

  const handleSavePortfolio = () => {
    if (!user) {
      toast.error('Please log in to save portfolios')
      return
    }

    const portfolioData = {
      name: `DRIP Portfolio ${new Date().toLocaleDateString()}`,
      type: 'drip',
      inputs: inputs,
      projectionData: projectionData,
      analysis: analysis
    }

    const success = savePortfolio(portfolioData)
    if (success) {
      toast.success('Portfolio saved successfully!')
    }
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Canadian TFSA DRIP Calculator
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Calculate your dividend reinvestment growth potential with your{' '}
            <span className="text-primary-400 font-semibold">$7,000 2025 TFSA contribution room</span>.
            See how DRIP strategies build tax-free retirement income over time.
          </p>
        </div>

        {/* TFSA 2025 Banner */}
        <div className="bg-gradient-to-r from-primary-600/20 to-blue-600/20 border border-primary-500/30 rounded-xl p-6 mb-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary-300 mb-2">2025 TFSA Contribution Limits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-400">$7,000</div>
                <div className="text-sm text-slate-300">2025 Contribution Limit</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">$102,000</div>
                <div className="text-sm text-slate-300">Total Lifetime Room</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">0%</div>
                <div className="text-sm text-slate-300">Tax on Growth & Withdrawals</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5 text-primary-400" />
                <h2 className="text-lg font-semibold text-white">Investment Parameters</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Initial Investment (CAD)
                  </label>
                  <input
                    type="number"
                    value={inputs.initialInvestment}
                    onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                    className="input-field"
                    min="0"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Start with your available TFSA room
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Monthly Contribution (CAD)
                  </label>
                  <input
                    type="number"
                    value={inputs.monthlyContribution}
                    onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                    className="input-field"
                    min="0"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    $583/month = $7,000 annually
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Annual Dividend Yield (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.annualDividendYield}
                    onChange={(e) => handleInputChange('annualDividendYield', e.target.value)}
                    className="input-field"
                    min="0"
                    max="20"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Canadian banks: 3-5%, REITs: 4-7%
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Dividend Growth Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.dividendGrowthRate}
                    onChange={(e) => handleInputChange('dividendGrowthRate', e.target.value)}
                    className="input-field"
                    min="0"
                    max="20"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Historical Canadian average: 3-5%
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Stock Appreciation Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.stockAppreciationRate}
                    onChange={(e) => handleInputChange('stockAppreciationRate', e.target.value)}
                    className="input-field"
                    min="0"
                    max="20"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    TSX historical average: ~7%
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Years to Project
                  </label>
                  <input
                    type="number"
                    value={inputs.yearsToProject}
                    onChange={(e) => handleInputChange('yearsToProject', e.target.value)}
                    className="input-field"
                    min="1"
                    max="50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Dividend Frequency
                  </label>
                  <select
                    value={inputs.dividendFrequency}
                    onChange={(e) => handleInputChange('dividendFrequency', e.target.value)}
                    className="input-field"
                  >
                    <option value={1}>Annually</option>
                    <option value={2}>Semi-annually</option>
                    <option value={4}>Quarterly</option>
                    <option value={12}>Monthly</option>
                  </select>
                  <p className="text-xs text-slate-400 mt-1">
                    Monthly payers compound faster
                  </p>
                </div>

                {user && (
                  <button
                    onClick={handleSavePortfolio}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Portfolio
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: 'Final Portfolio Value',
                  value: `$${projectionData[projectionData.length - 1]?.portfolioValue.toLocaleString()}`,
                  icon: DollarSign,
                  color: 'text-primary-400'
                },
                {
                  label: 'Monthly Income (Final)',
                  value: `$${projectionData[projectionData.length - 1]?.monthlyIncome.toLocaleString()}`,
                  icon: TrendingUp,
                  color: 'text-blue-400'
                },
                {
                  label: 'Total Dividends',
                  value: `$${projectionData[projectionData.length - 1]?.totalDividends.toLocaleString()}`,
                  icon: PieChart,
                  color: 'text-purple-400'
                },
                {
                  label: 'Total Return',
                  value: `${analysis.totalReturnPercent}%`,
                  icon: Calculator,
                  color: 'text-orange-400'
                }
              ].map((metric, index) => (
                <div key={index} className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <p className="text-slate-400 text-sm">{metric.label}</p>
                  <p className="text-white text-xl font-bold">{metric.value}</p>
                </div>
              ))}
            </div>

            {/* Comprehensive Results Summary */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-6">
                Your Portfolio After {inputs.yearsToProject} Years
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                  <h4 className="text-sm text-slate-400 mb-1">YIELD ON COST</h4>
                  <p className="text-xl font-bold text-yellow-400">{analysis.yieldOnCost}%</p>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                  <h4 className="text-sm text-slate-400 mb-1">AVERAGE ANNUAL RETURN</h4>
                  <p className="text-xl font-bold text-green-400">{analysis.averageAnnualReturn}%</p>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                  <h4 className="text-sm text-slate-400 mb-1">ANNUAL DIVIDEND INCOME</h4>
                  <p className="text-xl font-bold text-purple-400">${analysis.annualDividendIncome.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="p-4 bg-primary-500/10 rounded-lg">
                <p className="text-sm text-primary-300">
                  <strong>Yield on Cost</strong> shows your annual dividend income as a percentage of your original investment. 
                  At {analysis.yieldOnCost}%, your dividends alone provide excellent income growth over {inputs.yearsToProject} years.
                </p>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">AI Investment Analysis</h3>
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">Educational</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-purple-300">Risk Level:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    analysis.riskLevel === 'High' ? 'bg-red-500/20 text-red-300' :
                    analysis.riskLevel === 'Low' ? 'bg-green-500/20 text-green-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {analysis.riskLevel}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-purple-300">TFSA Efficiency:</span>
                  <span className="text-primary-300 font-semibold">{analysis.tfsaEfficiency}</span>
                </div>
                
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-700/30 p-3 rounded-lg">
                  {analysis.recommendation}
                </p>
                
                <div className="text-xs text-slate-500 bg-slate-800/30 p-2 rounded">
                  Educational analysis • Not investment advice • Consult professionals
                </div>
              </div>
            </div>
            
            {/* Portfolio Growth Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-6">Portfolio Growth Projection</h3>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#F8FAFC'
                      }}
                      formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="portfolioValue" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Portfolio Value"
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="totalContributions" 
                      stroke="#6B7280" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Total Contributions"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Income Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-6">Projected Monthly Dividend Income</h3>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectionData.filter((_, index) => index % 5 === 0)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#F8FAFC'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Monthly Income']}
                    />
                    <Bar dataKey="monthlyIncome" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Educational Content */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Understanding DRIP in Your TFSA</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Compound Growth Power</h4>
                    <p className="text-sm text-slate-300">
                      DRIP automatically reinvests dividends to buy more shares, which generate more dividends. 
                      This creates exponential growth over time.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Tax-Free Growth</h4>
                    <p className="text-sm text-slate-300">
                      In a TFSA, all dividend income and capital gains grow completely tax-free. 
                      You keep 100% of your returns.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Dollar-Cost Averaging</h4>
                    <p className="text-sm text-slate-300">
                      Regular contributions smooth out market volatility by buying more shares when prices are low 
                      and fewer when prices are high.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}