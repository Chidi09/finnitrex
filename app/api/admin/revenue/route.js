import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET() {
  try {
    const revenueData = await db.getRevenueData();
    
    // Calculate totals
    let totalRevenue = 0;
    let totalCosts = 0;
    const monthlyRevenueMap = new Map();
    const categoryMap = new Map();

    // Process accepted quotes
    revenueData.quotes.forEach(quote => {
      const amount = parseFloat(quote.final_total || quote.total || 0);
      totalRevenue += amount;
      
      const date = new Date(quote.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
      
      if (!monthlyRevenueMap.has(monthKey)) {
        monthlyRevenueMap.set(monthKey, { month: monthName, revenue: 0, profit: 0 });
      }
      const monthData = monthlyRevenueMap.get(monthKey);
      monthData.revenue += amount;
      // ⚠️ TODO: Hardcoded profit margin (65%) - this should be calculated from actual costs
      // Ideally, store the cost snapshot when the quote is saved, then calculate profit as revenue - cost
      // Current approach: If pricing changes in pricingConfig.js, historical profit data becomes inaccurate
      monthData.profit += amount * 0.65; // 65% profit margin estimate
    });

    // Process paid projects
    revenueData.projects.forEach(project => {
      const deposit = parseFloat(project.deposit_amount?.replace(/[£,]/g, '') || 0);
      totalRevenue += deposit;
      
      const date = new Date(project.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
      
      if (!monthlyRevenueMap.has(monthKey)) {
        monthlyRevenueMap.set(monthKey, { month: monthName, revenue: 0, profit: 0 });
      }
      const monthData = monthlyRevenueMap.get(monthKey);
      monthData.revenue += deposit;
      // ⚠️ TODO: Hardcoded profit margin - see comment above
      monthData.profit += deposit * 0.65;
    });

    // Calculate costs (35% of revenue as operating costs)
    totalCosts = totalRevenue * 0.35;
    const totalProfit = totalRevenue - totalCosts;

    // Profit breakdown
    const profitBreakdown = {
      development: totalProfit * 0.30,      // 30% to development
      operations: totalProfit * 0.25,        // 25% to operations
      marketing: totalProfit * 0.20,        // 20% to marketing
      team: totalProfit * 0.15,             // 15% to team
      reserves: totalProfit * 0.10,          // 10% to reserves
    };

    // Category breakdown
    const categoryBreakdown = [
      { category: 'Web Development', revenue: totalRevenue * 0.40, profit: totalRevenue * 0.26 },
      { category: 'LMS Platforms', revenue: totalRevenue * 0.30, profit: totalRevenue * 0.195 },
      { category: 'AI Integration', revenue: totalRevenue * 0.20, profit: totalRevenue * 0.13 },
      { category: 'Data Analytics', revenue: totalRevenue * 0.10, profit: totalRevenue * 0.065 },
    ];

    // Profit allocation
    const profitAllocation = {
      operations: profitBreakdown.operations,
      development: profitBreakdown.development,
      marketing: profitBreakdown.marketing,
      reserves: profitBreakdown.reserves,
      team: profitBreakdown.team,
    };

    // Convert monthly map to array
    const monthlyRevenue = Array.from(monthlyRevenueMap.values())
      .sort((a, b) => a.month.localeCompare(b.month));

    return NextResponse.json({
      totalRevenue: Math.round(totalRevenue),
      totalProfit: Math.round(totalProfit),
      totalCosts: Math.round(totalCosts),
      profitBreakdown: Object.fromEntries(
        Object.entries(profitBreakdown).map(([k, v]) => [k, Math.round(v)])
      ),
      monthlyRevenue: monthlyRevenue.map(m => ({
        ...m,
        revenue: Math.round(m.revenue),
        profit: Math.round(m.profit)
      })),
      categoryBreakdown: categoryBreakdown.map(c => ({
        ...c,
        revenue: Math.round(c.revenue),
        profit: Math.round(c.profit)
      })),
      profitAllocation: Object.fromEntries(
        Object.entries(profitAllocation).map(([k, v]) => [k, Math.round(v)])
      ),
      activeProjects: revenueData.projects.length,
    });
  } catch (error) {
    console.error("Revenue Calculation Error:", error);
    return NextResponse.json(
      { error: "Failed to calculate revenue" },
      { status: 500 }
    );
  }
}
