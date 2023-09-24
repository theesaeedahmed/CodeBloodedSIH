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

    // console.log(htmlTemplate);
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    

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
        //   console.log(result);
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