import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calculator,
  TrendingUp,
  Shield,
  DollarSign,
  Calendar,
  AlertTriangle,
  Target
} from 'lucide-react';

export default function TFSAGuide() {
  const investmentStrategies = [
    {
      name: "Conservative Income Strategy",
      riskLevel: "Low",
      targetYield: "4-5%",
      allocation: {
        "Canadian Big Banks": 40,
        "Utilities & Infrastructure": 30,
        "Telecom & Consumer Staples": 20,
        "REITs": 10
      },
      examples: ["RY.TO", "TD.TO", "FTS.TO", "ENB.TO", "BCE.TO"],
      bestFor: "Investors 10+ years from retirement seeking steady income"
    },
    {
      name: "Growth-Focused Strategy",
      riskLevel: "Moderate",
      targetYield: "3-4%",
      allocation: {
        "Canadian Growth Dividend Stocks": 30,
        "Technology & Innovation": 25,
        "US Dividend Aristocrats (ETFs)": 25,
        "Emerging Dividend Growers": 20
      },
      examples: ["COST", "MSFT", "VIG", "QYLD"],
      bestFor: "Investors with moderate risk appetite looking for long-term growth"
    }
  ];

  return (
    <>
      <Helmet>
        <title>TFSA Investment Guide | Incometry</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Complete TFSA Investment Guide 2025
          </h1>
          <p className="text-gray-300 text-lg">
            Learn how to invest your TFSA for maximum long-term income and tax-free growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {investmentStrategies.map((strategy, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {strategy.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Risk Level: {strategy.riskLevel} | Target Yield: {strategy.targetYield}
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-200 list-disc list-inside">
                {Object.entries(strategy.allocation).map(([sector, percent], i) => (
                  <li key={i}>
                    {sector}: {percent}%
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Best for: {strategy.bestFor}
              </p>
              <div className="text-xs text-gray-400">
                Examples: {strategy.examples.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
