$(() => {
	showAlert('info', 'Getting products ...');
	$.get('https://cc681865.ngrok.io/product', data => {
		if (data.success) {
			let tableData = '';
			data.products.forEach(product => {
				tableData += '<tr><td>' + product.name + '</td><td>' + product.price + '</td><td>' + product.description + '</td><td>' + product.image_link + '</td><td>' + product._id + '</td>';
			});
			$('#table-body').append(tableData);
		} else {
			showAlert('danger', 'Error getting products ...');
		}
	})
})

showAlert = (type, message) => {
	$('#alert').html('<div class="alert alert-' + type + ' fade show" role="alert">' + message + '</div>');
			setTimeout(() => {
				$('#alert').remove();
			}, 1000);
}