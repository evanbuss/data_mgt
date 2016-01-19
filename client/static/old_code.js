
	$scope.table_id = 1;

	$scope.next = function() {
		$scope.table_id += 1;
		if($scope.table_id == $scope.table_id_count + 1) {
			$scope.table_id = $scope.table_id_count;
		}
		update();
	};

	$scope.prev = function() {
		$scope.table_id -= 1;
		if($scope.table_id <= 1) {
			$scope.table_id = 1;
		}
		update();
	};

	var update = function() {
		TablesFactory.getFormatedPcr(function(data) {
			var check = data.slice(-1)[0];
			$scope.table_id_count = check.table_id;

			var table = [];
			for(var i=0; i<data.length; i++) {
				if(data[i].table_id == $scope.table_id) {
					table.push(data[i]);
				}
			}
			// console.log("formated tables", table);
			$scope.formated = table;
		});
		TablesFactory.getOriginalPcr(function(data) {
			var check = data.slice(-1)[0];
			$scope.table_id_count = check.table_id;

			var table = [];
			for(var i=0; i<data.length; i++) {
				if(data[i].table_id == $scope.table_id) {
					table.push(data[i]);
				}
			}
			// console.log("orginial tables", table)
			$scope.original = table;
		});
		TablesFactory.getOriginalNegCulture(function(data) {
			var check = data.slice(-1)[0];
			$scope.table_id_count = check.table_id;

			var table = [];
			for(var i=0; i<data.length; i++) {
				if(data[i].table_id == $scope.table_id) {
					table.push(data[i]);
				}
			}
			// console.log("orginial tables", table)
			$scope.original = table;
		});
		TablesFactory.getFormatedNegCulture(function(data) {
			var check = data.slice(-1)[0];
			$scope.table_id_count = check.table_id;

			var table = [];
			for(var i=0; i<data.length; i++) {
				if(data[i].table_id == $scope.table_id) {
					table.push(data[i]);
				}
			}
			// console.log("formated tables", table)
			$scope.formated = table;
		});
	};
	update();



// -------------- //

	// get formatted PCR table
	TablesFactory.getFormatedPcr(function(data) {
		$scope.formatedPcr = data;
		// console.log("data1", data)
		var columns =  Object.keys(data[0]).filter(function(key) {
		  if (data[0].hasOwnProperty(key) && typeof key == 'string') {
		    return key;
		  }
		});
		$scope.columns1 = columns.splice(3,columns.length);
		// console.log("here", $scope.columns1)
	});
	// get original PCR table
	TablesFactory.getOriginalPcr(function(data) {
		$scope.originalPcr = data;
		// console.log("data2", data)
		var columns =  Object.keys(data[0]).filter(function(key) {
		  if (data[0].hasOwnProperty(key) && typeof key == 'string') {
		    return key;
		  }
		});
		$scope.columns2 = columns.splice(2,columns.length);
		// console.log("here", $scope.columns2)
	});
	// get formatted neg culture table
	TablesFactory.getFormatedNegCulture(function(data) {
		$scope.formatedNegCulture = data;
		// console.log("data3", data)
		var columns =  Object.keys(data[0]).filter(function(key) {
		  if (data[0].hasOwnProperty(key) && typeof key == 'string') {
		    return key;
		  }
		});
		$scope.columns3 = columns.splice(3,columns.length);
		// console.log("here", $scope.columns3)
	});
	// get orginal neg culture table
	TablesFactory.getOriginalNegCulture(function(data) {
		$scope.originalNegCulture = data;
		// console.log("data4", data)
		var columns =  Object.keys(data[0]).filter(function(key) {
		  if (data[0].hasOwnProperty(key) && typeof key == 'string') {
		    return key;
		  }
		});
		$scope.columns4 = columns.splice(3,columns.length);
		// console.log("here", $scope.columns4)
	});


	// --- get categories table --- //
	CategoryFactory.getCategories(function(data) {
		$scope.categories = data;
		for(var i=0; i<data.length; i++) {
			if(data[i].category_id == 1 && data[i].table_id == 1) {
				$scope.current_category = data[i];
			}
		}
	});


