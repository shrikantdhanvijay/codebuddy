var billing_calculation = {
    results_table: "billing_calculation_list_table",
    emp_result_table: "employee_billing_calculation_list_table",
    emp_approval_result_table: "employee_billing_calculation_list_table",
    searchForm: "searchTableForm",
    init: function () {
        $("#save_form").click(function (e) {
            if ($("#saveBillingCalculation_form").valid()) {
                billing_calculation.save();
            }
        });

        $("#save_upload_form").click(function (e) {
            // if ($("#saveTimeAllocation_form").valid()) {
            billing_calculation.upload_billing_calculation();
            // }
        });

        $("#submit_to_reporting_manager").click(function (e) {
            // if ($("#saveTimeAllocation_form").valid()) {
            billing_calculation.submitToReportingManager();
            // }
        });

        $("#calculate-billing-amount").change(function (e) {
            if ($(this).prop("checked")) {
                var month = $("#month").val();
                var year = $("#year").val();
                var location_id = $("#location_id").val();
                var activity_id = $("#activity_id").val();
                var company_id = $("#company_id").val();
                var sub_company_id = $("#sub_company_id").val();
                var vertical_id = $("#vertical_id").val();
                var billing_method_id = $("#billing_method_id").val();
                var billing_method_value = $("#billing_method_value").val();

                billing_calculation.calculateBillingCalculations(
                    month,
                    year,
                    location_id,
                    activity_id,
                    company_id,
                    sub_company_id,
                    vertical_id,
                    billing_method_id,
                    billing_method_value
                );
            } else {
                $("#alert_submission").hide();
            }
        });

        $("#save_approval_form").click(function (e) {
            // if ($("#saveTimeAllocation_form").valid()) {
            billing_calculation.save_billing_calculation_approval();
            // }
        });

        //        $('#findSearch').click(function(){
        //           var oTable = $('#'+billing_calculation.results_table).DataTable();
        //           var fromData = $('#'+billing_calculation.searchForm).serialize();
        //           oTable.search(fromData).draw();
        //        });
        //
        //        // Custom search reset
        //        $('#searchreset').click(function () {
        //            billing_calculation.clearFormNew(billing_calculation.searchForm);
        //        });

        // Delete Record
        $(document).on("click", ".deleteRecord", function () {
            var id = $(this).attr("id");
            billing_calculation.deleteRecord(id);
        });

        $(".stateList").change(function (e) {
            var state_id = $(this).val();
            if (state_id != "") {
                billing_calculation.getCityList(state_id);
            } else {
                var selectHtml =
                    '<option value="">' + comman.select + "</option>";
                $("#city_id").html(selectHtml);
            }
        });

        // // Validation Start
        $("#saveBillingCalculation_form").validate({
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
                billing_method_id: {
                    required: true,
                },
                billing_method_value: {
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
                billing_method_id: {
                    required: comman.required,
                },
                billing_method_value: {
                    required: comman.required,
                },
            },
            errorPlacement: function (error, element) {
                var ele_id = $(element).attr("name");
                if (ele_id != "billing_method_value") {
                    error.insertAfter("#" + ele_id + "_error");
                } else {
                    error.insertAfter(element);
                }
                if (error != "") {
                    $("#required_error").removeClass("hide").addClass("show");
                }
            },
        });
        // Validation End
    },
    clearFormNew: function (formId) {
        $("#" + billing_calculation.searchForm)
            .find("input, select, textarea")
            .val("")
            .trigger("change");
        var oTable = $("#" + billing_calculation.results_table).DataTable();
        var fromData = $("#" + billing_calculation.searchForm).serialize();
        oTable.search("formSearch:" + fromData).draw();
    },
    billingCalculationList: function () {
        var post_url = SITE_URL + "admin/billing_calculation_list";
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $("#" + billing_calculation.results_table).DataTable({
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
                // {data: 'name', name: 'name', orderable: true, searchable: true},
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
                    data: "margin_amount",
                    name: "margin_amount",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "billing_amount",
                    name: "billing_amount",
                    orderable: true,
                    searchable: true,
                },
                // {data: 'status', name: 'status', orderable: false, searchable: false},
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

        //        $("#billing_calculation_list_table_filter").html(inputHtml)
        $("#emp_billing_calculation_list_table_wrapper").css("padding", "0px");
        $("#search_field").keyup(function () {
            var keyword = $(".dataTableSearch").val();
            $("#comman_search").val(keyword);
            var oTable = $(
                "#" + billing_calculation.emp_result_table
            ).DataTable();
            var fromData = $("#" + billing_calculation.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },

    employeeTimeAllocationList: function () {
        var post_url = SITE_URL + "admin/employee_billing_calculation_list";
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $("#" + billing_calculation.emp_result_table).DataTable({
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
                // {data: 'name', name: 'name', orderable: true, searchable: true},
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
                    data: "margin_amount",
                    name: "margin_amount",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "billing_amount",
                    name: "billing_amount",
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

        //        $("#billing_calculation_list_table_filter").html(inputHtml)
        $("#emp_billing_calculation_list_table_wrapper").css("padding", "0px");
        $("#search_field").keyup(function () {
            var keyword = $(".dataTableSearch").val();
            $("#comman_search").val(keyword);
            var oTable = $(
                "#" + billing_calculation.emp_result_table
            ).DataTable();
            var fromData = $("#" + billing_calculation.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },

    billingCalculationApprovalList: function () {
        var post_url = SITE_URL + "admin/billing_calculation_approval_list";
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $("#" + billing_calculation.emp_approval_result_table).DataTable({
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
                // {data: 'name', name: 'name', orderable: true, searchable: true},
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
                    data: "margin_amount",
                    name: "margin_amount",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "billing_amount",
                    name: "billing_amount",
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
        $("#employee_billing_calculation_list_table_wrapper").css(
            "padding",
            "0px"
        );
        $("#search_field").keyup(function () {
            var keyword = $(".dataTableSearch").val();
            $("#comman_search").val(keyword);
            var oTable = $(
                "#" + billing_calculation.emp_approval_result_table
            ).DataTable();
            var fromData = $("#" + billing_calculation.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },

    save: function () {
        // alert();
        var post_url = SITE_URL + "admin/billing_calculation/store";
        // Get form
        var form = $("#saveBillingCalculation_form")[0];
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
                    //                    $('#saveAmenity_form')[0].reset();
                    setInterval(function () {
                        window.location =
                            SITE_URL + "admin/billing_calculation";
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
                        if (i == "allocated_time") {
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
                        } else if (i == "location_id") {
                            $("#location_id_error").after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "billing_method_id") {
                            $("#billing_method_id_error").after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else {
                            $("#billing_method_value_error").after(
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
                url: SITE_URL + "admin/billing_calculation/delete",
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
                                SITE_URL + "admin/billing_calculation";
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
    upload_billing_calculation: function () {
        var post_url = SITE_URL + "admin/import_billing_calculation";
        // Get form
        var form = $("#saveTimeAllocationUpload_form")[0];
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
                    //                    $('#saveAmenity_form')[0].reset();
                    setInterval(function () {
                        window.location =
                            SITE_URL + "admin/billing_calculation";
                        //                        window.location = SITE_URL + 'admin/logout';
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
                        $("#" + i).after(
                            '<span class="custom_validation_message" style="color: red;">' +
                                error +
                                "</span>"
                        );
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

    submitToReportingManager: function () {
        var post_url = SITE_URL + "admin/submit_to_reporting_manager";
        $.ajax({
            type: "post",
            dataType: "json",
            url: post_url,
            processData: false, // Important!
            contentType: false,
            cache: false,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf_token"]').attr("content"),
            },
            success: function (rs) {
                if (rs.status == 1) {
                    $("#alert_submission").after(
                        '<div class="alert alert-success alert-dismissible fade show" role="alert"><span class="alert-inner--text">Records submitted to Reporting Manager</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>'
                    );
                    setInterval(function () {
                        window.location =
                            SITE_URL + "admin/billing_calculation";
                        //                        window.location = SITE_URL + 'admin/logout';
                    });
                } else {
                    $("#alert_submission").after(
                        '<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><span class="alert-inner--text">Total Time allocation should be 100%</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>'
                    );
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
                if (rs.responseJSON != undefined) {
                    $("#alert_submission").after(
                        '<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><span class="alert-inner--text">Danger alert—At vero eos et accusamus praesentium!</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>'
                    );
                } else {
                }
            },
        });
    },

    save_billing_calculation_approval: function () {
        var post_url =
            SITE_URL +
            "admin/update_billing_calculation_approval/approval_store";
        // Get form
        var form = $("#saveUpdateTimeAllocation_form")[0];
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
                    //                    $('#saveAmenity_form')[0].reset();
                    setInterval(function () {
                        window.location =
                            SITE_URL + "admin/billing_calculation_approval";
                        //                        window.location = SITE_URL + 'admin/logout';
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
                        $("#" + i).after(
                            '<span class="custom_validation_message" style="color: red;">' +
                                error +
                                "</span>"
                        );
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

    getCityList: function (state_id) {
        // Get form
        // alert(project_id);
        var post_url = SITE_URL + "admin/getAllDistrictListByStateId";
        $.ajax({
            type: "get",
            dataType: "json",
            url: post_url,
            data: { state_id: state_id },
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
                        //  alert(responseData);
                        $.each(responseData, function (key, value) {
                            //                            alert(value);
                            selectHtml +=
                                '<option value="' +
                                key +
                                '">' +
                                value +
                                "</option>";
                        });
                    }
                    $("#city_id").html(selectHtml);
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

    calculateBillingCalculations: function (
        month,
        year,
        location_id,
        activity_id,
        company_id,
        sub_company_id,
        vertical_id,
        billing_method_id,
        billing_method_value
    ) {
        var post_url = SITE_URL + "admin/getBillingCalculations";
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
                billing_method_value: billing_method_value,
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
                        $("#margin_amount").val(responseData.margin_amount);
                        $("#billing_amount").val(responseData.billing_amount);
                        // $("#invalidCheck").val('');
                    }
                } else {
                    $("#alert_submission").after(
                        '<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><span class="alert-inner--text">' +
                            message +
                            '</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>'
                    );
                    $("#calculation_div").removeClass("show").addClass("hide");
                    // $("#invalidCheck").val('');
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
