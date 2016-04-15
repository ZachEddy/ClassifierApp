var cropper



var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var barChartData = {

		labels : ["Airplane","Automobile","Bird","Cat","Deer","Dog","Frog", "Horse", "Ship", "Truck"],
		datasets : [
			{
				// fillColor : "rgba(61,94,244,0.65)",
				fillColor : "rgba(194,229,242,0.65)",
				strokeColor : "rgba(0,0,0,0.4)",
				highlightFill: "rgba(156,156,156,0.65)",
				highlightStroke: "rgba(0,0,0,0.9)",
				data : [0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1]
			},
		],
		// scaleGridLineColor : "rgba(0,0,0,0.05)",
		scaleShowGridLines : true
	}

// function to load file
var loadFile = function(event) {
	var reader = new FileReader();
	reader.onload = function() {
		var output = document.getElementById('output');
		output.src = reader.result;
		// $('.container').css('height', '100%');
		var containerheight = $(".container").height();
		var imageheight = $(".output").height();
		$(window).resize();
		var height = $(window).height()
		// $('.container').css('height', 'auto');
		// $('.container').css('ovetflow', 'auto');
		$('.container').css('height', height);
		var r = $('<button class="send_data btn btn-default">Classify</button>')
		var c = $('<canvas id="chart"></canvas>')

		$('.classify').append(r)
		$('.graph_container').append(c)
		var ctx = document.getElementById("chart").getContext("2d");
		window.myBar = new Chart(ctx).Bar(barChartData, {
			responsive : true,
			maintainAspectRatio: false,
			scaleLineColor: "rgba(0,0,0,1)",
			scaleGridLineColor : "rgba(0,0,0,0.25)",
			barStrokeWidth : 2,
			barValueSpacing : 15
		});
		$('.upload').remove();
		
		$(document).resize();

		makeCropper()
	};
	reader.readAsDataURL(event.target.files[0]);
};

// function to grab data within the crop field
$('.classify').after(loadFile)
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

// field to pass data to the 
$(function() {
	var classify = function(event) {
		cropper.getCroppedCanvas({width: 32, height: 32}).toBlob(function (blob) {
			var formData = new FormData();
			formData.append('croppedImage', blob);
			$.ajax('', {
				method: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function (data) {
					console.log("Hello");	
					var counter = 0;				
					for(key in data)
					{
						console.log(data[key])
						console.log(counter);
						window.myBar.datasets[0].bars[counter].value = data[key];
						counter++;
					}
					window.myBar.update();
				},
				error: function () {
					console.log('Upload error');
				}
			});
		});
	}

	$(".classify").on("click",classify)
});
