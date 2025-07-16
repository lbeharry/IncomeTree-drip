import React, { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Calculator, TrendingUp, DollarSign, PieChart, Save, Brain, CheckCircle, HelpCircle } from 'lucide-react'

// --- Tooltip Component ---
const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div className="relative inline-block">
      <span
        className="inline-flex items-center gap-1 cursor-help border-b border-dotted text-[#d4af37] border-[#d4af37]"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        <HelpCircle className="w-3 h-3" />
      </span>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#192A3D] text-[#f6e6b4] text-sm rounded-lg shadow-lg border border-[#d4af37] max-w-xs z-50">
          <div className="text-center">{content}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#192A3D]"></div>
        </div>
      )}
    </div>
  )
}

export default function DRIPCalculator() {
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

  // --- DRIP projection logic ---
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
        if (period % (periodsPerYear / contributionFrequency) === 1 || contributionFrequency === periodsPerYear) {
          if (contributionPerPeriod > 0) {
            totalContributions += contributionPerPeriod
            const newSharesFromContributions = contributionPerPeriod / sharePrice
            sharesOwned += newSharesFromContributions
          }
        }
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

  // --- Investment analysis ---
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

  // --- MAIN JSX ---
  return (
    <div className="min-h-screen bg-[#192A3D] flex items-center justify-center py-0">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-6 md:p-12 border border-[#f6e6b4]">
        {/* Gold bar at the very top */}
        <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-[#d4af37]" />

        {/* Calculator main content starts here */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#d4af37] mb-4">
            Canadian <Tooltip content="Tax-Free Savings Account - A Canadian investment account where all growth and withdrawals are tax-free">TFSA</Tooltip> <Tooltip content="Dividend Reinvestment Plan - Automatically uses dividend payments to purchase additional shares, compounding your returns over time">DRIP</Tooltip> Calculator
          </h1>
          <p className="text-xl text-[#192A3D] max-w-3xl mx-auto font-sans">
            Calculate your <Tooltip content="A strategy that automatically reinvests dividend payments to buy more shares, creating compound growth">dividend reinvestment</Tooltip> growth potential with your{' '}
            <span className="text-[#d4af37] font-semibold">
              <Tooltip content="The maximum amount you can contribute to your TFSA in 2025. This amount is set by the Canadian government each year">$7,000 2025 TFSA contribution room</Tooltip>
            </span>.
            See how <Tooltip content="Dividend Reinvestment Plan strategies that automatically reinvest dividends to compound your returns">DRIP strategies</Tooltip> build tax-free retirement income over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-[#fcfaf4] rounded-xl shadow-lg p-6 sticky top-24 border border-[#f6e6b4]">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-lg font-semibold text-[#192A3D] font-serif">Investment Parameters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#192A3D] mb-2">
                    Initial Investment (CAD)
                  </label>
                  <input
                    type="number"
                    value={inputs.initialInvestment}
                    onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                    className="input-field w-full border-2 border-[#d4af37] rounded-lg px-4 py-2 bg-[#f6e6b4] text-[#192A3D] font-sans"
                    min="0"
                  />
                  <p className="text-xs text-[#d4af37] mt-1">
                    Start with your available <Tooltip content="Your personal TFSA contribution room. Check with CRA My Account or your bank to find your exact amount">TFSA room</Tooltip>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#192A3D] mb-2">
                    Monthly Contribution (CAD)
                  </label>
                  <input
                    type="number"
                    value={inputs.monthlyContribution}
                    onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                    className="input-field w-full border-2 border-[#d4af37] rounded-lg px-4 py-2 bg-[#f6e6b4] text-[#192A3D] font-sans"
                    min="0"
                  />
                  <p className="text-xs text-[#d4af37] mt-1">
                    $583/month = $7,000 annually
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#192A3D] mb-2">
                    <Tooltip content="The annual percentage of the stock price paid out as dividends. For example, if a $100 stock pays $4 in dividends annually, the yield is 4%">Annual Dividend Yield</Tooltip> (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.annualDividendYield}
                    onChange={(e) => handleInputChange('annualDividendYield', e.target.value)}
                    className="input-field w-full border-2 border-[#d4af37] rounded-lg px-4 py-2 bg-[#f6e6b4] text-[#192A3D] font-sans"
                    min="0"
                    max="20"
                  />
                  <p className="text-xs text-[#d4af37] mt-1">
                    Canadian banks: 3-5%, <Tooltip content="Real Estate Investment Trusts - Companies that own and operate income-generating real estate">REITs</Tooltip>: 4-7%
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#192A3D] mb-2">
                    <Tooltip content="The annual rate at which dividend payments increase. Quality companies often grow their dividends 3-5% annually">Dividend Growth Rate</Tooltip> (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.dividendGrowthRate}
                    onChange={(e) => handleInputChange('dividendGrowthRate', e.target.value)}
                    className="input-field w-full border-2 border-[#d4af37] rounded-lg px-4 py-2 bg-[#f6e6b4] text-[#192A3D] font-sans"
                    min="0"
                    max="20"
                  />
                  <p className="text-xs text-[#d4af37] mt-1">
                    Historical Canadian average: 3-5%
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#192A3D] mb-2">
                    <Tooltip content="The annual rate at which the stock price increases, separate from dividends. This represents capital appreciation">Stock Appreciation Rate</Tooltip> (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.stockAppreciationRate}
                    onChange={(e) => handleInputChange('stockAppreciationRate', e.target.value)}
                    className="input-field w-full border-2 border-[#d4af37] rounded-lg px-4 py-2 bg-[#f6e6b4] text-[#192A3D] font-sans"
                    min="0"
                    max="20"
                  />
                  <p className="text-xs text-[#d4af37] mt-1">
                    <Tooltip content="Toronto Stock Exchange - Canada's main stock market">TSX</Tooltip> historical average: ~7%
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#192A3D] mb-2">
                    Years to Project
                  </label>
                  <input
                    type="number"
                    value={inputs.yearsToProject}
                    onChange={(e) => handleInputChange('yearsToProject', e.target.value)}
                    className="input-field w-full border-2 border-[#d4af37] rounded-lg px-4 py-2 bg-[#f6e6b4] text-[#192A3D] font-sans"
                    min="1"
                    max="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#192A3D] mb-2">
                    <Tooltip content="How often dividends are paid out. More frequent payments mean faster compounding through reinvestment">Dividend Frequency</Tooltip>
                  </label>
                  <select
                    value={inputs.dividendFrequency}
                    onChange={(e) => handleInputChange('dividendFrequency', e.target.value)}
                    className="input-field w-full border-2 border-[#d4af37] rounded-lg px-4 py-2 bg-[#f6e6b4] text-[#192A3D] font-sans"
                  >
                    <option value={1}>Annually</option>
                    <option value={2}>Semi-annually</option>
                    <option value={4}>Quarterly</option>
                    <option value={12}>Monthly</option>
                  </select>
                  <p className="text-xs text-[#d4af37] mt-1">
                    Monthly payers compound faster
                  </p>
                </div>
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
                  color: 'text-[#d4af37]'
                },
                {
                  label: 'Monthly Income (Final)',
                  value: `$${projectionData[projectionData.length - 1]?.monthlyIncome.toLocaleString()}`,
                  icon: TrendingUp,
                  color: 'text-[#192A3D]'
                },
                {
                  label: 'Total Dividends',
                  value: `$${projectionData[projectionData.length - 1]?.totalDividends.toLocaleString()}`,
                  icon: PieChart,
                  color: 'text-[#E9B027]'
                },
                {
                  label: 'Total Return',
                  value: `${analysis.totalReturnPercent}%`,
                  icon: Calculator,
                  color: 'text-[#F8351C]'
                }
              ].map((metric, index) => (
                <div key={index} className="bg-[#fcfaf4] rounded-xl shadow-md p-5 flex flex-col items-center border border-[#f6e6b4]">
                  <div className={`flex items-center gap-2 mb-2 ${metric.color}`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                  <p className="text-[#192A3D] text-sm">{metric.label}</p>
                  <p className="font-serif text-2xl font-bold">{metric.value}</p>
                </div>
              ))}
            </div>

            {/* Portfolio Growth Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#f6e6b4]">
              <h3 className="text-lg font-semibold text-[#192A3D] mb-6 font-serif">Portfolio Growth Projection</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d4af37" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#192A3D"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#192A3D"
                      fontSize={12}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: '#192A3D',
                        border: '1px solid #d4af37',
                        borderRadius: '8px',
                        color: '#f6e6b4'
                      }}
                      formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="portfolioValue" 
                      stroke="#d4af37" 
                      strokeWidth={3}
                      name="Portfolio Value"
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="totalContributions" 
                      stroke="#192A3D" 
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
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#f6e6b4]">
              <h3 className="text-lg font-semibold text-[#192A3D] mb-6 font-serif">Projected Monthly Dividend Income</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectionData.filter((_, index) => index % 5 === 0)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d4af37" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#192A3D"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#192A3D"
                      fontSize={12}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: '#192A3D',
                        border: '1px solid #d4af37',
                        borderRadius: '8px',
                        color: '#f6e6b4'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Monthly Income']}
                    />
                    <Bar dataKey="monthlyIncome" fill="#E9B027" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-[#fcfaf4] rounded-xl shadow-lg p-6 border border-[#f6e6b4]">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-lg font-semibold text-[#192A3D] font-serif">IncomeTree Investment Analysis</h3>
                <span className="text-xs bg-[#f6e6b4] text-[#192A3D] px-2 py-1 rounded">Educational</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#E9B027]">Risk Level:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    analysis.riskLevel === 'High' ? 'bg-[#F8351C]/20 text-[#F8351C]' :
                    analysis.riskLevel === 'Low' ? 'bg-[#22c55e]/20 text-[#22c55e]' :
                    'bg-[#d4af37]/20 text-[#d4af37]'
                  }`}>
                    {analysis.riskLevel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#E9B027]">
                    <Tooltip content="How well-suited this strategy is for TFSA investing based on time horizon and tax efficiency">TFSA Efficiency</Tooltip>:
                  </span>
                  <span className="text-[#d4af37] font-semibold">{analysis.tfsaEfficiency}</span>
                </div>
                <p className="text-sm text-[#192A3D] leading-relaxed bg-[#f6e6b4] p-3 rounded-lg">
                  {analysis.recommendation}
                </p>
                <div className="text-xs text-[#192A3D] bg-white p-2 rounded">
                  Educational analysis • Not investment advice • Consult professionals
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
