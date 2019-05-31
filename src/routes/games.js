"use strict";

// UUID
var uuid = require('uuid');

// Dates
var dateutil = require('dateutil');

//-------------------------------------------------------------------------------------------
// Create a Product
exports.createGame = function(req, res) {
	
	pool.connect(function(err, client, done) {
		
		var handleError = function(err) {
			// no error occurred, continue with the request
			if(!err) return false;
			res.status(500).json({ result:'error', data:{ error:err } });
			return true;
	    };
	    // handle an error from the connect
		if(handleError(err)) return;
		
		// Validate then insert
		if(req.body.description) {		

			var queryText = 'INSERT INTO games (id, date_created, description, start_time, end_time, is_all_day location, division, home_team, visior_team, chief_umpire, umpire_1, umpire_2, concession_1, concession_2, color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10. $11, $12, $13, $14, $15, $16) RETURNING id, product_name'
			client.query(queryText, [uuid.v4(), dateutil.date(), req.body.description, req.body.start_time, req.body.end_time, req.body.is_all_day, req.body.location, req.body.division, req.body.home_team, req.body.visitor_team, req.body.chief_umpire, req.body.umpire_1, req.body.umpire_2, req.body.concession_1, req.body.concession_2, req.body.color], function(err, result) {
				done();
				// handle an error from the query
				if(handleError(err)) return;
				res.status(200).json({result: 'success', data:{ id : result.rows[0].id, description : result.rows[0].description }});	
			});
	  	
		} else {
			done();
	    	res.status(400).json({ result: 'error', data:{error: 'description, start, end and teams are required'} });
		}
		
	});
	
}


//-------------------------------------------------------------------------------------------
// Get all Products
exports.readGames = function(req, res) {
	
	// get a pg client from the connection pool
	pool.connect(function(err, client, done) {
		console.log("pool connection");
    	var handleError = function(err) {
			// no error occurred, continue with the request
			if(!err) return false;
			done();
			console.log(err);
			res.status(500).json({ result:'error', data:{ error:err } });
			return true;
    	};
    	
    	// handle an error from the connect
		if(handleError(err)) return;
		var queryText = 'SELECT * FROM public.games';
		client.query(queryText, [], function(err, result) {
			if(handleError(err)) return;
			done();
			if(result.rowCount > 0) {
				var games = result.rows;
				res.status(200).json({result: 'success', data:{ games : games }});
			} else {
				res.status(200).json({result: 'success', data:{}});
			}
		});
	});
	console.log("no pool connection");
};

//-------------------------------------------------------------------------------------------
// Get all Best Selling Products
exports.readBestSellers = function(req, res) {
	
	// get a pg client from the connection pool
	pool.connect(function(err, client, done) {
		
    	var handleError = function(err) {
			// no error occurred, continue with the request
			if(!err) return false;
			done();
			console.log(err);
			res.status(500).json({ result:'error', data:{ error:err } });
			return true;
    	};
    	
    	// handle an error from the connect
		if(handleError(err)) return;
		var queryText = 'SELECT product_name, unit_price FROM products WHERE best_seller = true;';
		client.query(queryText, [], function(err, result) {
			if(handleError(err)) return;
			done();
			if(result.rowCount > 0) {
				var products = result.rows;
				res.status(200).json({result: 'success', data:{ products : products }});
			} else {
				res.status(200).json({result: 'success', data:{}});
			}
		});
	});
};

//-------------------------------------------------------------------------------------------
// Get all Best Selling Products stripped for a table
exports.readBestSellersMin = function(req, res) {
	
	// get a pg client from the connection pool
	pool.connect(function(err, client, done) {
		
    	var handleError = function(err) {
			// no error occurred, continue with the request
			if(!err) return false;
			done();
			console.log(err);
			res.status(500).json({ result:'error', data:{ error:err } });
			return true;
    	};
    	
    	// handle an error from the connect
		if(handleError(err)) return;
		var queryText = 'SELECT product_name, unit_price FROM products WHERE best_seller = true;';
		client.query(queryText, [], function(err, result) {
			if(handleError(err)) return;
			done();
			if(result.rowCount > 0) {
				var data = result.rows;
				res.status(200).json({data});
			} else {
				res.status(200).json({data});
			}
		});
	});
};



//-------------------------------------------------------------------------------------------
// Get specific Product
exports.readProduct = function(req, res) {
	
	// get a pg client from the connection pool
	pool.connect(function(err, client, done) {
		
    	var handleError = function(err) {
			// no error occurred, continue with the request
			if(!err) return false;
			done(client);
			res.status(500).json({ result:'error', data:{ error:err } });
			return true;
    	};
    	
    	// handle an error from the connect
		if(handleError(err)) return;

		var queryText = 'SELECT * FROM products WHERE id = $1;';
		client.query(queryText, [req.params.id], function(err, result) {
			if(handleError(err)) return;
			done();
			if(result.rowCount > 0) {
				var products = result.rows;
				res.status(200).json({result: 'success', data:{ products : products }});
			} else {
				res.status(200).json({result: 'success', data:{}});
			}
		}); 

	});
};

