import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0b0c0f] text-zinc-400 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-white text-2xl font-semibold tracking-wide">
              Blackhole
            </h2>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              Blackhole is an advanced threat detection and neutralization
              platform designed to monitor, analyze, and block malicious
              activity in real time.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Dashboard</li>
              <li className="hover:text-white cursor-pointer">Live Scan</li>
              <li className="hover:text-white cursor-pointer">Threat Radar</li>
              <li className="hover:text-white cursor-pointer">API Access</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Documentation</li>
              <li className="hover:text-white cursor-pointer">
                Security Guide
              </li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Changelog</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">Press</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 my-12" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            © {new Date().getFullYear()} Blackhole Security. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer">
              Responsible Disclosure
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
