const fInputs = document.querySelectorAll('.btcd-f-input>div>input')

function getFileSize(size) {
    let _size = size
    let unt = ['Bytes', 'KB', 'MB', 'GB'],
        i = 0; while (_size > 900) { _size /= 1024; i++; }
    return (Math.round(_size * 100) / 100) + ' ' + unt[i];
}

function delItem(el) {
    fileList = { files: [] }
    let fInp = el.parentNode.parentNode.parentNode.querySelector('input[type="file"]')
    for (let i = 0; i < fInp.files.length; i++) {
        fileList.files.push(fInp.files[i])
    }
    fileList.files.splice(el.getAttribute('data-index'), 1)

    
    el.parentNode.remove()
}

function fade(element) {
    let op = 1;  // initial opacity
    let timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    let op = 0.01;  // initial opacity
    element.style.opacity = op;
    element.style.display = 'flex';
    let timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 13);
}

function get_browser() {
    let ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/)
        if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return {
        name: M[0],
        version: M[1]
    };
}

for (let inp of fInputs) {
    inp.addEventListener('mousedown', function (e) { setPrevData(e) })
    inp.addEventListener('change', function (e) { handleFile(e) })
}

let fileList = { files: [] }
let fName = null
let mxSiz = null

function setPrevData(e) {
    if (e.target.hasAttribute('multiple') && fName !== e.target.name) {
        console.log('multiple')
        fName = e.target.name
        fileList = fileList = { files: [] }
        if (e.target.files.length > 0) {
            for (let i = 0; i < e.target.files.length; i += 1) {
                console.log(e.target.files[i])
                fileList.files.push(e.target.files[i])
            }
        }
    }
}

