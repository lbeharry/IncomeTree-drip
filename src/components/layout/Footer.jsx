import { Link } from 'react-router-dom'
import { TrendingUp, Mail, Shield, FileText, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">IncomeTree</h3>
                <p className="text-sm text-slate-400">Canadian Financial Planning</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4 max-w-md">
              Empowering Canadians to build sustainable retirement income through proven TFSA investment strategies, 
              DRIP calculations, and comprehensive financial planning tools.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Mail className="w-4 h-4" />
              <span>Contact@IncomeTree.ca</span>
            </div>
          </div>

          {/* Calculator Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">Calculator Tools</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/tfsa/drip-calculator" className="hover:text-primary-400 transition-colors">
                  DRIP Calculator
                </Link>
              </li>
              <li>
                <Link to="/tfsa/guide" className="hover:text-primary-400 transition-colors">
                  TFSA Investment Guide
                </Link>
              </li>
              <li>
                <Link to="/saving-money" className="hover:text-primary-400 transition-colors">
                  Saving Strategies
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary-400 transition-colors">
                  Portfolio Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a 
                  href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary-400 transition-colors"
                >
                  CRA TFSA Information
                </a>
              </li>
              <li>
                <Link to="/investment-strategies" className="hover:text-primary-400 transition-colors">
                  Investment Strategies
                </Link>
              </li>
              <li>
                <Link to="/retirement-planning" className="hover:text-primary-400 transition-colors">
                  Retirement Planning
                </Link>
              </li>
              <li>
                <Link to="/dividend-investing" className="hover:text-primary-400 transition-colors">
                  Dividend Investing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="bg-slate-800/30 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-white font-medium">Important Legal Disclaimer</h4>
            </div>
            <div className="text-sm text-slate-400 space-y-2 leading-relaxed">
              <p>
                <strong className="text-slate-300">Educational Tool Only:</strong> This calculator provides hypothetical projections for educational and planning purposes. 
                All calculations are estimates based on inputs provided. Past performance does not guarantee future results.
              </p>
              <p>
                <strong className="text-slate-300">Investment Risk:</strong> All investments carry risk of loss including potential loss of principal. 
                Dividend payments are not guaranteed and can be reduced or eliminated.
              </p>
              <p>
                <strong className="text-slate-300">Professional Advice Required:</strong> This tool does not constitute financial, investment, tax, or legal advice. 
                Always consult qualified professionals before making investment decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500">
              © {currentYear} IncomeTree. Built with{' '}
              <Heart className="w-4 h-4 inline text-red-400" />{' '}
              for Canadian investors.
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link to="/privacy" className="hover:text-slate-400 transition-colors flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-slate-400 transition-colors flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="hover:text-slate-400 transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}