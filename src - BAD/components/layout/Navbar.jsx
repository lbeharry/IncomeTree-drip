import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TrendingUp, Menu, X, User, LogOut, LayoutDashboard as DashboardIcon } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { currentUser, logout } = useAuth() // Changed from 'user' to 'currentUser'
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout() // Firebase logout is async
      navigate('/')
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  const isActive = (path) => location.pathname === path

  // Get user display name for Firebase
  const getUserDisplayName = () => {
    if (!currentUser) return ''
    return currentUser.displayName || currentUser.email?.split('@')[0] || 'User'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="p-2 bg-primary-500/20 rounded-lg group-hover:bg-primary-500/30 transition-colors">
              <TrendingUp className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">Incometry</span>
              <p className="text-xs text-slate-400 hidden sm:block">Canadian Financial Planning</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Creating Sustainable Long Term Income */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('income')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Creating Sustainable Income
              </button>
              
              {activeDropdown === 'income' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-slate-800/95 backdrop-blur-lg border border-slate-700 rounded-lg shadow-xl py-2">
                  <div className="px-4 py-2 border-b border-slate-700">
                    <h3 className="text-sm font-semibold text-white">TFSA Strategies</h3>
                  </div>
                  <Link
                    to="/tfsa/drip-calculator"
                    className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                    onClick={closeMenu}
                  >
                    <div>
                      <div className="font-medium">DRIP Calculator</div>
                      <div className="text-xs text-slate-400">Dividend Reinvestment Planning</div>
                    </div>
                  </Link>
                  <Link
                    to="/tfsa/guide"
                    className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                    onClick={closeMenu}
                  >
                    <div>
                      <div className="font-medium">TFSA Investment Guide</div>
                      <div className="text-xs text-slate-400">2025 Strategies & Limits</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Saving Money */}
            <Link
              to="/saving-money"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/saving-money') 
                  ? 'text-primary-400' 
                  : 'text-slate-300 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              Saving Money
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('user')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-2 text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  <User className="w-4 h-4" />
                  {getUserDisplayName()}
                </button>
                
                {activeDropdown === 'user' && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-slate-800/95 backdrop-blur-lg border border-slate-700 rounded-lg shadow-xl py-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                      onClick={closeMenu}
                    >
                      <DashboardIcon className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-700 py-4">
            <div className="space-y-2">
              {/* Income Section */}
              <div>
                <div className="px-3 py-2 text-sm font-semibold text-slate-400">
                  Creating Sustainable Income
                </div>
                <div className="ml-4 space-y-1">
                  <div className="px-3 py-1 text-xs font-medium text-slate-500">TFSA Strategies</div>
                  <Link
                    to="/tfsa/drip-calculator"
                    className={`block px-6 py-2 text-sm transition-colors ${
                      isActive('/tfsa/drip-calculator') 
                        ? 'text-primary-400 bg-primary-500/10' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                    onClick={closeMenu}
                  >
                    DRIP Calculator
                  </Link>
                  <Link
                    to="/tfsa/guide"
                    className={`block px-6 py-2 text-sm transition-colors ${
                      isActive('/tfsa/guide') 
                        ? 'text-primary-400 bg-primary-500/10' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                    onClick={closeMenu}
                  >
                    TFSA Investment Guide
                  </Link>
                </div>
              </div>

              {/* Saving Money */}
              <Link
                to="/saving-money"
                className={`block px-3 py-2 text-sm transition-colors ${
                  isActive('/saving-money') 
                    ? 'text-primary-400 bg-primary-500/10' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
                onClick={closeMenu}
              >
                Saving Money
              </Link>

              {/* User Section */}
              {currentUser ? (
                <div className="border-t border-slate-700 pt-4 mt-4">
                  <div className="px-3 py-2 text-sm font-semibold text-slate-400">
                    Welcome, {getUserDisplayName()}
                  </div>
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                      isActive('/dashboard') 
                        ? 'text-primary-400 bg-primary-500/10' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                    onClick={closeMenu}
                  >
                    <DashboardIcon className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-slate-700 pt-4 mt-4 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block mx-3 btn-primary text-sm text-center"
                    onClick={closeMenu}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}