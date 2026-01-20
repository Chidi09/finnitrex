export const generateAcceptanceEmail = (
  clientName,
  projectType,
  projectId,
  depositAmount,
  bank
) => {
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
                  <table width="100%">
                    <tr>
                      <td width="60" align="left">
                        <img src="${logoUrl}" width="50" height="50" alt="Finnitrex Logo" style="display:block;border-radius:8px;background-color:#051a00;" />
                      </td>
                      <td align="left" style="padding-left: 15px;">
                        <span style="font-size: 24px; font-weight: bold; color: #ffffff; letter-spacing: 2px;">FINNI<span style="color: #bef264;">TREX</span></span><br/>
                        <span style="font-size: 10px; color: #10b981; letter-spacing: 3px; font-weight: bold;">SYSTEMS ARCHITECTURE</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding: 10px 30px; background-color: #1a2e05; border-bottom: 1px solid #bef264;">
                  <span style="color: #bef264; font-size: 12px; font-weight: bold;">● STATUS: PROJECT INITIALIZED</span>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px 30px;">
                  <p style="color: #ffffff; font-size: 18px; margin-bottom: 20px;">Hello ${clientName},</p>
                  
                  <p style="color: #9ca3af; line-height: 1.6; margin-bottom: 20px;">
                    Your request for <strong>${projectType}</strong> has been accepted into the Finnitrex build pipeline.
                    The system has reserved a project space with ID <span style="color:#bef264;font-weight:bold;">${projectId}</span>.
                  </p>

                  <div style="background-color: #051a00; border: 1px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
                    <p style="color: #10b981; font-weight: bold; margin: 0 0 10px 0; font-size: 12px;">SECURE PAYMENT GATEWAY</p>
                    <p style="margin: 5px 0; color: #fff;">Amount Due: <strong>${depositAmount}</strong></p>
                    <hr style="border-color:#10b981;opacity:0.3;margin:12px 0;" />
                    <p style="margin: 3px 0; color: #ccc;">Bank: <strong>${bank?.bank}</strong></p>
                    <p style="margin: 3px 0; color: #ccc;">Sort Code: <strong>${bank?.sort}</strong></p>
                    <p style="margin: 3px 0; color: #ccc;">Account: <strong>${bank?.acc}</strong></p>
                    <p style="margin: 8px 0 0 0; color: #fff;">Ref Code: <strong>${projectId}</strong> (must be included with your transfer)</p>
                  </div>

                  <p style="color: #9ca3af; font-size: 14px; line-height:1.6;">
                    Once your payment is sent, you can verify it via WhatsApp or email from your project dashboard.
                    The live status of your build will be available at the link below.
                  </p>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding-bottom: 40px;">
                  <a href="${portalUrl}" style="background-color: #bef264; color: #000; padding: 12px 30px; text-decoration: none; font-weight: bold; font-size: 14px; border-radius: 4px; display: inline-block;">
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

