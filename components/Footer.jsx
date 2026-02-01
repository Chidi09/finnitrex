"use client";

import FinnitrexLogo from "@/components/FinnitrexLogo";
import {
  ShieldCheck,
  Lock,
  Globe,
  ArrowUpRight,
  MapPin,
  Phone,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 pt-16 pb-32 md:pb-16 text-xs md:text-sm font-mono relative overflow-hidden">
      {/* Background Grid Decoration */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#bef264 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Status */}
          <div className="space-y-4">
            <div className="-ml-2">
              <FinnitrexLogo className="w-12 h-12" />
            </div>
            <p className="text-gray-500 leading-relaxed max-w-xs mt-4">
              Advanced AI, Optics, and LMS Solutions.
              <br />
              Established UK Limited Company.
            </p>
            <div className="flex items-center gap-2 text-lime-400 bg-lime-950/20 px-3 py-1 rounded border border-lime-900 w-fit">
              <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
              OPERATIONAL
            </div>
          </div>

          {/* Column 2: Compliance */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2 border-b border-gray-800 pb-2">
              Compliance Protocols
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Globe size={14} className="text-lime-500" />
                <span>Global Talent Visa Route</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock size={14} className="text-gray-500" />
                <Link
                  href="/privacy"
                  className="hover:text-lime-400 transition-colors"
                >
                  GDPR / Privacy Policy
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <FileText size={14} className="text-gray-500" />
                <Link
                  href="/cookie-policy"
                  className="hover:text-lime-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <FileText size={14} className="text-gray-500" />
                <Link
                  href="/terms"
                  className="hover:text-lime-400 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sitemap */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2 border-b border-gray-800 pb-2">
              Navigation Node
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-1"
                >
                  About Us <ArrowUpRight size={10} />
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-1"
                >
                  Get Quote <ArrowUpRight size={10} />
                </Link>
              </li>
              <li>
                <Link
                  href="/software"
                  className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-1"
                >
                  LMS & Software <ArrowUpRight size={10} />
                </Link>
              </li>
              <li>
                <Link
                  href="/fintech"
                  className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  Data Analytics <ArrowUpRight size={10} />
                </Link>
              </li>
              <li>
                <Link
                  href="/robotics"
                  className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-1"
                >
                  Future Labs <ArrowUpRight size={10} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Legal (UPDATED) */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2 border-b border-gray-800 pb-2">
              Registered Entity
            </h3>

            {/* New Address & Phone */}
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-lime-500 mt-0.5 shrink-0" />
                <span>
                  483 Green Lanes
                  <br />
                  London, N13 4BS
                  <br />
                  United Kingdom
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-lime-500 shrink-0" />
                <span>+44 7521 511800</span>
              </div>
            </div>

            <div className="text-[10px] text-gray-600 mt-6 pt-4 border-t border-gray-900">
              Trading as: Finnitrex
              <br />
              Associated Entities: Axora, Fintrix
              <br />© {new Date().getFullYear()} Finnitrex Solutions Ltd.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
