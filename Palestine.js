function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            //    $('#imagePreview').hide();
            //    $('#imagePreview').fadeIn(2500);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("canvas");
const downloadButton = document.getElementById("downloadButton");
const watermarkImage = document.getElementById("watermarkImage");
const watermarkedImage = document.getElementById("watermarkedImage");

$("#imageInput").change(function() {
    const file = imageInput.files[0];
    const image = new Image();
    downloadButton.style.display = "block";

    image.onload = function() {
        // Determine the size of the square
        let size = Math.min(image.width, image.height);

        // Create a square canvas
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");

        // Calculate the position to crop a square from the original image
        let x = (image.width - size) / 2;
        let y = (image.height - size) / 2;

        // Draw the cropped square from the original image on the canvas
        context.drawImage(image, x, y, size, size, 0, 0, size, size);

        // Calculate the scaling factor to fit the watermark within the square image
        const scaleFactor = size / watermarkImage.width;
        const newWidth = watermarkImage.width * scaleFactor;
        const newHeight = watermarkImage.height * scaleFactor;

        // Position the watermark in the center of the square image
        const watermarkX = (size - newWidth) / 2;
        const watermarkY = (size - newHeight) / 2;

        // Draw the resized watermark on the canvas
        context.drawImage(watermarkImage, watermarkX, watermarkY, newWidth, newHeight);

        // Show the watermarked image and download button
        watermarkedImage.src = canvas.toDataURL("image/png");
        watermarkedImage.style.display = "block";
        downloadButton.style.display = "block";
    };
    readURL(this);

    image.src = URL.createObjectURL(file);
});

downloadButton.addEventListener("click", function() {
    // Convert the canvas to a data URL and set it as the href of a link
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "PalestineProfilePicture.png";
    link.click();
});

document.querySelector('.multiple-text').addEventListener('click', function() {
    window.location.href = 'https://khalidabdelaty.github.io/Portfoilo/';
});


const typed = new Typed('.multiple-text', {
    strings: ['Khalid Abdelaty', 'Free Palestine'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
    showCursor: false
});