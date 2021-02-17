var url = '@@@';
var baseUrl = "#baseUrl#";
var token = "#token#";
var websiteToken = "#websiteToken#";

var xhttp = new XMLHttpRequest();


function socketConnect(responseText) {

    // بعد از اتصال به وب سوکت ، نمایش می دهد
    configWebSocket(function () {
        var gapPlugin = document.getElementById("gapPlugin");
        if (gapPlugin) {

            CurrentUserInfo.IsCustomer = true;
        } else {
            gapPlugin = document.getElementById("gapPluginAdmin");
        }


        gapPlugin.innerHTML = responseText;

        setTimeout(function () {

            dragElement(document.getElementById("onTheFly"));

            if (CurrentUserInfo.IsCustomer) {
                CurrentUserInfo.plugin = new CustomerPlugin();
                CurrentUserInfo.plugin.bind(document.getElementById("onTheFly"))
            } else {
                CurrentUserInfo.plugin = new AdminPlugin();
                CurrentUserInfo.plugin.bind(document.getElementById("onTheFly"))

            }
            CurrentUserInfo.plugin.Register()

        }, 1000)
    });


}

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        socketConnect(this.responseText)

    }

};

xhttp.open("GET", url, true);
xhttp.send();


/*bind*/


class BasePlugin {
    constructor() {
        CurrentUserInfo.commonDomManager = new CommonDomManager();
    }


    Register() {
        MyCaller.Send("Register");
    }

    registerCallback(res) {


        this.removeGapRows();
        var gapContent = document.getElementById('gapContent');

        var arr = [];
        arr = res.Content.EntityList;

        CurrentUserInfo.AddCurrentCustomerToken(res.Token)

        var _html = "";
        for (let i = 0; i < arr.length; i++) {

            let item = "" +
                "\n" +
                "        <div  accountName='" + arr[i].Name + "'  accountStatus='" + arr[i].OnlineStatus + "'   accountId='" + arr[i].Id + "' class=\"gapRow\"\n" +
                "             >\n" +
                "            <i class=\"ti-user\"></i>\n" +
                "            <label> " + arr[i].Name + "</label>\n";

            if (arr[i].OnlineStatus === 0) {
                item += "            <i class=\"gapStat\" style=\"background-color: green\"></i>\n";
            }
            if (arr[i].OnlineStatus === 1) {
                item += "            <i class=\"gapStat\" style=\"background-color: grey !important\"></i>\n";
            }
            if (arr[i].OnlineStatus === 2) {
                item += "            <i class=\"gapStat\" style=\"background-color: orange !important\"></i>\n";
            }

            item += "        </div>";
            _html += item;
        }


        tmp = _html;
        gapContent.innerHTML = gapContent.innerHTML + _html;


        CurrentUserInfo.plugin.bindAfterRegister()
        //res ==> MyDataTableResponse<MyAccount>

    }

    removeGapRows() {

        let arr = document.getElementsByClassName('gapRow');
        for (let i = arr.length - 1; i >= 0; i--) {

            arr[i].remove()
        }
    }

    readChat(accountId, userId) {
        MyCaller.Send("ReadChat", {accountId: accountId, userId: userId});


        setCurrentPersonOnTop();

    }


    readChatCallback(res) {

        this.removePrevieusChats();

        var html = "";

        var arr = [];
        arr = res.Content.EntityList;
        for (let i = 0; i < arr.length; i++) {
            var gapMe = arr[i].SenderType === 1;
            var deliverdSign = gapMe && arr[i].DeliverDateTime;
            html += CurrentUserInfo.commonDomManager.makeChatDom(arr[i].Message, gapMe, deliverdSign);
        }

        document.getElementById('chatPanel').innerHTML = html;

        scrollToBottomChatPanel();

    }

    removePrevieusChats() {
        document.getElementById('chatPanel').innerHTML = '';

    }

    sendNewText() {

            MyCaller.Send('CustomerSendToAdmin',
                {
                    token: CurrentUserInfo.GetCurrentCustomerToken()
                    , targetAccountId: CurrentUserInfo.targetId,
                    typedMessage: CurrentUserInfo.typedMessage
                });

    }

    bind(elementById) {

        this.configSignalR();

        // positionONTheFly(elementById)
        CurrentUserInfo.commonDomManager.correctOnTheFlyPosition();


        CurrentUserInfo.commonDomManager.bindDotOnClick();


        this.bindAfterRegister();

        CurrentUserInfo.commonDomManager.bindOntheFlyFocus(elementById)
    }

