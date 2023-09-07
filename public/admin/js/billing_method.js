var billing_method = {
    results_table: "billing_method_list_table",
    searchForm: "searchTableForm",
    init: function () {
        $("#save_form").click(function (e) {
            if ($("#savebilling_method_form").valid()) {
            billing_method.save();
            }
        });

        //        $('#findSearch').click(function(){
        //           var oTable = $('#'+billing_method.results_table).DataTable();
        //           var fromData = $('#'+billing_method.searchForm).serialize();
        //           oTable.search(fromData).draw();
        //        });

        // Delete Record
        $(document).on("click", ".deleteRecord", function () {
            var id = $(this).attr("id");
            billing_method.deleteRecord(id);
        });

        // // Validation Start
        $("#savebilling_method_form").validate({
            errorElement: "div",
            highlight: function (element) {
                $(element).removeClass("error");
            },
            rules: {
                name: {
                    required: true,
                    maxlength: 255,
                },
                type: {
                    required: true,
                },
            },
            messages: {
                name: {
                    required: comman.required,
                    maxlength: comman.max,
                },
                type: {
                    required: comman.required,
                },
            },
        });
        // Validation End
    },
    clearFormNew: function (formId) {
        $("#" + billing_method.searchForm)
            .find("input, select, textarea")
            .val("")
            .trigger("change");
        var oTable = $("#" + billing_method.results_table).DataTable();
        var fromData = $("#" + billing_method.searchForm).serialize();
        oTable.search("formSearch:" + fromData).draw();
    },
    billing_methodList: function () {
        var post_url = SITE_URL + "admin/master/billing_method_list";
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $("#" + billing_method.results_table).DataTable({
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
                    data: "name",
                    name: "name",
                    orderable: true,
                    searchable: true,
                },
                {
                    data: "type",
                    name: "type",
                    orderable: true,
                    searchable: true,
                },
                // {data: 'percentage_rate', name: 'percentage_rate', orderable: true, searchable: true},
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
        $("#billing_method_list_table_wrapper").css("padding", "0px");
        $("#search_field").keyup(function () {
            var keyword = $(".dataTableSearch").val();
            $("#comman_search").val(keyword);
            var oTable = $("#" + billing_method.results_table).DataTable();
            var fromData = $("#" + billing_method.searchForm).serialize();
            oTable.search(fromData).draw();
        });
    },
    save: function () {
        var post_url = SITE_URL + "admin/master/billing_method_store";
        // Get form
        var form = $("#savebilling_method_form")[0];
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
                            SITE_URL + "admin/master/billing_method";
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
                        // $("#" + i).after('<span class="custom_validation_message" style="color: red;">' + error + '</span>');

                        if (i == "name") {
                            $("#" + i).after(
                                '<div class="invalid-feedback custom_validation_message">' +
                                    error +
                                    "</div>"
                            );
                            // }
                            // else if(i == 'percentage_rate'){
                            //    $("#" + i).after('<div class="invalid-feedback custom_validation_message">' + error + '</div>');
                        } else {
                            $("#type_error").after(
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
                url: SITE_URL + "admin/billing_method/delete",
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
                                SITE_URL + "admin/master/billing_method";
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
};
