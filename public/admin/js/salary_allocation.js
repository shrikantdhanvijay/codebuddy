var salary_allocation = {
    results_table: 'salary_allocation_list_table',
    searchForm: 'searchTableForm',
    init: function () {

        // Server side message hide on keyup
//        $("input,textarea,select").keyup(function() {
//            var id = $(this).attr('id');
//            $( "#"+id).siblings("span").hide();
//        });

        // Server side message hide on change
//        $('input[type=file]').change(function (e) {
//            var id = $(this).attr('id');
//            $( "#"+id).siblings("span").hide();
//        });

        $('#save_form').click(function (e) {
              // if ($("#saveSalaryAllocation_form").valid()) {
            salary_allocation.save();
        // }
        });
        
        $('#save_upload_form').click(function (e) {
              // if ($("#saveSalaryAllocation_form").valid()) {
            salary_allocation.upload_salary_allocation();
        // }
        });

        $('#activity_id').change(function (e) {
            var activity_id = $('#activity_id').val();
            var company_id = $('#company_id').val();
            var vertical_id = $('#vertical_id').val();
            salary_allocation.calculateAllocatedSalary(activity_id,company_id,vertical_id);
        });

//        $('#findSearch').click(function(){
//           var oTable = $('#'+salary_allocation.results_table).DataTable();
//           var fromData = $('#'+salary_allocation.searchForm).serialize();
//           oTable.search(fromData).draw();
//        });
//
//        // Custom search reset
//        $('#searchreset').click(function () {
//            salary_allocation.clearFormNew(salary_allocation.searchForm);
//        });

        // Delete Record
        $(document).on('click', '.deleteRecord', function () {
            var id = $(this).attr('id');
            salary_allocation.deleteRecord(id);
        });

  // // Validation Start
  //       $("#savesalary_allocation_form").validate({
  //           errorElement: "div",
  //           highlight: function (element) {
  //               $(element).removeClass("error");
  //           },
  //           rules: {
  //               "name_en": {
  //                   required: true,
  //                   maxlength: 255
  //               },
  //               "name_kh": {
  //                   required: true,
  //                   maxlength: 255
  //               },
  //           },
  //           messages: {
  //               "name_en": {
  //                   required: comman.required,
  //                   maxlength: comman.max
  //               },
  //               "name_kh": {
  //                   required: comman.required,
  //                   maxlength: comman.max
  //               },

  //           }
  //       });
        // Validation End
    },
    clearFormNew: function (formId) {
        $('#' + salary_allocation.searchForm).find('input, select, textarea').val('').trigger("change");
        var oTable = $('#' + salary_allocation.results_table).DataTable();
        var fromData = $('#' + salary_allocation.searchForm).serialize();
        oTable.search('formSearch:' + fromData).draw();
    },
    salaryAllocationList: function () {
        var post_url = SITE_URL + 'admin/salary_allocation_list';
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $('#' + salary_allocation.results_table).DataTable({
            processing: true,
            serverSide: true,
            searching: true,
            responsive: false,
            autoWidth: false,
            bSort: true,
            "language": {
                "lengthMenu": comman.display + " _MENU_ " + comman.records,
                "processing": comman.processing,
                "paginate": {
                    "previous": comman.previous,
                    "next": comman.next
                },
                "info": comman.showing_page + " _PAGE_ " + comman.of + " _PAGES_ ",
            },
            ajax: {
                url: post_url,
                type: 'GET',
            },
            columns: [
                {data: 'sr_no', name: 'sr_no', orderable: false, searchable: false, sWidth: '30px'},
                {data: 'user_id', name: 'user_id', orderable: true, searchable: true},
                {data: 'activity_id', name: 'activity_id', orderable: false, searchable: false},
                {data: 'company_id', name: 'company_id', orderable: true, searchable: true},
                {data: 'vertical_id', name: 'vertical_id', orderable: true, searchable: true},
                {data: 'allocated_salary', name: 'allocated_salary', orderable: true, searchable: true},
                {data: 'action', name: 'action', orderable: false, searchable: false, sWidth: '80px'}
            ],
            "columnDefs": [
//                {"width": "200px", "targets": 1},
            ],
            order: [[0, 'desc']],
            drawCallback: function (settings) {
//                alert('in c');
                var info = this.fnSettings().aaSorting;
                $('#search_sorting').val(info);
            }
        });
//style="display:none"
//        var inputHtml = '<div class="" ><div class="input-group "><input type="text" class="form-control dataTableSearch" id="search_field"><div class="input-group-append"><span class="input-group-text"><i class="fa fa-search" aria-hidden="true" id="search-btn"></i></span></div></div></div>';

//        var inputHtml = '<div class="" ><div class="input-group "><input type="text" class="form-control dataTableSearch" id="search_field"><div class="input-group-append"><span class="input-group-text"><i class="fa fa-search" aria-hidden="true" id="search-btn"></i></span></div></div></div>';

//        $("#salary_allocation_list_table_filter").html(inputHtml)
        $("#salary_allocation_list_table_wrapper").css("padding", "0px");
        $("#search_field").keyup(function () {
            var keyword = $('.dataTableSearch').val();
            $('#comman_search').val(keyword);
            var oTable = $('#' + salary_allocation.results_table).DataTable();
            var fromData = $('#' + salary_allocation.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },
    save: function () {
        var post_url = SITE_URL + 'admin/salary_allocation/store';
        // Get form
        var form = $('#saveSalaryAllocation_form')[0];
        // Create an FormData object
        var form_data = new FormData(form);
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: post_url,
            data: form_data,
            enctype: 'multipart/form-data',
            processData: false, // Important!
            contentType: false,
            cache: false,
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
            success: function (rs) {
                $('.custom_validation_message').hide();
                if (rs.status == 1) {
                    comman.toast('success', rs.message);
//                    $('#saveAmenity_form')[0].reset();
                    setInterval(function () {
                        window.location = SITE_URL + 'admin/salary_allocation';
//                        window.location = SITE_URL + 'admin/logout';
                    }, 1000);
                } else {
                    comman.toast('error', rs.message);
                }
            },
            beforeSend: function () {

            },
            complete: function (rs) {

            },
            statusCode:  {
                419: function() {
//                    comman.toast('error', comman.session_expired);
                    setInterval(function () {
                        window.location = SITE_URL + 'admin';
                    }, 1000);

                }
            },
            error: function (rs) {
                $('input, select').removeClass('validation-error');
                $('.custom_validation_message').hide();
                if (rs.responseJSON != undefined) {
                    var html = '<ul>';
                    var errorFirst = 0;
                    var errorFieldName = '';
                    $.each(rs.responseJSON.errors, function (i, error) {
                        $("#" + i).addClass('validation-error');
                        if (errorFirst == 0) {
                            errorFirst++;
                            errorFieldName = i;
                        }
                        html += '<li style="text-align: left;color: red;">' + error + '</li>';
                        $("#" + i).after('<span class="custom_validation_message" style="color: red;">' + error + '</span>');
                    });

                    // Error filed focus
                    if (errorFieldName != '') {
                        $("#" + errorFieldName).focus();
                    }
                    html += '</ul>';
                } else {

                }
            }
        });
    },
    deleteRecord: function (id) {
        if (confirm(comman.delete_confirm)) {
            $.ajax({
                type: "post",
                url: SITE_URL + 'admin/salary_allocation/delete',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
                data: {id: id},
                dataType: 'json',
                success: function (rs) {
                    var status = rs.status;
                    var message = rs.message;
                    if (status == 1) {
                        comman.toast('success', rs.message);
                        setInterval(function () {
                            window.location = SITE_URL + 'admin/master/salary_allocation';
                        }, 1000);
                    } else {
                        comman.toast('success', rs.message);
                    }
                },
                beforeSend: function () {
                },
                complete: function () {
                },
                statusCode:  {
                    419: function() {
    //                    comman.toast('error', comman.session_expired);
                        setInterval(function () {
                            window.location = SITE_URL + 'admin';
                        }, 1000);

                    }
                },
                error: function (rs) {

                }
            });
        }
    },
    upload_salary_allocation: function () {
        var post_url = SITE_URL + 'admin/import_salary_allocation';
        // Get form
        var form = $('#saveSalaryAllocationUpload_form')[0];
        // Create an FormData object
        var form_data = new FormData(form);
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: post_url,
            data: form_data,
            enctype: 'multipart/form-data',
            processData: false, // Important!
            contentType: false,
            cache: false,
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
            success: function (rs) {
                $('.custom_validation_message').hide();
                if (rs.status == 1) {
                    comman.toast('success', rs.message);
//                    $('#saveAmenity_form')[0].reset();
                    setInterval(function () {
                        window.location = SITE_URL + 'admin/salary_allocation';
//                        window.location = SITE_URL + 'admin/logout';
                    }, 1000);
                } else {
                    comman.toast('error', rs.message);
                }
            },
            beforeSend: function () {

            },
            complete: function (rs) {

            },
            statusCode:  {
                419: function() {
//                    comman.toast('error', comman.session_expired);
                    setInterval(function () {
                        window.location = SITE_URL + 'admin';
                    }, 1000);

                }
            },
            error: function (rs) {
                $('input, select').removeClass('validation-error');
                $('.custom_validation_message').hide();
                if (rs.responseJSON != undefined) {
                    var html = '<ul>';
                    var errorFirst = 0;
                    var errorFieldName = '';
                    $.each(rs.responseJSON.errors, function (i, error) {
                        $("#" + i).addClass('validation-error');
                        if (errorFirst == 0) {
                            errorFirst++;
                            errorFieldName = i;
                        }
                        html += '<li style="text-align: left;color: red;">' + error + '</li>';
                        $("#" + i).after('<span class="custom_validation_message" style="color: red;">' + error + '</span>');
                    });

                    // Error filed focus
                    if (errorFieldName != '') {
                        $("#" + errorFieldName).focus();
                    }
                    html += '</ul>';
                } else {

                }
            }
        });
    },

    calculateAllocatedSalary: function (activity_id,company_id,vertical_id) {
        var post_url = SITE_URL + 'admin/calculateAllocatedSalary';
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: post_url,
            data: {vertical_id: vertical_id ,company_id:company_id,activity_id:activity_id},
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
            success: function (rs) {
                var status = rs.status;
                var message = rs.message;
                if (status == 1) {
                    var responseData = rs.data;
                    var selectHtml = '';
                    if (responseData != '') {
                       // alert(responseData);
                            $("#allocated_salary").val(responseData);
                    }
                   
                }
            },
            beforeSend: function () {
                $('#dropdownLoader').removeClass("hide").addClass("show");
            },
            complete: function (rs) {
                $('#dropdownLoader').removeClass("show").addClass("hide");
            },
            statusCode:  {
                419: function() {
//                    comman.toast('error', comman.session_expired);
                    setInterval(function () {
                        window.location = SITE_URL + 'admin';
                    }, 1000);
                    
                }
            },
            error: function (rs) {
            }
        });
    },
}
