/* -------------------------------- old code for pdf generation ---------------------------------------------

// /Users/poulami/Downloads/django 4 4 copy 2/django/django/hello/static/js/bootstrap.bundle.min.js

const { PDFDocument, rgb } = require('pdf-lib');
// const fs = require('fs').promises;

const MAX_LINES_IN_A_PAGE = 50;
const MAX_CHARS_IN_A_LINE = 95;

const lineBreak = (content) => {
    let lines = [];
    let currentLine = '';

    for(charsNum in content) {

        currentLine = currentLine? currentLine + content[charsNum] : content[charsNum];

        if((currentLine.length == MAX_CHARS_IN_A_LINE) || content[charsNum] == '\n' || charsNum == content.length - 1) {
            lines.push(currentLine);
            currentLine = '';
        }
    }

    return lines;
}

const paginate = (content) => {
    const pages = [];

    let currentPage = '';

    const lines = lineBreak(content);

    for(lineNum in lines) {
        let lineContent = lines[lineNum];
        (lineContent[lineContent.length - 1] != '\n') ? (currentPage = currentPage? currentPage + lineContent + '\n' : lineContent) : (currentPage = currentPage? currentPage + lineContent : lineContent);

        if((+lineNum + 1) % MAX_LINES_IN_A_PAGE == 0 || (+lineNum == lines.length - 1)) {

            pages.push(currentPage);
            currentPage = '\n';
        }
    }

    // console.log(pages);

    return pages;
}

const createPDF = async (content) => {

    console.log('text sent by the server : ', content);

    const doc = await PDFDocument.create();

    const pages = paginate(content);

    pages.forEach((pageContent) => {
        let PDFpage = doc.addPage();
        const { width, height } = PDFpage.getSize();

        PDFpage.drawText(pageContent, {
            size: 12,
            lineHeight: 14,
            x: 50,
            y: height-50,
            color: rgb(0,0,0)
        });
    });
    
    const pdfBuffer = await doc.save();

    console.log('from writetopdf : \n', pdfBuffer, "---------------------");

    return pdfBuffer;
}

module.exports = { createPDF };

---------------------------------- old code for pdf generation -----------------------------------------------
--------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------
*/




/*
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------

---------------------------------- new code for pdf generation ---------------------------------------------

*/

