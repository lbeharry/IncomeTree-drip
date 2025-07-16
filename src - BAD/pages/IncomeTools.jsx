import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function IncomeTools() {
  return (
    <>
      <Helmet>
        <title>IncomeTree | Canadian Financial Independence Tools</title>
        <meta
          name="description"
          content="Plan your TFSA and dividend income with IncomeTree. Built for Canadians seeking early retirement through smart investing."
        />
        <meta property="og:title" content="IncomeTree | Canadian Financial Independence Tools" />
        <meta
          property="og:description"
          content="Plan your TFSA and dividend income with IncomeTree. Built for Canadians seeking early retirement through smart investing."
        />
        <meta property="og:image" content="/assets/incometree_logo_final_gold_highres.png" />
      </Helmet>

      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">💰 Income Tools</h1>
        <p className="text-gray-300 mb-8">
          Plan your dividend income, TFSA optimization, and long-term passive income strategies.
        </p>

        <div className="bg-slate-850 border border-yellow-500 rounded-xl p-6 shadow-lg max-w-xl">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">📈 DRIP Calculator</h2>
          <p className="text-gray-400 mb-4">
            Use our professional-grade DRIP and TFSA modeling calculator to forecast your dividend income.
          </p>
          <Link
            to="/tfsa/drip-calculator"
            className="inline-block px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition-colors"
          >
            Launch DRIP Calculator
          </Link>
        </div>
      </div>
    </>
  );
}
