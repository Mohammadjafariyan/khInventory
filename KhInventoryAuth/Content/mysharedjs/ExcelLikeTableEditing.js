const dataHolder = {}

function bindEditAndDelete() {

    $('thead>tr').prepend("<th>ویرایش/حذف</th>");

    $('tbody>tr').prepend("<td><button onclick='EditRow(this)' type='button' class='btn btn-info'></button>" +
        "<button onclick='deleteRow(this)' type='button' class='btn btn-danger'></button></td>")
}



function bindEditAndDeleteHelper(element) {


    $(element).prepend("<td><button onclick='EditRow(this)' type='button' class='btn btn-info'></button>" +
        "<button onclick='deleteRow(this)' type='button' class='btn btn-danger'></button></td>")
}

function newRow(el, tableId) {

    let ths = $('#' + tableId).find('th');


    formMakerHelper(ths, null,true);
}


function deleteRow(button) {


    var yes = confirm('آیا از حذف این رکورد اطمینان دارید ؟ ');
    debugger;
    if (yes) {

        let id = $(button).parents('tr').find('td[id=Id]').text();

        var action = document.getElementById('deleteAction').value;

        $.ajax({
            url: action,
            method: 'post',
            data: {id: id},
            success: function (resp) {

                $(button).parents('tr').hide();

            },
            error: function (err) {

                console.error(err);
                alert('خطایی رخ داد');
            }
        })
    }
}

function bindCellEditHelper(THIS, e) {

    if (e) {
        // اگر نزدیک باشد دوباره باز نکن
        let isNear = preventClickUponOpenCell(e);
        if (isNear)
            return;
    }

    if ($(THIS).index() === 0)// for buttons
        return;


    // id of current
    let id = $(THIS).parent().children().find('[id=id]').text();

    /// مقدار قبلی را نگه می دارد
    $(THIS).attr('preValue', $(THIS).text());


    var formInputNames = [];
    var formInputValues = [];
    var labels = [];

    // نام در اتریبویت id می باشد
    formInputNames.push($(THIS).attr('id'))
    formInputValues.push($(THIS).text());

    // پیدا می کند چندمی است
    // let index=  $(this).index();

    // از چندمی در th ها نامش را پیدا میکند
    //  let label= GetThsOfThisTd(this)[index];

    // labels.push($(label).text());
    labels.push('');

    let inputsHtml = makeInputsHtml(formInputNames, formInputValues, labels);
    $(THIS).html(makeAsForm(inputsHtml, true))

    if (!dataHolder.CellOpenForEditings) {
        dataHolder.CellOpenForEditings = [];
    }
    dataHolder.CellOpenForEditings.push(THIS)
    $(THIS).find('input').select();

}

function bindCellEdit() {

    $('tbody>tr>td').dblclick(function (e) {


        bindCellEditHelper(this, e)

    })
}


function closeEditing() {
    if (dataHolder.CellOpenForEditings && dataHolder.CellOpenForEditings.length > 0) {
        for (let i = 0; i < dataHolder.CellOpenForEditings.length; i++) {


            let val = $(dataHolder.CellOpenForEditings[i]).find('input').val();

            let form = $(dataHolder.CellOpenForEditings[i]).find('form');
            mySubmit(form, true);

            /*$(dataHolder.CellOpenForEditings[i]).empty();
            $(dataHolder.CellOpenForEditings[i]).text(val);*/
        }
        dataHolder.CellOpenForEditings = [];
    }


}

function preventClickUponOpenCell(event) {
    if (dataHolder.CellOpenForEditings) {

        $target = $(event.target);

        if (!$target.closest(dataHolder.CellOpenForEditings).length) {
            closeEditing()

            return false;
        }

        return true; // یعنی نزدیک آن آیتم است
    }
}

function bindMouseOutSiteClicks() {
    $(window).click(function (event) {
//Hide the menus if visible
        preventClickUponOpenCell(event)
    });


    $('#menucontainer').click(function (event) {
        event.stopPropagation();
    });
}

$(document).ready(function () {


    bindEditAndDelete();
    bindCellEdit();
    bindMouseOutSiteClicks()
});


function makeInputsHtml(formInputNames, formInputValues, labels) {

    let inputDomArr = '';
    for (let i = 0; i < formInputNames.length; i++) {


        let dontShow = '';
        if (formInputNames[i] == 'Id' || formInputNames[i] == 'i') {
            dontShow = "style='display: none'";
        }

        let input = "<div class='form-group' " + dontShow + "><strong>" + labels[i] + "</strong> <input class='form-control' name='" + formInputNames[i] + "' id='" + formInputNames[i] + "'  value='" + formInputValues[i] + "' type='text'/> </div>"


        inputDomArr += input;
    }

    inputDomArr += '<input type="submit" hidden="hidden" />';

    return "<tr>" + inputDomArr + "</tr>";
}

function GetThsOfThisTd(td) {
    return $(td).parents('table').children('thead').find('th');
}

