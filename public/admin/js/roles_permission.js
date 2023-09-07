var roles_permission = {
    results_table: "roles_list_table",
    searchForm: "searchTableForm",
    init: function () {
        $("#save_form").click(function (e) {
            roles_permission.save();
        });

        $("#findSearch").click(function () {
            var oTable = $("#" + roles_permission.results_table).DataTable();
            var fromData = $("#" + roles_permission.searchForm).serialize();
            oTable.search(fromData).draw();
        });

        // Custom search reset
        $("#searchreset").click(function () {
            roles_permission.clearFormNew(feedback.searchForm);
        });

        $(".first_step_category").click(function () {
            //  var first_category = $(this).attr('data-first-category-id');
            var module_id = $(this).val();
            if ($(this).is(":checked")) {
                $(".first_select_" + module_id).prop("checked", true);
            } else {
                $(".first_select_" + module_id).prop("checked", false);
            }
        });

        $(".second_step_category").click(function () {
            var first_category_id = $(this).attr("data-first-category-id");
            var lengthCheck = $(".first_select_" + first_category_id).filter(
                ":checked"
            ).length;
            if (lengthCheck > 0) {
                $("#module_" + first_category_id).prop("checked", true);
            } else {
                $("#module_" + first_category_id).prop("checked", false);
            }
        });

        $(".third_step_category").click(function () {
            var first_category_id = $(this).attr("data-first-category-id");
            var second_category_id = $(this).attr("data-second-category-id");
            var lengthCheck = $(".third_select_" + second_category_id).filter(
                ":checked"
            ).length;
            if (lengthCheck > 0) {
                $("#module_" + first_category_id).prop("checked", true);
                $(".second_select_" + second_category_id).prop("checked", true);
            } else {
                $("#module_" + first_category_id).prop("checked", false);
                $(".second_select_" + second_category_id).prop(
                    "checked",
                    false
                );
            }
        });

        $(".second_step_category_add").click(function () {
            var first_category_id = $(this).attr("data-first-category-id");
            // var second_category_id = $(this).attr('data-second-category-id');
            var lengthCheck = $(
                ".second_step_category_add_" + first_category_id
            ).filter(":checked").length;
            if (lengthCheck > 0) {
                $("#module_" + first_category_id).prop("checked", true);
            } else {
                $("##module_" + first_category_id).prop("checked", false);
            }
        });

        // Delete Record
        //        $(document).on('click', '.deleteRecord', function () {
        //            var id = $(this).attr('id');
        //            agent.deleteRecord(id);
        //        });
    },
    clearFormNew: function (formId) {
        $("#" + roles_permission.searchForm)
            .find("input, select, textarea")
            .val("")
            .trigger("change");
        var oTable = $("#" + roles_permission.results_table).DataTable();
        var fromData = $("#" + roles_permission.searchForm).serialize();
        oTable.search("formSearch:" + fromData).draw();
    },
    rolesList: function () {
        var post_url = SITE_URL + "admin/roles_list_table";
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $("#" + roles_permission.results_table).DataTable({
            processing: true,
            serverSide: true,
            searching: true,
            responsive: true,
            autoWidth: false,
            bSort: false,
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

        var inputHtml =
            '<div class="form-group" style="display:none"><div class="input-group mb-3"><input type="text" class="form-control dataTableSearch" placeholder="Username" aria-label="Username"><div class="input-group-append"><span class="input-group-text"><i class="fa fa-search" aria-hidden="true" id="search-btn"></i></span></div></div></div>';
        $("#feedback_list_table_filter").html(inputHtml);
        $("#feedback_list_table_wrapper").css("padding", "0px");

        // Datatable Search on click
        //        $("#search-btn").click(function () {
        //            var keyword = $('.dataTableSearch').val();
        //            $('#comman_search').val(keyword);
        //            var oTable = $('#' + amenity.results_table).DataTable();
        //            var fromData = $('#' + amenity.searchForm).serialize();
        //            oTable.search(fromData).draw();
        //        });
    },
    save: function () {
        //         alert('in jjs');
        var post_url = SITE_URL + "admin/roles_permission/update_permission";
        // Get form
        var form = $("#update_permission")[0];
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
                $("#return_class").addClass(rs.data.class);
                $("#font_awsome_icon").addClass(rs.data.fa_icon);
                $("#return_message_show").text(rs.message);
                window.scrollTo(0, 0);
                // setInterval(function () {
                //     window.location = SITE_URL + 'admin/roles_permission/assign_module/' + rs.data.user_type;
                // }, 2000);
            },
            beforeSend: function () {
                $("#divLoading").removeClass("hide").addClass("show");
            },
            complete: function (rs) {
                $("#divLoading").removeClass("show").addClass("hide");
            },
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
                        }
                        html +=
                            '<li style="text-align: left;color: red;">' +
                            error +
                            "</li>";
                        //                        $("#error_message").after('<span class="custom_validation_message" style="color: red;">' + error + '</span>');
                        $("#error_message").append(
                            '<span class="custom_validation_message" style="color: red;">' +
                                error +
                                "</span>"
                        );
                    });
                    html += "</ul>";
                } else {
                }
            },
        });
    },
};
