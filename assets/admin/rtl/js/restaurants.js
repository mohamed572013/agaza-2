    var Hotels_grid;
    var Haj_umrah_hotels_images_grid;

    var Restaurants = function () {

        var init = function () {
            $.extend(lang, new_lang);
            handleRecords();
            //handleDatatables();
            handleSubmit();
            //handleListImagesOnServer();
            handleImagesFormSubmit();
            remove_image();
            handleChangeCountriesOrCities();
            readImage();

        };
        var readImage = function () {
            $("#hotel_image").change(function () {
                //alert($(this)[0].files.length);
                for (var i = 0; i < $(this)[0].files.length; i++) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('.image_uploaded').html('<img style="height:80px;width:150px;" id="image_upload_preview" src="' + e.target.result + '" alt="your image" />');
                    }

                    reader.readAsDataURL($(this)[0].files[i]);
                }

                //readURL(this);
            });



        }
        var handleChangeCountriesOrCities = function () {
            $("#country_id").change(function () {
                var country_id = $(this).val();
                //alert(country_id);
                $.ajax({
                    type: "post",
                    url: config.admin_url + '/hotels/getCountryCities',
                    data: {country_id: country_id},
                    success: function (data) {
                        //console.log(data)
                        $("#places_id").html(data);
                    }
                });
            });
            $("#city_id").change(function () {
                var city_id = $("#city_id").val();
                //alert(city_id);
                $.ajax({
                    type: "post",
                    url: config.admin_url + '/program_cities/gatCityHotels',
                    data: {city_id: city_id},
                    success: function (data) {
                        console.log(data)
                        $("#hotel_id").html(data);
                    }
                });
            });

        }
        var getPlaces = function (place_id, selected_id, content) {
            $.ajax({
                type: "post",
                url: config.admin_url + '/restaurants/getPlaces',
                data: {
                    place_id: place_id,
                    selected_id: selected_id,
                },
                success: function (data) {
                    console.log(data)
                    $("#" + content).html(data);
                }
            });
        }
        var handleDatatables = function () {
            $(document).on('click', '.hotel-data-box', function () {
                var box_type = $(this).data('type');
                if (box_type == 'hotels') {
                    alert('here');
                    if (!$('#hotels_table').hasClass('active')) {
                        $('.table-box').removeClass('active').addClass('disabled');
                        $('#hotels_table').removeClass('disabled').addClass('active');

                    }
                    //$('#rooms_table').addClass('active');
                    if (typeof Haj_umrah_hotels_grid === 'undefined') {
                        alert('here2');
                        Haj_umrah_hotels_grid = $('#hotels_table .dataTable').DataTable({
                            //"processing": true,
                            "serverSide": true,
                            "ajax": {
                                "url": config.admin_url + "/haj_umrah_hotels/data",
                                "type": "POST"
                            },
                            "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                                {"data": "title_ar"},
                                {"data": "maka_or_madina"},
                                {"data": "this_order"},
                                {"data": "images"},
                                {"data": "options", orderable: false, "class": "text-center"}
                            ],
                            "order": [
                                [1, "desc"]
                            ]

                        });
                    } else {
                        //alert('here3');
                        Haj_umrah_hotels_grid.api().ajax.url(config.admin_url + "/haj_umrah_hotels/data").load();
                    }
                }
                if (box_type == 'hotels_images') {
                    if (!$('#hotels_images_table').hasClass('active')) {
                        $('.table-box').removeClass('active').addClass('disabled');
                        $('#hotels_images_table').removeClass('disabled').addClass('active');

                    }

                    if (typeof Haj_umrah_hotels_images_grid === 'undefined') {


                        Haj_umrah_hotels_images_grid = $('#hotels_images_table .dataTable').DataTable({
                            //"processing": true,
                            "serverSide": true,
                            "ajax": {
                                "url": config.admin_url + "/Haj_umrah_program_flights/data/" + haj_umrah_program_id,
                                "type": "POST"
                            },
                            "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                                {"data": "travel_way"},
                                {"data": "flight_company_name"},
                                {"data": "name_from_city"},
                                {"data": "return_name_from_city"},
                                {"data": "room_prices"},
                                {"data": "options", orderable: false, "class": "text-center"}
                            ],
                            "order": [
                                [1, "desc"]
                            ]

                        });
                    } else {
                        Haj_umrah_hotels_images_grid.ajax.url(config.admin_url + "/Haj_umrah_program_flights/data/" + haj_umrah_program_id).load();
                    }
                }


                return false;
            });
        }
        var handleRecords = function () {
            Hotels_grid = $('#hotels_table .dataTable').dataTable({
                //"processing": true,
                "serverSide": true,
                "ajax": {
                    "url": config.admin_url + "/restaurants/data",
                    "type": "POST"
                },
                "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                    {"data": "title_ar"},
                    
                    {"data": "main_image"},
                    {"data": "is_active"},
                    {"data": "images"},
                    {"data": "options", orderable: false, "class": "text-center"}
                ],
                "order": [
                    [1, "desc"]
                ]

            });
        }
        var handleSubmit = function () {
            jQuery.validator.addMethod("onlyArabic", function (value) {
                var arabic = /[\u0600-\u06FF0-9,-.]/;
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
                var endlish = /[A-Za-z0-9,-.]/;
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
            $('#addEditRestaurantsForm').validate({
                rules: {
                    title_ar: {
                        required: true,
                        //onlyArabic: true

                    },
                    phone: {
                        required: true,
                        //onlyEnglish: true

                    },
                    stars: {
                        required: true

                    },
                    the_order: {
                        required: true,
                        number: true

                    },
                    country_id: {
                        required: true

                    },
                   
                    address_ar: {
                        required: true,
                        //onlyEnglish: true

                    },
                    content_ar: {
                        required: true,
                        //onlyArabic: true

                    },
                  
                   
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
            $('#addEditRestaurants .submit-form').click(function () {
                if ($('#addEditRestaurantsForm').validate().form()) {
                    $('#addEditRestaurantsForm').submit();
                }
                return false;
            });
            $('#addEditRestaurantsForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#addEditRestaurantsForm').validate().form()) {
                        $('#addEditRestaurantsForm').submit();
                    }
                    return false;
                }
            });



            $('#addEditRestaurantsForm').submit(function () {
                var hotel_id = $('#restaurant_id').val();
                var action = config.admin_url + '/restaurants/add';
                if (hotel_id != 0) {
                    action = config.admin_url + '/restaurants/edit';
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
                            Hotels_grid.api().ajax.reload();
                            if (restaurant_id != 0) {
                                $('#addEditRestaurants').modal('hide');
                            } else {
                                Restaurants.hotels_empty();
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




        var handleImagesFormSubmit = function () {

            var action = config.admin_url + '/restaurants/add_images';
            $('#addEditRestaurantsImages .submit-form').click(function () {
                var restaurant_id = $('#restaurant_id').val();
                var inputFile = $('#restaurant_images');
                var formData = new FormData($("#addEditRestaurantsImagesForm")[0]);
                var fileToUpload = inputFile[0].files;
                for (var x = 0; x < fileToUpload.length; x++) {
                    formData.append('file[]', fileToUpload[x]);
                }
                formData.append('restaurant_id', restaurant_id);


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
                            $('#addEditRestaurantsImages').modal('hide');

                        } else {
                            console.log(data)
                            if (typeof data.errors === 'object') {

                                var items = [];
                                $.each(data.errors, function (i, element) {
                                    items.push('<li class="list-group-item">' + i + ' : ' + element + '</li>');
                                });
                                console.log(items);
                                $("#files-not-uploaded").html('').html(items.join(''));

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
            });
        }
        var handleListImagesOnServer = function (restaurant_id) {
            var action = config.admin_url + '/restaurants/listFiles';
            $.ajax({
                url: action,
                data: {restaurant_id: restaurant_id},
                async: false,
                success: function (data) {
                    console.log(data);

                    if (data.type == 'success')
                    {
                        var items = [];
                        for (var x = 0; x < data.data.length; x++) {

                            items.push('<div style="position:relative;float:right;padding: 5px 5px;"><img style="height:80px;width:80px;" src="' + config.base_url + 'uploads/restaurant_slider/' + data.data[x].image + '"/><div style="position: absolute; top: -3px; left: 4px; width: 15px; height: 15px; text-align: center; line-height: 15px; background: #ab0101; border-radius: 50px;"><a href="" class="restaurant_image" data-id="' + data.data[x].id + '" data-restaurant-id="' + data.data[x].restaurant_id + '" data-image="' + data.data[x].image + '" style="color:#fff;">x</a></div></div>');


                        }
                        $("#restaurant-images-box").html('').html(items.join(''));

                    } else {
                        $("#restaurant-images-box").html('');
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
        }


        var remove_image = function () {
            $(document).on('click', '.restaurant_image', function () {
                var image_id = $(this).data('id');
                var restaurant_id = $(this).data('restaurant-id');
                var image = $(this).data('image');
                var action = config.admin_url + '/restaurants/remove_image';
                $.ajax({
                    url: action,
                    data: {
                        image_id: image_id,
                        restaurant_id: restaurant_id,
                        image: image
                    },
                    async: false,
                    success: function (data) {
                        console.log(data);

                        if (data.type == 'success')
                        {


                            $('#addEditRestaurantsImages .submit-form').prop('disabled', true);
                            $('#addEditRestaurantsImages .submit-form').html('جارى الحذف...');
                            setTimeout(function () {
                                handleListImagesOnServer(restaurant_id);
                                $('#addEditRestaurantsImages .submit-form').prop('disabled', false);
                                $('#addEditRestaurantsImages .submit-form').html('حفظ');
                            }, 1500);

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
            });

        }



        var handleListImagesOnServer2 = function (hotel_id) {
            var items = [];
            var action = config.admin_url + '/haj_umrah_hotels/listFiles/' + hotel_id;
            $.getJSON(action, function (result) {
                $.each(result, function (i, element) {
                    items.push('<div style="position:relative;float:right;padding: 5px 5px;"><img style="height:80px;width:80px;" src="' + config.base_url + 'uploads/haj_umrah_hotels/' + element + '"/><div style="position: absolute; top: -3px; left: 4px; width: 15px; height: 15px; text-align: center; line-height: 15px; background: #ab0101; border-radius: 50px;"><a href="" style="color:#fff;">x</a></div></div>');
                });
                console.log(items);
                $("#hotel-images-box").html('').html(items.join(''));
            });
        }

        return {
            init: function () {
                init();
            },
            edit_hotels: function (t) {



                App.editForm({
                    element: t,
                    url: config.admin_url + '/restaurants/row',
                    data: {restaurant_id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        $('#addEditRestaurants').modal('show');
                        console.log(data);

                        Restaurants.hotels_empty();
                        App.setModalTitle('#addEditRestaurants', 'تعديل');

                        for (i in data.message)
                        {
                            if (i == 'id') {
                                $('#restaurant_id').val(data.message[i]);
                            } else if (i == 'advantages') {
                                for (var x = 0; x < data.message[i].length; x++) {
                                    var advantage_id = 'advantage_' + data.message[i][x].feature_id;
                                    $('#' + advantage_id).prop('checked', true);
                                }
                            } else if (i == 'tags') {
                                for (var x = 0; x < data.message[i].length; x++) {
                                    var tag_id = 'tag_' + data.message[i][x].tag_id;
                                    $('#' + tag_id).prop('checked', true);
                                }
                            } else if (i == 'country_id') {
                                $('#' + i).val(data.message[i]);
                                getPlaces(data.message[i], data.message.places_id, 'places_id');
                            } else if (i == 'logo') {
                                $('.image_uploaded').html('<img style="height:80px;width:150px;" id="image_upload_preview" src="' + config.base_url + 'uploads/restaurants/' + data.message[i] + '" alt="your image" />');

                            } else if (i == 'tags') {
                                $('#' + i).val(data.message[i]);

                            } else {
                                //console.log(data.message[i]);
                                $('#' + i).val(data.message[i]);
                            }

                        }
                        $('#addEditRestaurants').modal('show');
                    }
                });
                Restaurants.hotels_empty();

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
                                    url: config.admin_url + '/restaurants/delete',
                                    data: {restaurant_id: $(t).attr("data-id")},
                                    success: function (data)
                                    {
                                        $.alert(data.message);
                                        Hotels_grid.api().ajax.reload();


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
            add_restaurants: function () {
                Restaurants.hotels_empty();
                App.setModalTitle('#addEditRestaurants', 'اضافة');
                $('#addEditRestaurants').modal('show');
            },
            add_images: function (element) {
                $('#restaurant_id').val($(element).data('id'));
                $("#restaurant-images-box").html('');
                $("#restaurant_images").val('');
                handleListImagesOnServer($(element).data('id'));
                App.setModalTitle('#addEditRestaurantsImages', 'اضافة');
                $('#addEditRestaurantsImages').modal('show');
            },
            hotels_empty: function () {
                $('#restaurant_id').val(0)
                $('#image').val('');
                $("#default-image").attr("src", config.base_url+"no-image.jpg");
                $('select').find('option').eq(0).prop('selected', true);
                $("input[type='checkbox']").removeAttr("checked");
                $('.has-error').removeClass('has-error');
                $('.has-success').removeClass('has-success');
                App.emptyForm();
            },
            hotel_images_empty: function () {
                $("#hotel-images-box").html('');
                $("#hotel_images").val('');
            },
        };

    }();
    jQuery(document).ready(function () {
        Restaurants.init();
    });

