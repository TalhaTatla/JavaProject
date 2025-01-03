//Get the sidebar buttons and sections
// const manageModelsBtn = document.getElementById('manage-models-btn');
// const modelRequestsBtn = document.getElementById('modelRequestsBtn');
// const notificationsBtn = document.getElementById('notificationsBtn');
const logoutBtn = document.getElementById('logoutBtn');

const welcomeSection = document.getElementById('welcome-msg');
const manageModelsSection = document.getElementById('manage-models-section');
const modelRequestsSection = document.getElementById('modelRequestsSection');
const notificationsSection = document.getElementById('notificationsSection');


const adminCardButtons = document.querySelectorAll('.admin-cards-button');
const adminCards = document.querySelectorAll('.admin-cards');

    adminCardButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        document.querySelector('#welcome-msg').style.display = 'none';
        
        document.querySelector('#Add-Md-Form').style.display = 'none';
        document.querySelector('#Edit-Md-Form').style.display = 'none';
        document.querySelector('#Add-Cat-Form').style.display = 'none';
        // Hide all cards
        adminCards.forEach(card => card.style.display = 'none');
        // Show the clicked card
        adminCards[index].style.display = 'block';
        showdataFromBackend()
      });
    });

    function showdataFromBackend(){
        if(manageModelsSection.style.display == 'block'){
            $.ajax({
                url: "http://localhost:8080/model/show",
                method: "GET",
                success: function(response){
                    console.log(response);
                    renderModels(response)
                },
                error: function(xhr, status, error){
                    console.error("Error fetching models:", error);
                }
                
            })
        }
        if(modelRequestsSection.style.display == 'block'){
            $.ajax({
                url:'http://localhost:8080/category/show',
                method: 'GET',
                success: function(response){
                    console.log(response);
                    showAllRequests(response)
                }
            })
        }

        if(notificationsSection.style.display == 'block'){
            $.ajax({
                url:'http://localhost:8080/admin/notifications',
                method: 'GET',
                success: function(response){
                    console.log(response);
                    showAllClientNotifications(response)
                }
            })
        }

    }

    function showAllRequests(requests){
        const tbody = $('#request-tbl-body');
        tbody.empty();
        // <td>
        //                         <button class="accept-btn" onclick="requestAction('http://localhost:8080/applications/accept/${request.applicationId}')">Edit</button>
        //                         <button class="reject-btn" onclick="requestAction('http://localhost:8080/applications/reject/${request.applicationId}')">Delete</button>
        //                     </td>
        requests.forEach((request, index) => {
            const tr = `
                <tr>
                            <td>${request.categoryId}</td>
                            <td>${request.name}</td>
                            
                        </tr>
            `
            tbody.append(tr)

        })
    }

    function showAllClientNotifications(notifications){
        const notifCard = $('#notificationsSection');
        notifCard.empty()
        notifCard.append('<h2>Orders List</h2>')
        $(notifications).each(function(index,not){
            console.log(not)
            const notify = `
                <div class="notification-card">
                    <div class="notification-details">
                        <p><strong>Client Email, Address:</strong> ${not.client.email}, ${not.client.address}</p>
                        <p><strong>Order Date:</strong> ${not.requestedDate.split('T')[0]}</p>
                        <p><strong>Client Name:</strong> ${not.client.name}</p>
                        <p><strong>Order Product Name:</strong> ${not.model.name}</p>
                    </div>
                    
                </div>
            `
            notifCard.append(notify)
            
        })
    }

    function requestAction(Url){
        $.ajax({
            url: Url,
            method: 'POST',
            success: function(response){
                toastr.success("State change successfully")
                showdataFromBackend();
            },
            error: function(error){
                toastr.error('Error in deleting:', error);
            }
          })
    }


document.getElementById('add-model-btn').addEventListener('click', openAddModelForm); // Add model button click

document.getElementById('add-cat-btn').addEventListener('click',openAddCategory);


function openAddCategory(){
    adminCards.forEach(card => card.style.display = 'none');
    document.querySelector('#Add-Md-Form').style.display = 'block';
    editingIndex = null; // Reset editingIndex for adding a new model
    document.getElementById('Add-Md-Form').innerHTML = `
        <h2>Add New Category</h2>
        <form id="add-categ-form">
            <div class="form-group"><label for="model-name">Name:</label><input type="text" name="name" id="categname" required></div>
            <button type="submit">Add Category</button>
        </form>
    `;
    document.getElementById('add-categ-form').addEventListener('submit', handleCatFormSubmit);
}

