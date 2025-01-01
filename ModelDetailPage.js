// Function to open the hire card modal
const hireBtn = document.getElementById('hire-btn');
const hireModal = document.getElementById('hire-card-modal');
const hireConfirmBtn = document.getElementById('hire-confirm');
const hireCancelBtn = document.getElementById('hire-cancel');

// Extract model name from URL
const params = new URLSearchParams(window.location.search);
const modelId = params.get('id');
console.log(modelId);
let modelRate;

function showSpecialModel(){
    $.ajax({
        url: `http://localhost:8080/model/getmodel/${modelId}`,
        method: "GET",
        success: function(model) {
            modelRate = model.rate;
            document.getElementById('model-name').textContent = model.name;
            document.getElementById('model-rate').textContent = "Rs: " + model.rate;
            document.getElementById('model-height').textContent = model.height;
            document.getElementById('model-weight').textContent = model.weight;
            document.getElementById('model-waist').textContent = model.gender;
            document.getElementById('model-hips').textContent = model.hips;
            document.getElementById('model-hair').textContent = model.hair;
            document.getElementById('model-shoe').textContent = model.age;
            document.getElementById('model-eye').textContent = model.eyeColor;
            document.getElementById('model-location').textContent = model.location;
            document.getElementById('model-experience').textContent = model.age /10 + " Years of Experience";
            const imageWrapper = document.querySelector('.image-wrapper');
            imageWrapper.innerHTML = model.images.map(src => `<img src="${model.imgUrl1}" alt="${model.name}">`).join('');
        },
        error: function(xhr, status, error){
            console.log("Error occured",error);
        }
    })
}

showSpecialModel();



// Slider functionality
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const imageWrapper = document.querySelector('.image-wrapper');

let currentPosition = 0;
const imagesPerView = 3;
const totalImages = document.querySelectorAll('.image-wrapper img').length;
const maxPosition = Math.ceil(totalImages / imagesPerView) - 1;

prevBtn.addEventListener('click', () => {
    currentPosition = currentPosition > 0 ? currentPosition - 1 : maxPosition;
    updateSliderPosition();
});

nextBtn.addEventListener('click', () => {
    currentPosition = currentPosition < maxPosition ? currentPosition + 1 : 0;
    updateSliderPosition();
});

function updateSliderPosition() {
    const moveAmount = -currentPosition * 100;
    imageWrapper.style.transform = `translateX(${moveAmount}%)`;
}

// Show the modal when "Hire Now" button is clicked
hireBtn.addEventListener('click', () => {
    $('#modelIds').val(modelId)
    $('#clientIds').val(parseInt(sessionStorage.getItem("userId")))
    $('#amounts').val(modelRate)
    console.log($('#modelIds').val())
    console.log($('#amounts').val())
    console.log($('#clientIds').val())
    hireModal.classList.add('show');
});

// Close the modal when the cancel button is clicked
hireCancelBtn.addEventListener('click', () => {
    
    hireModal.classList.remove('show');
});

// Handle confirmation logic 
// hireConfirmBtn.addEventListener('click', () => {
//     const hireDate = document.getElementById('hire-date').value;
//     const hireDescription = document.getElementById('hire-description').value;
//     const clientId = 1;
//     const hireRecordData = {
//         'modelId': modelId.toString(),
//         'clientId': clientId.toString(),
//         'amount': modelRate,
//         'description': hireDescription,
//         'requestedDate': hireDate
//     }
//     const formData = new FormData();
//     formData.append("hireRecordData",JSON.stringify(hireRecordData))
//     if (hireDate && hireDescription) {
        
//         fetch('http://localhost:8080/client/hiringmodel', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => {
//             if (response.ok) {
//                 alert('Model hired successfully!');
//             } else {
//                 console.error('Form submission failed', response);
//             }
//         })
//         .catch(error => {
//             console.error('Error submitting form:', error);
//         });
//         // Logic for confirming the hire (send data to the server)
        
//         hireModal.classList.remove('show'); // Close the modal
//     } else {
//         alert('Please fill in all fields!');
//     }
// });