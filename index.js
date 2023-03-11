class ModalJS {
    constructor(json) {
      const overlay = document.createElement("div");
      overlay.classList.add("modaljs-overlay");
      document.body.appendChild(overlay);
      this.overlay = overlay;
      this.json = json;
      this.buttons = []
      const modal = document.createElement("div");
      const modal_title = document.createElement("div");
      const modal_body = document.createElement("div");
      const modal_button = document.createElement("div");
      const close_btn = document.createElement("button");
      modal.classList.add("modaljs-modal");
      modal_title.classList.add("modaljs-modal-title");
      modal_body.classList.add("modaljs-modal-body");
      modal_button.classList.add("modaljs-modal-button");
      close_btn.classList.add("modaljs-close-btn");
      if(this.json.theme == "dark"){
        modal.classList.add("modaljs-modal-dark")
        modal_body.classList.add("modaljs-modal-body-dark")
        close_btn.classList.add("modaljs-close-btn-dark")
      }
      this.modal = modal;
      this.modal_title = modal_title;
      this.modal_body = modal_body;
      this.modal_button = modal_button;
      this.close_btn = close_btn;
      modal_title.innerHTML = this.json.title;
      modal_body.innerHTML = this.json.body;
      close_btn.innerText = this.json.close_btn_text || "CLOSE";
      this.overlay.appendChild(modal);
      modal.appendChild(modal_title);
      modal.appendChild(modal_body);
      modal.appendChild(modal_button);
      close_btn.onclick = event => {
        this.hide();
      };
      if (this.json.close_on_out_click) {
        this.overlay.addEventListener("click", e => {
          if (!e.target.closest(".modaljs-modal")) {
            this.hide();
          }
        });
      }
      close_btn.addEventListener('mousedown',(e)=>{
        var ripple = document.createElement("span")
        ripple.classList.add("modaljs-ripple")
        close_btn.appendChild(ripple)
        ripple.style.animation = "modaljs-ripple 500ms linear forwards"
        ripple.style.top = e.clientY - (parseInt(close_btn.getBoundingClientRect().top)+25) + "px";
        ripple.style.left = e.clientX - (parseInt(close_btn.getBoundingClientRect().left+25))  + "px";
        // console.log(e.clientY - (parseInt(btn.getBoundingClientRect().top)) )
        setTimeout(()=>{
          ripple.remove()
        },500)
      })
      ;
      if (this.json.draggable == true) {

        //mouse
        modal_title.style.cursor = "grab";
        dragElement();
        function dragElement() {
          var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
          modal_title.onmousedown = dragMouseDown;
          function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
          }
          function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            modal.style.top = modal.offsetTop - pos2 + "px";
            modal.style.left = modal.offsetLeft - pos1 + "px";
          }
          function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
          }
        }

        //touch
        var inix,iniy,finx,finy
        this.modal_title.addEventListener('touchstart',(e)=>{
          inix = e.touches[0].clientX
          iniy = e.touches[0].clientY
        })
        this.modal_title.addEventListener('touchmove',(e)=>{
          finx = e.touches[0].clientX
          finy = e.touches[0].clientY

          var deltax = finx-inix
          var deltay = finy-iniy

          // console.log(deltax,deltay)
          modal.style.top = modal.offsetTop + deltay + "px";
          modal.style.left = modal.offsetLeft + deltax + "px";

          inix = e.touches[0].clientX;
          iniy = e.touches[0].clientY;


        })
      }
      ;
      if (this.json.custom_buttons) {
        var button_list = this.json.custom_buttons;
        for (let i = 0; i < button_list.length; i++) {
          var btn = document.createElement("button");
          btn.innerText = button_list[i].text;
          btn.classList.add(`modaljs-btn-${button_list[i].theme}`);
          if(this.json.theme == "dark"){btn.classList.add(`modaljs-btn-${button_list[i].theme}-dark`);}
          btn.addEventListener("click",button_list[i].onclick)
          btn.addEventListener('mousedown',(e)=>{
            var ripple = document.createElement("span")
            ripple.classList.add("modaljs-ripple")
            btn.appendChild(ripple)
            ripple.style.animation = "modaljs-ripple 500ms linear forwards"
            ripple.style.top = e.clientY - (parseInt(btn.getBoundingClientRect().top)+25) + "px";
            ripple.style.left = e.clientX - (parseInt(btn.getBoundingClientRect().left+25))  + "px";
            setTimeout(()=>{
              ripple.remove()
            },500)
          })
          modal_button.appendChild(btn);
          this.buttons.push(btn)

        }
      }
      modal_button.appendChild(close_btn);
    }
    show() {
      this.overlay.style.display = "flex";
      this.overlay.style.animation = "modaljs-overlay-show 300ms ease-out forwards";
      this.modal.style.animation = "modaljs-modal-show 300ms ease-out forwards";
      document.addEventListener("keydown", (e)=> {
        const key = e.key;
        if (key === "Escape") {
            this.hide()
        }
    });
    }
    hide() {
      this.modal.style.animation = "modaljs-modal-hide 300ms ease-out forwards";
      this.overlay.style.animation = "modaljs-overlay-hide 300ms ease-out forwards";
      if (this.json.onclose) {
        this.json.onclose();
      }
      ;
      setTimeout(() => {
        this.overlay.style.display = "none";
      }, 300);
    }
  }
  