function handleCatFormSubmit(event){
    event.preventDefault();
    // Create a FormData object from the form
    const formData = new FormData();

    const restData = {
        'name': this.categname.value
    }

    formData.append('restData',JSON.stringify(restData));

    // Use fetch API to send the data
    fetch('http://localhost:8080/category/add', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully');
            toastr.success('Form submitted successfully');

                document.querySelector('#welcome-msg').style.display = 'none';
                
                document.querySelector('#Add-Md-Form').style.display = 'none';
                document.querySelector('#Edit-Md-Form').style.display = 'none';
                document.querySelector('#Add-Cat-Form').style.display = 'none';
                // Hide all cards
                adminCards.forEach(card => card.style.display = 'none');
                // Show the clicked card
                adminCards[1].style.display = 'block';
                showdataFromBackend()
              
        } else {
            console.error('Form submission failed', response);
            toastr.error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        toastr.error('Error submitting form');
    });
}

const modelPics = [
    'Pics/B2.jpg',
    'Pics/B1.jpg',
    'Pics/B3.jpg',
    'Pics/P4.jpg',
    'Pics/P5.jpg',
    'Pics/P6.jpg',
    'Pics/P7.jpg',
    'Pics/P8.jpg',
    'Pics/Piza1.jpg',
    'Pics/Pizza2.jpg',
    'Pics/pizza3.jpg',
    
];
// Model Data Array
let models = []; // Stores model objects
let editingIndex = null; // Keeps track of the model being edited

// Function to render models in the right-panel
function renderModels(allmodels) {
    // <img src="../../SCD Project Backend/ModelAgency_Spring/${model.imgUrl1.replace(/\\/g, '/')}" alt="${model.name}" class="model-img"></img>
    const modelsList = document.getElementById('models-list');
    modelsList.innerHTML = '';
    models = allmodels;
    allmodels.forEach((model, index) => {
        const modelContainer = document.createElement('div');
        modelContainer.classList.add('model-card-container');
        modelContainer.innerHTML = `
            <div class="model-card">
                <div class="model-card-header">
                    <img src="${modelPics[index]}" alt="${model.name}" class="model-img"></img>
                    <div class="model-card-title">${model.name}</div>
                </div>
                <div class="model-card-body">
                    <p><strong>Quantity:</strong> ${model.quantity}</p>
                    <p><strong>Price a product:</strong> ${model.rate}</p>
                    <p><strong>Category:</strong> ${model.category}</p>
                </div>
                <div class="model-card-footer">
                    <button class="edit-btn" onclick="openEditModelForm(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteModel(${index})">Delete</button>
                </div>
            </div>
        `;
        modelsList.appendChild(modelContainer);
    });
}


// Open Add Model Form
function openAddModelForm() {
    adminCards.forEach(card => card.style.display = 'none');
    document.querySelector('#Add-Cat-Form').style.display = 'block';
    editingIndex = null; // Reset editingIndex for adding a new model
    document.getElementById('Add-Cat-Form').innerHTML = `
        <h2>Add New Product</h2>
        <form id="add-model-form">
            ${getModelFormFields()}
            <button type="submit">Add Product</button>
        </form>
    `;
    getCategory("#category");
    document.getElementById('add-model-form').addEventListener('submit', handleFormSubmit);
}

// Open Edit Model Form
function openEditModelForm(index) {
    adminCards.forEach(card => card.style.display = 'none');
    document.querySelector('#Edit-Md-Form').style.display = 'block';
    editingIndex = index;
    const model = models[index];
    console.log(model);
    document.getElementById('Edit-Md-Form').innerHTML = `
        <h2>Edit Product</h2>
        <form id="add-model-form">
            ${getModelEditFormFields(model)}
            <button type="submit">Save Changes</button>
        </form>
    `;
    getCategory("#categoryId");
    document.getElementById('add-model-form').addEventListener('submit', handleEditFormSubmit);
}

document.querySelector("#logoutBtn").addEventListener('click',() => {
    console.log("yes i am in")
    window.location.href = "/LandingPage.htm"
})

// Get model form fields as a template
function getModelFormFields(model = {}) {
    return `
        <div class="form-group"><label for="model-name">Name:</label><input type="text" name="name" id="name" value="${model.name || ''}" required></div>
        <div class="form-group"><label for="model-email">Quantity:</label><input type="number" step="1" min="1" name="email" id="email" value="${model.quantity || ''}" required></div>
        <div class="form-group"><label for="model-rate">Rate:</label><input type="text" id="rate" value="${model.rate || ''}" required></div>
        <div class="form-group"><label for="model-description">Description:</label><textarea id="description" required>${model.description || ''}</textarea></div>
        <div class="form-group"><label for="model-img1">Image 1 URL:</label><input type="file" id="imgUrl1" value="${model.img1 || ''}" required></div>
        <div class="form-group"><label for="model-img1">Category:</label><select id="category" style="margin-bottom: 20px; padding-top: 10px; padding-bottom: 10px">
        <option selected hidden value="">Select Category</option>
        </select></div>
    `;
}

