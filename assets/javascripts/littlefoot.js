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

      window.addEventListener("resize", function(event) { 
        window.clearTimeout(self.timeout)
        self.timeout = window.setTimeout(function(){self.positionFootnote()}, 50)
      })

    },

    toggleFootnote: function (event) {
      self = this
      el = event.target
      el.parentNode.classList.toggle('is-open')

      var footnote = el.nextElementSibling
      var size = this.measureFootnote(footnote)

      if (!footnote.classList.toggle('is-hidden')) {
        this.currentFootnote = footnote
      } else {
        this.currentFootnote = null
      }

      footnote.querySelector('.littlefoot-footnote-content').setAttribute('style', 'max-width:'+size.w+'px;')
      window.setTimeout(function(){self.positionFootnote()}, 10)
      footnote.classList.toggle('is-visible')
    },
    
    setupFootnote: function (anchor) {
      // We want to add the footnote adjacent to the footnote <sup> element
      var sup = anchor.parentNode
      sup.insertAdjacentHTML('afterend', this.wrapper(anchor));

      var wrapper = sup.nextElementSibling
      wrapper.footnote = this.footnoteContent(anchor)
      wrapper.querySelector('button').addEventListener('click', this.toggleFootnote.bind(this))
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
      return '<button class="littlefoot-button" title="view footnote #'+el.textContent+'">•••</button>'
    },
    
    footnote: function (el) {
      return '<aside class="littlefoot-footnote is-hidden"><div class="littlefoot-footnote-wrapper"><div class="littlefoot-footnote-content">'+this.footnoteContent(el)+'</div></div></aside>'
    },

    positionFootnote: function () {
      if (this.currentFootnote && this.currentFootnote.offsetWidth > 0) {
        this.setOrientation(this.currentFootnote)
        this.setPosition(this.currentFootnote)
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

  LittleFoot.initialize()
  window.LittleFoot = LittleFoot
})()