    bindAfterRegister() {
        CurrentUserInfo.commonDomManager.bindGapRowClick();
        CurrentUserInfo.commonDomManager.bindBackButton();
        CurrentUserInfo.commonDomManager.bindCloseButton();
        CurrentUserInfo.commonDomManager.bindSubmitButton();
    }

    configSignalR() {

    }

    handleNewMessageCome(AccountId, Message, TotalReceivedMesssages) {

        let gapRowTmp = document.querySelector(".gapRow[accountId='" + AccountId + "']");

        let div= createElementFromHTML('<i class="MsgCount">'+TotalReceivedMesssages+'</i>');
        gapRowTmp.appendChild(div);




        let gapRow = document.querySelector(".gapRow[accountId='" + AccountId + "']");

        var gapCurId=document.getElementById('gapCurId').innerText;


        if (AccountId+''===gapCurId){

            var html = CurrentUserInfo.commonDomManager
                .makeChatDom(Message, false, false);

            document.getElementById('chatPanel').innerHTML = document.getElementById('chatPanel').innerHTML+html;

            scrollToBottomChatPanel();
        }

    }
}

function configWebSocket(onOpen) {
    CurrentUserInfo.ws = new WebSocket("ws://"+baseUrl+":8181/");
    CurrentUserInfo.ws.onopen = function () {
        /*alert("About to send data");
        ws.send("Hello World"); // I WANT TO SEND THIS MESSAGE TO THE SERVER!!!!!!!!
        alert("Message sent!");*/

        if (onOpen) {
            onOpen();

        }
    };

    CurrentUserInfo.ws.onmessage = function (evt) {
        var received_msg = evt.data;

        console.log(evt);
        _dispatcher.dispatch(JSON.parse(received_msg));
    };
    CurrentUserInfo.ws.onclose = function () {
        // websocket is closed.
        alert("Connection is closed...");
    };
}

class CustomerPlugin extends BasePlugin {
    adminSendToCustomerCallback(res) {


        let AccountId = res.Content.AccountId;
        let Message = res.Content.Message;
        let TotalReceivedMesssages = res.Content.TotalReceivedMesssages;

    
        super.handleNewMessageCome(AccountId,Message,TotalReceivedMesssages)



    }

}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

class AdminPlugin extends BasePlugin {

    customerSendToAdminCallback(res) {


        let CustomerId = res.Content.CustomerId;
        let Message = res.Content.Message;
        let TotalReceivedMesssages = res.Content.TotalReceivedMesssages;

        super.handleNewMessageCome(CustomerId,Message,TotalReceivedMesssages);



    }

    sendNewText() {
        MyCaller.Send('AdminSendToCustomer',
            {
                adminToken: _currentAdminInfo.adminToken
                , targetUserId: CurrentUserInfo.targetId,
                typedMessage: CurrentUserInfo.typedMessage
            });
    }

    Register() {


        /*
              this.checkLoginAndGetClientsForAdmin();
        */

    }

    checkLoginAndGetClientsForAdmin() {
        // loggedInbefore
        if (_currentAdminInfo.adminToken) {
            MyCaller.Send("GetClientsListForAdmin");

        } else {
            this.showLogin()
        }
    }


    adminRegisterCallback(res) {
        super.readChatCallback(res)


    }

    showLogin() {
        let admin = prompt('لطفا نام کاربری خود را وارد نمایید', 'admin');
        if (!admin) {
            return;
        }
        let password = prompt('لطفا رمز عبور خود را وارد نمایید', 'admin');
        if (!password) {
            return;
        }

        if (!admin || !password) {
            alert('نام کاربری یا رمز عبور صحیح وارد نشده است')
            return;
        }


        MyCaller.Send("AdminLogin", {username: admin, password});

    }

    getClientsListForAdminCallback(res) {

        this.registerCallback(res);
    }


    adminSendToCustomerFailCallback(res) {

    }


    adminLoginCallback(res) {


        if (res.Type === 0) {
            var token = res.TokenAdmin;
            
            cookieManager.addToCookies('adminToken',token);
            _currentAdminInfo.adminToken = token;
            CurrentUserInfo.targetId = res.Content.Id;
            CurrentUserInfo.targetName = res.Content.Name;

            this.checkLoginAndGetClientsForAdmin();

        } else {

            alert('نام کاربری یا رمز عبور صحیح نیست')
        }


    }
}

