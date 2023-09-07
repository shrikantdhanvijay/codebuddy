var general_settings = {
//    results_table: 'user_type_list_table',
    searchForm: 'searchTableForm',
    init: function () {

        $('#save_form').click(function (e) {
            general_settings.save();
        });

       
        
        // Delete Record
        $(document).on('click','.deleteRecord',function(){
            var id = $(this).attr('id');
            general_settings.deleteRecord(id);
        });
        
             
    },
    clearFormNew: function (formId) {
        $('#' + general_settings.searchForm).find('input, select, textarea').val('').trigger("change");
        var oTable = $('#'+general_settings.results_table).DataTable();   
        var fromData = $('#'+general_settings.searchForm).serialize();
        oTable.search('formSearch:'+fromData).draw();
    },
 


    
    save: function () {
        
        var post_url = SITE_URL + 'admin/general_settings/general_settings_store';
        // Get form
        var form = $('#saveGeneral_Settings_form')[0];
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
                if (rs.status == 1) {
                    window.scrollTo(0, 0); 
                    comman.toast('success', rs.message);
//                    $('#saveUserType_form')[0].reset();
                    setInterval(function () {
                        window.location = SITE_URL + 'admin/general_settings';
                    }, 1000);
                } else {
                    comman.toast('error', rs.message); 
                }
            },
            beforeSend: function () {
//                $(".preloader").fadeIn();
                 $('#divLoading').removeClass("hide").addClass("show");
            },
            complete: function (rs) {
//                $(".preloader").fadeOut();
                 $('#divLoading').removeClass("show").addClass("hide");
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
                        i = i.replace('config_key.','');
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
                url: SITE_URL + 'admin/general_settings/delete',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
                data: {id: id},
                dataType: 'json',
                success: function (rs) {
                    var status = rs.status;
                    var message = rs.message;
                    if (status == 1) {
                        comman.toast('success', rs.message);
                        setInterval(function () {
                            window.location = SITE_URL + 'admin/general_settings';
                        }, 1000);
                    }else {
                        comman.toast('success', rs.message);
                    }
                },
                beforeSend: function () {
    //                $(".preloader").fadeIn();
                     $('#divLoading').removeClass("hide").addClass("show");
                },
                complete: function (rs) {
    //                $(".preloader").fadeOut();
                     $('#divLoading').removeClass("show").addClass("hide");
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
    }
}

