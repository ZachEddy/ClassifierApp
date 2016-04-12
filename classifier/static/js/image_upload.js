var cropper
var loadFile = function(event) {
	var reader = new FileReader();
	reader.onload = function() {
		var output = document.getElementById('output');
		output.src = reader.result;
		makeCropper()
	};
	reader.readAsDataURL(event.target.files[0]);
};

var makeCropper = function() {
	image = document.getElementById('output');
	cropper = new Cropper(image, {
		aspectRatio: 1 / 1,
		zoomable: false,
		minCropBoxWidth: 32,
		minCropBoxHeight: 32,
		viewMode:3,
		crop: function(e) {
			// console.log(e.detail.x);
			// console.log(e.detail.y);
			// console.log(e.detail.width);
			// console.log(e.detail.height);
			// console.log(e.detail.rotate);
			// console.log(e.detail.scaleX);
			// console.log(e.detail.scaleY);
		}
	});
	cropper.zoomTo(1);
};

$(function() {
	var classify = function(event) {
		console.log("Fuck")
		
		cropper.getCroppedCanvas({width: 32, height: 32}).toBlob(function (blob) {
			var formData = new FormData();
			formData.append('croppedImage', blob);
			$.ajax('', {
				method: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function (data) {
					console.log(data);
				},
				error: function () {
					console.log('Upload error');
				}
			});
		});
	}

	$(".classify").on("click",classify)
});