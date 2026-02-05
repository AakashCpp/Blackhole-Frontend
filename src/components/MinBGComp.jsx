import { useEffect, useRef, useState } from "react";

const COMMANDS = [
  // basic
  "whoami",
  "cat /etc/passwd",
  "tail -f /var/log/auth.log",
  "netstat -tulnp",
  "tcpdump -i eth0",

  // recon / scanning (BIG COMMANDS)
  "nmap -p- -sS -sV -sC -O --script vuln -T4 --open 172.64.154.211 -oA full_tcp_scan",
  "masscan 172.64.154.0/24 -p1-65535 --rate=10000 --wait=0",
  "amass enum -active -d target.com -brute -w subdomains.txt -o amass.out",

  // web enumeration
  "gobuster dir -u https://target.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,js,json,env,zip,log -t 50",
  "ffuf -u https://target.com/FUZZ -w common.txt -mc 200,301,302 -fs 403 -t 40",
  "nikto -h https://target.com -ssl -Tuning x 6",

  // sql injection / web attack
  'sqlmap -u "https://target.com/login.php" --data="user=admin&pass=test" --risk=3 --level=5 --batch --dbs --threads=10',
  "sqlmap -r request.txt --level=5 --risk=3 --dump-all --batch",

  // brute force / auth
  "hydra -L users.txt -P passwords.txt ssh://172.64.154.211 -t 16 -V -f",
  "crackmapexec smb 192.168.1.0/24 -u admin -p 'Password123' --shares --sessions",

  // exploitation (movie-feel, bg only 😈)
  'msfconsole -q -x "use exploit/multi/http/struts2_content_type_ognl; set RHOSTS target.com; set RPORT 443; set SSL true; run"',
  "python3 exploit.py --target https://target.com --payload reverse_https --lhost 10.10.14.23 --lport 4444",

  // logs / forensics
  'journalctl -u ssh.service --since "2 hours ago" --no-pager',
  'grep -R "password" /var/www/html --line-number',
  "tcpdump -i eth0 -nn -X 'tcp port 443'",

  // misc scary-looking
  'curl -X POST https://api.target.com/auth -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"',
];

const OUTPUTS = [
  "[+] Scanning open ports...",
  "[+] 22/tcp open ssh",
  "[+] 80/tcp open http",
  "[+] 443/tcp open https",
  "[!] Warning: rate limiting detected",
  "[+] Login attempt failed for user admin",
  "[+] Access denied",
  "[+] Hash extracted: $2y$10$...",
  "[+] Exploit loaded successfully",
  "[+] Payload delivered",
  "[✔] Operation completed",
];

const CENTER = 50;
const SPEED = 5; // radar speed
const HIT_WINDOW = 6; // angle tolerance
const BLINK_TIME = 1200; // ms

// random bugs
const bugs = Array.from({ length: 30 }).map(() => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  const dx = x - CENTER;
  const dy = CENTER - y;

  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  if (angle < 0) angle += 360;

  return {
    x,
    y,
    angle,
    size: Math.random() * 4 + 2,
  };
});
// random bug dots
const bugss = Array.from({ length: 30 }).map(() => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  const dx = x - CENTER;
  const dy = CENTER - y;

  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  if (angle < 0) angle += 360;

  return {
    x,
    y,
    angle,
    size: Math.random() * 4 + 2,
    severity: ["low", "medium", "critical"][Math.floor(Math.random() * 3)],
  };
});

const colorMap = {
  low: "bg-green-400",
  medium: "bg-yellow-400",
  critical: "bg-red-500",
};

export const HackerBackground = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const letters =
      "01{}[]();<>/\\|=+-_#@$%&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);

    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff88"; // hacker green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export const HackerCLIBg = ({ children }) => {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => {
        const newLine =
          Math.random() > 0.4
            ? `$ ${COMMANDS[Math.floor(Math.random() * COMMANDS.length)]}`
            : OUTPUTS[Math.floor(Math.random() * OUTPUTS.length)];

        const updated = [...prev, newLine];
        return updated.slice(-60); // keep screen light
      });

      // auto scroll
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* CLI Background */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 p-4 font-mono text-sm text-green-400 overflow-hidden"
      >
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line}
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Foreground content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export const ThreatRadar = () => {
  return (
    <div className="relative w-full h-full rounded-full bg-black overflow-hidden border border-green-500">
      {/* Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,255,0,0.15)_1px,transparent_1px)] bg-size-[20px_20px]" />

      {/* Scan line */}
      <div className="absolute inset-0 animate-radar-sweep">
        <div className="w-full h-1 bg-linear-to-r from-transparent via-green-400 to-transparent opacity-60" />
      </div>

      {/* Bug dots */}
      {bugss.map((bug, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-blink ${colorMap[bug.severity]}`}
          style={{
            left: `${bug.x}%`,
            top: `${bug.y}%`,
            width: bug.size,
            height: bug.size,
          }}
        />
      ))}
    </div>
  );
};

export const CThreatRadar = () => {
  const [scanAngle, setScanAngle] = useState(0);
  const [activeDots, setActiveDots] = useState({});
  const hitRegistry = useRef(new Set());

  // rotate radar
  useEffect(() => {
    const interval = setInterval(() => {
      setScanAngle((prev) => {
        const next = (prev + SPEED) % 360;

        // reset after full rotation
        if (next < prev) {
          hitRegistry.current.clear();
        }

        return next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // detect hits
  useEffect(() => {
    bugs.forEach((bug, i) => {
      const diff = Math.abs(scanAngle - bug.angle);
      const isHit = diff < HIT_WINDOW || diff > 360 - HIT_WINDOW;

      if (isHit && !hitRegistry.current.has(i)) {
        hitRegistry.current.add(i);

        setActiveDots((prev) => ({ ...prev, [i]: true }));

        setTimeout(() => {
          setActiveDots((prev) => {
            const copy = { ...prev };
            delete copy[i];
            return copy;
          });
        }, BLINK_TIME);
      }
    });
  }, [scanAngle]);

  return (
    <div className="relative w-full h-full rounded-full bg-black overflow-hidden border border-green-500">
      {/* grid */}
      <div
        className="absolute inset-0 rounded-full 
        bg-[radial-gradient(circle,rgba(0,255,0,0.15)_1px,transparent_1px)]
        bg-size-[18px_18px]"
      />

      {/* radar arm */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute bottom-1/2 w-0.5 h-1/2
          bg-linear-to-t from-green-400 to-transparent
          origin-bottom"
          style={{ transform: `rotate(${scanAngle}deg)` }}
        />
      </div>

      {/* center dot */}
      <div
        className="absolute top-1/2 left-1/2 w-2 h-2 
        bg-green-400 rounded-full -translate-x-1/2 -translate-y-1/2"
      />

      {/* RED bug blinks (only on hit) */}
      {bugs.map((bug, i) =>
        activeDots[i] ? (
          <div
            key={i}
            className="absolute rounded-full bg-red-500"
            style={{
              left: `${bug.x}%`,
              top: `${bug.y}%`,
              width: bug.size,
              height: bug.size,
              boxShadow: "0 0 16px rgba(255,0,0,0.9)",
            }}
          />
        ) : null,
      )}
    </div>
  );
};
