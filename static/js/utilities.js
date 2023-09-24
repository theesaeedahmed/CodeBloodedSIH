const formMain = document.getElementsByClassName("main-form")[0];
const formsConatiner = document.getElementById("forms-container");
let textDataElement;
let generateButton;
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

// const generateContent = (templatePath) => {
//   return new Promise(async (resolve, reject) => {

//     console.log(templatePath);
    
//     const res = await fetch(templatePath);
//     const content = await res.text();
    
//     const placeholderRegex = /__\d+__/g;

//     const generatedContent = content.replace(placeholderRegex, (match) => {
//       const replacement = mergedFormData[match];
//       return replacement !== undefined ? replacement : match;
//     });

//     resolve(generatedContent);
//   })
// }

// const displayOnTextArea = (text) => {
//   const textarea = document.createElement('textarea');
//   const textareaContainer = document.getElementsByClassName('addTextAreaHere')[0];

//   textarea.setAttribute('id', 'textData');
//   textarea.rows = 100;
//   textarea.cols = 85;
//   textarea.value = text;

//   const containerStyles = {
//     'width': '100%',
//     'display': 'flex',
//     'justifyContent': 'center',
//     'margin': '0 auto',
//     'backgroundImage': 'radial-gradient(circle at center, rgb(173, 219, 124) 18.00%,rgb(100, 179, 244) 100.00%)',

//   }

//   const elementStyles ={
//     'padding': '20px',
//     'backgroundColor': 'white',
//     'border': '1px solid black',
//     'borderRadius': '10px',
//     'fontSize': '14px',
//     'line-height': '17px',

//   }

//   for (const styleKey in containerStyles) {
//     if (containerStyles.hasOwnProperty(styleKey)) {
//       textareaContainer.style[styleKey] = containerStyles[styleKey];
//     }
//   }
  
//   for (const styleKey in elementStyles) {
//     if (elementStyles.hasOwnProperty(styleKey)) {
//       textarea.style[styleKey] = elementStyles[styleKey];
//     }
//   }

//   textDataElement = textarea;

//   textareaContainer.appendChild(textarea);

//   textDataElement.focus();

//   return;

// }

const handleGenerateButton = (event, templatePath) => {
  // const textData = textDataElement.value;

  // template -> type | url

  console.log('------------ generatebutton handling recieved template: -------------', templatePath);

  const requestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formData: mergedFormData, htmlTemplatePath: templatePath }),
  };


  /*
  --------------
    payment comes here
  --------------
  */

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

      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated.pdf'; // Specify the desired filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year

  return `${day}/${month}/${year}`;
}

const completeFormData = () => {
  return new Promise((resolve, reject) => {

    mergedFormData['__22__'] = mergedFormData['__3__'];
    mergedFormData['__24__'] = mergedFormData['__4__'];
    mergedFormData['__25__'] = mergedFormData['__1__'];
    mergedFormData['__26__'] = formatDate(new Date());
    mergedFormData['__27__'] = mergedFormData['__5__'];
    mergedFormData['__29__'] = mergedFormData['__6__'];
    mergedFormData['__30__'] = mergedFormData['__1__'];
    mergedFormData['__31__'] = formatDate(new Date());

    mergedFormData.hasOwnProperty('__18__') ? '' : mergedFormData['__18__'] = mergedFormData['__9__'];

    resolve('updated');
  })
}

const handleFinalSubmission = async (event, templatesPaths) => {

  event.preventDefault();

  const subForm = event.target;

  // const template = (event.target.id === 'premium')? {type: 'prem', url: `${templatesPaths.htmlPrem}`} : {type: 'normal', url: `${templatesPaths.html}`};

  const subFormData = collectFormData(subForm);

  for (const pair of subFormData.entries()) {
    const [key, value] = pair;
    mergedFormData[key] = value;
  }

  await completeFormData();

  console.log(templatesPaths);

  // const generatedContent = await generateContent(templatesPaths.txt); 

  // displayOnTextArea(generatedContent);

  generateButton.addEventListener('click', (event) => handleGenerateButton(event, `${templatesPaths.html}`));

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
    let templatesPaths;

    const hasChildren = (formData.get('__10__') != `0` && formData.get('__10__') != '') ? true : false;
    console.log(formData.get('__10__'), typeof(formData.get('__10__')));

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
        'Cruelty': {txt: './documentTemplates/divorce/cruelty.txt', html: './documentTemplates/divorce/cruelty.html'},
        'Mutual Consent': {txt: './documentTemplates/divorce/mutual.txt', html: './documentTemplates/divorce/mutual.html'},
        'Adultery': {txt: './documentTemplates/divorce/adultery.txt', html: './documentTemplates/divorce/adultery.html'},
      };

    // -----------------------------------------------

      if (response.ok) {
        const data = await response.json();


        // ------------ poulami ------------------
        // nextForm = categoryMappings[data.predicted_category] || data.predicted_category;
        // ---------------------------------------


        // ----------- saeed -------------------- reason to change: to get the required template as per classification of forms
        nextForm = data.predicted_category;
        templatesPaths = categoryMappings[data.predicted_category];

        
        if(!hasChildren){
          console.log('doesnt have children so');
          const urll = `${templatesPaths.html}`;
          const halfUrl = urll.substring(0, urll.lastIndexOf('/')+1);
          const filename = urll.substring(urll.lastIndexOf('/')+1);
          const newURL = `${halfUrl}new${filename}`;
          templatesPaths.html = newURL;
          console.log('\n\n changing template name \n\n');
        }
        // --------------------------------------
        
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

      // Array.from(generateButtons).forEach((generateButton) => {
      //   generateButton.style.display = 'flex';
      // })
      
      const subForm = document.querySelector(".sub-form");
      generateButton = document.getElementById('generateButton');

      subForm.addEventListener('submit', (event) => handleFinalSubmission(event, templatesPaths));
      
    } catch (err) {
      console.error("error rendering next form : ", err);
    }
  });
});

