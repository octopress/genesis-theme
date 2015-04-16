(function(){

  littleFoot = {
    setup: function(){
      self = this

      document.addEventListener("DOMContentLoaded", function(event) { 
        anchors = document.querySelectorAll("a[href^='#fn:']")
        Array.prototype.forEach.call(anchors, function(anchor){
          self.setupFootnote(anchor)
        })

        document.querySelector('div.footnotes').remove()
      })

    },

    toggleFootnote: function(event) {
      el = event.target
      if (el.classList.toggle('is-active')){
        el.insertAdjacentHTML('afterend', el.footnote);
      } else {
        el.nextElementSibling.remove()
      }
    },
    
    setupFootnote: function(el) {
      var sup = el.parentNode
      var id = el.getAttribute('href').replace(':', "\\:")
      var footnote = document.querySelector(id).cloneNode(true)
      footnote.querySelector('a[href^=\\#fnref]').remove()
      var noteContent = footnote.innerHTML.trim()
      sup.insertAdjacentHTML('afterend', this.button(el.textContent));
      var button = sup.nextElementSibling
      button.footnote = this.footnote(noteContent)
      button.addEventListener('click', this.toggleFootnote.bind(this))
      sup.remove()
    },
    
    button: function(content) {
      return '<button class="littlefoot-button">'+content+'</button>'
    },
    
    footnote: function(content) {
      return '<aside class="littlefoot-footnote">'+content+'</aside>'
    }
  }

  littleFoot.setup()
})()
