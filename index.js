class ModalJS {
    constructor(json) {
      const overlay = document.createElement("div");
      overlay.classList.add("modaljs-overlay");
      document.body.appendChild(overlay);
      this.overlay = overlay;
      this.json = json;
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
      ;
      if (this.json.draggable) {
        modal_title.style.cursor = "all-scroll";
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
      }
      ;
      if (this.json.custom_buttons) {
        var button_list = this.json.custom_buttons;
        for (let i = 0; i < button_list.length; i++) {
          var btn = document.createElement("button");
          btn.innerText = button_list[i].text;
          btn.classList.add(`modaljs-btn-${button_list[i].theme}`);
          btn.addEventListener("click", button_list[i].onclick);
          modal_button.appendChild(btn);
        }
      }
      modal_button.appendChild(close_btn);
    }
    show() {
      this.overlay.style.display = "flex";
      this.overlay.style.animation = "modaljs-overlay-show 300ms ease-out forwards";
      this.modal.style.animation = "modaljs-modal-show 300ms ease-out forwards";
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
  