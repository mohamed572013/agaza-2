<?php
    $type = $this->uri->segment(4);
?>
<!--Page main section start-->
<section id="min-wrapper">
    <div id="main-content">
        <div class="container-fluid">

            <div class="row">
                <div class="col-md-12">

                    <!--Top breadcrumb start -->
                    <ol class="breadcrumb">
                        <li> <i class="fa fa-home"></i> </li>
                        <li> <?php echo $lang['basic_data']; ?></li>
                        <li class="active"><a href="<?= \base_url('admin/hotels_advantage/show') ?>"><?= $lang['hotels_advantage']; ?></a></li>
                    </ol>
                    <!--Top breadcrumb start -->
                </div>
            </div>

            <a class="btn btn-sm btn-info pull-right" href="<?= \base_url("admin/hotels_advantage/add") ?>"><?= $lang['add_new']; ?> </a>
            <br>
            <br>
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= $lang['hotels_advantage']; ?></h3>
                        </div>
                        <div class="panel-body">
                            <!--Table Wrapper Start-->
                            <div class="ls-editable-table table-responsive ls-table">
                                <table class="table table-bordered table-striped table-bottomless" id="ls-editable-table">
                                    <thead>
                                        <tr>
                                            <th><?= $lang['serial']; ?></th>
                                            <th><?= $lang['image']; ?></th>
                                            <th><?= $lang['title_ar']; ?></th>

                                            <th><?= $lang['controll']; ?></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                            $i = 0;
                                            if (count($page_list) > 0) {
                                                foreach ($page_list as $page_key => $page) {
                                                    $i++;
                                                    $page_id = $page->id;
                                                    ?>
                                                    <tr id="tr_<?= $page->id; ?>">
                                                        <td><?= $i; ?></td>
                                                        <td><img style="width: 30px;height: 30px"  class="img-responsive" src="<?= \base_url("theme/features_image") . "/" . $page->image; ?>"/></td>
                                                        <td><?= $page->title_ar; ?></td>

                                                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                                            <a class="btn btn-xs btn-warning" title="<?= $lang['edit']; ?>" href="<?= \base_url('admin/hotels_advantage/edit') . '/' . $page->id; ?>"><i class="fa fa-pencil-square-o"></i> </a>


                                                            <a class="btn btn-xxl "  title="<?= $lang['state']; ?>" onclick="state_action_masa('<?= $page->title_ar . " - " . $page->title_ar; ?>',<?= $page->id; ?>)">
                                                                <input     id="users_controll_show" title="<?= $lang['state']; ?>"  name="group_options" type="checkbox" class="js-switch "
                                                                           <?php if ($page->active == '1') echo 'checked'; ?> value="<?php echo $page->active; ?>"   onclick="state_action_masa('<?= $page->title_ar . " - " . $page->title_ar; ?>',<?= $page->id; ?>)" >
                                                            </a>
                                                            <a class="btn btn-xs btn-danger" title="<?= $lang['delete']; ?>"   onclick="delete_action_masa('<?= $page->title_ar . " , " . $page->title_ar; ?>',<?= $page->id; ?>)"  ><i class="fa fa-trash-o"></i>  </a>

                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                            }
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <?php echo $links; ?>
                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


</section>

<script type="text/javascript" src="assets/admin/ltr/js/lib/jquery-1.11.min.js"></script>

<style>
    .switchery,.switchery > small{
        height: 20px  !important;
    }
    .switchery{
        width: 30px  !important;
    }
    .switchery > small{
        width: 15px !important;
    }
</style>

<script>

                                                        function delete_action_masa(title, id) {
                                                            $.confirm({
                                                                title: '<span style="color:#333">هل انت متاكد من انك تريد مسح هذا العنصر</span>',
                                                                content: '<span style="color:#333">لديك 6 ثوانى للاختيار</span>',
                                                                autoClose: 'cancel|6000',
                                                                rtl: true,
                                                                confirmButton: 'نعم متاكد',
                                                                confirmButtonClass: 'btn-danger',
                                                                cancelButton: 'الغاء',
                                                                confirm: function () {
                                                                    delete_item_masa(title, id);
                                                                }

                                                            });
                                                        }

                                                        function delete_item_masa(title, id) {
                                                            $('.amaran').remove();
                                                            $.ajax({
                                                                type: "post",
                                                                url: "<?= base_url("admin/hotels_advantage/delete") ?>" + "/" + id,
                                                                success: function (data) {
                                                                    if (data == "yes" || data == "	yes") {
                                                                        $('#ls-editable-table').DataTable().row('#tr_' + id).remove().draw();
                                                                        $.amaran({
                                                                            content: {
                                                                                message: '<b>تم الحذف</b>',
                                                                                size: 'العنصر   #' + title,
                                                                                file: '<b>تم حذف جميع البيانات المتعلقة بالعنصر</b>',
                                                                                icon: 'glyphicon glyphicon-ok'
                                                                            },
                                                                            theme: 'default green',
                                                                            position: 'top right',
                                                                            inEffect: 'slideLeft',
                                                                            outEffect: 'slideTop',
                                                                            closeButton: true,
                                                                            delay: 7000
                                                                        });

                                                                    } else if (data == "pemision_denied") {
                                                                        $.amaran({
                                                                            content: {
                                                                                message: '<b> فشل فى  حذف العنصر</b>',
                                                                                size: title,
                                                                                file: '<b> غير مصرح لك بامكانية الحذف</b>',
                                                                                icon: 'fa fa-times'
                                                                            },
                                                                            theme: 'default error',
                                                                            position: 'top right',
                                                                            inEffect: 'slideLeft',
                                                                            outEffect: 'slideTop',
                                                                            closeButton: true,
                                                                            delay: 7000
                                                                        });
                                                                    } else {
                                                                        $.amaran({
                                                                            content: {
                                                                                message: '<b> فشل فى  حذف ميزة</b>',
                                                                                size: title,
                                                                                file: '<b>لا يمكن حذف هذا العنصر لوجود عناصر متعلقة به</b>',
                                                                                icon: 'fa fa-times'
                                                                            },
                                                                            theme: 'default error',
                                                                            position: 'top right',
                                                                            inEffect: 'slideLeft',
                                                                            outEffect: 'slideTop',
                                                                            closeButton: true,
                                                                            delay: 7000
                                                                        });
                                                                    }
                                                                }

                                                            });

                                                        }
                                                        function state_action_masa(title, id) {
                                                            $('.amaran').remove();
                                                            $.ajax({
                                                                type: "post",
                                                                url: "<?= base_url("admin/hotels_advantage/status") ?>" + "/" + id,
                                                                success: function (data) {
                                                                    if (data == "yes" || data == "	yes") {
                                                                        $.amaran({
                                                                            content: {
                                                                                message: '<b>تم  تعديل حالة </b>',
                                                                                size: 'ميزة   #' + title,
                                                                                file: '<b> </b>',
                                                                                icon: 'glyphicon glyphicon-ok'
                                                                            },
                                                                            theme: 'default green',
                                                                            position: 'top right',
                                                                            inEffect: 'slideLeft',
                                                                            outEffect: 'slideTop',
                                                                            closeButton: true,
                                                                            delay: 7000
                                                                        });

                                                                    } else if (data == "pemision_denied") {
                                                                        var state = $("#tr_" + id + " .js-switch").val();
                                                                        var nonactive = "border-color: rgb(223, 223, 223); box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; transition: border 0.4s, box-shadow 0.4s; background-color: rgb(255, 255, 255);";
                                                                        var active = "box-shadow: rgb(100, 189, 99) 0px 0px 0px 16px inset; border-color: rgb(100, 189, 99); transition: border 0.4s, box-shadow 0.4s, background-color 1.2s; background-color: rgb(100, 189, 99);";

                                                                        if (state == 1) {

                                                                            $("#tr_" + id + " .switchery").attr("style", active)
                                                                            $("#tr_" + id + " small").css("left", "15px")
                                                                        }
                                                                        if (state == 0) {

                                                                            $("#tr_" + id + " .switchery").attr("style", nonactive)
                                                                            $("#tr_" + id + " small").css("left", "0px")
                                                                        }
                                                                        $.amaran({
                                                                            content: {
                                                                                message: '<b> فشل فى تعديل الحالة للعنصر     </b>',
                                                                                size: title,
                                                                                file: '<b> غير مصرح لك بامكانية التعديل</b>',
                                                                                icon: 'fa fa-times'
                                                                            },
                                                                            theme: 'default error',
                                                                            position: 'top right',
                                                                            inEffect: 'slideLeft',
                                                                            outEffect: 'slideTop',
                                                                            closeButton: true,
                                                                            delay: 7000
                                                                        });
                                                                    } else {
                                                                        var state = $("#tr_" + id + " .js-switch").val();
                                                                        var nonactive = "border-color: rgb(223, 223, 223); box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; transition: border 0.4s, box-shadow 0.4s; background-color: rgb(255, 255, 255);";
                                                                        var active = "box-shadow: rgb(100, 189, 99) 0px 0px 0px 16px inset; border-color: rgb(100, 189, 99); transition: border 0.4s, box-shadow 0.4s, background-color 1.2s; background-color: rgb(100, 189, 99);";

                                                                        if (state == 1) {

                                                                            $("#tr_" + id + " .switchery").attr("style", active)
                                                                            $("#tr_" + id + " small").css("left", "15px")
                                                                        }
                                                                        if (state == 0) {

                                                                            $("#tr_" + id + " .switchery").attr("style", nonactive)
                                                                            $("#tr_" + id + " small").css("left", "0px")
                                                                        }


                                                                        $.amaran({
                                                                            content: {
                                                                                message: '<b> فشل فى  تغيير حالة  ميزة</b>',
                                                                                size: title,
                                                                                file: '<b> </b>',
                                                                                icon: 'fa fa-times'
                                                                            },
                                                                            theme: 'default error',
                                                                            position: 'top right',
                                                                            inEffect: 'slideLeft',
                                                                            outEffect: 'slideTop',
                                                                            closeButton: true,
                                                                            delay: 7000
                                                                        });
                                                                    }
                                                                }

                                                            });

                                                        }
</script>