var changePass = {
    // results_table: 'user_list_table',
    // searchForm: 'searchTableForm',
    init: function () {
        $("#save_form").click(function (e) {
            // if ($("#saveChangePassword_form").valid()) {
            changePass.save();
            // }
        });

        // Validation Start
        //  $("#saveChangePassword_form").validate({
        //     errorElement: "div",
        //     highlight: function(element) {
        //         $(element).removeClass("error");
        //     },
        //     rules: {
        //         "old_password":{
        //             required: true
        //         },
        //         "password":{
        //             required: true
        //         },
        //         "confirm_password":{
        //             required: true
        //         }
        //     },
        //     messages:{
        //         "old_password":{
        //             required: comman.required
        //         },
        //         "password":{
        //             required: comman.required
        //         },
        //         "confirm_password":{
        //             required: comman.required
        //         }
        //     }
        // });
        // Validation End
    },
    clearFormNew: function (formId) {
        $("#" + changePass.searchForm)
            .find("input, select, textarea")
            .val("")
            .trigger("change");
        var oTable = $("#" + changePass.results_table).DataTable();
        var fromData = $("#" + changePass.searchForm).serialize();
        oTable.search("formSearch:" + fromData).draw();
    },
    save: function () {
        var post_url = SITE_URL + "admin/password_store";
        // Get form
        var form = $("#saveChangePassword_form")[0];
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
                if (rs.status == 1) {
                    $("#saveChangePassword_form")[0].reset();
                    comman.toast("success", rs.message);
                    setInterval(function () {
                        history.back();
                    }, 1000);
                } else {
                    comman.toast("error", rs.message);
                }
            },
            beforeSend: function () {
                //                $(".preloader").fadeIn();
                $("#divLoading").removeClass("hide").addClass("show");
            },
            complete: function (rs) {
                //                $(".preloader").fadeOut();
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
};
