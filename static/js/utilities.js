const formMain = document.getElementsByClassName("main-form")[0];
const formsConatiner = document.getElementById("forms-container");
let textDataElement;
const generateButton = document.getElementById('generateButton');
const mergedFormData = {};

// const selectNextForm = (reason) => {
//   reason = reason.toLowerCase();

//   const templates = {
//     'Cruelty': "my husband hits me",
//     'Mutual Consent': "we just want a divorce and have settled mutually",
//     'Adultery': "my husband has been cheating on me with another women",
//   };

//   for (const template in templates) {
//     if (reason === templates[template]) {
//       return template;
//     }
//   }

//   return "No Templates Available";
// };

const renderNextForm = (nextFormPath) => {
  return new Promise((resolve, reject) => {
    fetch(nextFormPath)
      .then((response) => response.text())
      .then((data) => {
        formsConatiner.innerHTML = data;
        resolve();
      })
      .catch((err) => {
        console.error("error : ", err);
        reject(err);
      });
  });
};

const collectFormData = (form) => {
  return new FormData(form);
}

const generateContent = (templatePath) => {
  return new Promise(async (resolve, reject) => {

    
    
    const res = await fetch(templatePath);
    const content = await res.text();

    console.log(content);
    
    const placeholderRegex = /__\d+__/g;

    const generatedContent = content.replace(placeholderRegex, (match) => {
      const replacement = mergedFormData[match];
      return replacement !== undefined ? replacement : match;
    });

    resolve(generatedContent);
  })
}

const displayOnTextArea = (text) => {
  const textarea = document.createElement('textarea');
  const textareaContainer = document.getElementsByClassName('addTextAreaHere')[0];

  textarea.setAttribute('id', 'textData');
  textarea.rows = 100;
  textarea.cols = 85;
  textarea.value = text;

  const containerStyles = {
    'width': '100%',
    'display': 'flex',
    'justifyContent': 'center',
    'margin': '0 auto',
    'backgroundImage': 'radial-gradient(circle at center, rgb(173, 219, 124) 18.00%,rgb(100, 179, 244) 100.00%)',

  }

  const elementStyles ={
    'padding': '20px',
    'backgroundColor': 'white',
    'border': '1px solid black',
    'borderRadius': '10px',
    'fontSize': '14px',
    'line-height': '17px',

  }

  for (const styleKey in containerStyles) {
    if (containerStyles.hasOwnProperty(styleKey)) {
      textareaContainer.style[styleKey] = containerStyles[styleKey];
    }
  }
  
  for (const styleKey in elementStyles) {
    if (elementStyles.hasOwnProperty(styleKey)) {
      textarea.style[styleKey] = elementStyles[styleKey];
    }
  }

  textDataElement = textarea;

  textareaContainer.appendChild(textarea);

  textDataElement.focus();

  return;

}

const handleGenerateButton = (event) => {
  const textData = textDataElement.value;

  console.log('text entered at the textarea', textData);

  const requestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: textData }),
  };

  fetch('http://localhost:3000/generate-pdf', requestData)
    .then((response) => {
      if (!response.ok || response.status != 200) {
        throw new Error('Network response was not ok');
      }
      // return response.arrayBuffer(); // Parse the response as a binary blob
      return response.json();
    })
    .then((data) => {

      const url = `/static/js/${data.pdfURL}`;

      console.log(url);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated.pdf'; // Specify the desired filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // const uintarr = new Uint8Array(arrayBuffer);
      // console.log(`recieved and converted at client : `, uintarr);

      // const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      // console.log('Blob:', blob);

      // if (window.navigator.msSaveOrOpenBlob) {
      //   // For Internet Explorer and Microsoft Edge
      //   window.navigator.msSaveOrOpenBlob(blob, 'generated.pdf');
      // } else {
      //   // For other browsers
      //   const url = window.URL.createObjectURL(blob);
      //   console.log('url to the pdf : ', url);
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = 'generated.pdf'; // Specify the desired filename
      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
      //   setTimeout(() => window.URL.revokeObjectURL(url), 20000)
        // window.URL.revokeObjectURL(url);
      // }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const handleFinalSubmission = async (event, templatePath) => {

  event.preventDefault();

  const subForm = event.target;

  const subFormData = collectFormData(subForm);

  for (const pair of subFormData.entries()) {
    const [key, value] = pair;
    mergedFormData[key] = value;
  }

  const generatedContent = await generateContent(templatePath); 

  console.log(generatedContent);

  displayOnTextArea(generatedContent);

  console.log('about to add eventlistener');

  textDataElement.addEventListener('click', handleGenerateButton);
  textDataElement.click();

  // setInterval(() => {
  //   (textDataElement !== null)? textDataElement.addEventListener('click', handleGenerateButton): '';
  // }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  formMain.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = collectFormData(formMain);

    for (const pair of formData.entries()) {
      const [key, value] = pair;
      mergedFormData[key] = value;
    }

    const reason = formData.get("reason"); //getting the reason of divorce input
    // const nextForm = selectNextForm(reason);
    // const nextFormPath = `./${nextForm}.html`;
    // console.log(nextFormPath);

    let nextForm;
    let nextFormPath;
    let templatePath;



    try {
      // Send a POST request to your Django API endpoint
      const response = await fetch('/api/classify/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token
          },
          body: `user_input=${reason}`,
      });


    // ------------------ poulami --------------------
    //   const categoryMappings = {
    //     'Cruelty': 'Cruelty',
    //     'Mutual Consent': 'Mutual Consent',
    //     'Adultery': 'Adultery',
    //   };
    // -----------------------------------------------


    // ----------------- saeed ----------------------- reason to change: to get the required template as per classification of forms

      const categoryMappings = {
        'Cruelty': '/static/documentTemplates/divorce/cruelty.txt',
        'Mutual Consent': '/static/documentTemplates/divorce/mutual.txt',
        'Adultery': '/static/documentTemplates/divorce/adultery.txt',
      };

    // -----------------------------------------------

      if (response.ok) {
        const data = await response.json();

        console.log(data);


        // ------------ poulami ------------------
        // nextForm = categoryMappings[data.predicted_category] || data.predicted_category;
        // ---------------------------------------


        // ----------- saeed -------------------- reason to change: to get the required template as per classification of forms
        nextForm = data.predicted_category;
        templatePath = categoryMappings[data.predicted_category];
        // --------------------------------------
        
        console.log(nextForm);
        // Use the predicted_category for redirection
        nextFormPath = `./${nextForm}.html`;
      } else {
          console.error('Failed to classify:', response.statusText);
      }
    } catch (error) {
        console.error('Error:', error);
    }

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    try {

      await renderNextForm(nextFormPath);
      const subForm = document.querySelector(".sub-form");

      subForm.addEventListener('submit', (event) => handleFinalSubmission(event, templatePath));
      
    } catch (err) {
      console.error("error rendering next form : ", err);
    }
  });
});

