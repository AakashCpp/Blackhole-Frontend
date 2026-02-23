import React, { useState, useMemo, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Info,
  ChevronDown,
  CheckCircle,
  ExternalLink,
  Globe,
  ArrowLeft,
  Download,
  Check,
  Copy,
  RotateCcw,
} from "lucide-react";

// --- UPDATED IMPORTS FOR CHARTS & PDF ---
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// --- 1. THE DATA (Static) ---
const SCAN_DATA = {
  message: "ZAP scan completed successfully",
  target: "https://demo.testfire.net/",
  spiderScanId: "0",
  activeScanId: "0",
  totalFindings: 482,
  vulnerabilities: [
    {
      nodeName: "https://demo.testfire.net/",
      sourceid: "3",
      other: "cookie:JSESSIONID",
      method: "GET",
      evidence: "JSESSIONID",
      pluginId: "10112",
      cweid: "-1",
      confidence: "Medium",
      sourceMessageId: 6,
      wascid: "-1",
      description:
        "The given response has been identified as containing a session management token. The 'Other Info' field contains a set of header tokens that can be used in the Header Based Session Management Method. If the request is in a context which has a Session Management Method set to \"Auto-Detect\" then this rule will change the session management to use the tokens identified.",
      messageId: "6",
      inputVector: "",
      url: "https://demo.testfire.net/",
      tags: {},
      reference:
        "https://www.zaproxy.org/docs/desktop/addons/authentication-helper/session-mgmt-id/",
      solution:
        "This is an informational alert rather than a vulnerability and so there is nothing to fix.",
      alert: "Session Management Response Identified",
      param: "JSESSIONID",
      attack: "",
      name: "Session Management Response Identified",
      risk: "Informational",
      id: "0",
      alertRef: "10112",
    },
    {
      nodeName: "https://demo.testfire.net/robots.txt",
      sourceid: "3",
      other: "cookie:JSESSIONID",
      method: "GET",
      evidence: "JSESSIONID",
      pluginId: "10112",
      cweid: "-1",
      confidence: "Medium",
      sourceMessageId: 4,
      wascid: "-1",
      description:
        "The given response has been identified as containing a session management token. The 'Other Info' field contains a set of header tokens that can be used in the Header Based Session Management Method. If the request is in a context which has a Session Management Method set to \"Auto-Detect\" then this rule will change the session management to use the tokens identified.",
      messageId: "4",
      inputVector: "",
      url: "https://demo.testfire.net/robots.txt",
      tags: {},
      reference:
        "https://www.zaproxy.org/docs/desktop/addons/authentication-helper/session-mgmt-id/",
      solution:
        "This is an informational alert rather than a vulnerability and so there is nothing to fix.",
      alert: "Session Management Response Identified",
      param: "JSESSIONID",
      attack: "",
      name: "Session Management Response Identified",
      risk: "Informational",
      id: "1",
      alertRef: "10112",
    },
    {
      nodeName: "https://demo.testfire.net/",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 6,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "6",
      inputVector: "",
      url: "https://demo.testfire.net/",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "2",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/robots.txt",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 4,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "4",
      inputVector: "",
      url: "https://demo.testfire.net/robots.txt",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "3",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/robots.txt",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Set-Cookie: JSESSIONID",
      pluginId: "10054",
      cweid: "1275",
      confidence: "Medium",
      sourceMessageId: 4,
      wascid: "13",
      description:
        "A cookie has been set without the SameSite attribute, which means that the cookie can be sent as a result of a 'cross-site' request. The SameSite attribute is an effective counter measure to cross-site request forgery, cross-site script inclusion, and timing attacks.",
      messageId: "4",
      inputVector: "",
      url: "https://demo.testfire.net/robots.txt",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_QA_STD: "",
        "WSTG-v42-SESS-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-1275": "https://cwe.mitre.org/data/definitions/1275.html",
        OWASP_2017_A05:
          "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control.html",
        POLICY_DEV_STD: "",
      },
      reference:
        "https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-cookie-same-site",
      solution:
        "Ensure that the SameSite attribute is set to either 'lax' or ideally 'strict' for all cookies.",
      alert: "Cookie without SameSite Attribute",
      param: "JSESSIONID",
      attack: "",
      name: "Cookie without SameSite Attribute",
      risk: "Low",
      id: "4",
      alertRef: "10054-1",
    },
    {
      nodeName: "https://demo.testfire.net/",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 6,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "6",
      inputVector: "",
      url: "https://demo.testfire.net/",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "5",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 6,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "6",
      inputVector: "",
      url: "https://demo.testfire.net/",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "6",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Set-Cookie: JSESSIONID",
      pluginId: "10054",
      cweid: "1275",
      confidence: "Medium",
      sourceMessageId: 6,
      wascid: "13",
      description:
        "A cookie has been set without the SameSite attribute, which means that the cookie can be sent as a result of a 'cross-site' request. The SameSite attribute is an effective counter measure to cross-site request forgery, cross-site script inclusion, and timing attacks.",
      messageId: "6",
      inputVector: "",
      url: "https://demo.testfire.net/",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_QA_STD: "",
        "WSTG-v42-SESS-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-1275": "https://cwe.mitre.org/data/definitions/1275.html",
        OWASP_2017_A05:
          "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control.html",
        POLICY_DEV_STD: "",
      },
      reference:
        "https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-cookie-same-site",
      solution:
        "Ensure that the SameSite attribute is set to either 'lax' or ideally 'strict' for all cookies.",
      alert: "Cookie without SameSite Attribute",
      param: "JSESSIONID",
      attack: "",
      name: "Cookie without SameSite Attribute",
      risk: "Low",
      id: "7",
      alertRef: "10054-1",
    },
    {
      nodeName: "https://demo.testfire.net/",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 6,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "6",
      inputVector: "",
      url: "https://demo.testfire.net/",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "8",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/robots.txt",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 4,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "4",
      inputVector: "",
      url: "https://demo.testfire.net/robots.txt",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "9",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 6,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "6",
      inputVector: "",
      url: "https://demo.testfire.net/",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "10",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/robots.txt",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 4,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "4",
      inputVector: "",
      url: "https://demo.testfire.net/robots.txt",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "11",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 6,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "6",
      inputVector: "",
      url: "https://demo.testfire.net/",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "12",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/feedback.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 50,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "50",
      inputVector: "",
      url: "https://demo.testfire.net/feedback.jsp",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "13",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 49,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "49",
      inputVector: "",
      url: "https://demo.testfire.net/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "14",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 52,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "52",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_careers.htm",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "15",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/sitemap.xml",
      sourceid: "3",
      other: "cookie:JSESSIONID",
      method: "GET",
      evidence: "JSESSIONID",
      pluginId: "10112",
      cweid: "-1",
      confidence: "Medium",
      sourceMessageId: 59,
      wascid: "-1",
      description:
        "The given response has been identified as containing a session management token. The 'Other Info' field contains a set of header tokens that can be used in the Header Based Session Management Method. If the request is in a context which has a Session Management Method set to \"Auto-Detect\" then this rule will change the session management to use the tokens identified.",
      messageId: "59",
      inputVector: "",
      url: "https://demo.testfire.net/sitemap.xml",
      tags: {},
      reference:
        "https://www.zaproxy.org/docs/desktop/addons/authentication-helper/session-mgmt-id/",
      solution:
        "This is an informational alert rather than a vulnerability and so there is nothing to fix.",
      alert: "Session Management Response Identified",
      param: "JSESSIONID",
      attack: "",
      name: "Session Management Response Identified",
      risk: "Informational",
      id: "17",
      alertRef: "10112",
    },
    {
      nodeName: "https://demo.testfire.net/sitemap.xml",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 59,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "59",
      inputVector: "",
      url: "https://demo.testfire.net/sitemap.xml",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "19",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 49,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "49",
      inputVector: "",
      url: "https://demo.testfire.net/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "22",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/sitemap.xml",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Set-Cookie: JSESSIONID",
      pluginId: "10054",
      cweid: "1275",
      confidence: "Medium",
      sourceMessageId: 59,
      wascid: "13",
      description:
        "A cookie has been set without the SameSite attribute, which means that the cookie can be sent as a result of a 'cross-site' request. The SameSite attribute is an effective counter measure to cross-site request forgery, cross-site script inclusion, and timing attacks.",
      messageId: "59",
      inputVector: "",
      url: "https://demo.testfire.net/sitemap.xml",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_QA_STD: "",
        "WSTG-v42-SESS-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-1275": "https://cwe.mitre.org/data/definitions/1275.html",
        OWASP_2017_A05:
          "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control.html",
        POLICY_DEV_STD: "",
      },
      reference:
        "https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-cookie-same-site",
      solution:
        "Ensure that the SameSite attribute is set to either 'lax' or ideally 'strict' for all cookies.",
      alert: "Cookie without SameSite Attribute",
      param: "JSESSIONID",
      attack: "",
      name: "Cookie without SameSite Attribute",
      risk: "Low",
      id: "26",
      alertRef: "10054-1",
    },
    {
      nodeName: "https://demo.testfire.net/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 49,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "49",
      inputVector: "",
      url: "https://demo.testfire.net/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "27",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/sitemap.xml",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 59,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "59",
      inputVector: "",
      url: "https://demo.testfire.net/sitemap.xml",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "28",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/sitemap.xml",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 59,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "59",
      inputVector: "",
      url: "https://demo.testfire.net/sitemap.xml",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "29",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 47,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "47",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=business_other.htm",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "30",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 47,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "47",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=business_other.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "31",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 47,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "47",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=business_other.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "34",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 47,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "47",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=business_other.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "35",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/feedback.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 50,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "50",
      inputVector: "",
      url: "https://demo.testfire.net/feedback.jsp",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "36",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 47,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "47",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=business_other.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "37",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/feedback.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 50,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "50",
      inputVector: "",
      url: "https://demo.testfire.net/feedback.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "38",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/feedback.jsp",
      sourceid: "3",
      other:
        'No known Anti-CSRF token [anticsrf, CSRFToken, __RequestVerificationToken, csrfmiddlewaretoken, authenticity_token, OWASP_CSRFTOKEN, anoncsrf, csrf_token, _csrf, _csrfSecret, __csrf_magic, CSRF, _token, _csrf_token, _csrfToken] was found in the following HTML form: [Form 2: "cfile" "email_addr" "name" "reset" "subject" "submit" ].',
      method: "GET",
      evidence: '<form name="cmt" method="post" action="sendFeedback">',
      pluginId: "10202",
      cweid: "352",
      confidence: "Low",
      sourceMessageId: 50,
      wascid: "9",
      description:
        "No Anti-CSRF tokens were found in a HTML submission form.\nA cross-site request forgery is an attack that involves forcing a victim to send an HTTP request to a target destination without their knowledge or intent in order to perform an action as the victim. The underlying cause is application functionality using predictable URL/form actions in a repeatable way. The nature of the attack is that CSRF exploits the trust that a web site has for a user. By contrast, cross-site scripting (XSS) exploits the trust that a user has for a web site. Like XSS, CSRF attacks are not necessarily cross-site, but they can be. Cross-site request forgery is also known as CSRF, XSRF, one-click attack, session riding, confused deputy, and sea surf.\n\nCSRF attacks are effective in a number of situations, including:\n    * The victim has an active session on the target site.\n    * The victim is authenticated via HTTP auth on the target site.\n    * The victim is on the same local network as the target site.\n\nCSRF has primarily been used to perform an action against a target site using the victim's privileges, but recent techniques have been discovered to disclose information by gaining access to the response. The risk of information disclosure is dramatically increased when the target site is vulnerable to XSS, because XSS can be used as a platform for CSRF, allowing the attack to operate within the bounds of the same-origin policy.",
      messageId: "50",
      inputVector: "",
      url: "https://demo.testfire.net/feedback.jsp",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-SESS-05":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/06-Session_Management_Testing/05-Testing_for_Cross_Site_Request_Forgery",
        OWASP_2017_A05:
          "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control.html",
        "CWE-352": "https://cwe.mitre.org/data/definitions/352.html",
        POLICY_DEV_STD: "",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html\nhttps://cwe.mitre.org/data/definitions/352.html",
      solution:
        "Phase: Architecture and Design\nUse a vetted library or framework that does not allow this weakness to occur or provides constructs that make this weakness easier to avoid.\nFor example, use anti-CSRF packages such as the OWASP CSRFGuard.\n\nPhase: Implementation\nEnsure that your application is free of cross-site scripting issues, because most CSRF defenses can be bypassed using attacker-controlled script.\n\nPhase: Architecture and Design\nGenerate a unique nonce for each form, place the nonce into the form, and verify the nonce upon receipt of the form. Be sure that the nonce is not predictable (CWE-330).\nNote that this can be bypassed using XSS.\n\nIdentify especially dangerous operations. When the user performs a dangerous operation, send a separate confirmation request to ensure that the user intended to perform that operation.\nNote that this can be bypassed using XSS.\n\nUse the ESAPI Session Management control.\nThis control includes a component for CSRF.\n\nDo not use the GET method for any request that triggers a state change.\n\nPhase: Implementation\nCheck the HTTP Referer header to see if the request originated from an expected page. This could break legitimate functionality, because users or proxies may have disabled sending the Referer for privacy reasons.",
      alert: "Absence of Anti-CSRF Tokens",
      param: "",
      attack: "",
      name: "Absence of Anti-CSRF Tokens",
      risk: "Medium",
      id: "40",
      alertRef: "10202",
    },
    {
      nodeName: "https://demo.testfire.net/feedback.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 50,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "50",
      inputVector: "",
      url: "https://demo.testfire.net/feedback.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "43",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/feedback.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 50,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "50",
      inputVector: "",
      url: "https://demo.testfire.net/feedback.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "44",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/feedback.jsp",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 50,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "50",
      inputVector: "",
      url: "https://demo.testfire.net/feedback.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "51",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence:
        '<script src="http://demo-analytics.testfire.net/urchin.js" type="text/javascript">\r\n\t</script>',
      pluginId: "10017",
      cweid: "829",
      confidence: "Medium",
      sourceMessageId: 68,
      wascid: "15",
      description:
        "The page includes one or more script files from a third-party domain.",
      messageId: "68",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=personal_investments.htm",
      tags: {
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2021_A08:
          "https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/",
        "CWE-829": "https://cwe.mitre.org/data/definitions/829.html",
        POLICY_DEV_STD: "",
      },
      reference: "",
      solution:
        "Ensure JavaScript source files are loaded from only trusted sources, and the sources can't be controlled by end users of the application.",
      alert: "Cross-Domain JavaScript Source File Inclusion",
      param: "http://demo-analytics.testfire.net/urchin.js",
      attack: "",
      name: "Cross-Domain JavaScript Source File Inclusion",
      risk: "Low",
      id: "55",
      alertRef: "10017",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other: "tag=script src=http://demo-analytics.testfire.net/urchin.js\n",
      method: "GET",
      evidence: "http://demo-analytics.testfire.net/urchin.js",
      pluginId: "10040",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 68,
      wascid: "4",
      description:
        "The page includes mixed content, that is content accessed via HTTP instead of HTTPS.",
      messageId: "68",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=personal_investments.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        POLICY_DEV_STD: "",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html",
      solution:
        "A page that is available over SSL/TLS must be comprised completely of content which is transmitted over SSL/TLS.\nThe page must not contain any content that is transmitted over unencrypted HTTP.\nThis includes content from third party sites.",
      alert: "Secure Pages Include Mixed Content (Including Scripts)",
      param: "",
      attack: "",
      name: "Secure Pages Include Mixed Content (Including Scripts)",
      risk: "Medium",
      id: "65",
      alertRef: "10040",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence:
        '<script src="http://demo-analytics.testfire.net/urchin.js" type="text/javascript">\r\n\t</script>',
      pluginId: "90003",
      cweid: "345",
      confidence: "High",
      sourceMessageId: 68,
      wascid: "15",
      description:
        "The integrity attribute is missing on a script or link tag served by an external server. The integrity tag prevents an attacker who have gained access to this server from injecting a malicious content.",
      messageId: "68",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=personal_investments.htm",
      tags: {
        "CWE-345": "https://cwe.mitre.org/data/definitions/345.html",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        POLICY_DEV_STD: "",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity",
      solution: "Provide a valid integrity attribute to the tag.",
      alert: "Sub Resource Integrity Attribute Missing",
      param: "",
      attack: "",
      name: "Sub Resource Integrity Attribute Missing",
      risk: "Medium",
      id: "75",
      alertRef: "90003",
    },
    {
      nodeName: "https://demo.testfire.net/default.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 78,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "78",
      inputVector: "",
      url: "https://demo.testfire.net/default.jsp?content=security.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "80",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/default.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 78,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "78",
      inputVector: "",
      url: "https://demo.testfire.net/default.jsp?content=security.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "82",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/default.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 78,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "78",
      inputVector: "",
      url: "https://demo.testfire.net/default.jsp?content=security.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "84",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/logo.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 79,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "79",
      inputVector: "",
      url: "https://demo.testfire.net/images/logo.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "85",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/logo.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 79,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "79",
      inputVector: "",
      url: "https://demo.testfire.net/images/logo.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "88",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/logo.gif",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 79,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "79",
      inputVector: "",
      url: "https://demo.testfire.net/images/logo.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "90",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/header_pic.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 81,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "81",
      inputVector: "",
      url: "https://demo.testfire.net/images/header_pic.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "91",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/header_pic.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 81,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "81",
      inputVector: "",
      url: "https://demo.testfire.net/images/header_pic.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "92",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/header_pic.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 81,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "81",
      inputVector: "",
      url: "https://demo.testfire.net/images/header_pic.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "93",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/pf_lock.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 82,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "82",
      inputVector: "",
      url: "https://demo.testfire.net/images/pf_lock.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "94",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/pf_lock.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 82,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "82",
      inputVector: "",
      url: "https://demo.testfire.net/images/pf_lock.gif",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "95",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/home1.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 83,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "83",
      inputVector: "",
      url: "https://demo.testfire.net/images/home1.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "96",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/pf_lock.gif",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 82,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "82",
      inputVector: "",
      url: "https://demo.testfire.net/images/pf_lock.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "97",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/home1.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 83,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "83",
      inputVector: "",
      url: "https://demo.testfire.net/images/home1.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "98",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/home2.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 84,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "84",
      inputVector: "",
      url: "https://demo.testfire.net/images/home2.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "99",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/home1.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 83,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "83",
      inputVector: "",
      url: "https://demo.testfire.net/images/home1.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "102",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/index.html",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 92,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "92",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/index.html",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "103",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/home2.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 84,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "84",
      inputVector: "",
      url: "https://demo.testfire.net/images/home2.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "104",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/style.css",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 91,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "91",
      inputVector: "",
      url: "https://demo.testfire.net/style.css",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "105",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/status_check.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 99,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "99",
      inputVector: "",
      url: "https://demo.testfire.net/status_check.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "107",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/login.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 101,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "101",
      inputVector: "",
      url: "https://demo.testfire.net/login.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "109",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/search.jsp (query)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 100,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "100",
      inputVector: "",
      url: "https://demo.testfire.net/search.jsp?query=ZAP",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "111",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/index.html",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 92,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "92",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/index.html",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "112",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/style.css",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 91,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "91",
      inputVector: "",
      url: "https://demo.testfire.net/style.css",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "114",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/home2.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 84,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "84",
      inputVector: "",
      url: "https://demo.testfire.net/images/home2.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "116",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/index.html",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 92,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "92",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/index.html",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "117",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/index.html",
      sourceid: "3",
      other:
        "No links have been found while there are scripts, which is an indication that this is a modern web application.",
      method: "GET",
      evidence: '<script src="./swagger-ui-bundle.js"> </script>',
      pluginId: "10109",
      cweid: "-1",
      confidence: "Medium",
      sourceMessageId: 92,
      wascid: "-1",
      description:
        "The application appears to be a modern web application. If you need to explore it automatically then the Ajax Spider may well be more effective than the standard one.",
      messageId: "92",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/index.html",
      tags: {
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        POLICY_DEV_STD: "",
      },
      reference: "",
      solution:
        "This is an informational alert and so no changes are required.",
      alert: "Modern Web Application",
      param: "",
      attack: "",
      name: "Modern Web Application",
      risk: "Informational",
      id: "124",
      alertRef: "10109",
    },
    {
      nodeName: "https://demo.testfire.net/login.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 101,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "101",
      inputVector: "",
      url: "https://demo.testfire.net/login.jsp",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "127",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/style.css",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 91,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "91",
      inputVector: "",
      url: "https://demo.testfire.net/style.css",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "128",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/search.jsp (query)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 100,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "100",
      inputVector: "",
      url: "https://demo.testfire.net/search.jsp?query=ZAP",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "129",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/status_check.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 99,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "99",
      inputVector: "",
      url: "https://demo.testfire.net/status_check.jsp",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "131",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/index.html",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 92,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "92",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/index.html",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "136",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/status_check.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 99,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "99",
      inputVector: "",
      url: "https://demo.testfire.net/status_check.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "138",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/search.jsp (query)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 100,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "100",
      inputVector: "",
      url: "https://demo.testfire.net/search.jsp?query=ZAP",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "139",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/login.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 101,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "101",
      inputVector: "",
      url: "https://demo.testfire.net/login.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "140",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside4.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 111,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "111",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside4.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "141",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/index.html",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 92,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "92",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/index.html",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "142",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside4.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 111,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "111",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside4.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "143",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 112,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "112",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "147",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/login.jsp",
      sourceid: "3",
      other:
        'No known Anti-CSRF token [anticsrf, CSRFToken, __RequestVerificationToken, csrfmiddlewaretoken, authenticity_token, OWASP_CSRFTOKEN, anoncsrf, csrf_token, _csrf, _csrfSecret, __csrf_magic, CSRF, _token, _csrf_token, _csrfToken] was found in the following HTML form: [Form 2: "btnSubmit" "passw" "uid" ].',
      method: "GET",
      evidence:
        '<form action="doLogin" method="post" name="login" id="login" onsubmit="return (confirminput(login));">',
      pluginId: "10202",
      cweid: "352",
      confidence: "Low",
      sourceMessageId: 101,
      wascid: "9",
      description:
        "No Anti-CSRF tokens were found in a HTML submission form.\nA cross-site request forgery is an attack that involves forcing a victim to send an HTTP request to a target destination without their knowledge or intent in order to perform an action as the victim. The underlying cause is application functionality using predictable URL/form actions in a repeatable way. The nature of the attack is that CSRF exploits the trust that a web site has for a user. By contrast, cross-site scripting (XSS) exploits the trust that a user has for a web site. Like XSS, CSRF attacks are not necessarily cross-site, but they can be. Cross-site request forgery is also known as CSRF, XSRF, one-click attack, session riding, confused deputy, and sea surf.\n\nCSRF attacks are effective in a number of situations, including:\n    * The victim has an active session on the target site.\n    * The victim is authenticated via HTTP auth on the target site.\n    * The victim is on the same local network as the target site.\n\nCSRF has primarily been used to perform an action against a target site using the victim's privileges, but recent techniques have been discovered to disclose information by gaining access to the response. The risk of information disclosure is dramatically increased when the target site is vulnerable to XSS, because XSS can be used as a platform for CSRF, allowing the attack to operate within the bounds of the same-origin policy.",
      messageId: "101",
      inputVector: "",
      url: "https://demo.testfire.net/login.jsp",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-SESS-05":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/06-Session_Management_Testing/05-Testing_for_Cross_Site_Request_Forgery",
        OWASP_2017_A05:
          "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control.html",
        "CWE-352": "https://cwe.mitre.org/data/definitions/352.html",
        POLICY_DEV_STD: "",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html\nhttps://cwe.mitre.org/data/definitions/352.html",
      solution:
        "Phase: Architecture and Design\nUse a vetted library or framework that does not allow this weakness to occur or provides constructs that make this weakness easier to avoid.\nFor example, use anti-CSRF packages such as the OWASP CSRFGuard.\n\nPhase: Implementation\nEnsure that your application is free of cross-site scripting issues, because most CSRF defenses can be bypassed using attacker-controlled script.\n\nPhase: Architecture and Design\nGenerate a unique nonce for each form, place the nonce into the form, and verify the nonce upon receipt of the form. Be sure that the nonce is not predictable (CWE-330).\nNote that this can be bypassed using XSS.\n\nIdentify especially dangerous operations. When the user performs a dangerous operation, send a separate confirmation request to ensure that the user intended to perform that operation.\nNote that this can be bypassed using XSS.\n\nUse the ESAPI Session Management control.\nThis control includes a component for CSRF.\n\nDo not use the GET method for any request that triggers a state change.\n\nPhase: Implementation\nCheck the HTTP Referer header to see if the request originated from an expected page. This could break legitimate functionality, because users or proxies may have disabled sending the Referer for privacy reasons.",
      alert: "Absence of Anti-CSRF Tokens",
      param: "",
      attack: "",
      name: "Absence of Anti-CSRF Tokens",
      risk: "Medium",
      id: "148",
      alertRef: "10202",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/index.html",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 92,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "92",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/index.html",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "149",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside4.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 111,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "111",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside4.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "150",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other:
        "Links have been found that do not have traditional href attributes, which is an indication that this is a modern web application.",
      method: "GET",
      evidence: '<a href="">Altoro Private Bank</a>',
      pluginId: "10109",
      cweid: "-1",
      confidence: "Medium",
      sourceMessageId: 85,
      wascid: "-1",
      description:
        "The application appears to be a modern web application. If you need to explore it automatically then the Ajax Spider may well be more effective than the standard one.",
      messageId: "85",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=personal_other.htm",
      tags: {
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        POLICY_DEV_STD: "",
      },
      reference: "",
      solution:
        "This is an informational alert and so no changes are required.",
      alert: "Modern Web Application",
      param: "",
      attack: "",
      name: "Modern Web Application",
      risk: "Informational",
      id: "151",
      alertRef: "10109",
    },
    {
      nodeName: "https://demo.testfire.net/search.jsp (query)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 100,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "100",
      inputVector: "",
      url: "https://demo.testfire.net/search.jsp?query=ZAP",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "153",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 112,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "112",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "156",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/search.jsp (query)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 100,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "100",
      inputVector: "",
      url: "https://demo.testfire.net/search.jsp?query=ZAP",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "158",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/status_check.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 99,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "99",
      inputVector: "",
      url: "https://demo.testfire.net/status_check.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "159",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 113,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "113",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "160",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other: "tag=img src=http://www.exampledomainnotinuse.org/mybeacon.gif\n",
      method: "GET",
      evidence: "http://www.exampledomainnotinuse.org/mybeacon.gif",
      pluginId: "10040",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 110,
      wascid: "4",
      description:
        "The page includes mixed content, that is content accessed via HTTP instead of HTTPS.",
      messageId: "110",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_benefits.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        POLICY_DEV_STD: "",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html",
      solution:
        "A page that is available over SSL/TLS must be comprised completely of content which is transmitted over SSL/TLS.\nThe page must not contain any content that is transmitted over unencrypted HTTP.\nThis includes content from third party sites.",
      alert: "Secure Pages Include Mixed Content",
      param: "",
      attack: "",
      name: "Secure Pages Include Mixed Content",
      risk: "Low",
      id: "164",
      alertRef: "10040",
    },
    {
      nodeName: "https://demo.testfire.net/status_check.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 99,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "99",
      inputVector: "",
      url: "https://demo.testfire.net/status_check.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "167",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/login.jsp",
      sourceid: "3",
      other:
        'The following pattern was used: \\bADMIN\\b and was detected in likely comment: "<!-- To get the latest admin login, please contact SiteOps at 415-555-6159 -->", see evidence field for the suspicious comment/snippet.',
      method: "GET",
      evidence: "admin",
      pluginId: "10027",
      cweid: "615",
      confidence: "Medium",
      sourceMessageId: 101,
      wascid: "13",
      description:
        "The response appears to contain suspicious comments which may help an attacker.",
      messageId: "101",
      inputVector: "",
      url: "https://demo.testfire.net/login.jsp",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_PENTEST: "",
        "CWE-615": "https://cwe.mitre.org/data/definitions/615.html",
        "WSTG-v42-INFO-05":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/05-Review_Webpage_Content_for_Information_Leakage",
        OWASP_2017_A03:
          "https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure.html",
      },
      reference: "",
      solution:
        "Remove all comments that return information that may help an attacker and fix any underlying problems they refer to.",
      alert: "Information Disclosure - Suspicious Comments",
      param: "",
      attack: "",
      name: "Information Disclosure - Suspicious Comments",
      risk: "Informational",
      id: "169",
      alertRef: "10027",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 112,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "112",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "171",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/search.jsp (query)",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 100,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "100",
      inputVector: "",
      url: "https://demo.testfire.net/search.jsp?query=ZAP",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "172",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/status_check.jsp",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 99,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "99",
      inputVector: "",
      url: "https://demo.testfire.net/status_check.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "173",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 113,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "113",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.jsp",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "175",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 113,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "113",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "181",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/login.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 101,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "101",
      inputVector: "",
      url: "https://demo.testfire.net/login.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "183",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/login.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 101,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "101",
      inputVector: "",
      url: "https://demo.testfire.net/login.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "184",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/subscribe.jsp",
      sourceid: "3",
      other:
        'No known Anti-CSRF token [anticsrf, CSRFToken, __RequestVerificationToken, csrfmiddlewaretoken, authenticity_token, OWASP_CSRFTOKEN, anoncsrf, csrf_token, _csrf, _csrfSecret, __csrf_magic, CSRF, _token, _csrf_token, _csrfToken] was found in the following HTML form: [Form 2: "btnSubmit" "txtEmail" ].',
      method: "GET",
      evidence:
        '<form action="doSubscribe" method="post" name="subscribe" id="subscribe" onsubmit="return confirmEmail(txtEmail.value);">',
      pluginId: "10202",
      cweid: "352",
      confidence: "Low",
      sourceMessageId: 113,
      wascid: "9",
      description:
        "No Anti-CSRF tokens were found in a HTML submission form.\nA cross-site request forgery is an attack that involves forcing a victim to send an HTTP request to a target destination without their knowledge or intent in order to perform an action as the victim. The underlying cause is application functionality using predictable URL/form actions in a repeatable way. The nature of the attack is that CSRF exploits the trust that a web site has for a user. By contrast, cross-site scripting (XSS) exploits the trust that a user has for a web site. Like XSS, CSRF attacks are not necessarily cross-site, but they can be. Cross-site request forgery is also known as CSRF, XSRF, one-click attack, session riding, confused deputy, and sea surf.\n\nCSRF attacks are effective in a number of situations, including:\n    * The victim has an active session on the target site.\n    * The victim is authenticated via HTTP auth on the target site.\n    * The victim is on the same local network as the target site.\n\nCSRF has primarily been used to perform an action against a target site using the victim's privileges, but recent techniques have been discovered to disclose information by gaining access to the response. The risk of information disclosure is dramatically increased when the target site is vulnerable to XSS, because XSS can be used as a platform for CSRF, allowing the attack to operate within the bounds of the same-origin policy.",
      messageId: "113",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.jsp",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-SESS-05":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/06-Session_Management_Testing/05-Testing_for_Cross_Site_Request_Forgery",
        OWASP_2017_A05:
          "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control.html",
        "CWE-352": "https://cwe.mitre.org/data/definitions/352.html",
        POLICY_DEV_STD: "",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html\nhttps://cwe.mitre.org/data/definitions/352.html",
      solution:
        "Phase: Architecture and Design\nUse a vetted library or framework that does not allow this weakness to occur or provides constructs that make this weakness easier to avoid.\nFor example, use anti-CSRF packages such as the OWASP CSRFGuard.\n\nPhase: Implementation\nEnsure that your application is free of cross-site scripting issues, because most CSRF defenses can be bypassed using attacker-controlled script.\n\nPhase: Architecture and Design\nGenerate a unique nonce for each form, place the nonce into the form, and verify the nonce upon receipt of the form. Be sure that the nonce is not predictable (CWE-330).\nNote that this can be bypassed using XSS.\n\nIdentify especially dangerous operations. When the user performs a dangerous operation, send a separate confirmation request to ensure that the user intended to perform that operation.\nNote that this can be bypassed using XSS.\n\nUse the ESAPI Session Management control.\nThis control includes a component for CSRF.\n\nDo not use the GET method for any request that triggers a state change.\n\nPhase: Implementation\nCheck the HTTP Referer header to see if the request originated from an expected page. This could break legitimate functionality, because users or proxies may have disabled sending the Referer for privacy reasons.",
      alert: "Absence of Anti-CSRF Tokens",
      param: "",
      attack: "",
      name: "Absence of Anti-CSRF Tokens",
      risk: "Medium",
      id: "187",
      alertRef: "10202",
    },
    {
      nodeName: "https://demo.testfire.net/login.jsp",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 101,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "101",
      inputVector: "",
      url: "https://demo.testfire.net/login.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "189",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 112,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "112",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "190",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 112,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "112",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "191",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 112,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "112",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "192",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 113,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "113",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "194",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 113,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "113",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "196",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/subscribe.jsp",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 113,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "113",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "197",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_deposit.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 121,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "121",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_deposit.jpg",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "201",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_deposit.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 121,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "121",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_deposit.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "202",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_deposit.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 121,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "121",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_deposit.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "204",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside3.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 119,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "119",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside3.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "205",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_cards.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 118,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "118",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_cards.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "207",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/home3.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 124,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "124",
      inputVector: "",
      url: "https://demo.testfire.net/images/home3.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "208",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 127,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "127",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "211",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_main.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 126,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "126",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_main.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "212",
      alertRef: "10036-2",
    },
    {
      nodeName:
        "https://demo.testfire.net/sendFeedback ()(cfile,comments,email_addr,name,subject,submit)",
      sourceid: "3",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 125,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "125",
      inputVector: "",
      url: "https://demo.testfire.net/sendFeedback",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "213",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside3.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 119,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "119",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside3.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "216",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_main.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 126,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "126",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_main.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "217",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/favicon-32x32.png",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 140,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "140",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/favicon-32x32.png",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "218",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/home3.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 124,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "124",
      inputVector: "",
      url: "https://demo.testfire.net/images/home3.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "220",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_cards.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 118,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "118",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_cards.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "221",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 141,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "141",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "222",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/favicon-32x32.png",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 140,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "140",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/favicon-32x32.png",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "223",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside3.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 119,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "119",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside3.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "225",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/favicon-32x32.png",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 140,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "140",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/favicon-32x32.png",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "228",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_main.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 126,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "126",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_main.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "230",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_cards.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 118,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "118",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_cards.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "232",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/home3.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 124,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "124",
      inputVector: "",
      url: "https://demo.testfire.net/images/home3.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "233",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 141,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "141",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "234",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 141,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "141",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "237",
      alertRef: "10038-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/sendFeedback ()(cfile,comments,email_addr,name,subject,submit)",
      sourceid: "3",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 125,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "125",
      inputVector: "",
      url: "https://demo.testfire.net/sendFeedback",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "238",
      alertRef: "10038-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/grouplife.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 143,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "143",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/grouplife.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "240",
      alertRef: "10038-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/grouplife.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 143,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "143",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/grouplife.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "245",
      alertRef: "10036-2",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/grouplife.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 143,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "143",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/grouplife.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "247",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_other.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 169,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "169",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_other.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "249",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_other.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 169,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "169",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_other.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "250",
      alertRef: "10035-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/sendFeedback ()(cfile,comments,email_addr,name,subject,submit)",
      sourceid: "3",
      other: "",
      method: "POST",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 125,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "125",
      inputVector: "",
      url: "https://demo.testfire.net/sendFeedback",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "251",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 141,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "141",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "252",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_other.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 169,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "169",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_other.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "253",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "3",
      other: "",
      method: "POST",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 170,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "170",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "254",
      alertRef: "10036-2",
    },
    {
      nodeName:
        "https://demo.testfire.net/sendFeedback ()(cfile,comments,email_addr,name,subject,submit)",
      sourceid: "3",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 125,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "125",
      inputVector: "",
      url: "https://demo.testfire.net/sendFeedback",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "256",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other:
        'The following pattern was used: \\bUSER\\b and was detected in likely comment: "/* tell the user the job isn\'t open anymore */", see evidence field for the suspicious comment/snippet.',
      method: "GET",
      evidence: "user",
      pluginId: "10027",
      cweid: "615",
      confidence: "Low",
      sourceMessageId: 129,
      wascid: "13",
      description:
        "The response appears to contain suspicious comments which may help an attacker.",
      messageId: "129",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_jobs.htm",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_PENTEST: "",
        "CWE-615": "https://cwe.mitre.org/data/definitions/615.html",
        "WSTG-v42-INFO-05":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/05-Review_Webpage_Content_for_Information_Leakage",
        OWASP_2017_A03:
          "https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure.html",
      },
      reference: "",
      solution:
        "Remove all comments that return information that may help an attacker and fix any underlying problems they refer to.",
      alert: "Information Disclosure - Suspicious Comments",
      param: "",
      attack: "",
      name: "Information Disclosure - Suspicious Comments",
      risk: "Informational",
      id: "257",
      alertRef: "10027",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 141,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "141",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "259",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/retirement.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 176,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "176",
      inputVector: "",
      url: "https://demo.testfire.net/retirement.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "261",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/retirement.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 176,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "176",
      inputVector: "",
      url: "https://demo.testfire.net/retirement.htm",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "262",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 141,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "141",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "268",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_deposit.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 181,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "181",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_deposit.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "270",
      alertRef: "10036-2",
    },
    {
      nodeName:
        "https://demo.testfire.net/sendFeedback ()(cfile,comments,email_addr,name,subject,submit)",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "POST",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 125,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "125",
      inputVector: "",
      url: "https://demo.testfire.net/sendFeedback",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "273",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/retirement.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 176,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "176",
      inputVector: "",
      url: "https://demo.testfire.net/retirement.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "275",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/favicon-16x16.png",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 185,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "185",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/favicon-16x16.png",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "279",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_deposit.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 181,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "181",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_deposit.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "280",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "3",
      other: "",
      method: "POST",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 184,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "184",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "282",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/favicon-16x16.png",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 185,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "185",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/favicon-16x16.png",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "284",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/retirement.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 176,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "176",
      inputVector: "",
      url: "https://demo.testfire.net/retirement.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "290",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/favicon-16x16.png",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 185,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "185",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/favicon-16x16.png",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "292",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_deposit.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 181,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "181",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_deposit.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "294",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/retirement.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 176,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "176",
      inputVector: "",
      url: "https://demo.testfire.net/retirement.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "298",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content,job)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 196,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "196",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_jobs.htm&job=Teller:ConsumaerBanking",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "299",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/retirement.htm",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 176,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "176",
      inputVector: "",
      url: "https://demo.testfire.net/retirement.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "301",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content,job)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 196,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "196",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_jobs.htm&job=Teller:ConsumaerBanking",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "309",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content,job)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 196,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "196",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_jobs.htm&job=Teller:ConsumaerBanking",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "312",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content,job)",
      sourceid: "3",
      other:
        'The following pattern was used: \\bUSER\\b and was detected in likely comment: "/* tell the user the job isn\'t open anymore */", see evidence field for the suspicious comment/snippet.',
      method: "GET",
      evidence: "user",
      pluginId: "10027",
      cweid: "615",
      confidence: "Low",
      sourceMessageId: 196,
      wascid: "13",
      description:
        "The response appears to contain suspicious comments which may help an attacker.",
      messageId: "196",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_jobs.htm&job=Teller:ConsumaerBanking",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_PENTEST: "",
        "CWE-615": "https://cwe.mitre.org/data/definitions/615.html",
        "WSTG-v42-INFO-05":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/05-Review_Webpage_Content_for_Information_Leakage",
        OWASP_2017_A03:
          "https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure.html",
      },
      reference: "",
      solution:
        "Remove all comments that return information that may help an attacker and fix any underlying problems they refer to.",
      alert: "Information Disclosure - Suspicious Comments",
      param: "",
      attack: "",
      name: "Information Disclosure - Suspicious Comments",
      risk: "Informational",
      id: "320",
      alertRef: "10027",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content,job)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 196,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "196",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_jobs.htm&job=Teller:ConsumaerBanking",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "321",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content,job)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 196,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "196",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_jobs.htm&job=Teller:ConsumaerBanking",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "322",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content,job)",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 196,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "196",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_jobs.htm&job=Teller:ConsumaerBanking",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "323",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_insurance.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 197,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "197",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_insurance.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "324",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside5.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 199,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "199",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside5.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "325",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_lending.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 198,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "198",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_lending.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "326",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_insurance.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 197,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "197",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_insurance.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "328",
      alertRef: "10035-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 204,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "204",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/index.jsp?content=personal_deposit.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "329",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_loans.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 203,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "203",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_loans.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "330",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside5.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 199,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "199",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside5.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "331",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_lending.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 198,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "198",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_lending.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "333",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/adobe.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 212,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "212",
      inputVector: "",
      url: "https://demo.testfire.net/images/adobe.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "335",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_other.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 213,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "213",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_other.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "336",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_other.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 213,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "213",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_other.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "337",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_insurance.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 197,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "197",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_insurance.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "338",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_lending.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 198,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "198",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_lending.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "339",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside5.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 199,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "199",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside5.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "340",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_loans.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 203,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "203",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_loans.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "341",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_other.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 213,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "213",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_other.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "342",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/adobe.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 212,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "212",
      inputVector: "",
      url: "https://demo.testfire.net/images/adobe.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "343",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_loans.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 203,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "203",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_loans.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "344",
      alertRef: "10021",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 204,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "204",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/index.jsp?content=personal_deposit.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "345",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/adobe.gif",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 212,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "212",
      inputVector: "",
      url: "https://demo.testfire.net/images/adobe.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "349",
      alertRef: "10021",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 204,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "204",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/index.jsp?content=personal_deposit.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "351",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other:
        "tag=object codebase=http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\n",
      method: "GET",
      evidence:
        "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0",
      pluginId: "10040",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 205,
      wascid: "4",
      description:
        "The page includes mixed content, that is content accessed via HTTP instead of HTTPS.",
      messageId: "205",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_contact.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        POLICY_DEV_STD: "",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html",
      solution:
        "A page that is available over SSL/TLS must be comprised completely of content which is transmitted over SSL/TLS.\nThe page must not contain any content that is transmitted over unencrypted HTTP.\nThis includes content from third party sites.",
      alert: "Secure Pages Include Mixed Content",
      param: "",
      attack: "",
      name: "Secure Pages Include Mixed Content",
      risk: "Low",
      id: "355",
      alertRef: "10040",
    },
    {
      nodeName: "https://demo.testfire.net/index.jsp (content)",
      sourceid: "3",
      other:
        "Links have been found that do not have traditional href attributes, which is an indication that this is a modern web application.",
      method: "GET",
      evidence: '<a name="gift"></a>',
      pluginId: "10109",
      cweid: "-1",
      confidence: "Medium",
      sourceMessageId: 201,
      wascid: "-1",
      description:
        "The application appears to be a modern web application. If you need to explore it automatically then the Ajax Spider may well be more effective than the standard one.",
      messageId: "201",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_volunteering.htm",
      tags: {
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        POLICY_DEV_STD: "",
      },
      reference: "",
      solution:
        "This is an informational alert and so no changes are required.",
      alert: "Modern Web Application",
      param: "",
      attack: "",
      name: "Modern Web Application",
      risk: "Informational",
      id: "356",
      alertRef: "10109",
    },
    {
      nodeName: "https://demo.testfire.net/Privacypolicy.jsp (sec,template)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 216,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "216",
      inputVector: "",
      url: "https://demo.testfire.net/Privacypolicy.jsp?sec=Careers&template=US",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "367",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/static/personal_savings.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 221,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "221",
      inputVector: "",
      url: "https://demo.testfire.net/static/personal_savings.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "369",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_main.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 218,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "218",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_main.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "372",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_main.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 218,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "218",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_main.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "374",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/Privacypolicy.jsp (sec,template)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 216,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "216",
      inputVector: "",
      url: "https://demo.testfire.net/Privacypolicy.jsp?sec=Careers&template=US",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "375",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_main.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 218,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "218",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_main.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "376",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/Privacypolicy.jsp (sec,template)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 216,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "216",
      inputVector: "",
      url: "https://demo.testfire.net/Privacypolicy.jsp?sec=Careers&template=US",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "377",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/inside_points_of_interest.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 246,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "246",
      inputVector: "",
      url: "https://demo.testfire.net/inside_points_of_interest.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "387",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/static/personal_savings.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 221,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "221",
      inputVector: "",
      url: "https://demo.testfire.net/static/personal_savings.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "389",
      alertRef: "10036-2",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 250,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "250",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "393",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/static/personal_savings.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 221,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "221",
      inputVector: "",
      url: "https://demo.testfire.net/static/personal_savings.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "396",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/inside_points_of_interest.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 246,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "246",
      inputVector: "",
      url: "https://demo.testfire.net/inside_points_of_interest.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "401",
      alertRef: "10036-2",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 250,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "250",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "406",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/inside_points_of_interest.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 246,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "246",
      inputVector: "",
      url: "https://demo.testfire.net/inside_points_of_interest.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "410",
      alertRef: "10035-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 250,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "250",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "413",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/icon_top.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 254,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "254",
      inputVector: "",
      url: "https://demo.testfire.net/images/icon_top.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "422",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_retirement.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 277,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "277",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_retirement.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "424",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/icon_top.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 254,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "254",
      inputVector: "",
      url: "https://demo.testfire.net/images/icon_top.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "425",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/spacer.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 278,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "278",
      inputVector: "",
      url: "https://demo.testfire.net/images/spacer.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "429",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_retirement.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 277,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "277",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_retirement.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "431",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_checking.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 285,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "285",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_checking.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "432",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/icon_top.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 254,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "254",
      inputVector: "",
      url: "https://demo.testfire.net/images/icon_top.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "433",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/high_yield_investments.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 281,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "281",
      inputVector: "",
      url: "https://demo.testfire.net/high_yield_investments.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "436",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_checking.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 285,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "285",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_checking.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "438",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 287,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "287",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=a",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "439",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_retirement.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 277,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "277",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_retirement.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "440",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/spacer.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 278,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "278",
      inputVector: "",
      url: "https://demo.testfire.net/images/spacer.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "442",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/spacer.gif",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 278,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "278",
      inputVector: "",
      url: "https://demo.testfire.net/images/spacer.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "444",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_checking.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 285,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "285",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_checking.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "446",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_cards.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 291,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "291",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_cards.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "447",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside1.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 292,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "292",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside1.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "452",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside1.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 292,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "292",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside1.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "454",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/high_yield_investments.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 281,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "281",
      inputVector: "",
      url: "https://demo.testfire.net/high_yield_investments.htm",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "456",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/high_yield_investments.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 281,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "281",
      inputVector: "",
      url: "https://demo.testfire.net/high_yield_investments.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "459",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_cards.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 291,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "291",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_cards.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "462",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 287,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "287",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=a",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "463",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 287,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "287",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=a",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "464",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside1.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 292,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "292",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside1.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "466",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/b_cards.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 291,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "291",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_cards.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "467",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/high_yield_investments.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 281,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "281",
      inputVector: "",
      url: "https://demo.testfire.net/high_yield_investments.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "468",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/high_yield_investments.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 281,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "281",
      inputVector: "",
      url: "https://demo.testfire.net/high_yield_investments.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "470",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 287,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "287",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=a",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "475",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/high_yield_investments.htm",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 281,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "281",
      inputVector: "",
      url: "https://demo.testfire.net/high_yield_investments.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "477",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 287,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "287",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=a",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "478",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 287,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "287",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=a",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "479",
      alertRef: "10021",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 295,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "295",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/subscribe.jsp",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "484",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/high",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 301,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "301",
      inputVector: "",
      url: "https://demo.testfire.net/high",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "485",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/static/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 300,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "300",
      inputVector: "",
      url: "https://demo.testfire.net/static/index.jsp?content=personal_deposit.htm",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "486",
      alertRef: "10038-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 295,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "295",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "487",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/subscribe.swf",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 298,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "298",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.swf",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "488",
      alertRef: "10036-2",
    },
    {
      nodeName:
        "https://demo.testfire.net/my documents/JohnSmith/Bank Site Documents/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 295,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "295",
      inputVector: "",
      url: "https://demo.testfire.net/my%20documents/JohnSmith/Bank%20Site%20Documents/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "490",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/subscribe.swf",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 298,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "298",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.swf",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "492",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/static/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 300,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "300",
      inputVector: "",
      url: "https://demo.testfire.net/static/index.jsp?content=personal_deposit.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "496",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/high",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 301,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "301",
      inputVector: "",
      url: "https://demo.testfire.net/high",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "497",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/subscribe.swf",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 298,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "298",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.swf",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "501",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/high",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 301,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "301",
      inputVector: "",
      url: "https://demo.testfire.net/high",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "503",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/static/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 300,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "300",
      inputVector: "",
      url: "https://demo.testfire.net/static/index.jsp?content=personal_deposit.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "505",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside7.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 310,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "310",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside7.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "520",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/pr/communityannualreport.pdf",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 307,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "307",
      inputVector: "",
      url: "https://demo.testfire.net/pr/communityannualreport.pdf",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "521",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside7.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 310,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "310",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside7.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "524",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/disclaimer.htm (url)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10020",
      cweid: "1021",
      confidence: "Medium",
      sourceMessageId: 311,
      wascid: "15",
      description:
        "The response does not protect against 'ClickJacking' attacks. It should include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options.",
      messageId: "311",
      inputVector: "",
      url: "https://demo.testfire.net/disclaimer.htm?url=http://www.microsoft.com",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        "CWE-1021": "https://cwe.mitre.org/data/definitions/1021.html",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-CLNT-09":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options",
      solution:
        "Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.",
      alert: "Missing Anti-clickjacking Header",
      param: "x-frame-options",
      attack: "",
      name: "Missing Anti-clickjacking Header",
      risk: "Medium",
      id: "525",
      alertRef: "10020-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside7.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 310,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "310",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside7.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "531",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/pr/communityannualreport.pdf",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 307,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "307",
      inputVector: "",
      url: "https://demo.testfire.net/pr/communityannualreport.pdf",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "534",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/disclaimer.htm (url)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10015",
      cweid: "525",
      confidence: "Low",
      sourceMessageId: 311,
      wascid: "13",
      description:
        "The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.",
      messageId: "311",
      inputVector: "",
      url: "https://demo.testfire.net/disclaimer.htm?url=http://www.microsoft.com",
      tags: {
        "CWE-525": "https://cwe.mitre.org/data/definitions/525.html",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "WSTG-v42-ATHN-06":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control\nhttps://grayduck.mn/2021/09/13/cache-control-recommendations/",
      solution:
        'For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".',
      alert: "Re-examine Cache-control Directives",
      param: "cache-control",
      attack: "",
      name: "Re-examine Cache-control Directives",
      risk: "Informational",
      id: "535",
      alertRef: "10015",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside6.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 318,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "318",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside6.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "541",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/disclaimer.htm (url)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 311,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "311",
      inputVector: "",
      url: "https://demo.testfire.net/disclaimer.htm?url=http://www.microsoft.com",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "542",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/sameDomain",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 319,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "319",
      inputVector: "",
      url: "https://demo.testfire.net/sameDomain",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "543",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside6.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 318,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "318",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside6.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "544",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/inside6.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 318,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "318",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside6.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "547",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/pr/communityannualreport.pdf",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 307,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "307",
      inputVector: "",
      url: "https://demo.testfire.net/pr/communityannualreport.pdf",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "548",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/disclaimer.htm (url)",
      sourceid: "3",
      other:
        "Links have been found that do not have traditional href attributes, which is an indication that this is a modern web application.",
      method: "GET",
      evidence:
        '<a href="#" onclick="go();return false;"><img src="images/ok.gif" id="ok" alt="ok" border="0"></a>',
      pluginId: "10109",
      cweid: "-1",
      confidence: "Medium",
      sourceMessageId: 311,
      wascid: "-1",
      description:
        "The application appears to be a modern web application. If you need to explore it automatically then the Ajax Spider may well be more effective than the standard one.",
      messageId: "311",
      inputVector: "",
      url: "https://demo.testfire.net/disclaimer.htm?url=http://www.microsoft.com",
      tags: {
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        POLICY_DEV_STD: "",
      },
      reference: "",
      solution:
        "This is an informational alert and so no changes are required.",
      alert: "Modern Web Application",
      param: "",
      attack: "",
      name: "Modern Web Application",
      risk: "Informational",
      id: "550",
      alertRef: "10109",
    },
    {
      nodeName: "https://demo.testfire.net/sameDomain",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 319,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "319",
      inputVector: "",
      url: "https://demo.testfire.net/sameDomain",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "552",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/sameDomain",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 319,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "319",
      inputVector: "",
      url: "https://demo.testfire.net/sameDomain",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "554",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/disclaimer.htm (url)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 311,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "311",
      inputVector: "",
      url: "https://demo.testfire.net/disclaimer.htm?url=http://www.microsoft.com",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "556",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/disclaimer.htm (url)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 311,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "311",
      inputVector: "",
      url: "https://demo.testfire.net/disclaimer.htm?url=http://www.microsoft.com",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "557",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/disclaimer.htm (url)",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 311,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "311",
      inputVector: "",
      url: "https://demo.testfire.net/disclaimer.htm?url=http://www.microsoft.com",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "558",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_investments.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 322,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "322",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_investments.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "572",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_investments.jpg",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 322,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "322",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_investments.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "579",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/p_investments.jpg",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 322,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "322",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_investments.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "593",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 333,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "333",
      inputVector: "",
      url: "https://demo.testfire.net/images/index.jsp?content=personal_loans.htm",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "594",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 334,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "334",
      inputVector: "",
      url: "https://demo.testfire.net/images/index.jsp?content=business.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "608",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 334,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "334",
      inputVector: "",
      url: "https://demo.testfire.net/images/index.jsp?content=business.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "617",
      alertRef: "10035-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/Documents/JohnSmith/VoluteeringInformation.pdf",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 347,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "347",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/VoluteeringInformation.pdf",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "658",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 373,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "373",
      inputVector: "",
      url: "https://demo.testfire.net/images/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "660",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/ok.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 375,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "375",
      inputVector: "",
      url: "https://demo.testfire.net/images/ok.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "661",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/ok.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 375,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "375",
      inputVector: "",
      url: "https://demo.testfire.net/images/ok.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "663",
      alertRef: "10035-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/Documents/JohnSmith/VoluteeringInformation.pdf",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 347,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "347",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/VoluteeringInformation.pdf",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "664",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/static/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 381,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "381",
      inputVector: "",
      url: "https://demo.testfire.net/static/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "666",
      alertRef: "10038-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/Documents/JohnSmith/VoluteeringInformation.pdf",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 347,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "347",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/VoluteeringInformation.pdf",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "669",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/ok.gif",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 375,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "375",
      inputVector: "",
      url: "https://demo.testfire.net/images/ok.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "670",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/images/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 373,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "373",
      inputVector: "",
      url: "https://demo.testfire.net/images/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "672",
      alertRef: "10036-2",
    },
    {
      nodeName:
        "https://demo.testfire.net/Documents/JohnSmith/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 378,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "378",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/index.jsp?content=personal_deposit.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "674",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/static/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 381,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "381",
      inputVector: "",
      url: "https://demo.testfire.net/static/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "677",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 379,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "379",
      inputVector: "",
      url: "https://demo.testfire.net/images/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "678",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/default.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 376,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "376",
      inputVector: "",
      url: "https://demo.testfire.net/default.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "679",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 373,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "373",
      inputVector: "",
      url: "https://demo.testfire.net/images/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "681",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/static/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 381,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "381",
      inputVector: "",
      url: "https://demo.testfire.net/static/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "684",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 379,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "379",
      inputVector: "",
      url: "https://demo.testfire.net/images/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "687",
      alertRef: "10036-2",
    },
    {
      nodeName:
        "https://demo.testfire.net/Documents/JohnSmith/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 378,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "378",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/index.jsp?content=personal_deposit.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "688",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/default.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 376,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "376",
      inputVector: "",
      url: "https://demo.testfire.net/default.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "691",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/default.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 376,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "376",
      inputVector: "",
      url: "https://demo.testfire.net/default.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "696",
      alertRef: "10035-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/Documents/JohnSmith/index.jsp (content)",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 380,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "380",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/index.jsp?content=personal_checking.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "699",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 379,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "379",
      inputVector: "",
      url: "https://demo.testfire.net/images/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "701",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/static/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 387,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "387",
      inputVector: "",
      url: "https://demo.testfire.net/static/cgi.exe",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "702",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/security.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 388,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "388",
      inputVector: "",
      url: "https://demo.testfire.net/security.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "704",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/security.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 388,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "388",
      inputVector: "",
      url: "https://demo.testfire.net/security.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "714",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/static/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 387,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "387",
      inputVector: "",
      url: "https://demo.testfire.net/static/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "716",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/static/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 387,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "387",
      inputVector: "",
      url: "https://demo.testfire.net/static/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "720",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/security.htm",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 388,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "388",
      inputVector: "",
      url: "https://demo.testfire.net/security.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "721",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/cancel.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 394,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "394",
      inputVector: "",
      url: "https://demo.testfire.net/images/cancel.gif",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "732",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/cancel.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 394,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "394",
      inputVector: "",
      url: "https://demo.testfire.net/images/cancel.gif",
      tags: {
        POLICY_QA_STD: "",
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "734",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/cancel.gif",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 394,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "394",
      inputVector: "",
      url: "https://demo.testfire.net/images/cancel.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "736",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/Documents/JohnSmith/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 398,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "398",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "744",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/altoro.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 409,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "409",
      inputVector: "",
      url: "https://demo.testfire.net/images/altoro.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "760",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/Documents/JohnSmith/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 398,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "398",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "761",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/images/altoro.gif",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 409,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "409",
      inputVector: "",
      url: "https://demo.testfire.net/images/altoro.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "762",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/Documents/JohnSmith/subscribe.jsp",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 398,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "398",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "768",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/images/altoro.gif",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 409,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "409",
      inputVector: "",
      url: "https://demo.testfire.net/images/altoro.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "769",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/swagger-ui.css",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 403,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "403",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui.css",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "777",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/swagger-ui.css",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 403,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "403",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui.css",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "778",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/swagger-ui.css",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 403,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "403",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui.css",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "779",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/Documents/JohnSmith/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10038",
      cweid: "693",
      confidence: "High",
      sourceMessageId: 413,
      wascid: "15",
      description:
        "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.",
      messageId: "413",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP\nhttps://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html\nhttps://www.w3.org/TR/CSP/\nhttps://w3c.github.io/webappsec-csp/\nhttps://web.dev/articles/csp\nhttps://caniuse.com/#feat=contentsecuritypolicy\nhttps://content-security-policy.com/",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
      alert: "Content Security Policy (CSP) Header Not Set",
      param: "",
      attack: "",
      name: "Content Security Policy (CSP) Header Not Set",
      risk: "Medium",
      id: "780",
      alertRef: "10038-1",
    },
    {
      nodeName: "https://demo.testfire.net/Documents/JohnSmith/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 413,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "413",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "785",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/Documents/JohnSmith/cgi.exe",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 413,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "413",
      inputVector: "",
      url: "https://demo.testfire.net/Documents/JohnSmith/cgi.exe",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "786",
      alertRef: "10035-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      sourceid: "3",
      other:
        'The following pattern was used: \\bFROM\\b and was detected in likely comment: "//","#"==f][--p];);l+=f}}(t)},e.mapToList=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"key";var r", see evidence field for the suspicious comment/snippet.',
      method: "GET",
      evidence: "from",
      pluginId: "10027",
      cweid: "615",
      confidence: "Low",
      sourceMessageId: 418,
      wascid: "13",
      description:
        "The response appears to contain suspicious comments which may help an attacker.",
      messageId: "418",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_PENTEST: "",
        "CWE-615": "https://cwe.mitre.org/data/definitions/615.html",
        "WSTG-v42-INFO-05":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/05-Review_Webpage_Content_for_Information_Leakage",
        OWASP_2017_A03:
          "https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure.html",
      },
      reference: "",
      solution:
        "Remove all comments that return information that may help an attacker and fix any underlying problems they refer to.",
      alert: "Information Disclosure - Suspicious Comments",
      param: "",
      attack: "",
      name: "Information Disclosure - Suspicious Comments",
      risk: "Informational",
      id: "804",
      alertRef: "10027",
    },
    {
      nodeName:
        "https://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 418,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "418",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "805",
      alertRef: "10036-2",
    },
    {
      nodeName:
        "https://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 418,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "418",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "806",
      alertRef: "10035-1",
    },
    {
      nodeName:
        "https://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 418,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "418",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "807",
      alertRef: "10021",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/swagger-ui-bundle.js",
      sourceid: "3",
      other:
        'The following pattern was used: \\bSELECT\\b and was detected in likely comment: "//facebook.github.io/react/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);n+", see evidence field for the suspicious comment/snippet.',
      method: "GET",
      evidence: "select",
      pluginId: "10027",
      cweid: "615",
      confidence: "Low",
      sourceMessageId: 423,
      wascid: "13",
      description:
        "The response appears to contain suspicious comments which may help an attacker.",
      messageId: "423",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui-bundle.js",
      tags: {
        OWASP_2021_A01:
          "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        POLICY_PENTEST: "",
        "CWE-615": "https://cwe.mitre.org/data/definitions/615.html",
        "WSTG-v42-INFO-05":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/05-Review_Webpage_Content_for_Information_Leakage",
        OWASP_2017_A03:
          "https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure.html",
      },
      reference: "",
      solution:
        "Remove all comments that return information that may help an attacker and fix any underlying problems they refer to.",
      alert: "Information Disclosure - Suspicious Comments",
      param: "",
      attack: "",
      name: "Information Disclosure - Suspicious Comments",
      risk: "Informational",
      id: "823",
      alertRef: "10027",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/swagger-ui-bundle.js",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "Apache-Coyote/1.1",
      pluginId: "10036",
      cweid: "497",
      confidence: "High",
      sourceMessageId: 423,
      wascid: "13",
      description:
        'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
      messageId: "423",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui-bundle.js",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-INFO-02":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
        "CWE-497": "https://cwe.mitre.org/data/definitions/497.html",
      },
      reference:
        "https://httpd.apache.org/docs/current/mod/core.html#servertokens\nhttps://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)\nhttps://www.troyhunt.com/shhh-dont-let-your-response-headers/",
      solution:
        'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
      alert:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      param: "",
      attack: "",
      name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
      risk: "Low",
      id: "824",
      alertRef: "10036-2",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/swagger-ui-bundle.js",
      sourceid: "3",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10035",
      cweid: "319",
      confidence: "High",
      sourceMessageId: 423,
      wascid: "15",
      description:
        "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.",
      messageId: "423",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui-bundle.js",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
      alert: "Strict-Transport-Security Header Not Set",
      param: "",
      attack: "",
      name: "Strict-Transport-Security Header Not Set",
      risk: "Low",
      id: "825",
      alertRef: "10035-1",
    },
    {
      nodeName: "https://demo.testfire.net/swagger/swagger-ui-bundle.js",
      sourceid: "3",
      other:
        'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
      method: "GET",
      evidence: "",
      pluginId: "10021",
      cweid: "693",
      confidence: "Medium",
      sourceMessageId: 423,
      wascid: "15",
      description:
        "The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.",
      messageId: "423",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui-bundle.js",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_STD: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      },
      reference:
        "https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)\nhttps://owasp.org/www-community/Security_Headers",
      solution:
        "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.",
      alert: "X-Content-Type-Options Header Missing",
      param: "x-content-type-options",
      attack: "",
      name: "X-Content-Type-Options Header Missing",
      risk: "Low",
      id: "826",
      alertRef: "10021",
    },
    {
      nodeName:
        "https://demo.testfire.net/sendFeedback ()(cfile,comments,email_addr,name,subject,submit)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "</p><scrIpt>alert(1);</scRipt><p>",
      pluginId: "40012",
      cweid: "79",
      confidence: "Medium",
      sourceMessageId: 125,
      wascid: "8",
      description:
        "Cross-site Scripting (XSS) is an attack technique that involves echoing attacker-supplied code into a user's browser instance. A browser instance can be a standard web browser client, or a browser object embedded in a software product such as the browser within WinAmp, an RSS reader, or an email client. The code itself is usually written in HTML/JavaScript, but may also extend to VBScript, ActiveX, Java, Flash, or any other browser-supported technology.\nWhen an attacker gets a user's browser to execute his/her code, the code will run within the security context (or zone) of the hosting web site. With this level of privilege, the code has the ability to read, modify and transmit any sensitive data accessible by the browser. A Cross-site Scripted user could have his/her account hijacked (cookie theft), their browser redirected to another location, or possibly shown fraudulent content delivered by the web site they are visiting. Cross-site Scripting attacks essentially compromise the trust relationship between a user and the web site. Applications utilizing browser object instances which load content from the file system may execute code under the local machine zone allowing for system compromise.\n\nThere are three types of Cross-site Scripting attacks: non-persistent, persistent and DOM-based.\nNon-persistent attacks and DOM-based attacks require a user to either visit a specially crafted link laced with malicious code, or visit a malicious web page containing a web form, which when posted to the vulnerable site, will mount the attack. Using a malicious form will oftentimes take place when the vulnerable resource only accepts HTTP POST requests. In such a case, the form can be submitted automatically, without the victim's knowledge (e.g. by using JavaScript). Upon clicking on the malicious link or submitting the malicious form, the XSS payload will get echoed back and will get interpreted by the user's browser and execute. Another technique to send almost arbitrary requests (GET and POST) is by using an embedded client, such as Adobe Flash.\nPersistent attacks occur when the malicious code is submitted to a web site where it's stored for a period of time. Examples of an attacker's favorite targets often include message board posts, web mail messages, and web chat software. The unsuspecting user is not required to interact with any additional site/link (e.g. an attacker site or a malicious link sent via email), just simply view the web page containing the code.",
      messageId: "1775",
      inputVector: "form",
      url: "https://demo.testfire.net/sendFeedback",
      tags: {
        "CWE-79": "https://cwe.mitre.org/data/definitions/79.html",
        POLICY_SEQUENCE: "",
        OWASP_2021_A03: "https://owasp.org/Top10/A03_2021-Injection/",
        PCI_DSS:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#compliance",
        "WSTG-v42-INPV-01":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting",
        POLICY_QA_CICD: "",
        POLICY_DEV_CICD: "",
        POLICY_DEV_FULL: "",
        POLICY_QA_STD: "",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        HIPAA:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#compliance",
        OWASP_2017_A07:
          "https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS).html",
        POLICY_DEV_STD: "",
      },
      reference:
        "https://owasp.org/www-community/attacks/xss/\nhttps://cwe.mitre.org/data/definitions/79.html",
      solution:
        'Phase: Architecture and Design\nUse a vetted library or framework that does not allow this weakness to occur or provides constructs that make this weakness easier to avoid.\nExamples of libraries and frameworks that make it easier to generate properly encoded output include Microsoft\'s Anti-XSS library, the OWASP ESAPI Encoding module, and Apache Wicket.\n\nPhases: Implementation; Architecture and Design\nUnderstand the context in which your data will be used and the encoding that will be expected. This is especially important when transmitting data between different components, or when generating outputs that can contain multiple encodings at the same time, such as web pages or multi-part mail messages. Study all expected communication protocols and data representations to determine the required encoding strategies.\nFor any data that will be output to another web page, especially any data that was received from external inputs, use the appropriate encoding on all non-alphanumeric characters.\nConsult the XSS Prevention Cheat Sheet for more details on the types of encoding and escaping that are needed.\n\nPhase: Architecture and Design\nFor any security checks that are performed on the client side, ensure that these checks are duplicated on the server side, in order to avoid CWE-602. Attackers can bypass the client-side checks by modifying values after the checks have been performed, or by changing the client to remove the client-side checks entirely. Then, these modified values would be submitted to the server.\n\nIf available, use structured mechanisms that automatically enforce the separation between data and code. These mechanisms may be able to provide the relevant quoting, encoding, and validation automatically, instead of relying on the developer to provide this capability at every point where output is generated.\n\nPhase: Implementation\nFor every web page that is generated, use and specify a character encoding such as ISO-8859-1 or UTF-8. When an encoding is not specified, the web browser may choose a different encoding by guessing which encoding is actually being used by the web page. This can cause the web browser to treat certain sequences as special, opening up the client to subtle XSS attacks. See CWE-116 for more mitigations related to encoding/escaping.\n\nTo help mitigate XSS attacks against the user\'s session cookie, set the session cookie to be HttpOnly. In browsers that support the HttpOnly feature (such as more recent versions of Internet Explorer and Firefox), this attribute can prevent the user\'s session cookie from being accessible to malicious client-side scripts that use document.cookie. This is not a complete solution, since HttpOnly is not supported by all browsers. More importantly, XMLHTTPRequest and other powerful browser technologies provide read access to HTTP headers, including the Set-Cookie header in which the HttpOnly flag is set.\n\nAssume all input is malicious. Use an "accept known good" input validation strategy, i.e., use an allow list of acceptable inputs that strictly conform to specifications. Reject any input that does not strictly conform to specifications, or transform it into something that does. Do not rely exclusively on looking for malicious or malformed inputs (i.e., do not rely on a deny list). However, deny lists can be useful for detecting potential attacks or determining which inputs are so malformed that they should be rejected outright.\n\nWhen performing input validation, consider all potentially relevant properties, including length, type of input, the full range of acceptable values, missing or extra inputs, syntax, consistency across related fields, and conformance to business rules. As an example of business rule logic, "boat" may be syntactically valid because it only contains alphanumeric characters, but it is not valid if you are expecting colors such as "red" or "blue."\n\nEnsure that you perform input validation at well-defined interfaces within the application. This will help protect the application even if a component is reused or moved elsewhere.\n\t',
      alert: "Cross Site Scripting (Reflected)",
      param: "name",
      attack: "</p><scrIpt>alert(1);</scRipt><p>",
      name: "Cross Site Scripting (Reflected)",
      risk: "High",
      id: "827",
      alertRef: "40012",
    },
    {
      nodeName: "https://demo.testfire.net/search.jsp (query)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "</p><scrIpt>alert(1);</scRipt><p>",
      pluginId: "40012",
      cweid: "79",
      confidence: "Medium",
      sourceMessageId: 100,
      wascid: "8",
      description:
        "Cross-site Scripting (XSS) is an attack technique that involves echoing attacker-supplied code into a user's browser instance. A browser instance can be a standard web browser client, or a browser object embedded in a software product such as the browser within WinAmp, an RSS reader, or an email client. The code itself is usually written in HTML/JavaScript, but may also extend to VBScript, ActiveX, Java, Flash, or any other browser-supported technology.\nWhen an attacker gets a user's browser to execute his/her code, the code will run within the security context (or zone) of the hosting web site. With this level of privilege, the code has the ability to read, modify and transmit any sensitive data accessible by the browser. A Cross-site Scripted user could have his/her account hijacked (cookie theft), their browser redirected to another location, or possibly shown fraudulent content delivered by the web site they are visiting. Cross-site Scripting attacks essentially compromise the trust relationship between a user and the web site. Applications utilizing browser object instances which load content from the file system may execute code under the local machine zone allowing for system compromise.\n\nThere are three types of Cross-site Scripting attacks: non-persistent, persistent and DOM-based.\nNon-persistent attacks and DOM-based attacks require a user to either visit a specially crafted link laced with malicious code, or visit a malicious web page containing a web form, which when posted to the vulnerable site, will mount the attack. Using a malicious form will oftentimes take place when the vulnerable resource only accepts HTTP POST requests. In such a case, the form can be submitted automatically, without the victim's knowledge (e.g. by using JavaScript). Upon clicking on the malicious link or submitting the malicious form, the XSS payload will get echoed back and will get interpreted by the user's browser and execute. Another technique to send almost arbitrary requests (GET and POST) is by using an embedded client, such as Adobe Flash.\nPersistent attacks occur when the malicious code is submitted to a web site where it's stored for a period of time. Examples of an attacker's favorite targets often include message board posts, web mail messages, and web chat software. The unsuspecting user is not required to interact with any additional site/link (e.g. an attacker site or a malicious link sent via email), just simply view the web page containing the code.",
      messageId: "1796",
      inputVector: "querystring",
      url: "https://demo.testfire.net/search.jsp?query=%3C%2Fp%3E%3CscrIpt%3Ealert%281%29%3B%3C%2FscRipt%3E%3Cp%3E",
      tags: {
        "CWE-79": "https://cwe.mitre.org/data/definitions/79.html",
        POLICY_SEQUENCE: "",
        OWASP_2021_A03: "https://owasp.org/Top10/A03_2021-Injection/",
        PCI_DSS:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#compliance",
        "WSTG-v42-INPV-01":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting",
        POLICY_QA_CICD: "",
        POLICY_DEV_CICD: "",
        POLICY_DEV_FULL: "",
        POLICY_QA_STD: "",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        HIPAA:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#compliance",
        OWASP_2017_A07:
          "https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS).html",
        POLICY_DEV_STD: "",
      },
      reference:
        "https://owasp.org/www-community/attacks/xss/\nhttps://cwe.mitre.org/data/definitions/79.html",
      solution:
        'Phase: Architecture and Design\nUse a vetted library or framework that does not allow this weakness to occur or provides constructs that make this weakness easier to avoid.\nExamples of libraries and frameworks that make it easier to generate properly encoded output include Microsoft\'s Anti-XSS library, the OWASP ESAPI Encoding module, and Apache Wicket.\n\nPhases: Implementation; Architecture and Design\nUnderstand the context in which your data will be used and the encoding that will be expected. This is especially important when transmitting data between different components, or when generating outputs that can contain multiple encodings at the same time, such as web pages or multi-part mail messages. Study all expected communication protocols and data representations to determine the required encoding strategies.\nFor any data that will be output to another web page, especially any data that was received from external inputs, use the appropriate encoding on all non-alphanumeric characters.\nConsult the XSS Prevention Cheat Sheet for more details on the types of encoding and escaping that are needed.\n\nPhase: Architecture and Design\nFor any security checks that are performed on the client side, ensure that these checks are duplicated on the server side, in order to avoid CWE-602. Attackers can bypass the client-side checks by modifying values after the checks have been performed, or by changing the client to remove the client-side checks entirely. Then, these modified values would be submitted to the server.\n\nIf available, use structured mechanisms that automatically enforce the separation between data and code. These mechanisms may be able to provide the relevant quoting, encoding, and validation automatically, instead of relying on the developer to provide this capability at every point where output is generated.\n\nPhase: Implementation\nFor every web page that is generated, use and specify a character encoding such as ISO-8859-1 or UTF-8. When an encoding is not specified, the web browser may choose a different encoding by guessing which encoding is actually being used by the web page. This can cause the web browser to treat certain sequences as special, opening up the client to subtle XSS attacks. See CWE-116 for more mitigations related to encoding/escaping.\n\nTo help mitigate XSS attacks against the user\'s session cookie, set the session cookie to be HttpOnly. In browsers that support the HttpOnly feature (such as more recent versions of Internet Explorer and Firefox), this attribute can prevent the user\'s session cookie from being accessible to malicious client-side scripts that use document.cookie. This is not a complete solution, since HttpOnly is not supported by all browsers. More importantly, XMLHTTPRequest and other powerful browser technologies provide read access to HTTP headers, including the Set-Cookie header in which the HttpOnly flag is set.\n\nAssume all input is malicious. Use an "accept known good" input validation strategy, i.e., use an allow list of acceptable inputs that strictly conform to specifications. Reject any input that does not strictly conform to specifications, or transform it into something that does. Do not rely exclusively on looking for malicious or malformed inputs (i.e., do not rely on a deny list). However, deny lists can be useful for detecting potential attacks or determining which inputs are so malformed that they should be rejected outright.\n\nWhen performing input validation, consider all potentially relevant properties, including length, type of input, the full range of acceptable values, missing or extra inputs, syntax, consistency across related fields, and conformance to business rules. As an example of business rule logic, "boat" may be syntactically valid because it only contains alphanumeric characters, but it is not valid if you are expecting colors such as "red" or "blue."\n\nEnsure that you perform input validation at well-defined interfaces within the application. This will help protect the application even if a component is reused or moved elsewhere.\n\t',
      alert: "Cross Site Scripting (Reflected)",
      param: "query",
      attack: "</p><scrIpt>alert(1);</scRipt><p>",
      name: "Cross Site Scripting (Reflected)",
      risk: "High",
      id: "828",
      alertRef: "40012",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other:
        "The page results were successfully manipulated using the boolean conditions [ZAP' AND '1'='1' -- ] and [ZAP' OR '1'='1' -- ]\nThe parameter value being modified was stripped from the HTML output for the purposes of the comparison.\nData was NOT returned for the original parameter.\nThe vulnerability was detected by successfully retrieving more data than originally returned, by manipulating the parameter.",
      method: "POST",
      evidence: "",
      pluginId: "40018",
      cweid: "89",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "19",
      description: "SQL injection may be possible.",
      messageId: "2083",
      inputVector: "form",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_SEQUENCE: "",
        OWASP_2021_A03: "https://owasp.org/Top10/A03_2021-Injection/",
        PCI_DSS:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#compliance",
        "CWE-89": "https://cwe.mitre.org/data/definitions/89.html",
        POLICY_QA_CICD: "",
        POLICY_DEV_CICD: "",
        "WSTG-v42-INPV-05":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05-Testing_for_SQL_Injection",
        POLICY_API: "",
        POLICY_DEV_FULL: "",
        POLICY_QA_STD: "",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        HIPAA:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#compliance",
        OWASP_2017_A01:
          "https://owasp.org/www-project-top-ten/2017/A1_2017-Injection.html",
        POLICY_DEV_STD: "",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
      solution:
        "Do not trust client side input, even if there is client side validation in place.\nIn general, type check all data on the server side.\nIf the application uses JDBC, use PreparedStatement or CallableStatement, with parameters passed by '?'\nIf the application uses ASP, use ADO Command Objects with strong type checking and parameterized queries.\nIf database Stored Procedures can be used, use them.\nDo *not* concatenate strings into queries in the stored procedure, or use 'exec', 'exec immediate', or equivalent functionality!\nDo not create dynamic SQL queries using simple string concatenation.\nEscape all data received from the client.\nApply an 'allow list' of allowed characters, or a 'deny list' of disallowed characters in user input.\nApply the principle of least privilege by using the least privileged database user possible.\nIn particular, avoid using the 'sa' or 'db-owner' database users. This does not eliminate SQL injection, but minimizes its impact.\nGrant the minimum database access that is necessary for the application.",
      alert: "SQL Injection",
      param: "uid",
      attack: "ZAP' OR '1'='1' -- ",
      name: "SQL Injection",
      risk: "High",
      id: "829",
      alertRef: "40018",
    },
    {
      nodeName:
        "http://demo.testfire.net/sendFeedback ()(cfile,comments,email_addr,name,subject,submit)",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/sendFeedback",
      method: "POST",
      evidence: "http://demo.testfire.net/sendFeedback",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 125,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6408",
      inputVector: "",
      url: "https://demo.testfire.net/sendFeedback",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "830",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/",
      sourceid: "1",
      other: "ZAP attempted to connect via: http://demo.testfire.net/",
      method: "GET",
      evidence: "http://demo.testfire.net/",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 6,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6411",
      inputVector: "",
      url: "https://demo.testfire.net/",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "831",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/adobe.gif",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/adobe.gif",
      method: "GET",
      evidence: "http://demo.testfire.net/images/adobe.gif",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 212,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6423",
      inputVector: "",
      url: "https://demo.testfire.net/images/adobe.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "833",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/high_yield_investments.htm",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/high_yield_investments.htm",
      method: "GET",
      evidence: "http://demo.testfire.net/high_yield_investments.htm",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 281,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6426",
      inputVector: "",
      url: "https://demo.testfire.net/high_yield_investments.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "834",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/feedback.jsp",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/feedback.jsp",
      method: "GET",
      evidence: "http://demo.testfire.net/feedback.jsp",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 50,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6427",
      inputVector: "",
      url: "https://demo.testfire.net/feedback.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "835",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/b_insurance.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/b_insurance.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/b_insurance.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 197,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6430",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_insurance.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "836",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/b_other.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/b_other.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/b_other.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 169,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6433",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_other.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "837",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/altoro.gif",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/altoro.gif",
      method: "GET",
      evidence: "http://demo.testfire.net/images/altoro.gif",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 409,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6434",
      inputVector: "",
      url: "https://demo.testfire.net/images/altoro.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "838",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/b_main.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/b_main.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/b_main.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 218,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6437",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_main.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "839",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/inside4.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/inside4.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/inside4.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 111,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6438",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside4.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "840",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/b_cards.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/b_cards.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/b_cards.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 291,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6440",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_cards.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "841",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/b_retirement.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/b_retirement.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/b_retirement.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 277,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6442",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_retirement.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "842",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/inside7.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/inside7.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/inside7.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 310,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6444",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside7.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "843",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/b_deposit.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/b_deposit.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/b_deposit.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 181,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6446",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_deposit.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "844",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/home3.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/home3.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/home3.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 124,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6448",
      inputVector: "",
      url: "https://demo.testfire.net/images/home3.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "845",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/home2.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/home2.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/home2.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 84,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6450",
      inputVector: "",
      url: "https://demo.testfire.net/images/home2.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "846",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/inside1.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/inside1.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/inside1.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 292,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6452",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside1.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "847",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/home1.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/home1.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/home1.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 83,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6454",
      inputVector: "",
      url: "https://demo.testfire.net/images/home1.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "848",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/ok.gif",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/ok.gif",
      method: "GET",
      evidence: "http://demo.testfire.net/images/ok.gif",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 375,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6456",
      inputVector: "",
      url: "https://demo.testfire.net/images/ok.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "849",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/header_pic.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/header_pic.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/header_pic.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 81,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6459",
      inputVector: "",
      url: "https://demo.testfire.net/images/header_pic.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "850",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/inside5.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/inside5.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/inside5.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 199,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6461",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside5.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "851",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/b_lending.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/b_lending.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/b_lending.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 198,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6462",
      inputVector: "",
      url: "https://demo.testfire.net/images/b_lending.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "852",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/inside6.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/inside6.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/inside6.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 318,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6465",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside6.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "853",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/inside3.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/inside3.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/inside3.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 119,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6466",
      inputVector: "",
      url: "https://demo.testfire.net/images/inside3.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "854",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/p_checking.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/p_checking.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/p_checking.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 285,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6468",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_checking.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "855",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/p_other.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/p_other.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/p_other.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 213,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6471",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_other.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "856",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/index.jsp (content,job)",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/index.jsp?content=inside_jobs.htm&job=MortgageLendingAccountExecutive:Sales",
      method: "GET",
      evidence:
        "http://demo.testfire.net/index.jsp?content=inside_jobs.htm&job=MortgageLendingAccountExecutive:Sales",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 315,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6472",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=inside_jobs.htm&job=MortgageLendingAccountExecutive:Sales",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "857",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/login.jsp",
      sourceid: "1",
      other: "ZAP attempted to connect via: http://demo.testfire.net/login.jsp",
      method: "GET",
      evidence: "http://demo.testfire.net/login.jsp",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 101,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6475",
      inputVector: "",
      url: "https://demo.testfire.net/login.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "858",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/index.jsp (content)",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/index.jsp?content=pr/20061109.htm",
      method: "GET",
      evidence: "http://demo.testfire.net/index.jsp?content=pr/20061109.htm",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 346,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6477",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp?content=pr/20061109.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "859",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/p_loans.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/p_loans.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/p_loans.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 203,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6479",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_loans.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "860",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/pf_lock.gif",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/pf_lock.gif",
      method: "GET",
      evidence: "http://demo.testfire.net/images/pf_lock.gif",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 82,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6483",
      inputVector: "",
      url: "https://demo.testfire.net/images/pf_lock.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "861",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/p_deposit.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/p_deposit.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/p_deposit.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 121,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6482",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_deposit.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "862",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/spacer.gif",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/spacer.gif",
      method: "GET",
      evidence: "http://demo.testfire.net/images/spacer.gif",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 278,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6485",
      inputVector: "",
      url: "https://demo.testfire.net/images/spacer.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "863",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/p_investments.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/p_investments.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/p_investments.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 322,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6487",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_investments.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "864",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/cancel.gif",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/cancel.gif",
      method: "GET",
      evidence: "http://demo.testfire.net/images/cancel.gif",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 394,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6489",
      inputVector: "",
      url: "https://demo.testfire.net/images/cancel.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "865",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/p_cards.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/p_cards.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/p_cards.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 118,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6492",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_cards.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "866",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/index.jsp",
      sourceid: "1",
      other: "ZAP attempted to connect via: http://demo.testfire.net/index.jsp",
      method: "GET",
      evidence: "http://demo.testfire.net/index.jsp",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 112,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6493",
      inputVector: "",
      url: "https://demo.testfire.net/index.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "867",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/disclaimer.htm (url)",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/disclaimer.htm?url=http://www.netscape.com",
      method: "GET",
      evidence:
        "http://demo.testfire.net/disclaimer.htm?url=http://www.netscape.com",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 332,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6495",
      inputVector: "",
      url: "https://demo.testfire.net/disclaimer.htm?url=http://www.netscape.com",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "868",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/logo.gif",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/logo.gif",
      method: "GET",
      evidence: "http://demo.testfire.net/images/logo.gif",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 79,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6498",
      inputVector: "",
      url: "https://demo.testfire.net/images/logo.gif",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "869",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/images/p_main.jpg",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/images/p_main.jpg",
      method: "GET",
      evidence: "http://demo.testfire.net/images/p_main.jpg",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 126,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6501",
      inputVector: "",
      url: "https://demo.testfire.net/images/p_main.jpg",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "870",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/retirement.htm",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/retirement.htm",
      method: "GET",
      evidence: "http://demo.testfire.net/retirement.htm",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 176,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6506",
      inputVector: "",
      url: "https://demo.testfire.net/retirement.htm",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "871",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/search.jsp (query)",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/search.jsp?query=ZAP",
      method: "GET",
      evidence: "http://demo.testfire.net/search.jsp?query=ZAP",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 100,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6508",
      inputVector: "",
      url: "https://demo.testfire.net/search.jsp?query=ZAP",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "872",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/style.css",
      sourceid: "1",
      other: "ZAP attempted to connect via: http://demo.testfire.net/style.css",
      method: "GET",
      evidence: "http://demo.testfire.net/style.css",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 91,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6512",
      inputVector: "",
      url: "https://demo.testfire.net/style.css",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "873",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/survey_questions.jsp",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/survey_questions.jsp",
      method: "GET",
      evidence: "http://demo.testfire.net/survey_questions.jsp",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 141,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6516",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "874",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/subscribe.swf",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/subscribe.swf",
      method: "GET",
      evidence: "http://demo.testfire.net/subscribe.swf",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 298,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6517",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.swf",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "875",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/subscribe.jsp",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/subscribe.jsp",
      method: "GET",
      evidence: "http://demo.testfire.net/subscribe.jsp",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 113,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6518",
      inputVector: "",
      url: "https://demo.testfire.net/subscribe.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "876",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/swagger/index.html",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/swagger/index.html",
      method: "GET",
      evidence: "http://demo.testfire.net/swagger/index.html",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 92,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6522",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/index.html",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "877",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/swagger/favicon-32x32.png",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/swagger/favicon-32x32.png",
      method: "GET",
      evidence: "http://demo.testfire.net/swagger/favicon-32x32.png",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 140,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6523",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/favicon-32x32.png",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "878",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/swagger/favicon-16x16.png",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/swagger/favicon-16x16.png",
      method: "GET",
      evidence: "http://demo.testfire.net/swagger/favicon-16x16.png",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 185,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6525",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/favicon-16x16.png",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "879",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/status_check.jsp",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/status_check.jsp",
      method: "GET",
      evidence: "http://demo.testfire.net/status_check.jsp",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 99,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6527",
      inputVector: "",
      url: "https://demo.testfire.net/status_check.jsp",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "880",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/pr/communityannualreport.pdf",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/pr/communityannualreport.pdf",
      method: "GET",
      evidence: "http://demo.testfire.net/pr/communityannualreport.pdf",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 307,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6529",
      inputVector: "",
      url: "https://demo.testfire.net/pr/communityannualreport.pdf",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "881",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/survey_questions.jsp?step=d",
      method: "GET",
      evidence: "http://demo.testfire.net/survey_questions.jsp?step=d",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6531",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "882",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/swagger/swagger-ui.css",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/swagger/swagger-ui.css",
      method: "GET",
      evidence: "http://demo.testfire.net/swagger/swagger-ui.css",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 403,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6533",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui.css",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "883",
      alertRef: "10047",
    },
    {
      nodeName:
        "http://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      method: "GET",
      evidence:
        "http://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 418,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6535",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui-standalone-preset.js",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "884",
      alertRef: "10047",
    },
    {
      nodeName: "http://demo.testfire.net/swagger/swagger-ui-bundle.js",
      sourceid: "1",
      other:
        "ZAP attempted to connect via: http://demo.testfire.net/swagger/swagger-ui-bundle.js",
      method: "GET",
      evidence: "http://demo.testfire.net/swagger/swagger-ui-bundle.js",
      pluginId: "10047",
      cweid: "311",
      confidence: "Medium",
      sourceMessageId: 423,
      wascid: "4",
      description:
        "Content which was initially accessed via HTTPS (i.e.: using SSL/TLS encryption) is also accessible via HTTP (without encryption).",
      messageId: "6537",
      inputVector: "",
      url: "https://demo.testfire.net/swagger/swagger-ui-bundle.js",
      tags: {
        OWASP_2021_A05:
          "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        POLICY_QA_FULL: "",
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        OWASP_2017_A06:
          "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "WSTG-v42-CRYP-03":
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels",
        "CWE-311": "https://cwe.mitre.org/data/definitions/311.html",
      },
      reference:
        "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html\nhttps://owasp.org/www-community/Security_Headers\nhttps://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security\nhttps://caniuse.com/stricttransportsecurity\nhttps://datatracker.ietf.org/doc/html/rfc6797",
      solution:
        "Ensure that your web server, application server, load balancer, etc. is configured to only serve such content via HTTPS. Consider implementing HTTP Strict Transport Security.",
      alert: "HTTPS Content Available via HTTP",
      param: "",
      attack: "",
      name: "HTTPS Content Available via HTTP",
      risk: "Low",
      id: "885",
      alertRef: "10047",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6555",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "886",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6562",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "887",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6569",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "888",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6572",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "889",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6589",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "890",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6599",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "891",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6604",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "892",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6615,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6615",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "893",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6618",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "894",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6637,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6637",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "895",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6643,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6643",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "896",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6656",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "897",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6662",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "898",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6670,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6670",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "899",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6705",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "900",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6707",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "901",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6712,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6712",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "902",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6731,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6731",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "903",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6734,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6734",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "904",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6754,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6754",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "905",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6760",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "msnbot/1.1 (+http://search.msn.com/msnbot.htm)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "906",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6767,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6767",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "msnbot/1.1 (+http://search.msn.com/msnbot.htm)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "907",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6773,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6773",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "908",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6774",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "909",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6787,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6787",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "910",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6792",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "911",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6800,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6800",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "912",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6804",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "913",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6812,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6812",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "914",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6817",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "915",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6822,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6822",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "916",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6827",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "917",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6834,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6834",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "918",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6844",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "919",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6857,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6857",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "920",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6866",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "921",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6868,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6868",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "922",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6880",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "923",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6891,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6891",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "msnbot/1.1 (+http://search.msn.com/msnbot.htm)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "924",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/images",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 6900,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6900",
      inputVector: "",
      url: "https://demo.testfire.net/images",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "925",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6907",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "926",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6913",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "msnbot/1.1 (+http://search.msn.com/msnbot.htm)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "927",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6930",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "928",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6957",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "929",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doSubscribe ()(btnSubmit,txtEmail)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 184,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "6983",
      inputVector: "",
      url: "https://demo.testfire.net/doSubscribe",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "930",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7000,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7000",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "931",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7029",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "932",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7045",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "msnbot/1.1 (+http://search.msn.com/msnbot.htm)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "933",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7066",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "934",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7081",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "935",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7085,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7085",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "936",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7106",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "937",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7119",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "938",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7134,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7134",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "939",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7157,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7157",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "940",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/doLogin ()(btnSubmit,passw,uid)",
      sourceid: "1",
      other: "",
      method: "POST",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 170,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7206",
      inputVector: "",
      url: "https://demo.testfire.net/doLogin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "941",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7210",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "942",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7229",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "943",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7234,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7234",
      inputVector: "",
      url: "https://demo.testfire.net/admin",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "944",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/admin/clients.xls",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 127,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7246",
      inputVector: "",
      url: "https://demo.testfire.net/admin/clients.xls",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "945",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7331,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7331",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "946",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7421,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7421",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "947",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7448,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7448",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "948",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7476,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7476",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "949",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7480,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7480",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "950",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7501,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7501",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "951",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7515,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7515",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "952",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7523,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7523",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "953",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7541,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7541",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "954",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7549,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7549",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "955",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7573,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7573",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "956",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7578",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "957",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7586",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "958",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7593,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7593",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "msnbot/1.1 (+http://search.msn.com/msnbot.htm)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "959",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7611",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "960",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7619,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7619",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "961",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7633,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7633",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "962",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7644",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "963",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7648,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7648",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "msnbot/1.1 (+http://search.msn.com/msnbot.htm)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "964",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7667,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7667",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "965",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7671,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7671",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "966",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7674,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7674",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "967",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7685,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7685",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "968",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7689,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7689",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "969",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7695,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7695",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "970",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7701,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7701",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "971",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7703,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7703",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "972",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7706,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7706",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "973",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7709",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "974",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7712,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7712",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "975",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7715,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7715",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "976",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7718",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "977",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/pr",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7721,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7721",
      inputVector: "",
      url: "https://demo.testfire.net/pr",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "978",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7724,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7724",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "979",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7732",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "msnbot/1.1 (+http://search.msn.com/msnbot.htm)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "980",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/static",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7735,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7735",
      inputVector: "",
      url: "https://demo.testfire.net/static",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "981",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7738",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "982",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7740,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7740",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "983",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7744",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "984",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7751,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7751",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack: "msnbot/1.1 (+http://search.msn.com/msnbot.htm)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "985",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7755,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7755",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "986",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7756",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "987",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7759,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7759",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "988",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7764,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7764",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "989",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7767",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "990",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7769,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7769",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "991",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/survey_questions.jsp (step)",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 422,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7771",
      inputVector: "",
      url: "https://demo.testfire.net/survey_questions.jsp?step=d",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "992",
      alertRef: "10104",
    },
    {
      nodeName: "https://demo.testfire.net/swagger",
      sourceid: "1",
      other: "",
      method: "GET",
      evidence: "",
      pluginId: "10104",
      cweid: "0",
      confidence: "Medium",
      sourceMessageId: 7774,
      wascid: "0",
      description:
        "Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.",
      messageId: "7774",
      inputVector: "",
      url: "https://demo.testfire.net/swagger",
      tags: {
        POLICY_PENTEST: "",
        SYSTEMIC:
          "https://www.zaproxy.org/docs/desktop/addons/common-library/alerttags/#systemic",
        CUSTOM_PAYLOADS: "",
      },
      reference: "https://owasp.org/wstg",
      solution: "",
      alert: "User Agent Fuzzer",
      param: "Header User-Agent",
      attack:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      name: "User Agent Fuzzer",
      risk: "Informational",
      id: "993",
      alertRef: "10104",
    },
  ],
};

