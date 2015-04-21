(function(){

  var LittleFoot = {
    initialize: function(){
      self = this

      document.addEventListener("DOMContentLoaded", function(event) {
        var anchors = document.querySelectorAll("a[href^='#fn:']")
        if (anchors.length > 0) {

          Array.prototype.forEach.call(anchors, function(anchor){
            self.setup(anchor)
          })

          document.addEventListener("click", self.click.bind(self))

          document.querySelector('div.footnotes').remove()
        }
      })

    },

    setup: function (anchor) {
      // We want to add the footnote adjacent to the footnote <sup> element
      var sup = getParent(anchor, 'sup')
      sup.insertAdjacentHTML('afterend', this.template.wrapper(anchor));

      var wrapper = sup.parentNode.querySelector('.littlefoot-container')
      wrapper.footnoteContent = this.template.footnoteContent(anchor)
      sup.remove()
    },

    click: function (event) {
      self = this

      // Did a footnote button trigger the click event?
      var button = getParent(event.target, '.littlefoot-button')

      // Toggle if the click was inside the button
      if (button) {
        self.toggle(button)
      
      // Close if the click was outisde of the open footnote
      } else if (!getParent(event.target, '.littlefoot-container.is-open')) {
        self.close()
      }
    },

    // Watch the resize event to continually position the footnote popover
    resize: function () {
      self = this

      // Only reposition this every 50 miliseconds to avoid constant repainting
      window.clearTimeout(self.timeout)
      self.timeout = window.setTimeout( function() { 
        self.sizeFootnote()
        self.positionFootnote()
      }, 50)
    },

    toggle: function (el) {
      if (this.footnote.el){
        this.close()
      } else {
        this.open(el)
      }
    },

    open: function (el) {
      this.footnote.el = getParent(el, '.littlefoot-container')
      var popover = this.footnote.popover()

      this.footnote.el.classList.add('is-open')
      this.sizeFootnote()

      popover.classList.remove('is-hidden')

      this.positionFootnote()
      popover.classList.add('is-visible')
      window.addEventListener("resize", self.resize.bind(self))
    },

    close: function () {
      if (this.footnote.el) {
        this.footnote.el.classList.remove('is-open')
        var popover = this.footnote.popover()

        popover.classList.add('is-hidden')
        popover.classList.remove('is-visible')
        this.footnote.el = null
        window.removeEventListener("resize", self.resize.bind(self))
      }
    },

    footnote: {
      el: null,

      popover: function() {
        if (this.el) {
          return this.el.querySelector('.littlefoot-popover')
        }
      },

      panel: function() {
        if (this.el) {
          return this.el.querySelector('.littlefoot-footnote')
        }
      }
    },

    positionFootnote: function () {
      panel = this.footnote.panel()
      if (panel && panel.offsetWidth > 0) {
        this.setOrientation()
        this.setPosition()
      }
    },

    setOrientation: function () {
      var wrapper = this.footnote.el
      wrapper.classList.remove('open-up', 'open-down')
      wrapper.classList.add('open-down')
      var pos = this.footnote.panel().getBoundingClientRect()

      wrapper.classList.remove('open-up', 'open-down')


      if (pos.bottom > window.innerHeight) {
        wrapper.classList.add('open-up')
      } else {
        wrapper.classList.add('open-down')
      }
    },

    setPosition: function () {
      var container = this.footnote.el.parentElement
      var contentWidth = container.offsetWidth
      var panel = this.footnote.panel()
      var left = this.footnote.el.offsetLeft - container.offsetLeft
      var overlap = panel.offsetWidth + left

      panel.setAttribute('style', '')

      if (overlap > contentWidth) {
        panel.setAttribute('style', 'left: -' + String(overlap - contentWidth) + 'px;')
      }
    },

    sizeFootnote: function() {
      var context = this.footnote.el.parentElement
      var el = document.createElement("div")
      el.classList.add('littlefoot-test')
      el.insertAdjacentHTML('beforeend', this.footnote.el.footnoteContent)
      context.appendChild(el)
      var size = {
        h: el.offsetHeight,
        w: el.offsetWidth
      }
      context.removeChild(el)

      this.footnote.el.querySelector('.littlefoot-footnote-content').setAttribute('style', 'max-width:'+size.w+'px;')
    },

    template: {

      wrapper: function (el) {
        return ' <div class="littlefoot-container open-down">'+this.button(el)+this.popover(el)+'</div>'
      },

      button: function (el) {
        return '<button class="littlefoot-button" title="view footnote #'+el.textContent+'">'
            +'<svg class="littlefoot-graphic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 98"><path class="littlefoot-graphic-path" fill="#fff" d="M200 25c0-13.8-11.2-25-25-25H25C11.2 0 0 11.2 0 25v48c0 13.8 11.2 25 25 25h150c13.8 0 25-11.2 25-25V25zM50.5 64.3c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.8 15-15 15zm50 0c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.8 15-15 15zm49 0c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.8 15-15 15z"/></svg>'
          +'</button>'
      },
      
      popover: function (el) {
        return '<aside class="littlefoot-popover is-hidden">'
            +'<div class="littlefoot-footnote">'
              +'<div class="littlefoot-footnote-wrapper">'
                +'<div class="littlefoot-footnote-content">'
                  +this.footnoteContent(el)
                +'</div>'
              +'</div>'
            +'</div>'
          +'</aside>'
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
      }
    }
  }

  var getParent = function(start, classname) {
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
