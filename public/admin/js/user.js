var user = {
    results_table: "user_list_table",
    searchForm: "searchTableForm",
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

        $("#save_form").click(function (e) {
            if ($("#saveUser_form").valid()) {
                user.save();
            }
        });

        //        $('#findSearch').click(function(){
        //           var oTable = $('#'+user.results_table).DataTable();
        //           var fromData = $('#'+user.searchForm).serialize();
        //           oTable.search(fromData).draw();
        //        });
        //
        //        // Custom search reset
        //        $('#searchreset').click(function () {
        //            user.clearFormNew(user.searchForm);
        //        });

        // Delete Record
        $(document).on("click", ".deleteRecord", function () {
            var id = $(this).attr("id");
            user.deleteRecord(id);
        });

        $(".employeeManagerList").change(function (e) {
            var user_type_id = $(this).val();
            if (user_type_id != "") {
                user.getEmployeeManagerList(user_type_id);
            } else {
                var selectHtml =
                    '<option value="">' + comman.select + "</option>";
                $("#unit_id").html(selectHtml);
            }
        });

        // // Validation Start
        $("#saveUser_form").validate({
            errorElement: "div",
            highlight: function (element) {
                $(element).removeClass("error");
            },
            rules: {
                employee_code: {
                    required: true,
                },
                first_name: {
                    required: true,
                    maxlength: 255,
                },
                last_name: {
                    required: true,
                    maxlength: 255,
                },
                email: {
                    required: true,
                    maxlength: 255,
                },
                mobile: {
                    required: true,
                },
                vertical_id: {
                    required: true,
                },
                user_type_id: {
                    required: true,
                },
                emp_manager_id: {
                    required: true,
                },
            },
            messages: {
                employee_code: {
                    required: comman.required,
                },
                first_name: {
                    required: comman.required,
                    maxlength: comman.max,
                },
                last_name: {
                    required: comman.required,
                    maxlength: comman.max,
                },
                email: {
                    required: comman.required,
                    maxlength: comman.max,
                },
                mobile: {
                    required: comman.required,
                },
                vertical_id: {
                    required: comman.required,
                },
                user_type_id: {
                    required: comman.required,
                },
                emp_manager_id: {
                    required: comman.required,
                },
            },
            errorPlacement: function (error, element) {
                var ele_id = $(element).attr("name");
                if (
                    ele_id == "vertical_id" ||
                    ele_id == "user_type_id" ||
                    ele_id == "emp_manager_id" ||
                    ele_id == "location_id"
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
        $("#" + user.searchForm)
            .find("input, select, textarea")
            .val("")
            .trigger("change");
        var oTable = $("#" + user.results_table).DataTable();
        var fromData = $("#" + user.searchForm).serialize();
        oTable.search("formSearch:" + fromData).draw();
    },
    userList: function () {
        var post_url = SITE_URL + "admin/user_list";
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $("#" + user.results_table).DataTable({
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
                    data: "employee_code",
                    name: "employee_code",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "first_name",
                    name: "first_name",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "last_name",
                    name: "last_name",
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
                    data: "location_id",
                    name: "location_id",
                    orderable: true,
                    searchable: true,
                },
                //                {data: 'status', name: 'status', orderable: false, searchable: false},
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

        //        $("#user_list_table_filter").html(inputHtml)
        $("#user_list_table_wrapper").css("padding", "0px");
        $("#search_field").keyup(function () {
            var keyword = $(".dataTableSearch").val();
            $("#comman_search").val(keyword);
            var oTable = $("#" + user.results_table).DataTable();
            var fromData = $("#" + user.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },
    save: function () {
        var post_url = SITE_URL + "admin/user/store";
        // Get form
        var form = $("#saveUser_form")[0];
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
                        window.location = SITE_URL + "admin/user";
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
                        // html += '<li style="text-align: left;color: red;">' + error + '</li>';
                        // $("#" + i).after('<span class="custom_validation_message" style="color: red;">' + error + '</span>');
                        if (i == "vertical_id") {
                            $("#vertical_id_error").after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "first_name") {
                            $("#" + i).after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "last_name") {
                            $("#" + i).after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "email") {
                            $("#" + i).after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "mobile") {
                            $("#" + i).after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "location_id") {
                            $("#" + i).after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "employee_code") {
                            $("#" + i).after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else if (i == "user_type_id") {
                            $("#user_type_error").after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                        } else {
                            $("#emp_manager_id_error").after(
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
                url: SITE_URL + "admin/user/delete",
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
                            window.location = SITE_URL + "admin/user";
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

    getEmployeeManagerList: function (user_type_id) {
        // Get form
        // alert(project_id);
        var post_url = SITE_URL + "admin/user/get_user_list_by_user_type_id";
        $.ajax({
            type: "get",
            dataType: "json",
            url: post_url,
            data: { user_type_id: user_type_id },
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
                    $("#emp_manager_id").html(selectHtml);
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
