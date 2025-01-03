const hireBtn = document.getElementById('hire-btn');
const hireModal = document.getElementById('hire-card-modal');
const hireCancelBtn = document.getElementById('hire-cancel');

document.addEventListener('DOMContentLoaded', () => {
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
    // --- RENDER MODEL CARDS ---
    //const gallery = document.getElementById('model-gallery');
    const gallery = $('#model-gallery');
    $.ajax({
        url: "http://localhost:8080/model/show",
        method: "GET",
        success: function(response){
            console.log(response);
            $(response).each(function(index,model){
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
                    <button class="edit-btn" style="width: 200px;" onclick="openOrderModel(${model.productId})">Order Now</button>
                </div>
            </div>
        `;
                gallery.append(modelContainer);
            })
        },
        error: function(xhr, status, error){
            console.error("Error fetching models:", error);
        }
        
    })
   

    // --- CATEGORY FILTER FUNCTIONALITY ---
    const categoryLinks = document.querySelectorAll('.category-link');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links, add to current link
            categoryLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');

            const filteredModels = selectedCategory === 'all'
                ? models
                : models.filter(model => model.category === selectedCategory);

            renderModels(filteredModels); // Render filtered models
        });
    });

    // --- SEARCH FUNCTIONALITY ---
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keyup', () => {
        const searchValue = searchInput.value.toLowerCase().trim();
        
        // Filter models based on search input
        const filteredModels = models.filter(model => 
            model.name.toLowerCase().includes(searchValue)
        );

        renderModels(filteredModels);
    });
});

function openOrderModel(modelId){
    $('#modelIds').val(modelId)
    $('#clientIds').val(parseInt(sessionStorage.getItem("userId")))
    const now = new Date();
    // Format date as YYYY-MM-DD
    const formattedDate = now.toISOString().split('T')[0];  
    $('#amounts').val(formattedDate)
    console.log($('#modelIds').val())
    console.log($('#amounts').val())
    console.log($('#clientIds').val())
    hireModal.classList.add('show');
}

// Close the modal when the cancel button is clicked
hireCancelBtn.addEventListener('click', () => {
    hireModal.classList.remove('show');
});