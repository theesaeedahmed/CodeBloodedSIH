const { PDFDocument, rgb } = require('pdf-lib');
// const fs = require('fs').promises;

const MAX_LINES_IN_A_PAGE = 50;
const MAX_CHARS_IN_A_LINE = 85;

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