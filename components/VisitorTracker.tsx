"use client";

import Script from "next/script";

export default function VisitorTracker() {
  // 1. Enter your Tracking ID here (Get this from your Leadinfo/Albacross dashboard)
  const TRACKING_ID = "YOUR_ID_HERE";

  // 2. Select your provider by uncommenting the correct block below.
  // Currently set to: NONE (Safety default)

  return (
    <>
      {/* --- OPTION A: LEADINFO --- */}
      {/* <Script
        id="leadinfo-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(l,e,a,d,i,n,f,o){if(!l[i]){l.GlobalLeadinfoNamespace=l.GlobalLeadinfoNamespace||[];
            l.GlobalLeadinfoNamespace.push(i);l[i]=function(){(l[i].q=l[i].q||[]).push(arguments)};l[i].t=l[i].t||n;
            l[i].q=l[i].q||[];o=e.createElement(a);f=e.getElementsByTagName(a)[0];o.async=1;o.src=d;f.parentNode.insertBefore(o,f);}
            }(window,document,"script","https://cdn.leadinfo.net/ping.js","leadinfo","${TRACKING_ID}"));
          `
        }}
      />
      */}

      {/* --- OPTION B: ALBACROSS --- */}
      {/*
      <Script
        id="albacross-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(a,l,b,c,r,s){_nQc=c,r=a.createElement(l),s=a.getElementsByTagName(l)[0];r.async=1;
            r.src=l.src=("https:"==a.location.protocol?"https://":"http://")+b;s.parentNode.insertBefore(r,s);
            })(document,"script","serve.albacross.com/track.js","${TRACKING_ID}");
          `
        }}
      />
      */}
    </>
  );
}