function handleFile(e) {
    let err = []
    const fLen = e.target.files.length;
    mxSiz = e.target.parentNode.querySelector('.f-max')
    mxSiz = mxSiz != null && (Number(mxSiz.innerHTML.replace(/\D/g, '')) * Math.pow(1024, 2))

    if (e.target.hasAttribute('multiple')) {
        for (let i = 0; i < fLen; i += 1) {
            fileList.files.push(e.target.files[i])
        }
    } else {
        fileList.files.push(e.target.files[0])
    }

    //type validate
    if (e.target.hasAttribute('accept')) {
        let tmpf = []
        let type = new RegExp(e.target.getAttribute('accept').split(",").join("$|") + '$', 'gi')
        for (let i = 0; i < fileList.files.length; i += 1) {
            if (fileList.files[i].name.match(type)) {
                tmpf.push(fileList.files[i])
            } else {
                err.push('Wrong File Type Selected')
            }
        }
        fileList.files = tmpf
    }

    // size validate
    if (mxSiz > 0) {
        let tmpf = []
        for (let i = 0; i < fileList.files.length; i += 1) {
            if (fileList.files[i].size < mxSiz) {
                tmpf.push(fileList.files[i])
                mxSiz -= fileList.files[i].size
            } else {
                console.log('rejected', i, fileList.files[i].size)
                err.push('Max Upload Size Exceeded')
            }
        }
        fileList.files = tmpf
    }

    if (e.target.hasAttribute('multiple')) {
        e.target.files = createFileList(...fileList.files)
    } else {
        e.target.files = createFileList(fileList.files[fileList.files.length - 1])
        fileList = { files: [] }
    }

    // set File list view
    let img = null
    if (e.target.files.length > 0) {

        e.target.parentNode.parentNode.querySelector('.btcd-files').innerHTML = ''
        for (let i = 0; i < e.target.files.length; i += 1) {
            img = defineFileType(e.target.files[i].type);
            
            e.target.parentNode.parentNode.querySelector('.btcd-files').insertAdjacentHTML('afterbegin', `<div>
                    <img src="${img}" alt="img"  title="${e.target.files[i].name}">
                    <div>
                        <span title="${e.target.files[i].name}">${e.target.files[i].name}</span>
                        <small>${getFileSize(e.target.files[i].size)}</small>
                    </div>
                    <button type="button" onclick="delItem(this)" data-index="${i}" title="Remove This File"><span><i class="fal fa-times"></i></span></button>
                </div>`)

        }
    }

    function defineFileType(type) {
        switch (type) {
            case "image/png":
                return "../assets/img/png.svg";
                break;
            case "image/jpeg":
                return "../assets/img/jpg.svg";
                break;
            case "application/msword":
                return "../assets/img/doc.svg";
                break;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return "../assets/img/doc.svg";
                break;
            case "application/vnd.ms-powerpoint":
                return "../assets/img/ppt.svg";
                break;
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return "../assets/img/ppt.svg";
                break;
            case "application/vnd.ms-excel":
                return "../assets/img/xls.svg";
                break;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return "../assets/img/xls.svg";
                break;
            case "application/pdf":
                return "../assets/img/pdf.svg";
                break;            
            default:
                break;
        }
    }   

    // set error
    if (err.length > 0) {
        for (let i = 0; i < err.length; i += 1) {
            e.target.parentNode.parentNode.querySelector('.btcd-files').insertAdjacentHTML('afterbegin', `
            <div style="background: #fff2f2;color: darkred;display:none" class="btcd-f-err">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjg2LjA1NCIgaGVpZ2h0PSIyODYuMDU0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoKIDxnPgogIDx0aXRsZT5iYWNrZ3JvdW5kPC90aXRsZT4KICA8cmVjdCBmaWxsPSJub25lIiBpZD0iY2FudmFzX2JhY2tncm91bmQiIGhlaWdodD0iNDAyIiB3aWR0aD0iNTgyIiB5PSItMSIgeD0iLTEiLz4KIDwvZz4KIDxnPgogIDx0aXRsZT5MYXllciAxPC90aXRsZT4KICA8ZyBzdHJva2U9Im51bGwiIGlkPSJzdmdfMSI+CiAgIDxwYXRoIHN0cm9rZT0ibnVsbCIgaWQ9InN2Z18yIiBmaWxsPSIjOTEwNjAxIiBkPSJtMTQzLjAyNjk5Nyw1Ni4wMDAwMDVjLTQ4LjA2MDg2NSwwIC04Ny4wMjY5OTcsMzguOTY2MTMxIC04Ny4wMjY5OTcsODcuMDI2OTk3YzAsNDguMDY2MzQyIDM4Ljk2NjEzMSw4Ny4wMjY5OTcgODcuMDI2OTk3LDg3LjAyNjk5N2M0OC4wNjYzNDIsMCA4Ny4wMjY5OTcsLTM4Ljk1NTE3OSA4Ny4wMjY5OTcsLTg3LjAyNjk5N2MwLC00OC4wNjA4NjUgLTM4Ljk2MTI2NCwtODcuMDI2OTk3IC04Ny4wMjY5OTcsLTg3LjAyNjk5N3ptMCwxNTcuNzM2MTY2Yy0zOS4wNTMxNDIsMCAtNzAuNzA5MTY5LC0zMS42NTYwMjcgLTcwLjcwOTE2OSwtNzAuNzA5MTY5czMxLjY1NjAyNywtNzAuNzA5MTY5IDcwLjcwOTE2OSwtNzAuNzA5MTY5czcwLjcwOTE2OSwzMS42NTYwMjcgNzAuNzA5MTY5LDcwLjcwOTE2OXMtMzEuNjU2MDI3LDcwLjcwOTE2OSAtNzAuNzA5MTY5LDcwLjcwOTE2OXptMC4wMDU0NzYsLTExOS41Njk1NThjLTYuMjMzMTIxLDAgLTEwLjk0OTMzNywzLjI1Mjg1NyAtMTAuOTQ5MzM3LDguNTA2OTU2bDAsNDguMTkxMDc3YzAsNS4yNTk1NzYgNC43MTU2MDgsOC41MDE0OCAxMC45NDkzMzcsOC41MDE0OGM2LjA4MTAwNCwwIDEwLjk0OTMzNywtMy4zNzc1OTIgMTAuOTQ5MzM3LC04LjUwMTQ4bDAsLTQ4LjE5MTA3N2MtMC4wMDA2MDgsLTUuMTI5MzY0IC00Ljg2ODMzMywtOC41MDY5NTYgLTEwLjk0OTMzNywtOC41MDY5NTZ6bTAsNzYuMDU2MzY0Yy01Ljk4ODUxOCwwIC0xMC44NjIzMjYsNC44NzM4MDkgLTEwLjg2MjMyNiwxMC44NjcxOTRjMCw1Ljk4MzA0MSA0Ljg3MzgwOSwxMC44NTY4NSAxMC44NjIzMjYsMTAuODU2ODVzMTAuODU2ODUsLTQuODczODA5IDEwLjg1Njg1LC0xMC44NTY4NWMtMC4wMDA2MDgsLTUuOTkzOTk0IC00Ljg2ODMzMywtMTAuODY3MTk0IC0xMC44NTY4NSwtMTAuODY3MTk0eiIvPgogIDwvZz4KICA8ZyBpZD0ic3ZnXzMiLz4KICA8ZyBpZD0ic3ZnXzQiLz4KICA8ZyBpZD0ic3ZnXzUiLz4KICA8ZyBpZD0ic3ZnXzYiLz4KICA8ZyBpZD0ic3ZnXzciLz4KICA8ZyBpZD0ic3ZnXzgiLz4KICA8ZyBpZD0ic3ZnXzkiLz4KICA8ZyBpZD0ic3ZnXzEwIi8+CiAgPGcgaWQ9InN2Z18xMSIvPgogIDxnIGlkPSJzdmdfMTIiLz4KICA8ZyBpZD0ic3ZnXzEzIi8+CiAgPGcgaWQ9InN2Z18xNCIvPgogIDxnIGlkPSJzdmdfMTUiLz4KICA8ZyBpZD0ic3ZnXzE2Ii8+CiAgPGcgaWQ9InN2Z18xNyIvPgogPC9nPgo8L3N2Zz4=" alt="img">
                <span>${err[i]}</span>
            </div>`)
        }
        const errNods = e.target.parentNode.parentNode.querySelectorAll('.btcd-files>.btcd-f-err')
        for (let i = 0; i < errNods.length; i += 1) {
            unfade(errNods[i])
            setTimeout(() => { fade(errNods[i]) }, 3000);
            setTimeout(() => { errNods[i].remove() }, 4000);
        }
        err = []
    }

}