const formMain=document.getElementsByClassName("custom-form mt-4 pt-2 mb-lg-0 mb-5")[0];

let userText;


// Assuming you have a form with an input field and a submit button
// const formMain = document.getElementById('formMain');
// const userInput = document.getElementById('userInput'); // Assuming you have an input field with id 'userInput'

// formMain.addEventListener('submit', function (event) {
//     event.preventDefault();

formMain.addEventListener('submit', (e) => {
    e.preventDefault();
    userText = new FormData(formMain).get('keyword');
    
    console.log(userText);



    // Make an AJAX request to call the classify_text function on the server
    fetch('/api/classify/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userText }), // Send the user input as JSON
    })
    .then(response => response.json())
    .then(data => {
        // console.log('ib=n here');
        // Handle the response from the server
        // console.log("Data:",data);
        console.log('Predicted Category:', data.predicted_category);

        // Determine the URL to redirect based on the predicted category
        let redirectUrl;

        // You can define the mapping of categories to URLs here
        switch (data.predicted_category) {
            case 'contract':
                redirectUrl = 'contract.html';
                break;
            case 'civil':
                redirectUrl = 'civil.html';
                break;
            case 'criminal':
                redirectUrl = 'criminal.html';
                break;
            case 'legal notice':
                redirectUrl = 'legalnotice.html';
                break;    
            // Add more cases for other categories and their respective HTML pages
            default:
                redirectUrl = 'mainformdivorce.html'; // Default page if no match is found
                console.log('check');
        }

        // Redirect the user to the determined URL
        window.location.href = 'index(draft).html';
    })
    .catch(error => {
        console.error('Error:', error);
    });

});