var comman = {
    hcmhidemsg: false,
    crop_file_browse_class:'',
    crop_file_preview_class:'',
    init: function () {
        $('.select2').select2()
        
//      Globally ajax loader set = start
//        $(document).bind("ajaxSend", function(){
//            $('#divLoading').removeClass("hide").addClass("show");
//        }).bind("ajaxComplete", function(){
//            $('#divLoading').removeClass("show").addClass("hide");
//        });

//   //  Image preview
//        $('.choose_image').on('change', function() {
//            var pdfFile = comman.pdfImagePath
//            var input_name =  $(this).attr("name");
//            if (typeof (FileReader) != "undefined") {
//                $($(this)[0].files).each(function () {
//                    var file = $(this);
//                    var reader = new FileReader();
//                    reader.onload = function (e) {
//                        $('.image_preview'+'_'+input_name).attr("src", e.target.result);
//                    }
//                    reader.readAsDataURL(file[0]);
//                });
//            }else {
//                alert("This browser does not support HTML5 FileReader.");
//            }
//         });

             //replace multiple space with one space
         $(".removespace").on("keypress keyup blur", function () {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
               $(this).val($(this).val().replace(/  +/g, ' '));
            });

            $('.choose_image').on('change', function() {
            var pdfFile = comman.pdfImagePath
            var input_name =  $(this).attr("name");
            var condition = $(this).val().split('.').pop().toLowerCase();
            if(condition == 'jpg' || condition == 'jpeg' || condition == 'png'){
                $($(this)[0].files).each(function () {
                    var file = $(this);
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('.image_preview'+'_'+input_name).attr("src", e.target.result);
                    }
                    reader.readAsDataURL(file[0]);
                });
            }
            else if(condition == 'pdf'){
                    $('.image_preview'+'_'+input_name).attr("src",pdfFile);
            }
            else {
                    alert("Invalid file extension");
            }
         });


          $('.choose_doc').on('change', function() {
            var pdfFile = comman.pdfImagePath;
            var docFile = comman.docImagePath;
            var input_name =  $(this).attr("name");
            var condition = $(this).val().split('.').pop().toLowerCase();
            if(condition == 'jpg' || condition == 'jpeg' || condition == 'png'){
                $($(this)[0].files).each(function () {
                    var file = $(this);
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('.image_preview'+'_'+input_name).attr("src", e.target.result);
                    }
                    reader.readAsDataURL(file[0]);
                });
            }
            else if(condition == 'pdf'){
                    $('.image_preview'+'_'+input_name).attr("src",pdfFile);
            }
            else {
                    $('.image_preview'+'_'+input_name).attr("src",docFile);
            }
         });

//         Enter only symbol and numbers
          $(".allowonlyNumberAndSymbol").on("keypress keyup blur", function (event) {
            if ((event.which < 32 || event.which > 64) && (event.which < 91 || event.which > 96)
                    && (event.which < 123 || event.which > 126)){
                event.preventDefault();
            }
        });


//      Enter only number without decimal => start
        $(".allownumericwithoutdecimal").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

//      Enter only number with decimal => start
        $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

          $(".allowonlyalphabets").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^a-z A-Z]/g,''));
//            alert(event.which);
            if ((event.which < 64 || event.which > 123)) {
                event.preventDefault();
            }
        });


//      Enter only chanracter
        $(".inputTextOnly").keypress(function (e) {
            var key = e.keyCode;
            if (key >= 48 && key <= 57) {
                e.preventDefault();
            }
        });

        $('.stateList').change(function (e) {
            var state_id = $(this).val();
            if (state_id != '') {
                comman.getCityList(state_id);
            } else {
                var selectHtml = '<option value="">' + comman.select + '</option>';
                $("#city_id").html(selectHtml);
            }
        });

//        Show browse image
//        $('#browse_image').change(function() {
//            var i = $(this).prev('label').clone();
//            var file = $('#browse_image')[0].files[0].name;
//            $(this).prev('label').text(file);
//        });

        // $("#state_id").on('change', function (e) {
        //     var stateId = $(this).val();
        //     if (stateId !== '') {
        //         comman.getCity(stateId);
        //     } else {
        //         var selectHtml = '<option value="">' + comman.select_city + '</option>';
        //         $("#city_id").html(selectHtml);
        //     }
        // });

        $('.backLink').click(function() {
//            window.location=document.referrer;
            window.history.back();
        })

        // trigger search button on pressing enter key
         $('#comman_search').keypress(function (e) {
            var key = e.which;
            if(key == 13)  // the enter key code
            {
               $("#findSearch").trigger("click");
               return false;
            }
        });

        channel.bind('App\\Events\\BookingListEvent', function(data) {
//            $('#' + booking.results_table).dataTable().fnClearTable();
//            $('#' + booking.results_table).dataTable().fnDestroy();
//            comman.toast('success', '<a href="'+post_url+'"></a>');
            comman.toast('success', comman.booking_notification);
       });

    },
    readImageURL: function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#browse_image').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    },
    toast: function (type, msg) {
        $.toast({
//            heading: 'Positioning',
            text: msg,
            position: 'top-right',
            icon: type
//            stack: false
        })
    },
    getMomentDateFormat: function () {
        var newFormat = comman.general_setting_configuration.dateformat;
        switch (comman.general_setting_configuration.dateformat) {
            case 'Y-m-d':
                newFormat = 'yyyy-mm-dd';
                break;
            case 'd-m-Y':
                newFormat = 'dd-mm-yyyy';
                break;
            case 'd-m-yy':
                newFormat = 'dd-mm-yy';
                break;
            case 'dd-mm-yyyy':
                newFormat = 'dd-M-yyyy';
                break;
            case 'dd-mmm-yyyy':
                newFormat = 'dd-MM-yyyy';
                break;
            default:
                newFormat = 'dd-mm-yyyy';

        }
        return newFormat;
    },

    getMomentDateMonthFormat: function () {
        var newFormat = comman.general_setting_configuration.datemonthformat;
        switch (comman.general_setting_configuration.datemonthformat) {
            case 'd-m':
                newFormat = 'dd-mm';
                break;
        }
        return newFormat;
    },

    getCityList: function (state_id) {
        // Get form
       // alert(project_id);
        var post_url = SITE_URL + 'admin/getAllDistrictListByStateId';
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: post_url,
            data: {state_id: state_id},
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
            success: function (rs) {
                var status = rs.status;
                var message = rs.message;
                if (status == 1) {
                    var responseData = rs.data;
                    var selectHtml = '';
                    if (responseData != '') {
                      //  alert(responseData);
                        $.each(responseData, function (key, value) {
//                            alert(value);
                            selectHtml += '<option value="' + key + '">' + value + '</option>';
                        });
                    }
                    $("#city_id").html(selectHtml);
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
