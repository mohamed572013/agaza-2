
    var Agaza_special_offers_grid;

    var Agaza_special_offers = function () {

        var init = function () {
            //alert('here');
            $.extend(lang, new_lang);
            handleRecords();

            handleSubmit();
            readImage();


        };

        var readImage = function (input) {
            $("#image").change(function () {
                //alert($(this)[0].files.length);
                for (var i = 0; i < $(this)[0].files.length; i++) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('.image_uploaded').html('<img style="height:250px;width:100%;" id="image_upload_preview" src="' + e.target.result + '" alt="your image" />');
                    }

                    reader.readAsDataURL($(this)[0].files[i]);
                }

                //readURL(this);
            });


        }
        var handleRecords = function () {
            Agaza_special_offers_grid = $('.dataTable').dataTable({
                //"processing": true,
                "serverSide": true,
                "ajax": {
                    "url": config.admin_url + "/agaza_special_offers/data",
                    "type": "POST"
                },
                "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                    {"data": "title_ar"},
                    {"data": "title_en"},
                    {"data": "price"},
                    {"data": "image"},
                    {"data": "options", orderable: false, "class": "text-center"}
                ],
                "order": [
                    [1, "desc"]
                ]

            });
        }
        var handleSubmit = function () {
            jQuery.validator.addMethod("onlyArabic", function (value) {
                var arabic = /[\u0600-\u06FF0-9]/;
                var space = /\s/;
                var count = 0;
                for (var i = 0; i < value.length; i++) {
                    if (space.test(value.charAt(i)) == false) {
                        if (arabic.test(value.charAt(i))) {

                        } else {
                            count++;
                        }
                    }


                }

                if (count > 0) {
                    return false;
                } else {
                    return true;
                }
            }, "ادخل الحروف بالغة العربية");
            jQuery.validator.addMethod("onlyEnglish", function (value) {
                var endlish = /[A-Za-z0-9]/;
                var space = /\s/;
                var count = 0;
                for (var i = 0; i < value.length; i++) {
                    if (space.test(value.charAt(i)) == false) {
                        if (endlish.test(value.charAt(i))) {

                        } else {
                            count++;
                        }
                    }
                }

                if (count > 0) {
                    return false;
                } else {
                    return true;
                }
            }, "ادخل الحروف بالغة الإنجليزية");
            $('#addEditAgazaSpecialOffersForm').validate({
                rules: {
                    title_ar: {
                        required: true,
                        onlyArabic: true

                    },
                    title_en: {
                        required: true,
                        onlyEnglish: true

                    },
                    url: {
                        required: true

                    },
                    price: {
                        required: true

                    }
                },
                messages: lang.messages,
                highlight: function (element) { // hightlight error inputs
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');

                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-group').find('.help-block').html('');

                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-group').find('.help-block').html($(error).html());
                }
            });
            $('.submit-form').click(function () {
                if ($('#addEditAgazaSpecialOffersForm').validate().form()) {
                    $('#addEditAgazaSpecialOffersForm').submit();
                }
                return false;
            });
            $('#addEditAgazaSpecialOffersForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#addEditAgazaSpecialOffersForm').validate().form()) {
                        $('#addEditAgazaSpecialOffersForm').submit();
                    }
                    return false;
                }
            });



            $('#addEditAgazaSpecialOffersForm').submit(function () {
                var id = $('#id').val();
                var action = config.admin_url + '/agaza_special_offers/add';
                if (id != 0) {
                    action = config.admin_url + '/agaza_special_offers/edit';
                }
                var formData = new FormData($(this)[0]);


                $.ajax({
                    url: action,
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);

                        if (data.type == 'success')
                        {
                            toastr.options = {
                                "debug": false,
                                "positionClass": "toast-bottom-left",
                                "onclick": null,
                                "fadeIn": 300,
                                "fadeOut": 1000,
                                "timeOut": 5000,
                                "extendedTimeOut": 1000
                            };
                            toastr.success(data.message, 'رسالة');
                            Agaza_special_offers_grid.api().ajax.reload();
                            if (id != 0) {
                                $('#addEditAgazaSpecialOffers').modal('hide');
                            } else {
                                Agaza_special_offers.empty();
                            }

                        } else {
                            console.log(data)
                            if (typeof data.errors === 'object') {
                                for (i in data.errors)
                                {
                                    $('[name="' + i + '"]')
                                            .closest('.form-group').addClass('has-error').removeClass("has-info");
                                    $('#' + i).parent().find(".help-block").html(data.errors[i])
                                }
                            } else {
                                $.confirm({
                                    title: lang.error,
                                    content: data.message,
                                    type: 'red',
                                    typeAnimated: true,
                                    buttons: {
                                        tryAgain: {
                                            text: lang.try_again,
                                            btnClass: 'btn-red',
                                            action: function () {
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        $('.loading').addClass('hide');
                        bootbox.dialog({
                            message: xhr.responseText,
                            title: 'رسالة تنبيه',
                            buttons: {
                                danger: {
                                    label: 'اغلاق',
                                    className: "red"
                                }
                            }
                        });
                    },
                    dataType: "json",
                    type: "POST"
                });

                return false;

            })




        }


        return {
            init: function () {
                init();
            },
            edit: function (t) {



                App.editForm({
                    element: t,
                    url: config.admin_url + '/agaza_special_offers/row',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        console.log(data);

                        Agaza_special_offers.empty();
                        App.setModalTitle('#addEditAgazaSpecialOffers', 'تعديل');

                        for (i in data.message)
                        {
                            if (i == 'image') {
                                $('.image_uploaded').html('<img style="height:250px;width:100%;" id="image_upload_preview" src="' + config.base_url + 'uploads/agaza_special_offers/' + data.message[i] + '" alt="your image" />');


                            } else {
                                $('#' + i).val(data.message[i]);
                            }

                        }
                        $('#addEditAgazaSpecialOffers').modal('show');
                    }
                });

            },
            delete_hotels: function (t) {
                $.confirm({
                    title: lang.alert_message,
                    content: lang.confirm_message_title,
                    buttons: {
                        confirm: {
                            text: lang.yes,
                            action: function () {
                                App.deleteForm({
                                    element: t,
                                    url: config.admin_url + '/haj_umrah_hotels/delete',
                                    data: {haj_umrah_hotel_id: $(t).attr("data-id")},
                                    success: function (data)
                                    {
                                        $.alert(data.message);
                                        Haj_umrah_hotels_grid.api().ajax.reload();


                                    }
                                });

                            }
                        },
                        cancel: {
                            text: lang.no,
                            action: function () {
                                $.alert(lang.deleting_cancelled);
                            }
                        }
                    }
                });

            },
            add: function () {
                Agaza_special_offers.empty();
                App.setModalTitle('#addEditAgazaSpecialOffers', 'اضافة');
                $('#addEditAgazaSpecialOffers').modal('show');
            },
            empty: function () {
                $('#id').val(0)
                $('#image').val('');
                $('select').find('option').eq(0).prop('selected', true);
                $('.has-error').removeClass('has-error');
                $('.has-success').removeClass('has-success');
                App.emptyForm();
            }
        };

    }();
    jQuery(document).ready(function () {
        Agaza_special_offers.init();
    });

