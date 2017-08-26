$(() => {
	showAlert('info', 'Getting products ...');
	$.get('/product', data => { //window.location.origin
		if (data.success) {
			let tableData = '';
			data.products.forEach(product => {
				tableData += '<tr><td>'  + product._id + '</td><td>' + product.name + '</td><td>' + product.price + '</td><td>' + product.status + '</td></tr>';
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