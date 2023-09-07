var time_allocation = {
    results_table: "time_allocation_list_table",
    emp_result_table: "employee_time_allocation_list_table",
    emp_approval_result_table: "employee_time_allocation_list_table",
    emp_approval_result_table_for_emp_manager:
        "time_allocation_approval_list_table_for_emp_manager",
    searchForm: "searchTableForm",
    init: function () {
        $("#save_form").click(function (e) {
            if ($("#saveTimeAllocation_form").valid()) {
            time_allocation.save();
            }
        });

        $("#save_upload_form").click(function (e) {
            // if ($("#saveTimeAllocation_form").valid()) {
            time_allocation.upload_time_allocation();
            // }
        });

        $("#submit_to_reporting_manager").click(function (e) {
            // if ($("#saveTimeAllocation_form").valid()) {
            time_allocation.submitToReportingManager();
            // }
        });

        $("#save_approval_form").click(function (e) {
            // if ($("#saveTimeAllocation_form").valid()) {
            time_allocation.save_time_allocation_approval();
            // }
        });

        $(".companyList").change(function (e) {
            var company_id = $(this).val();
            if (company_id != "") {
                time_allocation.getSubCompanyList(company_id);
            } else {
                var selectHtml =
                    '<option value="">' + comman.select + "</option>";
                $("#sub_company_id").html(selectHtml);
            }
        });

        $(".subCompanyList").change(function (e) {
            var sub_company_id = $(this).val();
            if (sub_company_id != "") {
                time_allocation.getActivityList(sub_company_id);
            } else {
                var selectHtml =
                    '<option value="">' + comman.select + "</option>";
                $("#activity_id").html(selectHtml);
            }
        });

        //        $('#findSearch').click(function(){
        //           var oTable = $('#'+time_allocation.results_table).DataTable();
        //           var fromData = $('#'+time_allocation.searchForm).serialize();
        //           oTable.search(fromData).draw();
        //        });
        //
        //        // Custom search reset
        //        $('#searchreset').click(function () {
        //            time_allocation.clearFormNew(time_allocation.searchForm);
        //        });

        // Delete Record
        $(document).on("click", ".deleteRecord", function () {
            var id = $(this).attr("id");
            time_allocation.deleteRecord(id);
        });

        // $(document).on('click', '#approve_selected', function () {
        //     // var id = $(this).attr('id');
        //     var table = $("#" + time_allocation.emp_approval_result_table_for_emp_manager).DataTable();
        //     var selectedRowData = table.rows({ selected: true }).ids().toArray();
        //     console.log(JSON.stringify(selectedRowData));
        //     // time_allocation.deleteRecord(id);
        // });

        // var table = $(
        //     "#" + time_allocation.emp_approval_result_table_for_emp_manager
        // ).DataTable();

        // $("#approve_selected").on("click", function () {
        //     console.log(table.row(this).data());
        // });

        // $("#approve_selected").click(function (e) {
        //     var table = $(
        //         "#" + time_allocation.emp_approval_result_table_for_emp_manager
        //     ).DataTable();
        //     // emp_approval_result_table_for_emp_manager.rows('.selected').data()
        //     var selectedRowData = table.rows({ selected: true }).nodes().data('id');
        //     console.log(selectedRowData);
        //     // for (var i = 0; i < selectedRowData.length; i++) {
        //     //     console.log(selectedRowData[i]);
        //     // }
        //     time_allocation.approveSelectedRecords(selectedRowData);
        //     //     // var ids = $.map(selectedRowData, function (item) {
        //     //     //     return item[0];
        //     //     // });
        //     //     // console.log(ids);
        // });

        // $("#employee_time_allocation_list_table").on(
        //     "click",
        //     ".someCheckbox",
        //     function () {
        //         if ($(".someCheckbox").hasClass("selected")) {
        //             $(".someCheckbox").removeClass("selected");
        //         } else {
        //             $(".someCheckbox").addClass("selected");
        //         }
        //         // $(".someCheckbox").toggleClass(
        //         //     "selected"
        //         // );
        //     }
        // );

        $(document).ready(function () {
            var table = $("#employee_time_allocation_list_table").DataTable();

            $("#employee_time_allocation_list_table tbody").on(
                "click",
                "tr",
                function () {
                    $(this).toggleClass("selected");
                }
            );

            $("body").on("change", "#select-all", function () {
                var stud_row, checked;
                stud_row = $("#employee_time_allocation_list_table").find(
                    "tbody tr"
                );
                checked = $(this).prop("checked");
                $.each(stud_row, function () {
                    var checkbox = $($(this).find("td").eq(0))
                        .find("input")
                        .prop("checked", checked);
                    $(this).toggleClass("selected");
                });
            });

            $("#approve_selected").click(function () {
                var selectedRowData = table.rows(".selected").data();
                var ids = $.map(selectedRowData, function (item) {
                    return item;
                });
                console.log(ids);
                time_allocation.approveSelectedRecords(ids);
            });
        });

        // $('.someCheckbox').click(function(e){
        //     var chkboxType = $(this).data();
        //     console.log("chkboxType",chkboxType);
        // });

        // // Validation Start
        $("#saveTimeAllocation_form").validate({
            errorElement: "div",
            highlight: function (element) {
                $(element).removeClass("error");
            },
            rules: {
                vertical_id: {
                    required: true,
                },
                company_id: {
                    required: true,
                },
                sub_company_id: {
                    required: true,
                },
                activity_id: {
                    required: true,
                },
                allocated_time: {
                    required: true,
                },
            },
            messages: {
                vertical_id: {
                    required: comman.required,
                },
                company_id: {
                    required: comman.required,
                },
                sub_company_id: {
                    required: comman.required,
                },
                activity_id: {
                    required: comman.required,
                },
                allocated_time: {
                    required: comman.required,
                },
            },
            errorPlacement: function (error, element) {
                var ele_id = $(element).attr("name");
                if (
                    ele_id == "vertical_id" ||
                    ele_id == "company_id" ||
                    ele_id == "sub_company_id" ||
                    ele_id == "activity_id"
                ) {
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
        $("#" + time_allocation.searchForm)
            .find("input, select, textarea")
            .val("")
            .trigger("change");
        var oTable = $("#" + time_allocation.results_table).DataTable();
        var fromData = $("#" + time_allocation.searchForm).serialize();
        oTable.search("formSearch:" + fromData).draw();
    },
    timeAllocationList: function () {
        var post_url = SITE_URL + "admin/time_allocation_list";
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $("#" + time_allocation.results_table).DataTable({
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
                    data: "user_id",
                    name: "user_id",
                    orderable: true,
                    searchable: true,
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
                    data: "allocated_time",
                    name: "allocated_time",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "status",
                    name: "status",
                    orderable: false,
                    searchable: false,
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

        //        $("#time_allocation_list_table_filter").html(inputHtml)
        $("#emp_time_allocation_list_table_wrapper").css("padding", "0px");
        $("#search_field").keyup(function () {
            var keyword = $(".dataTableSearch").val();
            $("#comman_search").val(keyword);
            var oTable = $("#" + time_allocation.emp_result_table).DataTable();
            var fromData = $("#" + time_allocation.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },

    employeeTimeAllocationList: function () {
        var post_url = SITE_URL + "admin/employee_time_allocation_list";
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $("#" + time_allocation.emp_result_table).DataTable({
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
                    data: "allocated_time",
                    name: "allocated_time",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "status",
                    name: "status",
                    orderable: false,
                    searchable: false,
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

        //        $("#time_allocation_list_table_filter").html(inputHtml)
        $("#emp_time_allocation_list_table_wrapper").css("padding", "0px");
        $("#search_field").keyup(function () {
            var keyword = $(".dataTableSearch").val();
            $("#comman_search").val(keyword);
            var oTable = $("#" + time_allocation.emp_result_table).DataTable();
            var fromData = $("#" + time_allocation.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },

    timeAllocationApprovalList: function () {
        var post_url = SITE_URL + "admin/time_allocation_approval_list";
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        var table1 = $(
            "#" + time_allocation.emp_approval_result_table
        ).DataTable({
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
                    data: "id",
                    name: "id",
                    orderable: false,
                    searchable: false,
                    sWidth: "30px",
                    visible: false,
                },
                {
                    data: "sr_no",
                    name: "sr_no",
                    orderable: false,
                    searchable: false,
                    sWidth: "30px",
                },
                {
                    data: "user_id",
                    name: "user_id",
                    orderable: true,
                    searchable: true,
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
                    data: "allocated_time",
                    name: "allocated_time",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "status",
                    name: "status",
                    orderable: false,
                    searchable: false,
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
        $("#employee_time_allocation_list_table_wrapper").css("padding", "0px");
        $("#search_field").keyup(function () {
            var keyword = $(".dataTableSearch").val();
            $("#comman_search").val(keyword);
            var oTable = $(
                "#" + time_allocation.emp_approval_result_table
            ).DataTable();
            var fromData = $("#" + time_allocation.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },

    save: function () {
        var post_url = SITE_URL + "admin/time_allocation/store";
        // Get form
        var form = $("#saveTimeAllocation_form")[0];
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
                        window.location.reload();
                        window.scrollTo(0, 2000);
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
                        } else {
                            $("#location_error").after(
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
                url: SITE_URL + "admin/time_allocation/delete",
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
                                SITE_URL + "admin/time_allocation";
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
    upload_time_allocation: function () {
        var post_url = SITE_URL + "admin/import_time_allocation";
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
                        window.location = SITE_URL + "admin/time_allocation";
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
                        window.location = SITE_URL + "admin/time_allocation";
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
                        '<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><span class="alert-inner--text">Total Time allocation should be 100%</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>'
                    );
                } else {
                }
            },
        });
    },

    save_time_allocation_approval: function () {
        var post_url =
            SITE_URL + "admin/update_time_allocation_approval/approval_store";
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
                            SITE_URL + "admin/time_allocation_approval";
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

    approvalListForEmpManager: function () {
        var post_url =
            SITE_URL + "admin/time_allocation_approval_list_for_emp_manager";
        var id = $("#user_id").val();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $(
            "#" + time_allocation.emp_approval_result_table_for_emp_manager
        ).DataTable({
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
                data: { record_id: id },
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
                    data: "user_id",
                    name: "user_id",
                    orderable: true,
                    searchable: true,
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
                    data: "allocated_time",
                    name: "allocated_time",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "status",
                    name: "status",
                    orderable: false,
                    searchable: false,
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
        $("#emp_approval_result_table_for_emp_manager_wrapper").css(
            "padding",
            "0px"
        );
        $("#search_field").keyup(function () {
            var keyword = $(".dataTableSearch").val();
            $("#comman_search").val(keyword);
            var oTable = $(
                "#" + time_allocation.emp_approval_result_table_for_emp_manager
            ).DataTable();
            var fromData = $("#" + time_allocation.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },

    approveSelectedRecords: function (ids) {
        // console.log(selectedRowData);
        $.ajax({
            type: "post",
            url: SITE_URL + "admin/time_allocation_approval/approve_selected",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf_token"]').attr("content"),
            },
            data: { ids },
            dataType: "json",
            success: function (rs) {
                var status = rs.status;
                var message = rs.message;
                if (status == 1) {
                    comman.toast("success", message);
                    setInterval(function () {
                        window.location = SITE_URL + "admin/time_allocation";
                    }, 1000);
                } else {
                    comman.toast("success", message);
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
    },

    getSubCompanyList: function (company_id) {
        // Get form
        // alert(project_id);
        var post_url =
            SITE_URL + "admin/user/get_sub_company_list_by_company_id";
        $.ajax({
            type: "get",
            dataType: "json",
            url: post_url,
            data: { company_id: company_id },
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
                    $("#sub_company_id").html(selectHtml);
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

    getActivityList: function (sub_company_id) {
        // Get form
        // alert(project_id);
        var post_url =
            SITE_URL + "admin/user/get_activity_list_by_sub_company_id";
        $.ajax({
            type: "get",
            dataType: "json",
            url: post_url,
            data: { sub_company_id: sub_company_id },
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
                    $("#activity_id").html(selectHtml);
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
