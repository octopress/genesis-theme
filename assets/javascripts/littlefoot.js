(function(){

  var LittleFoot = {
    initialize: function(){
      self = this

      document.addEventListener("DOMContentLoaded", function(event) { 
        anchors = document.querySelectorAll("a[href^='#fn:']")
        Array.prototype.forEach.call(anchors, function(anchor){
          self.setupFootnote(anchor)
        })

        document.querySelector('div.footnotes').remove()
      })

      document.addEventListener("click", function(event) {
        var button = childOf(event.target, '.littlefoot-button')
        var dismiss = childOf(event.target, '.littlefoot-container.is-open')

        if (button) {
          LittleFoot.toggle(button)
        } else if (!dismiss) {
          LittleFoot.close()
        }
      })

      window.addEventListener("resize", function(event) { 
        window.clearTimeout(self.timeout)
        self.timeout = window.setTimeout(function(){self.positionFootnote()}, 50)
      })

    },

    toggle: function(el) {
      if (this.currentFootnote()){
        this.close()
      } else {
        this.open(el)
      }
    },

    open: function (el) {
      self = this
      el.parentNode.classList.add('is-open')
      var footnote = el.nextElementSibling
      var size = this.measureFootnote(footnote)

      footnote.classList.remove('is-hidden')
      this.activeFootnote = el.parentNode

      footnote.querySelector('.littlefoot-footnote-content').setAttribute('style', 'max-width:'+size.w+'px;')

      self.positionFootnote()
      footnote.classList.add('is-visible')
    },

    close: function () {
      var footnote = this.currentFootnote()
      if (footnote) {
        this.activeFootnote.classList.remove('is-open')
        footnote.classList.add('is-hidden')
        footnote.classList.remove('is-visible')
        this.activeFootnote = null
      }
    },

    currentFootnote: function() {
      if (this.activeFootnote) {
        return this.activeFootnote.querySelector('.littlefoot-footnote')
      }
    },

    toggleFootnote: function (el) {
      self = this
      el.parentNode.classList.toggle('is-open')

      var footnote = el.nextElementSibling
      var size = this.measureFootnote(footnote)

      if (!footnote.classList.toggle('is-hidden')) {
        this.currentFootnote = footnote
      } else {
        this.currentFootnote = null
      }

      footnote.querySelector('.littlefoot-footnote-content').setAttribute('style', 'max-width:'+size.w+'px;')
      self.positionFootnote()
      footnote.classList.toggle('is-visible')
    },
    
    setupFootnote: function (anchor) {
      // We want to add the footnote adjacent to the footnote <sup> element
      var sup = anchor.parentNode
      sup.insertAdjacentHTML('afterend', this.wrapper(anchor));

      var wrapper = sup.nextElementSibling
      wrapper.footnote = this.footnoteContent(anchor)
      sup.remove()
    },

    footnoteContent: function(anchor) {

      // Find the footnote from the id in the anchor's href
      var id = anchor.getAttribute('href').replace(':', "\\:")
      var footnote = document.querySelector(id)

      // Remove the "return to content" link
      var link = footnote.querySelector('a[href^=\\#fnref]')
      if (link) link.remove()
      var containerWidth = footnote.offsetParent.parentElement.offsetWidth
      return footnote.innerHTML
    },

    wrapper: function (el) {
      return ' <div class="littlefoot-container open-down">'+this.button(el)+this.footnote(el)+'</div>'
    },

    button: function (el) {
      return '<button class="littlefoot-button" title="view footnote #'+el.textContent+'"><svg class="littlefoot-graphic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 98"><path class="littlefoot-graphic-path" fill="#fff" d="M200 25c0-13.8-11.2-25-25-25H25C11.2 0 0 11.2 0 25v48c0 13.8 11.2 25 25 25h150c13.8 0 25-11.2 25-25V25zM50.5 64.3c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.8 15-15 15zm50 0c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.8 15-15 15zm49 0c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.8 15-15 15z"/></svg></button>'
    },
    
    footnote: function (el) {
      return '<aside class="littlefoot-footnote is-hidden"><div class="littlefoot-footnote-wrapper"><div class="littlefoot-footnote-content">'+this.footnoteContent(el)+'</div></div></aside>'
    },

    positionFootnote: function () {
      footnote = this.currentFootnote()
      if (footnote && footnote.offsetWidth > 0) {
        this.setOrientation(footnote)
        this.setPosition(footnote)
      }
    },

    setPosition: function(footnote) {
      var container = footnote.offsetParent.parentElement
      var contentWidth = container.offsetWidth
      var overlap =  footnote.offsetWidth + footnote.offsetParent.offsetLeft

      footnote.setAttribute('style', '')

      if (overlap > contentWidth) {
        footnote.setAttribute('style', 'left: -' + String(overlap - contentWidth) + 'px;')
      }
    },

    setOrientation: function (footnote) {
      var wrapper = footnote.parentElement
      wrapper.classList.remove('open-up', 'open-down')
      wrapper.classList.add('open-down')
      var pos = footnote.getBoundingClientRect()

      wrapper.classList.remove('open-up', 'open-down')


      if (pos.bottom > window.innerHeight) {
        wrapper.classList.add('open-up')
      } else {
        wrapper.classList.add('open-down')
      }
    },

    measureFootnote: function(footnote) {
      var context = footnote.parentElement.parentElement
      var el = document.createElement("div")
      el.classList.add('littlefoot-test')
      el.insertAdjacentHTML('beforeend', footnote.parentElement.footnote)
      context.appendChild(el)
      var size = {
        h: el.offsetHeight,
        w: el.offsetWidth
      }
      context.removeChild(el)
      return size
    }
  }

  var childOf = function(start, classname) {
    var func;
    var element = start;

    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function(fn) {
      if (typeof document.body[fn] == 'function') {
        func = fn;
        return true;
      }
      return false;
    });

    while (element !== null) {
      if (element !== null && element[func](classname)) {
        return element;
      }
      element = element.parentElement;
    }
  }

  LittleFoot.initialize()
  window.LittleFoot = LittleFoot
})()
