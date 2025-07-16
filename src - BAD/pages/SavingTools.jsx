import { Helmet } from 'react-helmet-async';

export default function SavingTools() {
  return (
   <>
<Helmet>
  <title>IncomeTree | Canadian Financial Independence Tools</title>
  <meta name="description" content="Plan your TFSA and dividend income with IncomeTree. Built for Canadians seeking early retirement through smart investing." />
  <meta property="og:title" content="IncomeTree | Canadian Financial Independence Tools" />
  <meta property="og:description" content="Plan your TFSA and dividend income with IncomeTree. Built for Canadians seeking early retirement through smart investing." />
  <meta property="og:image" content="/assets/incometree_logo_final_gold_highres.png" />
</Helmet>
 <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-400">🛒 Money-Saving Tools</h1>
      <p className="text-gray-300 mt-4">Grocery tracker and other savings tools will appear here soon.</p>
    </div>
</>
  );
}