class DomManager {
    enterNewText() {
        var text = document.getElementById('gapChatInput').value;
        var html = CurrentUserInfo.commonDomManager.makeChatDom(text, true, false);

        var chatPanel = document.getElementById('chatPanel');
        chatPanel.innerHTML = chatPanel.innerHTML + html;

        scrollToBottomChatPanel()

        document.getElementById('gapChatInput').value = '';

        CurrentUserInfo.typedMessage = text;
    }

    makeChatDom(msg, gapMe, delivered) {
        var dom = "<div class=\"gapMsg\">\n";

        if (gapMe) {
            dom += "<div class=\"gapMe\">\n";
        } else {
            dom += "<div class=\"gapHe\">\n";
        }

        dom += msg;
        if (delivered) {
            dom += "                        <i>√</i>\n";
        }

        dom += "                    </div>\n";
        dom += "                </div>\n";


        return dom;

    }

    toggleSelectChat(el) {
        var arr = document.getElementsByClassName('gapRow');
        for (let i = 0; i < arr.length; i++) {
            toggle(arr[i])
        }

        var gapChat = document.getElementById('gapChat');
        toggle(gapChat)


        document.getElementById('gapChatInput').focus()

        // یعنی یک چت انتخاب شده باشد 
        //در دوجا استفاده شده است در بک 
        if (el) {
            var accountId = el.attributes.getNamedItem('accountId').value;
            var accountName = el.attributes.getNamedItem('accountName').value;
            var accountStatus = el.attributes.getNamedItem('accountStatus').value;

            CurrentUserInfo.targetId = accountId;
            CurrentUserInfo.targetName = accountName;
            CurrentUserInfo.targetStatus = accountStatus;

            //todo: تغییر خواهد یافت
            var userId = CurrentUserInfo.GetCurrentCustomerToken();
            CurrentUserInfo.plugin.readChat(accountId, 0);
        }

    }

    bindSubmitButton() {
        document.getElementById('gapChatForm').onsubmit = function (e) {
            e.preventDefault();
            CurrentUserInfo.commonDomManager.enterNewText();


            CurrentUserInfo.plugin.sendNewText();
            return false;
        }
    }

    bindCloseButton() {
        document.getElementById('gapCloseButton').onclick = function () {
            toggle(this.parentNode);
            var x = document.getElementById('dot');
            toggle(x);

            backOnTheFlyPosision();

        }
    }

    bindBackButton() {

        document.getElementById('gapBackButton').onclick = function () {
            CurrentUserInfo.commonDomManager.toggleSelectChat();

            if (!CurrentUserInfo.IsCustomer) {
                CurrentUserInfo.plugin.checkLoginAndGetClientsForAdmin();
            }else{
            }


        }
    }

    bindOntheFlyFocus(elementById) {
        elementById.onclick = function () {
            document.getElementById('gapChatInput').focus()


        }
    }

    bindGapRowClick() {

        var arr = document.getElementsByClassName('gapRow');

        for (let i = 0; i < arr.length; i++) {
            arr[i].onclick = function () {

                CurrentUserInfo.commonDomManager.toggleSelectChat(this);

            }
        }
    }

    bindDotOnClick() {

        document.getElementById('dot').onclick = function () {
            toggle(this)
            var x = document.getElementById('gapContent');
            toggle(x)


            // show chats 
            if (this.style.display === 'none') {
                CurrentUserInfo.commonDomManager.correctOnTheFlyPosition()

            }


            if (CurrentUserInfo.IsCustomer) {
                CurrentUserInfo.plugin.Register();

            } else {
                CurrentUserInfo.plugin.checkLoginAndGetClientsForAdmin();
            }


        }

    }

    correctOnTheFlyPosition() {
        var x = document.getElementById('gapContent');
        var ontheFly = document.getElementById('onTheFly');
        lastTopOnTheFlyPos = ontheFly.style.top;
        lastLeftOnTheFlyPos = ontheFly.style.left;

        if ((x.getBoundingClientRect().y + x.getBoundingClientRect().height) > window.innerHeight) {
            ontheFly.style.top = window.innerHeight - (x.getBoundingClientRect().height + 50) + 'px';
        }

        if ((x.getBoundingClientRect().x + x.getBoundingClientRect().width + 50) > window.innerWidth) {
            ontheFly.style.left = window.innerWidth - (x.getBoundingClientRect().width + 50) + 'px';
        }
    }
}

