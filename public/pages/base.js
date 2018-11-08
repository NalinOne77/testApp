var selectedId = null;
	$(function() {
		$('#btnAdd').on('click', function() {
			var student = {
				firstName: $('#firstName').val(),
				secondName: $('#secondName').val(),
				birthDay: $('#birthday').val()
			}

			$.ajax({
				url:'http://localhost:8002/addUser',
				type: 'POST',
				data: student,
				success: function(data) {
					alert(data.message);
					getAllUsers();
				}
			})
  	});

  	$('#btnSearch').on('click', function() {
  		$.ajax({
  			url:'http://localhost:8002/user/' + $('#searchContent').val(),
  			type: 'GET',
  			success:function(data) {
  				var user = data;
  				$('#userTable').empty();
				$('#userTable').append(
					'<tr>'+
						'<th>ID</th>'+
						'<th>First Name</th>'+
						'<th>Second Name</th>'+
						'<th>Birthday</th>'+
					'</tr>'
				);
				$('#userTable').append(
					'<tr>'+
						'<td>'+user['Id']+'</td>'+
						'<td>'+user['firstName']+'</td>'+
						'<td>'+user['secondName']+'</td>'+
						'<td>'+user['birthDay']+'</td>'+
						'<td><input type="button" value="delete" onclick="deleteUser('+user['Id']+')"></td>'+
					'</tr>'
				)
  			}
  		})
  	})

  	getAllUsers();
})

function getAllUsers() {
	$.ajax({
		url: 'http://localhost:8002/users',
		type: 'GET',
		success: function(data) {
			$('#userTable').empty();
			$('#userTable').append(
				'<tr>'+
					'<th>ID</th>'+
					'<th>First Name</th>'+
					'<th>Second Name</th>'+
					'<th>Birthday</th>'+
				'</tr>'
				);
			data.forEach(function(user) {
				$('#userTable').append(
					'<tr>'+
						'<td>'+user['Id']+'</td>'+
						'<td>'+user['firstName']+'</td>'+
						'<td>'+user['secondName']+'</td>'+
						'<td>'+user['birthDay']+'</td>'+
						'<td><input type="button" value="delete" onclick="deleteUser('+user['Id']+')"></td>'+
					'</tr>'
				)
			})
		}
	})
}

function deleteUser(id) {
	alert("delete " + id);
	$.ajax({
		url: 'http://localhost:8002/user/' + id,
		type: 'DELETE',
		success: function(data) {
			$('#userTable').empty();
			$('#userTable').append(
				'<tr>'+
					'<th>ID</th>'+
					'<th>First Name</th>'+
					'<th>Second Name</th>'+
					'<th>Birthday</th>'+
				'</tr>'
				);
			data.forEach(function(user) {
				$('#userTable').append(
					'<tr>'+
						'<td>'+user['Id']+'</td>'+
						'<td>'+user['firstName']+'</td>'+
						'<td>'+user['secondName']+'</td>'+
						'<td>'+user['birthDay']+'</td>'+
						'<td><input type="button" value="delete" onclick="deleteUser('+user['Id']+')"></td>'+
					'</tr>'
				)
			})
		}
	})
}