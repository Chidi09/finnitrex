export const generateAcceptanceEmail = (clientName, projectType, projectId, depositAmount) => {
  const year = new Date().getFullYear();
  const logoUrl = "https://finnitrex.com/icon.svg";
  const portalUrl = `https://finnitrex.com/portal/${projectId}`;

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Courier New', monospace;">
      <table width="100%" border="0" style="background-color: #000000; color: #e5e7eb;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" border="0" style="border: 1px solid #333; border-radius: 8px; background-color: #050505; overflow: hidden;">
              
              <tr>
                <td style="padding: 30px; border-bottom: 1px solid #1f2937; background-color: #0a0a0a;">
                  <span style="font-size: 24px; font-weight: bold; color: #ffffff;">FINNI<span style="color: #bef264;">TREX</span></span><br/>
                  <span style="font-size: 10px; color: #10b981; letter-spacing: 2px;">SYSTEMS ARCHITECTURE</span>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #bef264; margin-top: 0;">PROJECT INITIALIZED</h2>
                  <p style="color: #d1d5db;">Hello ${clientName},</p>
                  <p style="color: #9ca3af;">We have accepted your request for: <strong style="color: #fff;">${projectType}</strong>.</p>
                  
                  <div style="background-color: #051a00; border: 1px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
                    <p style="color: #10b981; font-weight: bold; margin: 0 0 10px 0; font-size: 12px;">FINANCIAL COORDINATES (DEPOSIT REQUIRED)</p>
                    <p style="margin: 5px 0; color: #fff;">Amount Due: <strong>${depositAmount}</strong></p>
                    <p style="margin: 5px 0; color: #ccc;">Bank: <strong>Barclays UK</strong></p>
                    <p style="margin: 5px 0; color: #ccc;">Sort Code: <strong>20-00-00</strong></p>
                    <p style="margin: 5px 0; color: #ccc;">Account: <strong>87654321</strong></p>
                    <p style="margin: 5px 0; color: #ccc;">Ref: <strong>${projectId}</strong></p>
                  </div>

                  <p style="color: #9ca3af;">Use the encrypted link below to monitor progress and manage features.</p>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding-bottom: 40px;">
                  <a href="${portalUrl}" style="background-color: #bef264; color: #000; padding: 15px 30px; text-decoration: none; font-weight: bold; display: inline-block;">
                    OPEN PROJECT DASHBOARD
                  </a>
                </td>
              </tr>
              
              <tr>
                 <td style="background-color: #0a0a0a; padding: 20px; text-align: center; color: #555; font-size: 10px;">
                    483 Green Lanes, London, N13 4BS • +44 7521 511800<br/>
                    © ${year} Finnitrex. All rights reserved.
                 </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

