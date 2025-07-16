import { Link } from 'react-router-dom';
import logo from '/assets/incometree_logo_final_gold_highres.png';
import { Helmet } from 'react-helmet-async';


export default function HomePage() {
  return (
    <>
<Helmet>
  <title>IncomeTree | Financial Freedom for Canadians</title>
  <meta name="description" content="Plan your TFSA and dividend income with the IncomeTree DRIP calculator. Designed for Canadians seeking financial independence." />
  <meta property="og:title" content="IncomeTree | Financial Freedom for Canadians" />
  <meta property="og:description" content="Use our DRIP calculator and income planning tools to reach your retirement goals." />
  <meta property="og:image" content="/assets/incometree_logo_final_gold_highres.png" />
</Helmet>
</>
<div className="min-h-screen bg-black text-white font-sans">
      <header className="flex flex-col items-center py-8">
        <img src={logo} alt="IncomeTree Logo" className="w-48 h-auto mb-4" />
        <h1 className="text-3xl font-bold tracking-wide text-yellow-400">Welcome to IncomeTree.ca</h1>
        <p className="text-gray-300 mt-2">Your Canadian Financial Independence Toolkit</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-16 py-12">
        <Link
          to="/income-tools"
          className="bg-slate-850 border border-yellow-500 rounded-xl p-6 hover:bg-slate-950 transition-colors shadow-lg"
        >
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">💰 Income Tools</h2>
          <p className="text-gray-400">Explore our DRIP calculator and TFSA modeling tools to grow your future income.</p>
        </Link>

        <Link
          to="/saving-tools"
          className="bg-slate-850 border border-yellow-500 rounded-xl p-6 hover:bg-slate-950 transition-colors shadow-lg"
        >
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">🛒 Money-Saving Tools</h2>
          <p className="text-gray-400">Compare grocery prices, track expenses, and optimize your monthly savings.</p>
        </Link>
      </main>
    </div>
  );
}