// const { width, height } = require('pdfkit/js/page');
const puppeteer = require('puppeteer');
const fs = require('fs');

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const createPDF = async (formData, templatePath) => {

    // console.log(formData, templatePath);

    // const res = await fetch(templatePath);
    // const htmlTemplate = res.text();

    let htmlTemplate;

    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading HTML file: ${err}`);
          return;
        }
        console.log(templatePath);
        htmlTemplate = data;
        console.log(data);

    });

    console.log(htmlTemplate);
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
//     const htmlTemplate = `
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Cruelty Document</title>
//     <style>
//         * {
//             font-size: 16px;
//             font-family: 'Times New Roman', Times, serif;
//         }
//     </style>
// </head>
// <body style="margin: 20px;">
//     <h2 style="text-align: center;">DIVORCE PETITION BY HINDU WIFE ON GROUNDS OF CRUELTY</h2>
//     <br>

//     <p style="text-align: center;">BEFORE THE PRINCIPAL JUDGE, FAMILY COURT AT <div id="__1__" style="display: inline;"><input type="text" name="__1__"></div></p>
//     <br>
//     <h3>IN THE MATTER OF:</h3>
//     <p>Petitioner no 1</p>
//     <div id="__3__" ><input type="text" name="__3__"></div>
//     <div id="__4__" ><input type="text" name="__4__"></div>
//     <br>
//     <p>Petitioner no 2</p>
//     <div id="__5__" style="display: inline;"><input type="text" name="__5__"></div>
//     <div id="__6__" style="display: inline;"><input type="text" name="__6__"></div>
//     <br>
//     <b>PETITION under Section 13 of the Hindu Marriage Act, 1956 FOR Divorce of the Petitioner with the Respondent on grounds of cruelty</b>
//     <br>
//     <h4>MOST RESPECTFULLY SHOWETH:-</h4>
//     <ol>
//         <li>
//             That The marriage between the parties was solemnized on <div id="__7__" style="display: inline;"><input type="text" name="__7__"></div> at <div id="__8__" style="display: inline;"><input type="text" name="__8__"></div>, by Hindu rites and ceremonies. The said marriage was consummated thereafter and the parties co-habited as husband and wife at the matrimonial home <div id="__9__" style="display: inline;"><input type="text" name="__9__"></div>.
//         </li>
//         <br>
//         <li>
//             That there is <div id="__10__" style="display: inline;"><input type="text" name="__10__"></div> name <div id="__11__" style="display: inline;"><input type="text" name="__11__"></div> Date of Birth <div id="__12__" style="display: inline;"><input type="text" name="__12__"></div> age <div id="__13__" style="display: inline;"><input type="text" name="__13__"></div> out of the wedlock of the parties. The parties mutually agreed to give custody of the child to <div id="__14__" style="display: inline;"><input type="text" name="__14__"></div>.
//         </li>
//         <br>
//         <li>
//             The Petitioner states that from the month of <div id="__15__" style="display: inline;"><input type="text" name="__15__"></div>, the Respondent began to ill-treat the Petitioner, and from the month of <div id="__15__" style="display: inline;"><input type="text" name="__15__"></div>, began to physically assault the Petitioner without any cause whatsoever. For some time, the Petitioner made no complaint and underwent such ill-treatment, hoping that the Defendant would see better sense. However, on or about <div id="__16__" style="display: inline;"><input type="text" name="__16__"></div> month of <div id="__17__" style="display: inline;"><input type="text" name="__17__"></div>, the Respondent attacked the Petitioner with a stick and inflicted serious injuries leading to multiple fractures in the hand and leg of the Petitioner. The Petitioner thereupon lodged a complaint at the <div id="__17__" style="display: inline;"><input type="text" name="__17__"></div> Police Station, being complaint No. <div id="__18__" style="display: inline;"><input type="text" name="__18__"></div>. The Petitioner craves leave to refer to and rely upon a copy of the said complaint when produced.
//         </li><br>
//         <li>
//             The Petitioner says that as a result of the aforesaid injury inflicted on the Petitioner by the Respondent, the Petitioner had to be hospitalized for six days. The Petitioner craves leave to refer to and rely upon the Medical Certificate issued by Dr. <div id="__19__" style="display: inline;"><input type="text" name="__19__"></div> who treated the Petitioner at <div id="__19__" style="display: inline;"><input type="text" name="__19__"></div> Hospital.
//         </li><br>
//         <li>
//             The petitioner says that even thereafter, the Respondent continued to treat the Petitioner in a cruel and violent manner. The Petitioner says that such cruelty has caused an apprehension in the mind of the Petitioner that it will be harmful and injurious for the Petitioner to continue to live with the respondent.
//         </li><br>
//         <li>
//             There is no collusion or connivance between the Petitioner and the Respondent in filing this Petition.
//         </li><br>
//         <li>
//             The Petitioner is claiming alimony @ Rs. <div id="__20__" style="display: inline;"><input type="text" name="__20__"></div> per month from the Respondent.
//         </li><br>
//         <li>
//             No other proceedings with respect to the marriage between the Petitioner and the Respondent have been filed in this Honorable Court or in any other Court in India.
//         </li><br>
//         <li>
//             The Petitioner and the Respondent were married in Mumbai and last cohabited in Mumbai within the territorial limits of the jurisdiction to entertain, try and dispose of the present Petition.
//         </li><br>
//         <li>
//             The Petitioner being a lady is exempt from payment of Court fees.
//         </li><br>
//     </ol>

//     <h4 style="text-align: center;">PRAYER</h4>
//     <p>It is most respectfully prayed that the court may accept the present petition and grant a decree of divorce between the parties thereby, dissolving the marriage between the parties.</p>
//     <p>Any other order which the court may deem fit and proper in the facts and circumstances of the present case be also passed in favor of the petitioners.</p>

//     <p>Petitioner no 1</p>
//     <p>Petitioner no 2</p>

//     <h4 style="text-align: center;">VERIFICATION</h4>
//     <p>I <div id="__22__" style="display: inline;"><input type="text" name="__22__"></div> age: <div id="__23__" style="display: inline;"><input type="text" name="__23__"></div> years, residing at <div id="__24__" style="display: inline;"><input type="text" name="__24__"></div> the petitioner no. 1 do hereby solemnly declare that what is stated in the foregoing paragraphs of the petition is true to the best of my own knowledge and belief save and except for the legal submission.</p>
//     <p>Solemnly Declared at <div id="__25__" style="display: inline;"><input type="text" name="__25__"></div> on this <div id="__26__" style="display: inline;"><<input type="text" name="__26__"></div>(Date)</p>
//     <br><p>Advocate</p>
//     <br>
//     <p>Signature of the petitioner no. 2</p>

//     <p>I <div id="__27__" style="display: inline;"><input type="text" name="__27__"></div> age: <div id="__28__" style="display: inline;"><input type="text" name="__28__"></div> years, residing at <div id="__29__" style="display: inline;"><input type="text" name="__29__"></div> the petitioner no. 2 do hereby solemnly declare that what is stated in the foregoing paragraphs of the petition is true to the best of my own knowledge and belief save
//     <p>Solemnly Declared at <div id="__30__" style="display: inline;"><input type="text" name="__30__"></div> on this <div id="__31__" style="display: inline;"><input type="text" name="__31__"></div>(Date)</p>
//     <br><p>Advocate</p>
//     <br>
//     <p>Signature of the petitioner no. 2</p>
// </body>
// </html>
//     `
  // Set the content to be converted to PDF (can be HTML content)
  await page.setContent(htmlTemplate);
  
  
  try {
      await page.goto(`data:text/html,${htmlTemplate}`);
      
    } catch (error) {
        console.log(error);
    }
    
    
    try {
        
        for (const fieldName in formData) {
            const name = fieldName;
            const value = formData[fieldName];
            const result = await page.evaluate((name, value) => {
                // const inputs = document.querySelectorAll(`input[name="${name}"]`);
                const inputParents = document.getElementsByClassName(name);

                if (inputParents) {
                    Array.from(inputParents).forEach((input) => {
                        if(value != ''){
                            input.innerText = value;
                            return `replaced innerhtml of parent div ${name} with ${value}`;
                        }
                    })

                    // if(parent && value != '') {
                    //     parent.innerText = value;

                    //     return `replaced innerhtml of parent div ${name}`;
                    // }

                    // return `Successfully set ${name} to ${value}`;
                }
                else{
                    return `element with name ${name} not found`;
                }
          }, name, value);
          console.log(result);
        }
    } catch (error) {
        console.log(error);
    }
  
  // Custom wait for 2000 milliseconds (2 seconds)
  await wait(200); // Adjust the timeout as needed

  const modifiedTemplate = await page.content();

  const pdfPath = `./pdfs/generated_${Date.now()}.pdf`;

    console.log(modifiedTemplate);

  await page.setContent(modifiedTemplate);
  
  // Generate the PDF
  //   await page.pdf({ path: 'output.pdf', format: 'A4' });
  const pdfBuffer = await page.pdf({ path: pdfPath, format: 'letter' });

  await browser.close();

  return pdfPath;
};

module.exports = { createPDF };