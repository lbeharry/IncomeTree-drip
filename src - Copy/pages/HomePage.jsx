import { Link } from 'react-router-dom'
import { TrendingUp, Calculator, PiggyBank, Target, Shield, Users, ArrowRight, CheckCircle, DollarSign, Briefcase, Home } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Calculator,
      title: "DRIP Calculator",
      description: "Calculate dividend reinvestment growth with real Canadian stocks",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "TFSA Strategies",
      description: "Maximize your $7,000 2025 contribution room",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Risk Analysis",
      description: "AI-powered portfolio risk assessment and recommendations",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Track actual vs projected performance over time",
      color: "from-orange-500 to-red-600"
    }
  ]

  const stats = [
    { label: "TFSA Contribution Room 2025", value: "$7,000", color: "text-green-400" },
    { label: "Total Lifetime Room", value: "$102,000", color: "text-blue-400" },
    { label: "Average CPP Monthly", value: "$899", color: "text-red-400" },
    { label: "Retirement Income Gap", value: "$2,600+", color: "text-orange-400" }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Build
                  <span className="block bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                    Sustainable Income
                  </span>
                  for Retirement
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Master Canadian TFSA strategies and DRIP investing to create tax-free dividend income streams 
                  that grow throughout retirement. Start with just $7,000 in 2025.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/tfsa/drip-calculator" className="btn-primary">
                  Try DRIP Calculator
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/register" className="btn-secondary">
                  Create Free Account
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-effect rounded-2xl p-8 animate-float">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Sample TFSA Growth</h3>
                  <p className="text-slate-400 text-sm">$500/month + 4.5% dividend + DRIP</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Year 10</span>
                    <span className="text-emerald-400 font-semibold">$89,432</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Year 20</span>
                    <span className="text-blue-400 font-semibold">$264,891</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary-500/20 rounded-lg border border-primary-500/30">
                    <span className="text-white font-medium">Year 25</span>
                    <span className="text-primary-300 font-bold">$398,745</span>
                  </div>
                  <div className="text-center pt-2">
                    <span className="text-sm text-slate-400">Monthly Income: </span>
                    <span className="text-lg font-semibold text-primary-400">$1,495</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="py-20 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Choose Your Financial Path
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Whether you're building long-term wealth or optimizing current expenses, 
              we have the tools to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Creating Sustainable Long Term Income */}
            <div className="group card hover:scale-105 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Creating Sustainable Long Term Income
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Build tax-free dividend income streams through strategic TFSA investing, 
                  DRIP strategies, and proven Canadian dividend stocks.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary-400" />
                    TFSA Strategies
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      DRIP Calculator & Analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      2025 Investment Guide ($7,000 limit)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Canadian Dividend Stock Research
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <Link 
                  to="/tfsa/drip-calculator" 
                  className="block w-full btn-primary text-center group"
                >
                  Start DRIP Calculator
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/tfsa/guide" 
                  className="block w-full btn-secondary text-center"
                >
                  Read TFSA Guide
                </Link>
              </div>
            </div>

            {/* Saving Money */}
            <div className="group card hover:scale-105 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <PiggyBank className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Saving Money
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Optimize your daily expenses, reduce costs, and find more money 
                  to invest through smart budgeting and expense tracking.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    Smart Budgeting Tools
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Expense Analysis & Optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Canadian Cost-of-Living Calculator
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Mortgage vs Investment Strategies
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <Link 
                  to="/saving-money" 
                  className="block w-full btn-primary text-center group"
                >
                  Explore Saving Tools
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="text-center text-sm text-slate-400">
                  Coming Soon - Advanced Features
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Powerful Financial Planning Tools
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Everything you need to plan, track, and optimize your Canadian retirement income strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card group hover:scale-105 transition-all duration-300">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Canadian Retirement Challenge */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              The Canadian Retirement Income Crisis
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              CPP and OAS won't cover your retirement expenses. Here's the reality every Canadian needs to face.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-slate-800/30 rounded-xl">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-300 mb-6 max-w-3xl mx-auto">
              With average monthly expenses of $3,500+ in major Canadian cities and CPP providing just $899/month, 
              there's a massive income gap. TFSA dividend investing helps bridge this gap with tax-free income.
            </p>
            <Link to="/tfsa/drip-calculator" className="btn-primary">
              Calculate Your TFSA Strategy
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600/20 to-blue-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Financial Future?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of Canadians using our tools to plan their retirement income. 
            Start calculating your TFSA growth potential today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary">
              Create Free Account
              <Users className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/tfsa/drip-calculator" className="btn-secondary">
              Try Calculator First
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}