// --- 2. HELPERS & REUSABLE UI ---

const AnimatedNumber = ({ value }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span>{rounded}</motion.span>;
};

// Toast Notification Component
const Toast = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 pointer-events-none"
  >
    <CheckCircle size={16} className="text-green-400" />
    <span className="text-sm font-medium">{message}</span>
  </motion.div>
);

const RiskBadge = ({ risk }) => {
  const styles = {
    High: "bg-red-50 text-red-700 border-red-100",
    Medium: "bg-orange-50 text-orange-700 border-orange-100",
    Low: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Informational: "bg-blue-50 text-blue-700 border-blue-100",
  };
  const defaultStyle = "bg-gray-50 text-gray-700 border-gray-100";

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[risk] || defaultStyle}`}
    >
      {risk}
    </span>
  );
};

const StatCard = ({ label, value, icon: Icon, colorClass, delay = 0 }) => {
  const getTheme = () => {
    if (colorClass.includes("orange"))
      return {
        bg: "bg-orange-50",
        ring: "bg-orange-400",
        text: "text-orange-600",
      };
    if (colorClass.includes("yellow"))
      return {
        bg: "bg-yellow-50",
        ring: "bg-yellow-400",
        text: "text-yellow-600",
      };
    if (colorClass.includes("blue"))
      return { bg: "bg-blue-50", ring: "bg-blue-400", text: "text-blue-600" };
    return { bg: "bg-gray-100", ring: "bg-gray-400", text: "text-gray-700" };
  };
  const theme = getTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
      className="relative bg-white p-5 rounded-xl border border-gray-200 shadow-sm overflow-hidden group cursor-default h-full"
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className={`relative p-3 rounded-lg ${theme.bg}`}>
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-0 rounded-lg ${theme.ring} opacity-20`}
          />
          <Icon size={24} className={theme.text} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900">
            <AnimatedNumber value={value} />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. CHART COMPONENT ---
