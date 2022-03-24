const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
        	"F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12",
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "z", "x", "c", "v", "b", "n", "m", ",", ".","Up",
            "ESC",":","/","space","Left","Down","Right",
        ];
		var dict = {
  			"F1": "58",
  			"F2": "59",
  			"F3": "60",
  			"F4": "61",
  			"F5": "62",
  			"F6": "63",
  			"F7": "64",
  			"F8": "65",
  			"F9": "66",
  			"F10": "67",
  			"F11": "68",
  			"F12": "69",
  			"ESC": "41",
            "a":"4",
            "b":"5",
            "c":"6",
            "d":"7",
            "e":"8",
            "f":"9",
            "g":"10",
            "h":"11",
            "i":"12",
            "j":"13",
            "k":"14",
            "l":"15",
            "m":"16",
            "n":"17",
            "o":"18",
            "p":"19",
            "q":"20",
            "r":"21",
            "s":"22",
            "t":"23",
            "u":"24",
            "v":"25",
            "w":"26",
            "x":"27",
            "y":"28",
            "z":"29",
            "1":"30",
            "2":"31",
            "3":"32",
            "4":"33",
            "5":"34",
            "6":"35",
            "7":"36",
            "8":"37",
            "9":"38",
            "0":"39",
            ",":"54",
            ".":"55",
  			":": "203",
  			"/": "56",
  			"space": "44",
  			"Left": "80",
  			"Down": "81",
  			"Right": "79",
  			"Up": "82",
  			"enter": "88",
            "backspace":"42",
		};
        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["F12","backspace", "p", "enter", "Up"].indexOf(key) !== -1;
            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            switch (key) {
            	case ":":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = "&#58;";
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;
                case "/":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = "&#8260;";
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = "BackSpace";
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;
				case "Right":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = "&#8680;";
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;
				case "Left":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = "&#8678;";
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;
                case "Up":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = "&#8679;";
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;
                case "Down":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = "&#8681;";
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;
                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = "Enter";
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = "Space Bar";
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;

                default:
                    //keyElement.textContent = key.toLowerCase();
                    keyElement.textContent = key;//.toLowerCase();
                    //keyElement.addEventListener("click", () => {
                   //     this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                     //   alert(key+" "+dict[key]);
                      //  keySequence('singleKey',dict[key]);
                    //});
                    keyElement.addEventListener("click", () => {
                        keySequence('singleKey',dict[key]);
                    });
                    break;
            }
            
            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },


};

function keySequence(OpType,OpValue){
    var hr = new XMLHttpRequest();
    const url = "keyScript.php";
    const vars = "value="+encodeURIComponent(OpType)+"&OpValue="+encodeURIComponent(OpValue);
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    var return_data = hr.responseText.trim();
            if(OpType=="enableKB" || OpType=="disableKB"){
                alert(return_data);
            }
	    }
    }
    hr.send(vars);
}
window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
