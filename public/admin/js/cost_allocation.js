var cost_allocation = {
    results_table: "cost_allocation_list_table",
    emp_result_table: "employee_cost_allocation_list_table",
    emp_approval_result_table: "employee_cost_allocation_list_table",
    searchForm: "searchTableForm",
    init: function () {
        $("#save_form").click(function (e) {
            if ($("#saveCostAllocation_form").valid()) {
                cost_allocation.save();
            }
        });

        // $('#save_upload_form').click(function (e) {
        //     cost_allocation.upload_cost_allocation();
        // });

        // $('#submit_to_reporting_manager').click(function (e) {
        //     cost_allocation.submitToReportingManager();
        // });

        $("#calculate-cost-allocation").change(function (e) {
            if ($(this).prop("checked")) {
                var month = $("#month").val();
                var year = $("#year").val();
                var billing_method_id = $("#billing_method_id").val();
                var location_id = $("#location_id").val();
                var activity_id = $("#activity_id").val();
                var company_id = $("#company_id").val();
                var sub_company_id = $("#sub_company_id").val();
                var vertical_id = $("#vertical_id").val();
                cost_allocation.calculateCostAllocations(
                    month,
                    year,
                    location_id,
                    activity_id,
                    company_id,
                    sub_company_id,
                    vertical_id,
                    billing_method_id
                );
            } else {
                $("#alert_submission").hide();
            }
        });

        // $('#save_approval_form').click(function (e) {
        //     cost_allocation.save_cost_allocation_approval();
        // });

        //        $('#findSearch').click(function(){
        //           var oTable = $('#'+cost_allocation.results_table).DataTable();
        //           var fromData = $('#'+cost_allocation.searchForm).serialize();
        //           oTable.search(fromData).draw();
        //        });
        //
        //        // Custom search reset
        //        $('#searchreset').click(function () {
        //            cost_allocation.clearFormNew(cost_allocation.searchForm);
        //        });

        // Delete Record
        $(document).on("click", ".deleteRecord", function () {
            var id = $(this).attr("id");
            cost_allocation.deleteRecord(id);
        });

        // $('.stateList').change(function (e) {
        //     var state_id = $(this).val();
        //     if (state_id != '') {
        //         cost_allocation.getCityList(state_id);
        //     } else {
        //         var selectHtml = '<option value="">' + comman.select + '</option>';
        //         $("#city_id").html(selectHtml);
        //     }
        // });

        // Validation Start
        $("#saveCostAllocation_form").validate({
            errorElement: "div",
            highlight: function (element) {
                $(element).removeClass("error");
            },
            rules: {
                activity_id: {
                    required: true,
                },
                company_id: {
                    required: true,
                },
                sub_company_id: {
                    required: true,
                },
                vertical_id: {
                    required: true,
                },
                location_id: {
                    required: true,
                },
            },
            messages: {
                activity_id: {
                    required: comman.required,
                },
                company_id: {
                    required: comman.required,
                },
                sub_company_id: {
                    required: comman.required,
                },
                vertical_id: {
                    required: comman.required,
                },
                location_id: {
                    required: comman.required,
                },
            },
            errorPlacement: function (error, element) {
                var ele_id = $(element).attr("name");
                if (ele_id != "checkbox") {
                    error.insertAfter("#" + ele_id + "_error");
                } else {
                    error.insertAfter(element);
                }
                if (ele_id == "checkbox") {
                    error.insertAfter("#alert_submission");
                }
                if (error != "") {
                    $("#required_error").removeClass("hide").addClass("show");
                }
            },
        });
        // Validation End
    },
    clearFormNew: function (formId) {
        $("#" + cost_allocation.searchForm)
            .find("input, select, textarea")
            .val("")
            .trigger("change");
        var oTable = $("#" + cost_allocation.results_table).DataTable();
        var fromData = $("#" + cost_allocation.searchForm).serialize();
        oTable.search("formSearch:" + fromData).draw();
    },
    costAllocationList: function () {
        var post_url = SITE_URL + "admin/cost_allocation_list";
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $("#" + cost_allocation.results_table).DataTable({
            processing: true,
            serverSide: true,
            searching: true,
            responsive: false,
            autoWidth: false,
            bSort: true,
            language: {
                lengthMenu: comman.display + " _MENU_ " + comman.records,
                processing: comman.processing,
                paginate: {
                    previous: comman.previous,
                    next: comman.next,
                },
                info:
                    comman.showing_page + " _PAGE_ " + comman.of + " _PAGES_ ",
            },
            ajax: {
                url: post_url,
                type: "GET",
            },
            columns: [
                {
                    data: "sr_no",
                    name: "sr_no",
                    orderable: false,
                    searchable: false,
                    sWidth: "30px",
                },
                {
                    data: "activity_id",
                    name: "activity_id",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "vertical_id",
                    name: "vertical_id",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "company_id",
                    name: "company_id",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "location_id",
                    name: "location_id",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "month",
                    name: "month",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "year",
                    name: "year",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "action",
                    name: "action",
                    orderable: false,
                    searchable: false,
                    sWidth: "80px",
                },
            ],
            columnDefs: [
                //                {"width": "200px", "targets": 1},
            ],
            order: [[0, "desc"]],
            drawCallback: function (settings) {
                //                alert('in c');
                var info = this.fnSettings().aaSorting;
                $("#search_sorting").val(info);
            },
        });
        //style="display:none"
        //        var inputHtml = '<div class="" ><div class="input-group "><input type="text" class="form-control dataTableSearch" id="search_field"><div class="input-group-append"><span class="input-group-text"><i class="fa fa-search" aria-hidden="true" id="search-btn"></i></span></div></div></div>';

        //        var inputHtml = '<div class="" ><div class="input-group "><input type="text" class="form-control dataTableSearch" id="search_field"><div class="input-group-append"><span class="input-group-text"><i class="fa fa-search" aria-hidden="true" id="search-btn"></i></span></div></div></div>';

        //        $("#cost_allocation_list_table_filter").html(inputHtml)
        $("#cost_allocation_list_table_wrapper").css("padding", "0px");
        $("#search_field").keyup(function () {
            var keyword = $(".dataTableSearch").val();
            $("#comman_search").val(keyword);
            var oTable = $("#" + cost_allocation.results_table).DataTable();
            var fromData = $("#" + cost_allocation.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },

    //     employeeCostAllocationList: function () {
    //         var post_url = SITE_URL + 'admin/employee_cost_allocation_list';
    //         $.ajaxSetup({
    //             headers: {
    //                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //             }
    //         });
    //         $('#' + cost_allocation.emp_result_table).DataTable({
    //             processing: true,
    //             serverSide: true,
    //             searching: true,
    //             responsive: false,
    //             autoWidth: false,
    //             bSort: true,
    //             "language": {
    //                 "lengthMenu": comman.display + " _MENU_ " + comman.records,
    //                 "processing": comman.processing,
    //                 "paginate": {
    //                     "previous": comman.previous,
    //                     "next": comman.next
    //                 },
    //                 "info": comman.showing_page + " _PAGE_ " + comman.of + " _PAGES_ ",
    //             },
    //             ajax: {
    //                 url: post_url,
    //                 type: 'GET',
    //             },
    //             columns: [
    //                 {data: 'sr_no', name: 'sr_no', orderable: false, searchable: false, sWidth: '30px'},
    //                 // {data: 'name', name: 'name', orderable: true, searchable: true},
    //                 {data: 'activity_id', name: 'activity_id', orderable: true, searchable: true},
    //                 {data: 'vertical_id', name: 'vertical_id', orderable: true, searchable: true},
    //                 {data: 'allocated_cost', name: 'allocated_cost', orderable: true, searchable: true},
    //                 {data: 'status', name: 'status', orderable: false, searchable: false},
    //                 {data: 'action', name: 'action', orderable: false, searchable: false, sWidth: '80px'}
    //             ],
    //             "columnDefs": [
    // //                {"width": "200px", "targets": 1},
    //             ],
    //             order: [[0, 'desc']],
    //             drawCallback: function (settings) {
    // //                alert('in c');
    //                 var info = this.fnSettings().aaSorting;
    //                 $('#search_sorting').val(info);
    //             }
    //         });
    // //style="display:none"
    // //        var inputHtml = '<div class="" ><div class="input-group "><input type="text" class="form-control dataTableSearch" id="search_field"><div class="input-group-append"><span class="input-group-text"><i class="fa fa-search" aria-hidden="true" id="search-btn"></i></span></div></div></div>';

    // //        var inputHtml = '<div class="" ><div class="input-group "><input type="text" class="form-control dataTableSearch" id="search_field"><div class="input-group-append"><span class="input-group-text"><i class="fa fa-search" aria-hidden="true" id="search-btn"></i></span></div></div></div>';

    // //        $("#cost_allocation_list_table_filter").html(inputHtml)
    //         $("#emp_cost_allocation_list_table_wrapper").css("padding", "0px");
    //         $("#search_field").keyup(function () {
    //             var keyword = $('.dataTableSearch').val();
    //             $('#comman_search').val(keyword);
    //             var oTable = $('#' + cost_allocation.emp_result_table).DataTable();
    //             var fromData = $('#' + cost_allocation.searchForm).serialize();
    //             oTable.search(fromData).draw();
    //         });
    //     },

    //        costAllocationApprovalList: function () {
    //         var post_url = SITE_URL + 'admin/cost_allocation_approval_list';
    //         $.ajaxSetup({
    //             headers: {
    //                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //             }
    //         });
    //         $('#' + cost_allocation.emp_approval_result_table).DataTable({
    //             processing: true,
    //             serverSide: true,
    //             searching: true,
    //             responsive: false,
    //             autoWidth: false,
    //             bSort: true,
    //             "language": {
    //                 "lengthMenu": comman.display + " _MENU_ " + comman.records,
    //                 "processing": comman.processing,
    //                 "paginate": {
    //                     "previous": comman.previous,
    //                     "next": comman.next
    //                 },
    //                 "info": comman.showing_page + " _PAGE_ " + comman.of + " _PAGES_ ",
    //             },
    //             ajax: {
    //                 url: post_url,
    //                 type: 'GET',
    //             },
    //             columns: [
    //                 {data: 'sr_no', name: 'sr_no', orderable: false, searchable: false, sWidth: '30px'},
    //                 {data: 'activity_id', name: 'activity_id', orderable: true, searchable: true},
    //                 {data: 'vertical_id', name: 'vertical_id', orderable: true, searchable: true},
    //                 {data: 'company_id', name: 'company_id', orderable: true, searchable: true},
    //                 {data: 'location_id', name: 'location_id', orderable: true, searchable: true},
    //                 {data: 'action', name: 'action', orderable: false, searchable: false, sWidth: '80px'}
    //             ],
    //             "columnDefs": [
    // //                {"width": "200px", "targets": 1},
    //             ],
    //             order: [[0, 'desc']],
    //             drawCallback: function (settings) {
    // //                alert('in c');
    //                 var info = this.fnSettings().aaSorting;
    //                 $('#search_sorting').val(info);
    //             }
    //         });
    //         $("#employee_cost_allocation_list_table_wrapper").css("padding", "0px");
    //         $("#search_field").keyup(function () {
    //             var keyword = $('.dataTableSearch').val();
    //             $('#comman_search').val(keyword);
    //             var oTable = $('#' + cost_allocation.emp_approval_result_table).DataTable();
    //             var fromData = $('#' + cost_allocation.searchForm).serialize();
    //             oTable.search(fromData).draw();
    //         });
    //     },

    save: function () {
        var post_url = SITE_URL + "admin/cost_allocation/store";
        // Get form
        var form = $("#saveCostAllocation_form")[0];
        // Create an FormData object
        var form_data = new FormData(form);
        $.ajax({
            type: "post",
            dataType: "json",
            url: post_url,
            data: form_data,
            enctype: "multipart/form-data",
            processData: false, // Important!
            contentType: false,
            cache: false,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf_token"]').attr("content"),
            },
            success: function (rs) {
                $(".custom_validation_message").hide();
                if (rs.status == 1) {
                    comman.toast("success", rs.message);

                    setInterval(function () {
                        window.location = SITE_URL + "admin/cost_allocation";
                    }, 1000);
                } else {
                    comman.toast("error", rs.message);
                }
            },
            beforeSend: function () {},
            complete: function (rs) {},
            statusCode: {
                419: function () {
                    //                    comman.toast('error', comman.session_expired);
                    setInterval(function () {
                        window.location = SITE_URL + "admin";
                    }, 1000);
                },
            },
            error: function (rs) {
                $("input, select").removeClass("validation-error");
                $(".custom_validation_message").hide();
                if (rs.responseJSON != undefined) {
                    var html = "<ul>";
                    var errorFirst = 0;
                    var errorFieldName = "";
                    $.each(rs.responseJSON.errors, function (i, error) {
                        $("#" + i).addClass("validation-error");
                        if (errorFirst == 0) {
                            errorFirst++;
                            errorFieldName = i;
                        }
                        html +=
                            '<li style="text-align: left;color: red;">' +
                            error +
                            "</li>";
                        if (i == "allocated_cost") {
                            $("#" + i).after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "company_id") {
                            $("#company_id_error").after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "sub_company_id") {
                            $("#sub_company_id_error").after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "vertical_id") {
                            $("#vertical_id_error").after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "activity_id") {
                            $("#activity_id_error").after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else {
                            $("#location_id_error").after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        }
                        $("#" + i).addClass("is-invalid");
                    });

                    // Error filed focus
                    if (errorFieldName != "") {
                        $("#" + errorFieldName).focus();
                    }
                    html += "</ul>";
                } else {
                }
            },
        });
    },

    deleteRecord: function (id) {
        if (confirm(comman.delete_confirm)) {
            $.ajax({
                type: "post",
                url: SITE_URL + "admin/cost_allocation/delete",
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf_token"]').attr(
                        "content"
                    ),
                },
                data: { id: id },
                dataType: "json",
                success: function (rs) {
                    var status = rs.status;
                    var message = rs.message;
                    if (status == 1) {
                        comman.toast("success", rs.message);
                        setInterval(function () {
                            window.location =
                                SITE_URL + "admin/cost_allocation";
                        }, 1000);
                    } else {
                        comman.toast("success", rs.message);
                    }
                },
                beforeSend: function () {},
                complete: function () {},
                statusCode: {
                    419: function () {
                        //                    comman.toast('error', comman.session_expired);
                        setInterval(function () {
                            window.location = SITE_URL + "admin";
                        }, 1000);
                    },
                },
                error: function (rs) {},
            });
        }
    },

    calculateCostAllocations: function (
        month,
        year,
        location_id,
        activity_id,
        company_id,
        sub_company_id,
        vertical_id,
        billing_method_id
    ) {
        var post_url = SITE_URL + "admin/getCostAllocationCalculations";
        $.ajax({
            type: "get",
            dataType: "json",
            url: post_url,
            data: {
                month: month,
                year: year,
                vertical_id: vertical_id,
                company_id: company_id,
                sub_company_id: sub_company_id,
                activity_id: activity_id,
                location_id: location_id,
                billing_method_id: billing_method_id,
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf_token"]').attr("content"),
            },
            success: function (rs) {
                var status = rs.status;
                var message = rs.message;
                if (status == 1) {
                    var responseData = rs.data;
                    var selectHtml = "";
                    if (responseData != "") {
                        $("#calculation_div")
                            .removeClass("hide")
                            .addClass("show");
                        $("#salary").val(responseData.salary);
                        $("#direct_cost").val(responseData.direct_cost);
                        $("#support_allocation").val(
                            responseData.support_allocation
                        );
                        $("#total_direct_cost").val(
                            responseData.total_direct_cost
                        );
                        $("#other_expences").val(responseData.other_expences);
                        $("#depreciation").val(responseData.depreciation);
                        $("#travelling").val(responseData.travelling);
                        $("#rent").val(responseData.rent);
                        $("#it").val(responseData.it);
                        $("#total_cost").val(responseData.total_cost);
                    }
                } else {
                    $("#alert_submission").after(
                        '<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><span class="alert-inner--text">' +
                            message +
                            '</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>'
                    );
                    $("#calculation_div").removeClass("show").addClass("hide");
                    // $("#calculate-cost-allocation").val();
                }
            },
            beforeSend: function () {
                $("#dropdownLoader").removeClass("hide").addClass("show");
            },
            complete: function (rs) {
                $("#dropdownLoader").removeClass("show").addClass("hide");
            },
            statusCode: {
                419: function () {
                    //                    comman.toast('error', comman.session_expired);
                    setInterval(function () {
                        window.location = SITE_URL + "admin";
                    }, 1000);
                },
            },
            error: function (rs) {},
        });
    },
};
