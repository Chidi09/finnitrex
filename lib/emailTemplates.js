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

export const generateInvoiceEmail = (quoteData, invoiceNumber, expiresAt) => {
  const year = new Date().getFullYear();
  const logoUrl = "https://finnitrex.com/icon.svg";
  const invoiceDate = new Date().toLocaleDateString('en-GB', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const expiryDate = new Date(expiresAt).toLocaleDateString('en-GB', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Build items list
  let itemsHtml = '';
  
  // Base package
  if (quoteData.basePackage) {
    const packageName = quoteData.basePackage === 'brochure' ? 'Simple Brochure Site' :
                        quoteData.basePackage === 'business' ? 'Standard Business Site' :
                        quoteData.basePackage === 'ecommerce' ? 'E-commerce Website' :
                        'Bespoke Web Application';
    
    itemsHtml += `
      <tr style="border-bottom: 1px solid #1f2937;">
        <td style="padding: 12px 0; color: #fff; font-weight: bold;">${packageName}</td>
        <td style="padding: 12px 0; text-align: right; color: #9ca3af; font-family: monospace;">1</td>
        <td style="padding: 12px 0; text-align: right; color: #9ca3af; font-family: monospace;">£${quoteData.baseTotal.toLocaleString()}</td>
        <td style="padding: 12px 0; text-align: right; color: #bef264; font-family: monospace; font-weight: bold;">£${quoteData.baseTotal.toLocaleString()}</td>
      </tr>
    `;
  }

  // Features
  Object.entries(quoteData.selectedFeatures || {}).forEach(([key, enabled]) => {
    if (enabled && quoteData.featureNames?.[key] && quoteData.featurePrices?.[key]) {
      const quantity = quoteData.featureQuantities?.[key] || 1;
      const featurePrice = quoteData.featurePrices[key];
      const total = featurePrice * quantity;
      const featureName = quoteData.featureNames[key];
      
      itemsHtml += `
        <tr style="border-bottom: 1px solid #1f2937;">
          <td style="padding: 8px 0; color: #d1d5db; font-size: 13px;">${featureName}</td>
          <td style="padding: 8px 0; text-align: right; color: #6b7280; font-family: monospace; font-size: 13px;">${quantity}</td>
          <td style="padding: 8px 0; text-align: right; color: #6b7280; font-family: monospace; font-size: 13px;">£${featurePrice.toLocaleString()}</td>
          <td style="padding: 8px 0; text-align: right; color: #9ca3af; font-family: monospace; font-size: 13px;">£${total.toLocaleString()}</td>
        </tr>
      `;
    }
  });

  // Ongoing costs
  Object.entries(quoteData.ongoingCosts || {}).forEach(([key, enabled]) => {
    if (enabled && quoteData.ongoingCostNames?.[key] && quoteData.ongoingCostPrices?.[key]) {
      const costName = quoteData.ongoingCostNames[key];
      const costPrice = quoteData.ongoingCostPrices[key];
      
      itemsHtml += `
        <tr style="border-bottom: 1px solid #1f2937;">
          <td style="padding: 8px 0; color: #d1d5db; font-size: 13px;">${costName} (Annual)</td>
          <td style="padding: 8px 0; text-align: right; color: #6b7280; font-family: monospace; font-size: 13px;">1</td>
          <td style="padding: 8px 0; text-align: right; color: #6b7280; font-family: monospace; font-size: 13px;">£${costPrice.toLocaleString()}</td>
          <td style="padding: 8px 0; text-align: right; color: #9ca3af; font-family: monospace; font-size: 13px;">£${costPrice.toLocaleString()}</td>
        </tr>
      `;
    }
  });

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
                  <span style="color: #bef264; font-size: 12px; font-weight: bold;">● INVOICE / QUOTE</span>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px 30px;">
                  <p style="color: #ffffff; font-size: 18px; margin-bottom: 10px;">Hello ${quoteData.clientName},</p>
                  
                  <p style="color: #9ca3af; line-height: 1.6; margin-bottom: 30px;">
                    Thank you for your interest in Finnitrex Solutions. Please find your detailed quote below.
                    This quote is valid for <strong style="color: #bef264;">30 days</strong> (expires: ${expiryDate}).
                  </p>

                  <!-- Invoice Header -->
                  <div style="background-color: #0a0a0a; border: 1px solid #1f2937; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                    <table width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 11px;">INVOICE #</td>
                        <td style="text-align: right; color: #bef264; font-family: monospace; font-weight: bold; font-size: 18px;">${invoiceNumber}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 11px; padding-top: 8px;">DATE</td>
                        <td style="text-align: right; color: #9ca3af; font-family: monospace; padding-top: 8px;">${invoiceDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 11px; padding-top: 8px;">VALID UNTIL</td>
                        <td style="text-align: right; color: #10b981; font-family: monospace; padding-top: 8px;">${expiryDate}</td>
                      </tr>
                    </table>
                  </div>

                  <!-- Items Table -->
                  <div style="background-color: #0a0a0a; border: 1px solid #1f2937; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
                    <table width="100%" style="border-collapse: collapse;">
                      <thead>
                        <tr style="border-bottom: 2px solid #1f2937;">
                          <th style="text-align: left; padding-bottom: 10px; color: #bef264; font-size: 11px; font-weight: bold; text-transform: uppercase;">Description</th>
                          <th style="text-align: right; padding-bottom: 10px; color: #bef264; font-size: 11px; font-weight: bold; text-transform: uppercase;">Qty</th>
                          <th style="text-align: right; padding-bottom: 10px; color: #bef264; font-size: 11px; font-weight: bold; text-transform: uppercase;">Unit</th>
                          <th style="text-align: right; padding-bottom: 10px; color: #bef264; font-size: 11px; font-weight: bold; text-transform: uppercase;">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsHtml}
                      </tbody>
                    </table>
                  </div>

                  <!-- Totals -->
                  <div style="background-color: #051a00; border: 1px solid #10b981; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                    <table width="100%">
                      <tr>
                        <td style="color: #9ca3af; font-size: 13px; padding: 4px 0;">Subtotal:</td>
                        <td style="text-align: right; color: #d1d5db; font-family: monospace; padding: 4px 0;">£${quoteData.subtotal.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="color: #9ca3af; font-size: 13px; padding: 4px 0;">VAT (20%):</td>
                        <td style="text-align: right; color: #d1d5db; font-family: monospace; padding: 4px 0;">£${quoteData.vat.toLocaleString()}</td>
                      </tr>
                      <tr style="border-top: 2px solid #10b981; margin-top: 10px;">
                        <td style="color: #bef264; font-weight: bold; font-size: 16px; padding-top: 10px;">Total:</td>
                        <td style="text-align: right; color: #bef264; font-family: monospace; font-weight: bold; font-size: 18px; padding-top: 10px;">£${quoteData.total.toLocaleString()}</td>
                      </tr>
                      ${quoteData.ongoingTotal > 0 ? `
                      <tr>
                        <td style="color: #6b7280; font-size: 12px; padding-top: 8px;">Ongoing (Year 1):</td>
                        <td style="text-align: right; color: #6b7280; font-family: monospace; font-size: 12px; padding-top: 8px;">£${quoteData.ongoingTotal.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="color: #10b981; font-weight: bold; font-size: 14px; padding-top: 4px;">First Year Total:</td>
                        <td style="text-align: right; color: #10b981; font-family: monospace; font-weight: bold; font-size: 16px; padding-top: 4px;">£${quoteData.firstYearTotal.toLocaleString()}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </div>

                  <!-- Payment Details -->
                  <div style="background-color: #051a00; border: 1px solid #10b981; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                    <p style="color: #10b981; font-weight: bold; margin: 0 0 15px 0; font-size: 12px; text-transform: uppercase;">Payment Details</p>
                    <table width="100%" style="color: #d1d5db; font-size: 13px;">
                      <tr>
                        <td style="padding: 4px 0; color: #9ca3af;">Bank:</td>
                        <td style="padding: 4px 0; font-family: monospace; font-weight: bold; color: #fff;">Barclays UK</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #9ca3af;">Sort Code:</td>
                        <td style="padding: 4px 0; font-family: monospace; font-weight: bold; color: #fff;">20-00-00</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #9ca3af;">Account:</td>
                        <td style="padding: 4px 0; font-family: monospace; font-weight: bold; color: #fff;">87654321</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0 4px 0; color: #bef264;">Reference:</td>
                        <td style="padding: 8px 0 4px 0; font-family: monospace; font-weight: bold; color: #bef264; font-size: 14px;">${invoiceNumber}</td>
                      </tr>
                    </table>
                  </div>

                  <p style="color: #9ca3af; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
                    <strong style="color: #bef264;">Payment Terms:</strong> 50% deposit required to begin work. 
                    The remaining balance is due upon project completion.
                  </p>

                  <p style="color: #6b7280; font-size: 12px; line-height: 1.6;">
                    Questions about this quote? Contact us at <a href="mailto:info@finnitrex.com" style="color: #bef264;">info@finnitrex.com</a> or call <strong style="color: #bef264;">+44 7521 511800</strong>.
                  </p>
                </td>
              </tr>
              
              <tr>
                 <td style="background-color: #0a0a0a; padding: 20px; text-align: center; color: #555; font-size: 10px;">
                    483 Green Lanes, London, N13 4BS • +44 7521 511800<br/>
                    © ${year} Finnitrex Solutions Ltd. All rights reserved.
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
