document.getElementById('modelForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting normally

    // Create a FormData object from the form
    const formData = new FormData();
    
    formData.append('imgUrl1',this.imgUrl1.files[0]);
    formData.append('imgUrl2',this.imgUrl2.files[0]);
    formData.append('imgUrl3',this.imgUrl3.files[0]);

    const restData = {
        'name': this.name.value,
        'email': this.email.value,
        'phone': this.phone.value,
        'dob': this.dob.value,
        'gender': this.gender.value,
        'weight': this.weight.value,
        'height': this.height.value,
        'hair': this.hair.value,
        'eyeColor': this.eyeColor.value,
        'hips': this.hips.value,
        'description': this.description.value,
        'category': this.category.value,
        'rate': this.rate.value,
        'location': this.location.value
    }

    formData.append('restData',JSON.stringify(restData));

    // Use fetch API to send the data
    fetch('http://localhost:8080/applications/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully');
            toastr.success('Form submitted successfully');
            $('#modelForm')[0].reset();
        } else {
            console.error('Form submission failed', response);
            toastr.error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        toastr.error('Error submitting form');
    });
});
