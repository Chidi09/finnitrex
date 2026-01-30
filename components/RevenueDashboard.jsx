"use client";

import { useState, useEffect, useRef } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  BarChart3,
  AlertTriangle,
  Shield,
  Eye,
  EyeOff
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const COLORS = ['#bef264', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

export default function RevenueDashboard() {
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScreenshot, setShowScreenshot] = useState(false);
  const dashboardRef = useRef(null);

  useEffect(() => {
    fetchRevenueData();
    
    // ⚠️ VISUAL EFFECT ONLY - NOT A SECURITY FEATURE ⚠️
    // Screenshot detection is purely cosmetic and does NOT provide real security.
    // It only detects keyboard shortcuts while the browser window is focused.
    // It CANNOT detect:
    // - OS-level screenshots (Windows Snipping Tool, macOS Screenshot, etc.)
    // - External screenshot tools
    // - Screen recording software
    // - Mobile device screenshots
    // - Screenshots taken when browser window is not focused
    //
    // REMOVED: DevTools detection loop (setInterval every 500ms)
    // Reason: Causes false positives (browser extensions, vertical tabs, etc.)
    // and creates unnecessary performance overhead.
    //
    // REMOVED: Right-click prevention
    // Reason: Poor UX - users expect context menu functionality
    //
    // If data is truly confidential, do not send it to the client at all.
    // Use proper server-side authorization instead.
    const handleKeyDown = (e) => {
      // Optional: Visual effect for keyboard shortcuts only (not security)
      if (e.key === 'PrintScreen' || 
          (e.ctrlKey && e.shiftKey && e.key === 'S') ||
          (e.metaKey && e.shiftKey && e.key === '4')) {
        // Don't prevent default - let the screenshot happen
        // Just show visual effect for awareness
        setShowScreenshot(true);
        setTimeout(() => setShowScreenshot(false), 2000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchRevenueData = async () => {
    try {
      const res = await fetch("/api/admin/revenue");
      if (res.ok) {
        const data = await res.json();
        setRevenueData(data);
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center">
        <div className="text-lime-400 font-mono">LOADING REVENUE DATA...</div>
      </div>
    );
  }

  if (!revenueData) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center">
        <div className="text-red-400 font-mono">ERROR LOADING DATA</div>
      </div>
    );
  }

  const {
    totalRevenue,
    totalProfit,
    totalCosts,
    profitBreakdown,
    monthlyRevenue,
    categoryBreakdown,
    profitAllocation
  } = revenueData;

  // Profit allocation data for pie chart
  const profitAllocationData = [
    { name: 'Operations', value: profitAllocation.operations, color: '#bef264' },
    { name: 'Development', value: profitAllocation.development, color: '#10b981' },
    { name: 'Marketing', value: profitAllocation.marketing, color: '#3b82f6' },
    { name: 'Reserves', value: profitAllocation.reserves, color: '#8b5cf6' },
    { name: 'Team', value: profitAllocation.team, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6" ref={dashboardRef}>
      {/* Screenshot Protection Overlay */}
      {showScreenshot && (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
          <div className="text-center p-8">
            <Shield className="w-24 h-24 text-lime-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-white mb-2">PROTECTED CONTENT</h2>
            <p className="text-gray-400 text-lg">Revenue data is confidential</p>
            <div className="mt-8 bg-gray-900 border border-lime-500/30 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-lime-400 font-mono text-sm mb-4">FINNITREX REVENUE REPORT</div>
              <div className="text-white text-2xl font-bold mb-2">£{totalRevenue.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Total Revenue (Confidential)</div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500">
                  This is a protected screenshot. Actual data is available only to authorized personnel.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm font-mono">TOTAL REVENUE</span>
            <DollarSign className="text-lime-400" size={20} />
          </div>
          <div className="text-3xl font-bold text-white font-mono">£{totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">All time</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm font-mono">NET PROFIT</span>
            <TrendingUp className="text-emerald-400" size={20} />
          </div>
          <div className="text-3xl font-bold text-emerald-400 font-mono">£{totalProfit.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">
            {((totalProfit / totalRevenue) * 100).toFixed(1)}% margin
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm font-mono">TOTAL COSTS</span>
            <PieChart className="text-blue-400" size={20} />
          </div>
          <div className="text-3xl font-bold text-blue-400 font-mono">£{totalCosts.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Operating expenses</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm font-mono">ACTIVE PROJECTS</span>
            <BarChart3 className="text-purple-400" size={20} />
          </div>
          <div className="text-3xl font-bold text-purple-400 font-mono">
            {revenueData.activeProjects || 0}
          </div>
          <div className="text-xs text-gray-500 mt-1">In pipeline</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="text-lime-400" size={20} />
            Monthly Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#bef264' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#bef264" 
                strokeWidth={2}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Allocation Pie Chart */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <PieChart className="text-emerald-400" size={20} />
            Profit Allocation
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={profitAllocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {profitAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="text-blue-400" size={20} />
          Revenue by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryBreakdown}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="category" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#bef264' }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#bef264" name="Revenue" />
            <Bar dataKey="profit" fill="#10b981" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Profit Breakdown */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Profit Breakdown & Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(profitBreakdown).map(([category, amount]) => (
            <div key={category} className="bg-black/40 border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-semibold capitalize">{category.replace('_', ' ')}</span>
                <span className="text-lime-400 font-mono font-bold">£{amount.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-lime-500 h-2 rounded-full transition-all"
                  style={{ width: `${(amount / totalProfit) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {((amount / totalProfit) * 100).toFixed(1)}% of total profit
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profit Allocation Details */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">How Profits Are Used</h3>
        <div className="space-y-4">
          {profitAllocationData.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between p-4 bg-black/40 border border-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div>
                  <div className="text-white font-semibold">{item.name}</div>
                  <div className="text-xs text-gray-400">
                    {profitAllocation[item.name.toLowerCase()] ? 
                      `£${profitAllocation[item.name.toLowerCase()].toLocaleString()}` : 
                      '£0'
                    }
                  </div>
                </div>
              </div>
              <div className="text-lime-400 font-mono font-bold">
                {((item.value / totalProfit) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