class CommonDomManager extends DomManager {

}

class NavigationDomManager extends DomManager {

}

class ChatDomManager extends DomManager {

}


class WebsocketManager {

}


/*
*     accountId
* userId
*/
const CurrentUserInfo = {
    /**
     * @return {number}
     */
    GetCurrentCustomerToken() {
        return cookieManager.getCookie('customerToken');
    },
    AddCurrentCustomerToken(Message) {

        cookieManager.addToCookies('customerToken', Message);
    }
}


const cookieManager = {

    addToCookies(name, value) {

        var days;
        if (days)
        {
            var date = new Date();
            date.setTime(date.getTime()+days*24*60*60*1000); // ) removed
            var expires = "; expires=" + date.toGMTString(); // + added
        }
        else
            var expires = "";
        document.cookie = name+"=" + value+expires + ";path=/";    },

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}


var lastTopOnTheFlyPos;
var lastLeftOnTheFlyPos;


function backOnTheFlyPosision() {
    var ontheFly = document.getElementById('onTheFly');

    if (lastTopOnTheFlyPos) {

        ontheFly.style.top = lastTopOnTheFlyPos;
        ontheFly.style.left = lastLeftOnTheFlyPos;
    }
}


function addMore(num) {
    if (num < 100) {
        num += 200
    }
    return num;

}


function positionONTheFly(elementById) {
    elementById.style.top = '100px';
    elementById.style.left = '100px';


}

function scrollToBottomChatPanel() {
    var chatPanel = document.getElementById('chatPanel');
    chatPanel.scrollTop = chatPanel.scrollHeight;
}


function toggle(x) {
    if (x.style.display === 'none') {
        x.style.display = 'inherit';
    } else {
        x.style.display = 'none';
    }
}

/*drag */


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    /* if (document.getElementById(elmnt.id + "header")) {
         // if present, the header is where you move the DIV from:
         document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
     } else {
         // otherwise, move the DIV from anywhere inside the DIV:
     }*/
    elmnt.onmousedown = dragMouseDown;


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


/*SignalR*/
const MyCaller = {

    Send(name, data) {


        var req = {};
        req.Name = name;
        req.Body = data;
        req.Token=CurrentUserInfo.GetCurrentCustomerToken();
        req.TokenAdmin=_currentAdminInfo.adminToken;
        req.WebsiteToken=websiteToken;
        debugger

        CurrentUserInfo.ws.send(JSON.stringify(req));


    }
}
var tmp;

//        Online=0,Offline=1,Busy=2
function getBackgroundColorForStatus(accountStatus) {
    if (accountStatus === '0') {
        return "green";
    }
    if (accountStatus === '1') {
        return "grey";
    }
    if (accountStatus === '2') {
        return "orange";
    }
    return Error('not find');
}

function setCurrentPersonOnTop() {
    document.getElementById('gapCurPerson').innerText = CurrentUserInfo.targetName;
    document.getElementById('gapCurId').innerText = CurrentUserInfo.targetId;

    document.getElementById('gapCurPersonStatus').style.backgroundColor
        = getBackgroundColorForStatus(CurrentUserInfo.targetStatus)
}

class dispatcher {

    dispatch(res) {
        if (res.Type == -1)//error
        {
            console.error(res.Message);
        }
        switch (res.Name) {
            case "registerCallback":
                CurrentUserInfo.plugin.registerCallback(res);
                break;
            case "readChatCallback":
                CurrentUserInfo.plugin.readChatCallback(res);
                break;
            case "adminLoginCallback":
                CurrentUserInfo.plugin.adminLoginCallback(res);
                break;
            case "getClientsListForAdminCallback":
                CurrentUserInfo.plugin.getClientsListForAdminCallback(res);
                break;
            case "adminSendToCustomerCallback":
                CurrentUserInfo.plugin.adminSendToCustomerCallback(res);
                break;
            case "adminSendToCustomerFailCallback":
                CurrentUserInfo.plugin.adminSendToCustomerFailCallback(res);
                break;

            case "customerSendToAdminCallback":
                CurrentUserInfo.plugin.customerSendToAdminCallback(res);
                break;
                
                default:
                    if (res && res.Message){

                        console.error(res.Message);

                        alert(res.Message)
                    }
                    break;

        }

    }

}

const _dispatcher = new dispatcher();
let connection;
let ws;

const _currentAdminInfo = {}
_currentAdminInfo.adminToken = cookieManager.getCookie('adminToken');