function getCategory(catId){
    $.ajax({
        url: "http://localhost:8080/category/show",
        method: 'GET',
        success: function(response){
            console.log(response);
            console.log(response.name);
            const cat = $(catId)
            $.each(response, function (index, item) {
                cat.append(`<option value="${item.name}">${item.name}</option>`);
            });
            showdataFromBackend();
        },
        error: function(error){
            toastr.error('Error in deleting:', error);
        }
      })
}

// Handle Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    // Create a FormData object from the form
    const formData = new FormData();
    
    formData.append('imgUrl1',this.imgUrl1.files[0]);

    const restData = {
        'name': this.name.value,
        'quantity': this.email.value,
        'description': this.description.value,
        'category': this.category.value,
        'rate': this.rate.value
    }

    formData.append('restData',JSON.stringify(restData));

    // Use fetch API to send the data
    fetch('http://localhost:8080/model/add', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully');
            toastr.success('Form submitted successfully');

                document.querySelector('#welcome-msg').style.display = 'none';
                
                document.querySelector('#Add-Md-Form').style.display = 'none';
                document.querySelector('#Edit-Md-Form').style.display = 'none';
                // Hide all cards
                adminCards.forEach(card => card.style.display = 'none');
                // Show the clicked card
                adminCards[0].style.display = 'block';
                showdataFromBackend()
              
        } else {
            console.error('Form submission failed', response);
            toastr.error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        toastr.error('Error submitting form');
    });
    
}

// Delete Model
function deleteModel(index) {
    //models.splice(index, 1);
    const mdl = models[index];
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url: `http://localhost:8080/model/delete/${mdl.modelId}`,
            method: 'DELETE',
            success: function(response){
                if (response.ok) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success"
                      });
                      showdataFromBackend();
                }else{
                    toastr.error('Model deleted failed');
                }
            },
            error: function(error){
                toastr.error('Error in deleting:', error);
            }
          })
        }
      });
}

function getModelEditFormFields(model = {}) {
    return `
        <div style="display:none;" class="form-group"><label for="model-name">Name:</label><input type="text" name="modelId" id="modelId" value="${model.productId || ''}" required></div>
        <div class="form-group"><label for="model-name">Name:</label><input type="text" name="name" id="name" value="${model.name || ''}" required></div>
        <div class="form-group"><label for="model-email">Email:</label><input type="number" step="1" min="1" name="email" id="email" value="${model.quantity || ''}" required></div>
        <div class="form-group"><label for="model-rate">Rate:</label><input type="text" id="rate" value="${model.rate || ''}" required></div>
        <div class="form-group"><label for="model-description">Description:</label><textarea id="description" required>${model.description || ''}</textarea></div>
        <div class="form-group"><label for="model-img1">Image 1 URL:</label><input type="file" id="imgUrl1" value="${model.img1 || ''}" required></div>
        <div class="form-group"><label for="model-img1">Category:</label><select id="categoryId" style="margin-bottom: 20px; padding-top: 10px; padding-bottom: 10px">
        <option selected hidden value="${model.catogory || ''}">${model.category || ''}</option>
        </select></div>
    `;
}

// Handle Form Submission
function handleEditFormSubmit(event) {
    event.preventDefault();
    // Create a FormData object from the form
    const formData = new FormData();
    
    formData.append('imgUrl1',this.imgUrl1.files[0]);

    const restData = {
        'productId': this.modelId.value,
        'name': this.name.value,
        'quantity': this.email.value,
        'description': this.description.value,
        'category': this.categoryId.value,
        'rate': this.rate.value
    }

    formData.append('restData',JSON.stringify(restData));

    // Use fetch API to send the data
    fetch('http://localhost:8080/model/edit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully');
            toastr.success('Form submitted successfully');

                document.querySelector('#welcome-msg').style.display = 'none';
                
                document.querySelector('#Add-Md-Form').style.display = 'none';
                document.querySelector('#Edit-Md-Form').style.display = 'none';
                // Hide all cards
                adminCards.forEach(card => card.style.display = 'none');
                // Show the clicked card
                adminCards[0].style.display = 'block';
                showdataFromBackend()
              
        } else {
            console.error('Form submission failed', response);
            toastr.error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        toastr.error('Error submitting form');
    });
    
}