//-------------------------------------------------------------------------------------------
// Get Product with LIKE
exports.searchProduct = function(req, res) {
	
	// get a pg client from the connection pool
	pool.connect(function(err, client, done) {
		
    	var handleError = function(err) {
			// no error occurred, continue with the request
			if(!err) return false;
			done(client);
			res.status(500).json({ result:'error', data:{ error:err } });
			return true;
    	};
    	
    	// handle an error from the connect
		if(handleError(err)) return;

		var queryText = "SELECT * FROM products WHERE product_name ILIKE $1;";
		var param = '%' + req.params.partial_name + '%';
		client.query(queryText, [param], function(err, result) {
			if(handleError(err)) return;
			done();
			if(result.rowCount > 0) {
				var products = result.rows;
				res.status(200).json({result: 'success', data:{ products : products }});
			} else {
				res.status(200).json({result: 'success', data:{}});
			}
		}); 

	});
};


//---------------------------------------------------------------------------------------
// Update
exports.updateProduct = function(req, res) {
	
	// get a pg client from the connection pool
	pool.connect(function(err, client, done) {

    	var handleError = function(err) {
			// no error occurred, continue with the request
			if(!err) return false;
			done();
			res.status(500).json({ result:'error', data:{ error:err } });
			return true;
    	};

    	// handle an error from the connect
		if(handleError(err)) return;

		// Validate then insert
			if(req.body) {
			
				if(req.body.id) {	
					
					var queryText = 'UPDATE products SET date_updated = $2';			
					var argumentCount = 2;
					var valueArray = [req.body.id, dateutil.date()];
										
					if(req.body.product_name) {
						argumentCount = argumentCount + 1;
						queryText = queryText + ', product_name = $' + argumentCount; 
						valueArray.push(req.body.product_name);
					}
					if(req.body.id_type) {
						argumentCount = argumentCount + 1;
						queryText = queryText + ', id_type = $' + argumentCount; 
						valueArray.push(req.body.id_type);
					}
					if(req.body.id_scent_type) {
						argumentCount = argumentCount + 1;
						queryText = queryText + ', id_scent_type = $' + argumentCount; 
						valueArray.push(req.body.id_scent_type);
					}
					if(req.body.qty_on_hand) {
						argumentCount = argumentCount + 1;
						queryText = queryText + ', qty_on_hand = $' + argumentCount; 
						valueArray.push(req.body.qty_on_hand);
					}
					if(req.body.size) {
						argumentCount = argumentCount + 1;
						queryText = queryText + ', size = $' + argumentCount; 
						valueArray.push(req.body.size);
					}
					if(req.body.unit_price) {
						argumentCount = argumentCount + 1;
						queryText = queryText + ', unit_price = $' + argumentCount; 
						valueArray.push(req.body.unit_price);
					}
					if(req.body.cost) {
						argumentCount = argumentCount + 1;
						queryText = queryText + ', cost = $' + argumentCount; 
						valueArray.push(req.body.cost);
					}
					if(req.body.in_store) {
						argumentCount = argumentCount + 1;
						queryText = queryText + ', in_store = $' + argumentCount; 
						valueArray.push(req.body.in_store);
					}

					queryText = queryText + ' WHERE id = $1 RETURNING id;';
		
					// Remove for production
					console.log("Query: " + queryText);
					console.log("Values: " + valueArray);
					// End
					
					client.query(queryText, valueArray, function(err, result) {
		    			// handle an error from the query
						if(handleError(err)) return;
						done();
						if(result.rowCount > 0) {
							res.status(200).json({result: 'success', data:{ id : result.rows[0].id }});
						} else {
							res.status(400).json({ error: 'id not found' });	
						}
	      		});
      		
      		} else {
	      		done();
	      		res.status(400).json({ result:'error', data:{ error:'the product id is required inside the body object'} });
    		}
      	
    	} else {
	    	done();
	    	res.status(400).json({ result:'error', data:{ error:'Missing body object' } });
    	}
   
  	});
};

//---------------------------------------------------------------------------------------
// Delete
exports.deleteProduct = function(req, res) {
	
	// get a pg client from the connection pool
	pool.connect(function(err, client, done) {

    	var handleError = function(err) {
			// no error occurred, continue with the request
			if(!err) return false;
			done();
			res.status(500).json({ result:'error', data:{ error:err } });
			return true;
    	};

    	// handle an error from the connect
		if(handleError(err)) return;

		// Validate then insert
		if(req.params.id) {
			
			var queryText = 'DELETE FROM products WHERE id = $1'
			client.query(queryText, [req.params.id], function(err, result) {
    			// handle an error from the query
				if(handleError(err)) return;
				done();
				res.status(200).json({result: 'success', data:{count : result.rowCount}});
      		});
      	
    	} else {
	    	done();
	    	res.status(400).json({ result: 'error', data:{error: 'id is required'} });
    	}
   
  	});
};

//-------------------------------------------------------------------------------------------
// Get dollar amount of our on-hand inventory
exports.totalCostofOnHand = function(req, res) {
	
	// get a pg client from the connection pool
	pool.connect(function(err, client, done) {
		
    	var handleError = function(err) {
			// no error occurred, continue with the request
			if(!err) return false;
			done();
			console.log(err);
			res.status(500).json({ result:'error', data:{ error:err } });
			return true;
    	};
    	
    	// handle an error from the connect
		if(handleError(err)) return;
		var queryText = 'SELECT SUM(qty_on_hand * cost) as total_cost FROM products;';
		client.query(queryText, [], function(err, result) {
			if(handleError(err)) return;
			done();
			if(result.rowCount > 0) {
				var products = result.rows;
				res.status(200).json({result: 'success', data:{ total_cost : result.rows[0].total_cost }});
			} else {
				res.status(200).json({result: 'success', data:{ total_cost : 0.00 }});
			}
		});
	});
};


