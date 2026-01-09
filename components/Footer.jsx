"use client";

import { ShieldCheck, Lock, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import FinnitrexLogo from "@/components/FinnitrexLogo";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 pt-16 pb-32 md:pb-16 text-xs md:text-sm font-mono relative overflow-hidden">
      
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Status */}
          <div className="space-y-4">
            <div className="-ml-2">
              <FinnitrexLogo className="w-12 h-12" textVisible={false} />
            </div>
            <p className="text-gray-500 leading-relaxed max-w-xs mt-4">
              Advanced AI, Optics, and LMS Solutions.
              <br/>
              Established UK Limited Company.
            </p>
            <div className="flex items-center gap-2 text-green-500 bg-green-950/20 px-3 py-1 rounded border border-green-900 w-fit">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              OPERATIONAL
            </div>
          </div>

          {/* Column 2: Compliance (From Proposal) */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2 border-b border-gray-800 pb-2">Compliance Protocols</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-cyan-500" />
                <span>UK Sponsor Licence: <span className="text-yellow-500">PENDING</span></span>
              </li>
              <li className="flex items-center gap-2">
                <Globe size={14} className="text-purple-500" />
                <span>Global Talent Visa Route</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock size={14} className="text-gray-500" />
                <span>GDPR / Data Fortified</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Sitemap */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2 border-b border-gray-800 pb-2">Navigation Node</h3>
            <ul className="space-y-2">
              <li><Link href="/lms" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1">Software Solutions <ArrowUpRight size={10}/></Link></li>
              <li><Link href="/fintech" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1">Data Analytics <ArrowUpRight size={10}/></Link></li>
              <li><Link href="/robotics" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1">Future Labs <ArrowUpRight size={10}/></Link></li>
            </ul>
          </div>

          {/* Column 4: Legal / Registered Info */}
          <div className="space-y-4">
             <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2 border-b border-gray-800 pb-2">Registered Entity</h3>
             <p className="text-gray-500">
               Trading as: Finnitrex<br/>
               Associated Entities: Axora, Fintrix<br/>
               London, United Kingdom
             </p>
             <div className="text-[10px] text-gray-600 mt-4">
               © {new Date().getFullYear()} Finnitrex Solutions Ltd.<br/>
               All rights reserved.
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
