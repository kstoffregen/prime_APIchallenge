var apikey = '990da8f8c1c90fecadfdb72fa7f893ba'; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.

var petNames = {};

function searchCallback(breed) {
	console.log(breed);

	var array = [];
	array = breed.petfinder.pets.pet;
	$('#content').empty();
	
	array.forEach(function(pet){
		var $h3 = $('<h3>');
		var $p = $('<p>');
		var $img = $('<img src="'+pet.media.photos.photo[3].$t+'">');
		$('#content').append($img);
		$('#content').append($h3);
		$('#content').append($p);
		$h3.html(pet.name.$t);
		$p.html(pet.description.$t);
		// $p.html(pet.name.$t + '<br><br>'+'<img src="'+pet.media.photos.photo[3].$t+'"><br>'+ pet.description.$t);
	});
	return array;
}

$(document).ready(function() {
	$('#go').on('click', function(e){
		var query = $('#search').val();
		console.log('Searching: ', query);
		search(query);
	})
});

function search(query){
	console.log('In search: ', query);

// $.getJSON('http://api.petfinder.com/my.method?format=json&key=12345&callback=?')
//   .done(function(petApiData) { alert('Data retrieved!'; })
//   .error(function(err) { alert('Error retrieving data!'); 
// });

// Example 4: Using JSONP, combined with new callback functions
	var jqxhr = $.ajax ({
		type: 'GET',
		dataType: 'jsonp',
		crossDomain: true,
		jsonp: 'json_callback',
		url: 'http://api.petfinder.com/pet.find?format=json&key=' + apikey +'&animal=dog&location='+query+'&age=young&count=10&callback=?',
	}).always(function() {
			console.log('Ajax attempt complete.');
		}).done(function(breed, textStatus, jqXHR) {
			console.log(breed);
			searchCallback(breed);
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.log('Ajax failed: ', textStatus);
		});

		// Set another completion function for the request above
		// You can set multiple always, done and fail functions like this
	jqxhr.always(function(){
		console.log('Still complete!');
	});
	
}


