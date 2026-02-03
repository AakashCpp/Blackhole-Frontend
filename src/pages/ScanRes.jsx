import React from "react";

const ScanRes = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Security Scan Report</h1>
            <p className="text-sm text-slate-500">
              Target: <span className="font-medium">https://openai.com</span>{" "}
              (IP: 172.64.154.211)
            </p>
          </div>
          <div className="text-sm text-slate-500 md:text-right">
            <p>Completed: 2026-01-29 22:13:42</p>
            <p>Duration: 97.3 seconds</p>
          </div>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <OverviewCard title="Overall Security Grade">
            <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
              B
            </div>
          </OverviewCard>

          <OverviewCard title="Risk Score (Lower is better)">
            <div className="text-3xl font-bold text-yellow-500">26 / 100</div>
          </OverviewCard>

          <OverviewCard title="Total Vulnerabilities Found">
            <div className="text-3xl font-bold">6</div>
          </OverviewCard>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Open Ports */}
            <Card title="🌐 Open Ports & Services">
              <p className="mb-4 text-sm text-slate-600">
                Scanned 24 ports. Found 2 open ports.
              </p>
              <Table
                headers={["Port", "Service", "Risk", "Details"]}
                rows={[
                  [
                    "80",
                    "HTTP",
                    <Badge color="green">Low</Badge>,
                    "Cloudflare / HTTP 400",
                  ],
                  [
                    "443",
                    "HTTPS",
                    <Badge color="green">Low</Badge>,
                    "TLS enabled",
                  ],
                ]}
              />
            </Card>

            {/* SSL */}
            <Card title="🔒 SSL / TLS Configuration">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-400 text-slate-800 flex items-center justify-center font-bold">
                  C
                </div>
                <div>
                  <p className="font-semibold">SSL Grade: C</p>
                  <p className="text-sm text-slate-500">
                    Valid certificate present
                  </p>
                </div>
              </div>

              <InfoList
                items={[
                  ["Version", "TLSv1.3"],
                  ["Issuer", "WE1"],
                  ["Expires", "2026-04-23 (83 days)"],
                ]}
              />
            </Card>

            {/* Tech Stack */}
            <Card title="🛠️ Technology Stack Detected">
              <div className="flex flex-wrap gap-2">
                <TechBadge label="Cloudflare" desc="Web Server / CDN" />
                <TechBadge highlight label="WordPress" desc="Primary CMS" />
                <TechBadge faded label="Joomla" desc="Path Hint" />
                <TechBadge faded label="Drupal" desc="Path Hint" />
                <TechBadge faded label="Magento" desc="Path Hint" />
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Headers */}
            <Card
              title={
                <div className="flex justify-between items-center">
                  <span>🛡️ HTTP Security Headers</span>
                  <Badge color="cyan">Grade: B</Badge>
                </div>
              }
            >
              <p className="mb-4 text-sm text-slate-600">Score: 73 / 100</p>

              <Alert type="danger" title="Content-Security-Policy">
                Prevents XSS & injection attacks (Missing)
              </Alert>

              <Alert type="success" title="HSTS">
                max-age=31536000; includeSubDomains; preload
              </Alert>

              <Alert type="success" title="X-Frame-Options">
                SAMEORIGIN
              </Alert>

              <Alert type="warning" title="Server Header Found">
                Reveals server software: cloudflare
              </Alert>
            </Card>

            {/* Sensitive Files */}
            <Card title="⚠️ Vulnerabilities & Sensitive Files">
              <Table
                headers={["Path", "Status", "Risk"]}
                rows={[
                  [
                    "/robots.txt",
                    "200 OK",
                    <Badge color="yellow">Medium</Badge>,
                  ],
                  [
                    "/sitemap.xml",
                    "200 OK",
                    <Badge color="yellow">Medium</Badge>,
                  ],
                ]}
              />
            </Card>

            {/* Directory Enumeration */}
            <Card title="📂 Directory Enumeration">
              <div className="max-h-64 overflow-y-auto border rounded-md divide-y text-sm font-mono">
                {[
                  "/administrator",
                  "/wp-admin",
                  "/login",
                  "/api/v1",
                  "/.env",
                  "/.git",
                  "/config",
                  "/backup",
                ].map((path) => (
                  <div key={path} className="p-2 flex gap-2">
                    <span className="text-yellow-500">403</span>
                    <span>{path}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-slate-500 pt-6">
          Generated by Automated Security Scanner. Informational only.
        </footer>
      </div>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-5">
    <div className="font-semibold mb-4">{title}</div>
    {children}
  </div>
);

const OverviewCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-6 text-center space-y-3">
    {children}
    <p className="text-slate-500">{title}</p>
  </div>
);

const Badge = ({ children, color }) => {
  const colors = {
    green: "bg-green-500",
    yellow: "bg-yellow-400 text-slate-800",
    cyan: "bg-cyan-500",
    red: "bg-red-500",
  };
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold text-white ${colors[color]}`}
    >
      {children}
    </span>
  );
};

const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="bg-slate-50 text-slate-500">
        <tr>
          {headers.map((h) => (
            <th key={h} className="p-2 text-left">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t">
            {row.map((cell, j) => (
              <td key={j} className="p-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InfoList = ({ items }) => (
  <ul className="divide-y text-sm">
    {items.map(([k, v]) => (
      <li key={k} className="py-2 flex justify-between">
        <span className="font-medium">{k}</span>
        <span className="text-slate-500">{v}</span>
      </li>
    ))}
  </ul>
);

const Alert = ({ title, children, type }) => {
  const styles = {
    success: "bg-green-50 border-green-400",
    warning: "bg-yellow-50 border-yellow-400",
    danger: "bg-red-50 border-red-400",
  };
  return (
    <div className={`border-l-4 p-3 mb-3 ${styles[type]}`}>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-slate-600">{children}</p>
    </div>
  );
};

const TechBadge = ({ label, desc, highlight, faded }) => (
  <span
    className={`px-3 py-1 rounded-full text-sm bg-slate-200 ${
      highlight ? "border border-cyan-500" : ""
    } ${faded ? "opacity-60" : ""}`}
  >
    {label} <span className="text-xs text-slate-500">({desc})</span>
  </span>
);

export default ScanRes;