// --------------------- //

				// var scrollToTop = window.setInterval(function() {
                //     var pos = window.pageYOffset;
                //     if ( pos > 0 ) {
                //         window.scrollTo( 0, pos - 20 );
                //     } else {
                //         window.clearInterval( scrollToTop );
                //     }
                // }, 5);


// ------------------------ //

$scope.next = function() {
		$scope.table_id += 1;
		if($scope.table_id == $scope.table_id_count + 1) {
			$scope.table_id = $scope.table_id_count;
		}
		// console.log("cate", $scope.categories[$scope.table_id]);
		$scope.current_category = $scope.categories[$scope.table_id];
		update();
	};

	$scope.prev = function() {
		$scope.table_id -= 1;
		if($scope.table_id <= 1) {
			$scope.table_id = 1;
		}
		// console.log("cate", $scope.categories[$scope.table_id]);
		$scope.current_category = $scope.categories[$scope.table_id];
		update();
	};

	var update = function() {
		TablesFactory.getFormatedPcr(function(data) {
			var check = data.slice(-1)[0];
			$scope.table_id_count = check.table_id;

			// console.log("table id", $scope.table_id);
			// console.log("count", $scope.table_id_count);
			// console.log("category id", $scope.current_category.category_id);
			// console.log("table id", $scope.current_category.table_id);

			var table = [];
			for(var i=0; i<data.length; i++) {
				if(data[i].table_id == $scope.table_id) {
					table.push(data[i]);
				}
			}
			// console.log("formated tables", table);
			$scope.formatedPcr = table;

			var columns =  Object.keys(data[0]).filter(function(key) {
			  if (data[0].hasOwnProperty(key) && typeof key == 'string') {
			    return key;
			  }
			});
			$scope.columns1 = columns.splice(3,columns.length);
		});
		TablesFactory.getOriginalPcr(function(data) {
			var check = data.slice(-1)[0];
			$scope.table_id_count = check.table_id;

			// console.log("table id", $scope.table_id);
			// console.log("count", $scope.table_id_count);
			// console.log("category id", $scope.current_category.category_id);
			// console.log("table id", $scope.current_category.table_id);

			var table = [];
			for(var i=0; i<data.length; i++) {
				if(data[i].table_id == $scope.table_id) {
					table.push(data[i]);
				}
			}
			// console.log("orginial tables", table)
			$scope.originalPcr = table;

			var columns =  Object.keys(data[0]).filter(function(key) {
			  if (data[0].hasOwnProperty(key) && typeof key == 'string') {
			    return key;
			  }
			});
			$scope.columns2 = columns.splice(3,columns.length);
		});
		TablesFactory.getOriginalNegCulture(function(data) {
			var check = data.slice(-1)[0];
			$scope.table_id_count = check.table_id;

			// console.log("table id", $scope.table_id);
			// console.log("count", $scope.table_id_count);
			// console.log("category id", $scope.current_category.category_id);
			// console.log("table id", $scope.current_category.table_id);

			var table = [];
			for(var i=0; i<data.length; i++) {
				if(data[i].table_id == $scope.table_id) {
					table.push(data[i]);
				}
			}
			// console.log("orginial tables", table)
			$scope.originalNegCulture = table;

			var columns =  Object.keys(data[0]).filter(function(key) {
			  if (data[0].hasOwnProperty(key) && typeof key == 'string') {
			    return key;
			  }
			});
			$scope.columns4 = columns.splice(3,columns.length);
		});
		TablesFactory.getFormatedNegCulture(function(data) {
			var check = data.slice(-1)[0];
			$scope.table_id_count = check.table_id;

			// console.log("table id", $scope.table_id);
			// console.log("count", $scope.table_id_count);
			// console.log("category id", $scope.current_category.category_id);
			// console.log("table id", $scope.current_category.table_id);

			var table = [];
			for(var i=0; i<data.length; i++) {
				if(data[i].table_id == $scope.table_id) {
					table.push(data[i]);
				}
			}
			// console.log("formated tables", table)
			$scope.formatedNegCulture = table;

			var columns =  Object.keys(data[0]).filter(function(key) {
			  if (data[0].hasOwnProperty(key) && typeof key == 'string') {
			    return key;
			  }
			});
			$scope.columns3 = columns.splice(3,columns.length);
		});
	};
	update();



	// select option
	var choices = [ "PCR Tests", "Culture Tests"];
	$scope.choices = choices;
	$scope.selectedItem = "PCR Tests";

	$scope.formated = function() {
		var choice = $scope.selectedItem;
		console.log("choice", choice);
		if(choice == "PCR Tests") {
			showFormPCR();
		} else {
			showFormNegCulture();
		}
	}

	$scope.original = function() {
		var choice = $scope.selectedItem;
		if(choice == "PCR Tests") {
			showOrgPCR();
		} else {
			showOrgNegCulture();
		}
	}






							<td> Accession</td>
                            <td> Patient Name</td>
                            <td> Arup Test Mnemonic</td>
                            <td> Age </td>
                            <td> Sex </td>
                            <td> Client ID </td>
                            <td> State </td>
                            <td> Zip Code </td>
                            <td> Collection Month </td>
                            <td> Collection Year </td>
                            <td> Collect to Complete Total Hours </td>
                            <td> Specimen Type Code</td>
                            <td> Discard Date </td>
                            <td> BORD Source </td>
                            <td> BParaPert </td>
                            <td> BORD_TM </td>
                            <td> BordPert Source </td>
                            <td> BPert </td>
                            <td> NC_CT_BORD </td>
                            <td> CHLAM_PNEUM_PCR </td>
                            <td> CPneumo Source </td>
                            <td> NC_CT_CPNEU </td>
                            <td> CWP_Result </td>
                            <td> CWP Source </td>
                            <td> NC_CWP </td>
                            <td> L_pneumophila </td>
                            <td> L_species </td>
                            <td> LEGION Source </td>
                            <td> NC_CT_L_pneumo </td>
                            <td> NC_CT_L_species </td>
                            <td> MPNEUMOPCR </td>
                            <td> Myco Source </td>
                            <td> NC_CT_MPNEU </td>
                            <td> NC_CT_PARAFLU </td>
                            <td> PARAFLU Source </td>
                            <td> PARAFLU1_Result </td>
                            <td> PARAFLU2_Result </td>
                            <td> PARAFLU3_Result </td>
                            <td> PARAFLU4_Result </td>
                            <td> NC_CT_PCP </td>
                            <td> PCP_Result </td>
                            <td> PCP Source </td>
                            <td> PNEUM_SRC </td>
                            <td> Pneumst </td>
                            <td> PNEUMST_REFLEX </td>
                            <td> Flu_A_PCR </td>
                            <td> Flu_B_PCR </td>
                            <td> NC_CT_RespMini </td>
                            <td> RespMini Source </td>
                            <td> RespMini_TM </td>
                            <td> RSV_PCR </td>
                            <td> Adenov </td>
                            <td> Flu_A </td>
                            <td> Flu_B </td>
                            <td> HMPV </td>
                            <td> Pflu_1 </td>
                            <td> Pflu_2 </td>
                            <td> Pflu_3 </td>
                            <td> RS_V </td>
                            <td> RSPFA Source </td>
                            <td> T_Media </td>
                            <td> Adeno_B_E </td>
                            <td> Adeno_C </td>
                            <td> HMPV_RESULT </td>
                            <td> Inf_A_2009 </td>
                            <td> Influenza_A </td>
                            <td> Influenza_A_H1 </td>
                            <td> Influenza_A_H3 </td>
                            <td> Influenza_B </td>
                            <td> Parainfluenza_1 </td>
                            <td> Parainfluenza_2 </td>
                            <td> Parainfluenza_3 </td>
                            <td> Rhino </td>
                            <td> RSV_A </td>
                            <td> RSV_B </td>
                            <td> RVP Source </td>





                                <th> study_id </th>
                                <th> checked_out </th>
                                <th> test_mnemonic </th>
                                <th> age </th>
                                <th> sex </th>
                                <th> state </th>
                                <th> collection_month </th>
                                <th> collection_year </th>
                                <th> collect_to_complete_hours </th>
                                <th> general_source </th>
                                <th> body_site_source </th>
                                <th> source_chart_name </th>
                                <th> is_culture_positive </th>
                                <th> organism_mnemonic </th>
                                <th> result_long_text </th>