function sendSingleCellFormAjax(form, callback) {

    debugger;
    var data = $(form).serialize();
    var action = document.getElementById('cellEditingAction').value;


    let name = $(form).find('input').attr('id');
    let val = $(form).find('input').val();
    let id = $('form').parents('tr').find('td[id=Id]').text();

    $.ajax({
        url: action,
        method: 'post',
        data: {name: name, val: val, id: id},
        success: function (resp) {

            callback();

        },
        error: function (err) {

            console.error(err);
            alert('خطایی رخ داد');
        }
    })
}

function sendWholeFormAjax(form, callback) {
    debugger;

    var data = $(form).serialize();

    var action = document.getElementById('formAction').value;

    $.ajax({
        url: action,
        method: 'post',
        data: data,
        success: function (resp) {

            callback();

        },
        error: function (err) {

            console.error(err);
            alert('خطایی رخ داد');
        }
    })


}

function formToThs(form,isNew) {

    debugger;
    let inputs = $(form).find('input');

    let ths = '';
    for (let i = 0; i < inputs.length; i++) {
        let val = $(inputs[i]).val();

        if ($(inputs[i]).attr('name') == 'Id') {
            ths += '<td id="Id" style="display: none"> ' + val + '</td>';

        } else {
            ths += '<td id="' + $(inputs[i]).attr('name') + '">' + val + '</td>';

        }

    }
    if (isNew){
        dataHolder.SelectedRow= document.createElement('tr');
        $('tbody').prepend(dataHolder.SelectedRow);
        $(dataHolder.SelectedRow).prepend("<td><button onclick='EditRow(this)' type='button' class='btn btn-info'></button>" +
            "<button onclick='deleteRow(this)' type='button' class='btn btn-danger'></button></td>"
        );
    }
    

    let buttons = $(dataHolder.SelectedRow).children()[0];


    $(dataHolder.SelectedRow).children().not(buttons).remove();
    $(dataHolder.SelectedRow).append(ths);

    $(dataHolder.SelectedRow).children().dblclick(function (e) {

        bindCellEditHelper(this, null)

    })

    /*// tr > td > click
    $($($(dataHolder.SelectedRow).children()[0]).children()[0]).click(function (e) {
        EditRow(e)
    })

    $($($(dataHolder.SelectedRow).children()[0]).children()[0]).click(function (e) {
        //todo:
    })*/


}

function mySubmit(form, isSingleCell, event,isNew) {
    if (event) {
        event.preventDefault();
    }

    $('#myModal').modal('hide')

  

    if (!isSingleCell) {
        sendWholeFormAjax(form, function () {

            formToThs(form,isNew)

        })
    } else {
        sendSingleCellFormAjax(form, function () {

            let val = $(form).find('input').val();
            let td = $(form).parent();

            $(td).empty();
            $(td).text(val);

        })
    }


}

function makeAsForm(formHtml, isSingleCell,isNew) {

    var action = document.getElementById('formAction').value;
    var formMethod = document.getElementById('formMethod').value;

    return "<form class='form' onsubmit='mySubmit(this," + isSingleCell + ",event,"+isNew+"); return false;' id='myForm' action='" + action + "' method='" + formMethod + "'>" + formHtml + "</form>"

}

function formMakerHelper(ths, tds,isNew) {
    var formInputNames = [];
    var formInputValues = [];
    var labels = [];
    var td = tds;
    for (let i = 1; i < ths.length - 1; i++) {
//اولی را رد شده است چون دکمه گذاشته ایم


        var id = ths[i].attributes.getNamedItem('id').value;


        formInputNames.push(id);
        labels.push(ths[i].innerText);
        
        if (isNew){
            formInputValues.push('');

        }else{

            formInputValues.push(td[i].innerText);
        }
        
    }

    var formHtml = makeInputsHtml(formInputNames, formInputValues, labels);

    var html = makeAsForm(formHtml, false,isNew);

    setModalPlace();

    $('#saveForm').html(html);


    $('#myModal').modal('show')
}

function EditRow(el) {

    el = $(el).parents('tr')[0];

    dataHolder.SelectedRow = el;

    let ths = $(el).parents('table').children('thead').find('th');

    let tds = $(el).children('td')
    formMakerHelper(ths, tds);
}


function setModalPlace() {
    let modal = "\n" +
        "<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n" +
        "  <div class=\"modal-dialog\">\n" +
        "\n" +
        "    <!-- Modal content-->\n" +
        "    <div class=\"modal-content\">\n" +
        "      <div class=\"modal-header\">\n" +
        "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n" +
        "        <h4 class=\"modal-title\">فرم ثبت</h4>\n" +
        "      </div>\n" +
        "      <div class=\"modal-body\" id=\"saveForm\">\n" +
        "        \n" +
        "      </div>\n" +
        "      <div class=\"modal-footer\">\n" +
        "        <button onclick='sabtClick(this)' type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">ثبت</button>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "\n" +
        "  </div>\n" +
        "</div>";
    var modalName = document.getElementById('modalName').value;

    document.getElementById(modalName).innerHTML = modal;
}

function sabtClick(element) {

    $(element).parents('.modal').find('form').submit();
}