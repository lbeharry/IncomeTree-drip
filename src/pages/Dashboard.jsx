import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  PieChart, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Target,
  AlertCircle,
  CheckCircle,
  BarChart3
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user, getPortfolios, deletePortfolio, updatePortfolio } = useAuth()
  const [portfolios, setPortfolios] = useState([])
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [showActualDataModal, setShowActualDataModal] = useState(false)
  const [actualData, setActualData] = useState({
    currentValue: '',
    monthlyIncome: '',
    totalDividends: '',
    notes: ''
  })

  useEffect(() => {
    if (user) {
      const userPortfolios = getPortfolios()
      setPortfolios(userPortfolios)
    }
  }, [user, getPortfolios])

  const handleDeletePortfolio = (portfolioId) => {
    if (window.confirm('Are you sure you want to delete this portfolio?')) {
      const success = deletePortfolio(portfolioId)
      if (success) {
        setPortfolios(prev => prev.filter(p => p.id !== portfolioId))
      }
    }
  }

  const handleUpdateActualData = () => {
    if (!selectedPortfolio) return

    const success = updatePortfolio(selectedPortfolio.id, actualData)
    if (success) {
      setPortfolios(prev => prev.map(p => 
        p.id === selectedPortfolio.id 
          ? { ...p, actualData: actualData }
          : p
      ))
      setShowActualDataModal(false)
      setActualData({ currentValue: '', monthlyIncome: '', totalDividends: '', notes: '' })
      toast.success('Actual data updated successfully!')
    }
  }

  const openActualDataModal = (portfolio) => {
    setSelectedPortfolio(portfolio)
    setActualData(portfolio.actualData || { currentValue: '', monthlyIncome: '', totalDividends: '', notes: '' })
    setShowActualDataModal(true)
  }

  // Calculate portfolio summary stats
  const portfolioStats = portfolios.reduce((acc, portfolio) => {
    const finalProjection = portfolio.projectionData?.[portfolio.projectionData.length - 1]
    if (finalProjection) {
      acc.totalProjectedValue += finalProjection.portfolioValue
      acc.totalProjectedIncome += finalProjection.monthlyIncome * 12
      acc.totalContributions += finalProjection.totalContributions
    }
    return acc
  }, { totalProjectedValue: 0, totalProjectedIncome: 0, totalContributions: 0 })

  const totalActualValue = portfolios.reduce((sum, p) => {
    return sum + (p.actualData?.currentValue ? Number(p.actualData.currentValue) : 0)
  }, 0)

  if (!user) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-slate-400 mb-6">Please log in to view your dashboard</p>
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-slate-400">
            Track your investment portfolios and compare actual vs projected performance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary-500/20 rounded-lg">
                <PieChart className="w-5 h-5 text-primary-400" />
              </div>
              <span className="text-slate-400 text-sm">Active Portfolios</span>
            </div>
            <div className="text-2xl font-bold text-white">{portfolios.length}</div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-slate-400 text-sm">Projected Value</span>
            </div>
            <div className="text-2xl font-bold text-white">
              ${portfolioStats.totalProjectedValue.toLocaleString()}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-slate-400 text-sm">Current Value</span>
            </div>
            <div className="text-2xl font-bold text-white">
              ${totalActualValue.toLocaleString()}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-slate-400 text-sm">Annual Income Goal</span>
            </div>
            <div className="text-2xl font-bold text-white">
              ${portfolioStats.totalProjectedIncome.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link to="/tfsa/drip-calculator" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Portfolio
          </Link>
          <Link to="/tfsa/guide" className="btn-secondary flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Investment Strategies
          </Link>
        </div>

        {portfolios.length === 0 ? (
          /* Empty State */
          <div className="card text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-slate-700/30 rounded-full w-fit mx-auto mb-4">
                <PieChart className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Portfolios Yet</h3>
              <p className="text-slate-400 mb-6">
                Create your first investment portfolio to start tracking your progress towards retirement income goals.
              </p>
              <Link to="/tfsa/drip-calculator" className="btn-primary">
                Create Your First Portfolio
              </Link>
            </div>
          </div>
        ) : (
          /* Portfolio List */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {portfolios.map((portfolio) => {
              const finalProjection = portfolio.projectionData?.[portfolio.projectionData.length - 1]
              const hasActualData = portfolio.actualData && Object.values(portfolio.actualData).some(val => val)
              const actualValue = portfolio.actualData?.currentValue ? Number(portfolio.actualData.currentValue) : 0
              const projectedValue = finalProjection?.portfolioValue || 0
              const performance = actualValue && projectedValue ? 
                ((actualValue - projectedValue) / projectedValue * 100).toFixed(1) : null

              return (
                <div key={portfolio.id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {portfolio.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        Created {format(new Date(portfolio.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openActualDataModal(portfolio)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        title="Update actual data"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePortfolio(portfolio.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete portfolio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Portfolio Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Projected Value</div>
                      <div className="text-lg font-semibold text-white">
                        ${finalProjection?.portfolioValue.toLocaleString() || '0'}
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Monthly Income</div>
                      <div className="text-lg font-semibold text-primary-400">
                        ${finalProjection?.monthlyIncome.toLocaleString() || '0'}
                      </div>
                    </div>
                  </div>

                  {/* Actual vs Projected */}
                  {hasActualData && (
                    <div className="mb-4 p-3 bg-slate-700/20 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-400">Actual vs Projected</span>
                        {performance && (
                          <span className={`text-sm font-medium ${
                            Number(performance) >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {Number(performance) >= 0 ? '+' : ''}{performance}%
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-slate-500">Current: </span>
                          <span className="text-white">${actualValue.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Projected: </span>
                          <span className="text-slate-400">${projectedValue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mini Chart */}
                  {portfolio.projectionData && (
                    <div className="h-32 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={portfolio.projectionData.slice(0, 10)}>
                          <Line 
                            type="monotone" 
                            dataKey="portfolioValue" 
                            stroke="#10B981" 
                            strokeWidth={2}
                            dot={false}
                          />
                          <XAxis hide />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: '#1E293B',
                              border: '1px solid #334155',
                              borderRadius: '8px',
                              color: '#F8FAFC'
                            }}
                            formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                            labelFormatter={(year) => `Year ${year}`}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Status Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {hasActualData ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className="text-sm text-slate-400">
                        {hasActualData ? 'Tracking active' : 'No actual data yet'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-700/30 px-2 py-1 rounded">
                      {portfolio.type?.toUpperCase() || 'DRIP'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Actual Data Modal */}
      {showActualDataModal && selectedPortfolio && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-4">
              Update Actual Performance
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Track your real portfolio performance vs projections
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Current Portfolio Value (CAD)
                </label>
                <input
                  type="number"
                  value={actualData.currentValue}
                  onChange={(e) => setActualData({...actualData, currentValue: e.target.value})}
                  className="input-field"
                  placeholder="Enter current value"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Monthly Dividend Income (CAD)
                </label>
                <input
                  type="number"
                  value={actualData.monthlyIncome}
                  onChange={(e) => setActualData({...actualData, monthlyIncome: e.target.value})}
                  className="input-field"
                  placeholder="Enter monthly income"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Total Dividends Received (CAD)
                </label>
                <input
                  type="number"
                  value={actualData.totalDividends}
                  onChange={(e) => setActualData({...actualData, totalDividends: e.target.value})}
                  className="input-field"
                  placeholder="Enter total dividends"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={actualData.notes}
                  onChange={(e) => setActualData({...actualData, notes: e.target.value})}
                  className="input-field"
                  placeholder="Any additional notes..."
                  rows="3"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpdateActualData}
                className="flex-1 btn-primary"
              >
                Save Data
              </button>
              <button
                onClick={() => setShowActualDataModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}