const RiskDonutChart = ({ data, onFilterChange }) => {
  const chartData = [
    { name: "Medium", value: data.medium, color: "#f97316" },
    { name: "Low", value: data.low, color: "#eab308" },
    { name: "Info", value: data.info, color: "#3b82f6" },
  ].filter((item) => item.value > 0);

  return (
    <div className="h-64 w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center relative">
      <h3 className="text-gray-500 text-sm font-medium absolute top-4 left-4">
        Risk Distribution
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            onClick={(data) => {
              if (onFilterChange)
                onFilterChange(
                  data.name === "Info" ? "Informational" : data.name,
                );
            }}
            cursor="pointer"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            itemStyle={{
              color: "#374151",
              fontSize: "12px",
              fontWeight: "500",
            }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- 4. INTERACTIVE CARD COMPONENT ---
const VulnerabilityCard = ({
  data,
  isResolved,
  onToggleResolve,
  showToast,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Copy Logic
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(data.solution);
    setCopied(true);
    showToast("Solution copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResolve = (e) => {
    e.stopPropagation();
    onToggleResolve(data.id);
    if (!isResolved) showToast("Marked as Fixed");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`border rounded-lg hover:shadow-md transition-all duration-300 overflow-hidden ${
        isResolved ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
      }`}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 cursor-pointer flex items-start justify-between group"
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3 mb-1">
            <h3
              className={`text-sm font-semibold transition-colors ${
                isResolved
                  ? "text-green-800 line-through decoration-green-500/50"
                  : "text-gray-900 group-hover:text-blue-600"
              }`}
            >
              {data.name}
            </h3>

            {isResolved ? (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-200 text-green-800 border border-green-300 flex items-center gap-1 shadow-sm">
                <Check size={12} strokeWidth={3} /> FIXED
              </span>
            ) : (
              <RiskBadge risk={data.risk} />
            )}
          </div>
          <div className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-1">
            <Globe size={12} /> {data.url}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleResolve}
            className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 z-10 border ${
              isResolved
                ? "bg-white text-gray-500 border-gray-200 hover:text-gray-800 hover:bg-gray-50"
                : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-green-100 hover:text-green-600 hover:border-green-200"
            }`}
            title={isResolved ? "Undo Fix" : "Mark as Resolved"}
          >
            {isResolved ? <RotateCcw size={16} /> : <Check size={16} />}
          </button>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-gray-400"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100 bg-gray-50/50"
          >
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">
                    Description
                  </h4>
                  <p className="text-sm text-gray-700">{data.description}</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-gray-500 uppercase">
                      Solution
                    </h4>
                    <button
                      onClick={handleCopy}
                      className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? "Copied!" : "Copy Code"}
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 text-sm text-gray-700 font-mono shadow-sm">
                    {data.solution}
                  </div>
                </div>
              </div>
              {data.reference && (
                <div className="pt-2">
                  <a
                    href={data.reference.split("\n")[0]}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1 w-fit"
                  >
                    Open Documentation <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- 5. MAIN DASHBOARD ---

const SecurityReportDashboard = () => {
  const [filter, setFilter] = useState("All");
  const [resolvedIds, setResolvedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Stats Logic
  const stats = useMemo(() => {
    const total = SCAN_DATA.totalFindings;
    const medium = SCAN_DATA.vulnerabilities.filter(
      (v) => v.risk === "Medium",
    ).length;
    const low = SCAN_DATA.vulnerabilities.filter(
      (v) => v.risk === "Low",
    ).length;
    const info = SCAN_DATA.vulnerabilities.filter(
      (v) => v.risk === "Informational",
    ).length;
    return { total, medium, low, info };
  }, []);

  // Filter Logic (Search + Risk Tab)
  const filteredData = SCAN_DATA.vulnerabilities.filter((item) => {
    const matchesRisk = filter === "All" || item.risk === filter;
    return matchesRisk;
  });

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  const handleToggleResolve = (id) => {
    if (resolvedIds.includes(id)) {
      setResolvedIds(resolvedIds.filter((itemId) => itemId !== id));
    } else {
      setResolvedIds([...resolvedIds, id]);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Progress Calculation
  const progressPercentage = Math.round(
    (resolvedIds.length / SCAN_DATA.totalFindings) * 100,
  );

  // PDF Export
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Security Scan Report", 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Target: ${SCAN_DATA.target}`, 14, 30);
    doc.text(`Date: ${SCAN_DATA.scanDate}`, 14, 35);

    doc.text(`Total Findings: ${stats.total}`, 14, 45);
    doc.text(
      `Medium: ${stats.medium} | Low: ${stats.low} | Info: ${stats.info}`,
      14,
      50,
    );

    const tableColumn = ["Risk", "Status", "Vulnerability", "URL", "CWE ID"];
    const tableRows = [];

    SCAN_DATA.vulnerabilities.forEach((vuln) => {
      const isFixed = resolvedIds.includes(vuln.id) ? "FIXED" : "OPEN";
      const vulnerabilityData = [
        vuln.risk,
        isFixed,
        vuln.name,
        vuln.url,
        vuln.cweid,
      ];
      tableRows.push(vulnerabilityData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [31, 41, 55] },
    });

    doc.save("security_scan_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6 md:p-12 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation & Actions Row */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors py-2 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Go Back</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
          >
            <Download size={16} /> Export Report
          </button>
        </div>

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Scan Report
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              Target:{" "}
              <span className="font-mono text-gray-700 bg-gray-200 px-1.5 rounded">
                {SCAN_DATA.target}
              </span>
            </p>
          </div>

          {/* Progress Bar (Gamification) */}
          <div className="flex flex-col items-end gap-1 w-full md:w-auto">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <span>Remediation Progress</span>
              <span className="text-gray-900 font-bold">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full md:w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full ${progressPercentage === 100 ? "bg-green-500" : "bg-blue-600"}`}
              />
            </div>
          </div>
        </header>

        {/* ANALYTICS GRID: Chart + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <RiskDonutChart data={stats} onFilterChange={setFilter} />
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              label="Total Findings"
              value={stats.total}
              icon={Shield}
              colorClass="bg-gray-800"
              delay={0.1}
            />
            <StatCard
              label="Medium Risks"
              value={stats.medium}
              icon={AlertTriangle}
              colorClass="bg-orange-500"
              delay={0.2}
            />
            <StatCard
              label="Low Risks"
              value={stats.low}
              icon={AlertTriangle}
              colorClass="bg-yellow-500"
              delay={0.3}
            />
            <StatCard
              label="Informational"
              value={stats.info}
              icon={Info}
              colorClass="bg-blue-500"
              delay={0.4}
            />
          </div>
        </div>

        {/* Filters & List */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-800 w-full md:w-auto">
              Detailed Findings
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Filter Tabs */}
              <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex shadow-sm w-full sm:w-auto overflow-x-auto">
                {["All", "Medium", "Low", "Informational"].map((riskType) => (
                  <button
                    key={riskType}
                    onClick={() => setFilter(riskType)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                      filter === riskType
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {riskType}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredData.map((vuln, index) => (
                <VulnerabilityCard
                  key={vuln.id || index}
                  data={vuln}
                  isResolved={resolvedIds.includes(vuln.id)}
                  onToggleResolve={handleToggleResolve}
                  showToast={showToast}
                />
              ))}
            </AnimatePresence>
            {filteredData.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-400">
                  No vulnerabilities found matching criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityReportDashboard;
